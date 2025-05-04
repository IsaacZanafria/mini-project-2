import { useState } from "react";
import InfoSection from "./components/InfoSection";
import MainInfo from "./components/MainInfo";
import Menu from "./components/Menu";



export default function App() {
  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
  const [value,setValue] = useState("")
  
  const [menu, setMenu] = useState(false)
  const [grades, setGrades] = useState("°C")
  const [wind, setWind] = useState("ms")
  const [distance, setDistance] = useState("km")


  return (

    <div className="min-h-screen w-screen flex flex-col md:flex-row bg-[#100e1d]">

      <section className="bg-[#1e213a] w-full md:w-[30%] md:min-h-screen  relative">
      {menu &&
        <>
       <Menu
        setMenu={setMenu}
        setLat={setLat}
        setLon={setLon} 
       />
        </>
      }

        <MainInfo 
          setMenu={setMenu}
          lat={lat}
          setLat={setLat}
          lon={lon}
          setLon={setLon}
          value={value}
          grades={grades}
        />

      </section>

      <InfoSection
        lat={lat}
        lon={lon}
        value={value}
        setValue={setValue}
        grades={grades}
        setGrades={setGrades}
        wind={wind}
        setWind={setWind}
        distance={distance}
        setDistance={setDistance}
      />
    </div>

  )
}


