import React from 'react'
import useData from '../hooks/useData'

export default function WindFiveDays({lat, lon, value, grades}) {
  const { response } = useData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat || "-0.2299"}&lon=${lon || "-78.5249"}&appid=b98439c211f04efd9eafc18e638774c5&units=${value || "metric"}`)
  function getForecast(response) {
    const today = new Date()
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let last = today.toLocaleDateString('en-GB', options);
    let filtered = response?.list?.filter(item => {
      const date = new Date(item.dt * 1000)
      const formatted = date.toLocaleDateString('en-GB', options);
      if (formatted != last) {
        last = formatted;
        return true
      }
      return false
    })
    return filtered || []
  }
  console.log(getForecast(response))

  return (
    <div className="w-[83%] md:w-[90%] mx-auto flex flex-wrap  gap-4 mt-6 justify-center">
      {
        getForecast(response).map((item) => {
          const options = {
            weekday: "short",
            month: "long",
            day: "numeric",
          }
          let last = new Date(item?.dt_txt).toLocaleDateString('en-US', options)

          return (
            <div className="bg-[#1e213a] w-31 h-40 py-3" key={item?.dt}>
              <h2 className="text-white font-semibold w-[90%] mx-auto text-center tracking-tight">{last}</h2>
              <img className="size-19 ml-5" src={`img/${item?.weather?.[0]?.icon}.png`} alt="img" />
              <div className="w-[90%] flex justify-center gap-2 mx-auto mt-[7px]">
                <p className="text-white font-semibold tracking-tight">{parseInt(item?.main?.temp_min)}{grades}</p>
                <p className="text-gray-500 font-semibold tracking-tight">{parseInt(item?.main?.temp_max)}{grades}</p>
              </div>
            </div>
          )
        })
      }

    </div>

  )
}
