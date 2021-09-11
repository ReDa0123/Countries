import React from 'react'
import Country from './Country'

export default function Countries({ countries }) {
    return (
        <div className="countries-container">
            {countries.map(country => {
                return <Country country={country} key={country.alpha3Code}/>
            })}
        </div>
    )
}
