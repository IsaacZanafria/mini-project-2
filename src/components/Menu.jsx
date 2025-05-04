import React, { useState } from 'react'
import useData from '../hooks/useData'

export default function Menu({ setMenu, setLat, setLon }) {
    const [input, setInput] = useState("")
    const [search, setSearch] = useState("")
    const { response } = useData(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=4&appid=b98439c211f04efd9eafc18e638774c5`)
    const [box, setBox] = useState(false)

    function onSubmit(e) {
        e.preventDefault()
        setSearch(input);
        setBox(true);
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit(e);
        }
    }
    
    return (
        <menu className="bg-[#1e213a] w-full h-full absolute z-20">
            <div className=" w-[80%] mx-auto h-14 flex justify-end items-end cursor-pointer">
                <img className="size-6.5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" src="/close.svg" alt="close" onClick={() => setMenu(false)} />
            </div>

            <form className=" h-12 w-[80%] md:w-[90%] lg:w-[80%] mx-auto flex items-end justify-between"onSubmit={onSubmit}>
                <div className="w-42 h-9 text-white flex items-center text-lg border-1 tracking-tight hover:bg-[#5f606666]  cursor-pointer">
                    <img className="size-6.5 w-[20%]" src="/search.svg" alt="" />
                    <input className="w-[80%] outline-0 border-none " type="text" placeholder="Search location"
                        value={input}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-[#3c47e9] text-white font-semibold w-18 h-9.5 flex justify-center items-center hover:bg-[#3c48e982]  hover:scale-105 cursor-pointer">Search
                </button>
            </form >

            {box &&
                <>
                    {
                        response?.map((card) => {

                            return (
                                <div className="w-full flex-col mt-8" key={card.lon}>
                                    <div className="w-[75%] py-3 mx-auto mb-4 flex items-center justify-between hover:border-1 hover:border-gray-500 px-3 cursor-pointer" onClick={() => {
                                        setLat(card.lat)
                                        setLon(card.lon)
                                        setInput("")
                                        setMenu(false)
                                    }}>
                                        <div className="flex items-center text-white text-xl gap-3">
                                            <p>{card.name}, {card.state}</p>
                                            <p>{card.country}</p>
                                        </div>
                                        <img className="size-5 ml-3" src="/arrow.svg" alt="" />
                                    </div>
                                </div>
                            )

                        })
                    }
                </>
            }

        </menu>
    )
}
