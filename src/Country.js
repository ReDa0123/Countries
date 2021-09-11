import React from 'react'
import { Link } from 'react-router-dom'

export default function Country({ country }) {
    return (
        <Link className="remove-a-lnik-styles" to={`/${country.alpha3Code}`}>
            <div className="country-container">
                <img src={country.flag} alt="Flag" className="flag"></img>
                <h4 className="country-name before-text">{country.name}</h4>
                <div className ="population before-text">
                    {parseInt(country.population).toLocaleString("en")}
                </div>
                <div className ="region before-text">{country.region}</div>
                <div className ="capital before-text">{country.capital}</div>
            </div>
        </Link>
    )
}
