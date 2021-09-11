import React, {useRef } from 'react'
import SearchBar from './SearchBar'


export default function CountryFilter({ setRegion, setSearch }) {
    const selectRef = useRef()


    function getRegion(){
        const selected = selectRef.current.value

        switch(selected){
            case "Europe": {
                return "Europe"
            }
            case "America": {
                return "Americas"
            }
            case "Asia": {
                return "Asia"
            }
            case "Antarctica": {
                return "Polar"
            }
            case "Africa": {
                return "Africa"
            }
            case "Oceania": {
                return "Oceania"
            }
            default:{
                return "all"
            }
        }

    }

    return (
        <>
            <div className="search-container">
                <SearchBar setSearch={setSearch} />
            </div>
            <select ref={selectRef} onChange={() => setRegion(getRegion())} name="regions-select" id="regions-select">
                <option value defaultValue disabled>Filter by Region</option>
                <option value>All</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctica">Antarctica</option>
            </select>
        </>
    )
}
