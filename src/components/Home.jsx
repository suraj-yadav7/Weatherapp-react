import React, { useEffect, useState } from 'react'

const Home = () => {
    const API_KEY = process.env.REACT_APP_API_KEY

    const [cityName, setCityName] = useState('hyderabad')
    const [data, setData] = useState('')
    

    const fetchCityData = (e)=>{
        if(e.key === "Backspace"){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`).then((respone)=>{
                let result = respone.json()
                setData(result)
            }).catch((error)=> console.log("Error occured while fetching eather data", error))
            setCityName('')
        }
    }

    useEffect(()=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`).then((respone)=>{
            let result = respone.json()
            setData(result)
        }).catch((error)=> console.log("Error occured while fetching eather data", error))
    },[])

  return (
    <>
      <div className='app'>
        <div className="search">
        <input type='text' placeholder='enter your city' onKeyUp={fetchCityData} value={cityName} onChange={(e)=>setCityName(e.target.value)} />

        </div>
        <div className="container">
            <div className="top">
                <div className="location">
                    <p>Hyderabad</p>
                </div>
                <div className="temp">
                    <h2>32c</h2>
                </div>
                <div className="description">
                    <p>Clouds</p>
                </div>
            </div>
            <div className="bottom">
                <div className="feels">
                    <p className='bold'>32 C</p>
                    <p>Free Like</p>
                </div>
                <div className="humidity">
                    <p className='bold'>30%</p>
                    <p>Humidity</p>
                </div>
                <div className="wind">
                    12 MPH 
                    <p className='bold'>12 mph</p>
                    <p>wind speed</p>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home
