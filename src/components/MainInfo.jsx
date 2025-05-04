import React from 'react'
import useData from '../hooks/useData'

export default function MainInfo({setMenu, lat, setLat, lon, setLon, value, grades}) {
  const {response} = useData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat || "-0.2299"}&lon=${lon || "-78.5249"}&appid=b98439c211f04efd9eafc18e638774c5&units=${value || "metric"}
`)

function geoFindMe() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser")
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLat(latitude)
    setLon(longitude)
  }

  function error() {
    alert("Unable to retrieve your location")
  }
}

const today = new Date()
const options = {
    weekday:"short",
    month: "long",
    day: "numeric",
};
let last = today.toLocaleDateString('en-US', options)
console.log(last)
  
  return (
    <>
      {/*Boton search*/}
      <div className=" h-16 md:h-21 flex items-end justify-around">
          <button className="bg-[#6E707A]  w-42 h-9 text-white text-lg tracking-tight hover:bg-[#5f6066] cursor-pointer" onClick={()=>setMenu(true)}>Search for Places</button>
          <div className="bg-[#585a60] rounded-full w-10 h-10 flex justify-center items-center hover:bg-[#4a4c4f]  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={geoFindMe}>
            <img className="size-7" src="/location.svg" alt="location_svg" />
          </div>
        </div >

        {/*imagen clima*/}
        <div className=" h-[30%] w-full relative flex justify-center items-center mt-2">
          <img src="img/cloud-background.png" className="opacity-20 w-full h-full object-cover" alt="cloud_png" />

          <div className="absolute w-[30%] md:w-[50%] lg:w-[30%] h-[50%]">
            <img className="" src={`img/${response?.weather?.[0]?.icon}.png`} alt="" />
          </div>
        </div>

        {/*grados*/}
        <div className="w-full h-50 flex items-center justify-center">
          <h2 className="font-semibold text-9xl tracking-tight text-white ">{parseInt(response?.main?.temp)}</h2>
          <h2 className="text-7xl text-gray-400 tracking-tight ">{grades}</h2>
        </div>

        {/*TEXTO*/}
        <div className="flex flex-col items-center text-gray-400 gap-5 ">

          <h3 className="font-semibold text-3xl text-gray-400 tracking-tight my-4 capitalize">{response?.weather?.[0]?.description}</h3>

          <p className="text-sm tracking-tight">Today .  <span>{last}</span> </p>

          <div className="flex justify-around mb-5">
            <img className="size-5" src="/location_on.svg" alt="location_svg" />
            <p className="text-sm tracking-tight capitalize">{response?.name}</p>
          </div>
        </div>
    </>
  )
}

