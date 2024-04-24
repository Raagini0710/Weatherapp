import React from 'react'
import humidityicon from "./assets/humidity.png"
import windicon from "./assets/wind.png"


export const WeatherDetails=({icon,temp,city,country,lat,long,humidity,wind})=>{
        return(
        <>
        <div className='image'>
          <img src={icon} alt="not found"/>
        </div>
        <div className='temp'>{temp}°C</div>
        <div className='location'>{city}</div>
        <div className='country'>{country}</div>
        <div className='cord'>
          <div>
            <span className='lat'>latitude</span>
            <span>{lat}</span>
          </div>
          <div>
            <span className='long'>longitude</span>
            <span>{long}</span>
          </div>
        </div>
        <div className='data-container'>
          <div className='element'>
            <img src={humidityicon} alt="not found" className='icons' />
            <div className='data'>
              <div className='humidity-percent'>{humidity} %</div>
              <div className='text'>Humidity</div>
            </div>
          </div>
          <div className='element'>
            <img src={windicon} alt="not found" className='icon' />
            <div className='data'>
              <div className='wind-percent'>{wind} km/hr</div>
              <div className='text'>Windspeed</div>
            </div>
          </div>
        </div>
        </>
        )
      }
  
