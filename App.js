import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Pressable, Keyboard} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [city, setCity] = useState('')

  const [temp, setTemp] = useState(0)
  const [description, setDescription] = useState("")
  const [currently, setCurrently] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("");
  

  function populate(data) {

      setTemp(Math.ceil(data.main.temp));
      setDescription(data.weather[0].description);
      setCurrently(data.weather.main);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setLocation(data.name + " " + data.sys.country);
  }
  const fetchItems = (searchTerm = "lagos") => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=31b7f92ee1069769b2b8eb71dde1b3d8`)
    .then(response => response.json())
    .then(data => populate(data))
  }

  useEffect(() => {
    fetchItems();
  }, [])

  return (
    
    <SafeAreaView className="h-full flex justify-start items-center]">
      <View className="w-full h-[40%] flex flex-col justify-center items-center">
      <LinearGradient
        // Background Linear Gradient
        
        colors={['#C03f77', '#35014f']}
        className="w-full h-full absolute"
      />
      <Text className="text-white text-xl">{location ? location : "Loading"}</Text>
      <Text className="text-white text-8xl mt-4">{temp ? `${temp}⁰C` : "Loading"}</Text>
      <Text className="text-white text-xl">{description ? description : "Loading"}</Text>
      
      </View>
      <View  className="bg-white h-[60%] w-full flex flex-col justify-center  items-center">
        <View className=" w-[80%] mx-auto my-6 flex flex-row justify-between border-2 p-5 rounded-md">
          <TextInput
          value={city}
          onChangeText={(text) => setCity(text)}
           className="w-[95%]" placeholder='Enter City name' />
          <Pressable
          onPress={() => {
            Keyboard.dismiss()
            fetchItems(city)
            setCity("")
          }} 
          className="w-[15%]">
          <FontAwesome name="search" size={22} color="gray" />
          </Pressable>

        </View>
        <View className="flex flex-row w-full justify-around my-6">
          <FontAwesome name="thermometer-full" size={22} color="gray" />
          <Text className="text-lg text-gray-500">Temperature</Text>
          <Text className="text-lg text-gray-500">{temp ? temp : "Loading"}</Text>
        </View>

        <View className="flex flex-row w-full justify-around my-6">
          <FontAwesome name="umbrella" size={22} color="gray" />
          <Text className="text-lg text-gray-500">Weather</Text>
          <Text className="text-lg text-gray-500">{temp ? temp : "Loading"}</Text>
        </View>

        <View className="flex flex-row w-full justify-around my-6">
        <FontAwesome name="sun-o" size={22} color="gray" />
          <Text className="text-lg text-gray-500">Humidity</Text>
          <Text className="text-lg text-gray-500">{humidity ? humidity : "Loading"}</Text>
        </View>

        <View className="flex flex-row w-full justify-around my-6">
        <FontAwesome name="cloud" size={22} color="gray" />
          <Text className="text-lg text-gray-500">Wind Speed</Text>
          <Text className="text-lg text-gray-500">{windSpeed ? windSpeed : "Loading"}</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
    
  );
}

const style = StyleSheet.create({
  linearGrad : {
    backgroundColor : "linear-gradient(to right, red, yellow)"
  }
})
