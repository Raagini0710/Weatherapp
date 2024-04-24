import React, { useEffect, useState } from 'react'
import Search from "./assets/search.png"
import clear from "./assets/clear.png"
import snow from "./assets/snow.png"
import rain from "./assets/rain.png"
import drizzle from "./assets/drizzle.png"
// import humidity from "./assets/humidity.png"
import mist from "./assets/mist.png"
import cloud from "./assets/clouds.png"
// import wind from "./assets/wind.png"
import {WeatherDetails} from "./WeatherDetails"

export default function Weather() {
  let api_key= "caf345c56d1a8079b4c11d3adae71a41"
  const [icon, setIcon]=useState(snow)
  const [temp, setTemp]=useState(0)
  const [city, setCity]=useState("salem")
  const [country, setCountry]=useState("IN")
  const [lat,setLat]=useState(0)
  const [long, setLong]=useState(0)
  const [humidity, setHumidity]=useState(0)
  const [wind, setWind]=useState(0)
  const [text,setText]=useState("salem")
  const [cityNotFound, setCityNotFound]=useState(false)
  const [loading, setLoading]=useState(false)
  const [error,setError]=useState(null)

 const weatherIconMap ={
    "01d":clear,
    "01n":clear,
    "02d":cloud,
    "02n":cloud,
    "03d":drizzle,
    "03n":drizzle,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow
    }
  const search=async()=>{
   
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`
   
    try{
      setLoading(true);
      setError(null);
     let res=await fetch(url);
     let data=await res.json();
     if(data.cod==="404"){
      console.error("city not found")
      setCityNotFound(true);
      setIcon(clear)
      setLoading(false);
      return;
     }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      const weatherIconCode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode]|| clear)
      setCityNotFound(false);
    }catch(error){
       console.error("An error occurred:", error.message)
      //  setError("An error occured while fetching data")
    }
    finally{
      setLoading(false);
    }
  }
   
  const handleCity=(e)=>{
      setText(e.target.value);
  }
  const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
      search();
    }
  }
  useEffect(function (){
    search();
  },[]);

  
  return (
    <div>
        <div className='container'>
            <div className='input-container'>
                <input type='text' 
                className='cityInput' 
                placeholder='Search City' 
                onChange={handleCity}
                value={text}
                onKeyDown={handleKeyDown}/>
                <div className='search-icon' onClick={()=>search()}>
                    <img src={Search} alt='Not found' />
                </div>
            </div>

            {loading&& <div className='loading-message'>Loading...</div>}
            {error&&<div className='error-message'>{error}</div>}
            {cityNotFound&&<div className='city-not-found'>City not found</div>}

            <WeatherDetails 
            icon={icon} 
            temp={temp} 
            city={city} 
            country={country} 
            lat={lat} 
            long={long}
            humidity={humidity}
            wind={wind} />
             
            
        </div>
    </div>
  )
}
