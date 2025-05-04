import React, { useEffect, useState } from 'react'
import WindFiveDays from './WindFiveDays'
import useData from '../hooks/useData'

export default function InfoSection({ lat, lon, value, setValue, grades, setGrades, wind, setWind, distance, setDistance }) {
  const { response } = useData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat || "-0.2299"}&lon=${lon || "-78.5249"}&appid=b98439c211f04efd9eafc18e638774c5&units=${value || "metric"}
  `)
  const [point, setPoint] = useState()
  
  function cardinalPoints(deg){
    if(deg > 0 && deg < 22.5){
      return "N"
    }else if(deg > 22.5 && deg < 45){
      return "NNE"
    }else if(deg > 45 && deg < 67.5){
      return "NE"
    }else if(deg > 67.5 && deg < 90){
      return "ENE"
    }else if(deg > 90 && deg < 112.5){
      return "E"
    }else if(deg > 112.5 && deg < 135){
      return "ESE"
    }else if(deg > 135 && deg < 157.5){
      return "SE"
    }else if(deg > 157.5 && deg < 180){
      return "SSE"
    }else if(deg > 180 && deg < 202.5){
      return "S"
    }else if(deg > 202.5 && deg < 225){
      return "SSW"
    }else if(deg > 225 && deg < 247.5){
      return "SW"
    }else if(deg > 247.5 && deg < 270){
      return "WSW"
    }else if(deg > 270 && deg < 292.5){
      return "W"
    }else if(deg > 292.5 && deg < 315){
      return "WNW"
    }else if(deg > 315 && deg < 337.5){
      return "NW"
    }else if(deg > 337.5 && deg < 360){
      return "NNW"
    }
  }
  useEffect(() => {
    if (response?.wind?.deg) {
      const finalPoint = cardinalPoints(response.wind.deg);
      setPoint(finalPoint);
    }
  }, [response?.wind?.deg]); 

  const km = (response?.visibility / 1000)

  return (
    <section className="w-full md:w-[70%] min-h-screen  flex flex-col ">
      <div className="w-[85%] md:w-[90%] md:max-w-170 mx-auto flex justify-end gap-2.5 mt-10 ">
        <button className="h-11 w-11 bg-gray-300 rounded-full text-xl  font-semibold tracking-tight pr-1.5 hover:bg-gray-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          onClick={() => {
            setValue("metric")
            setGrades("°C")
            setWind("ms")
            setDistance("km")
            
          }}>
          °C
        </button>
        <button className="h-11 w-11 bg-gray-500 rounded-full text-xl  font-semibold tracking-tight text-white pr-1.5 hover:bg-gray-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          onClick={() => {
            setValue("imperial")
            setGrades("°F")
            setWind("mph")
            setDistance("miles")
            
          }}
        >
          °F
        </button>
      </div>

      <WindFiveDays
        lat={lat}
        lon={lon}
        value={value}
        grades={grades}

      />

      <div className="w-[85%] md:w-[90%] md:max-w-172 mx-auto mt-12 md:mt-2 mb-8 flex flex-col md:flex-row md:flex-wrap justify-between gap-3">

        <h1 className="text-2xl md:w-full text-white font-bold mt-2">Today's Hightlights</h1>

        <div className="bg-[#1e213a] w-full md:w-[48%] h-46 text-white py-2">
          <h3 className="w-[90%] mx-auto text-center font-light text-lg tracking-tight">Wind Status</h3>
          <div className="flex justify-center items-center mx-auto w-[90%] mt-4 mb-5 gap-2">
            <p className=" text-6xl font-semibold tracking-tight">{response?.wind?.speed}</p>
            <p className=" text-4xl font-light">{wind}</p>
          </div>
          <div className="flex justify-center gap-3.5 items-center">
            <div className="bg-[#585a60] rounded-full w-9 h-9 flex  tracking-tight">
              <img className="size-5.5 ml-[7.5px] mt-1.5" style={{ rotate: `${response?.wind?.deg}deg` }} src="/navigation.svg" alt="" />
            </div>
            <p className="font-light" >{point}</p>
          </div>
        </div>

        <div className="bg-[#1e213a] w-full md:w-[48%] h-46 text-white py-2">
          <h3 className="w-[90%] mx-auto text-center font-light text-lg tracking-tight">Humidity</h3>
          <div className="flex justify-center items-center mx-auto w-[90%] my-4 gap-2">
            <p className=" text-6xl font-semibold tracking-tight">{response?.main?.humidity}</p>
            <p className=" text-4xl font-light">%</p>
          </div>

          <div className="w-[70%] mx-auto flex flex-col justify-center gap-3.5 items-center">
            <div className="w-full h-1 flex justify-between tracking-tight text-xs font-bold text-gray-400">
              <p>0</p>
              <p>50</p>
              <p>100</p>
            </div>

            <div className="bg-white w-full h-2 rounded-3xl">
              <div className="bg-yellow-200 rounded-3xl h-full" style={{ width: `${response?.main?.humidity}%` }}>
              </div>
            </div>

            <div className="w-full h-1 flex justify-end  tracking-tight text-sm items-end mt-0.5 text-gray-400">
              <p>%</p>
            </div>

          </div>

        </div>

        <div className="bg-[#1e213a] w-full md:w-[48%] h-36 text-white py-3">
          <h3 className="w-[90%] mx-auto text-center font-light text-lg tracking-tight">Visibility</h3>
          <div className="flex justify-center items-center mx-auto w-[90%] mt-5 mb-4 gap-2">
            <p className=" text-6xl font-semibold tracking-tight">{km}</p>
            <p className=" text-4xl ">{distance}</p>
          </div>
        </div>

        <div className="bg-[#1e213a] w-full md:w-[48%] h-36 text-white py-3">
          <h3 className="w-[90%] mx-auto text-center font-light text-lg tracking-tight">Air Pressure</h3>
          <div className="flex justify-center items-center mx-auto w-[90%] mt-5 mb-4 gap-2">
            <p className=" text-6xl font-semibold tracking-tight">{response?.main?.pressure}</p>
            <p className=" text-4xl ">mb</p>
          </div>
        </div>
      </div>
      <div className='w-[85%] md:max-w-172 mx-auto text-gray-500 flex justify-center mb-6'>
        <p>Created by: <span className='font-bold'>Isaac Zanafria</span></p>
      </div>
    </section>
  )
}
