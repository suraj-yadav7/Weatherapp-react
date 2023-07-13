import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Home = () => {
    const API_KEY = process.env.REACT_APP_API_KEY

    const [cityName, setCityName] = useState('')
    const [value, setValue] = useState()

    //fetching data when user update city name and enter
    const fetchCityData = async (e)=>{
            if(e.key==="Enter"){
                try{
                let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`)
                console.log("the response", response)
                setValue(response)
                setCityName('')
            }
            catch(error){
                console.log("error occured while fetching data", error)
            }
        }
    }

    //initial static data when app opened
    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=hyderabad&units=metric&appid=${API_KEY}`).then((response)=>{
                console.log("axios",response)
                setValue(response)
            })
    },[])

  return (
    <>
      <div className='app'>
        <div className="search">
        <input type='text' placeholder='enter your city' onKeyDown={fetchCityData} value={cityName} onChange={(e)=>setCityName(e.target.value)} />
        </div>
        <div className="container">
            <div className="top">
                <div className="location">
                    <p> {value&& value.data.name}</p>
                </div>
                <div className="temp">
                    <h2>{value&& (value.data.main.temp).toFixed()} &deg;C</h2>
                </div>
                <div className="description">
                    <p>Clouds</p>
                    <p>{value&& value.data.clouds.all} </p>
                </div>
            </div>
            <div className='middleContainer'>
                <h2>{ value&& value.data.weather[0].main}</h2>
                <p>{value&& value.data.weather[0].description}</p>
            </div>
            <div className="bottom">
                <div className="feels">
                    <p className='bold'>{value&& value.data.main.feels_like.toFixed(1)}</p>
                    <p>Feels Like</p>
                </div>
                <div className="humidity">
                    <p className='bold'>{ value&& value.data.main.humidity}%</p>
                    <p>Humidity</p>
                </div>
                <div className="wind">
                    <p className='bold'>{value&& value.data.wind.speed} mph</p>
                    <p>wind speed</p>
                </div>
            </div>
        </div>
      </div>

    </>
  )
}

export default Home
