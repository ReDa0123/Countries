import React, { useState, useLayoutEffect } from 'react'
import "./country-style.css"
import { Link, useParams } from 'react-router-dom'
import BorderButtons from './BorderButtons.js'

export default function CountryDetailed() {
    const [borders, setBorders] = useState()
    const [country, setCountry] = useState()

    const {countryCode} = useParams()

    const API_URL = `https://restcountries.eu/rest/v2/alpha/${countryCode}`

    useLayoutEffect(() => {
        setCountry()
        setBorders()
        getCountry(API_URL).then((country) => {
            setCountry(country)
            getBorders(country).then(data => setBorders(data))
        })
    }, [countryCode]) // eslint-disable-line react-hooks/exhaustive-deps

    function getBorders(country){
        const arrOfPromises = country.borders.map(border => {
            return getCountry(`https://restcountries.eu/rest/v2/alpha/${border}`)
        })

        return Promise.all(arrOfPromises)
    }

    function getCountry(URL){
        return fetch(URL)
                .then(res => res.json())
                .then(data => {
                    return data
                })
    }

    function parseList(list){
        let result =""
        list.forEach((listItem) => {
            result += `${listItem.name}, `
        })
        result = result.slice(0, -2)
        return result
    }

    if (!country || !borders){
        return "Loading"
    }

    return (
        <section>
            <Link to="/">
                <div className="btn-container">
                    <div className="arrow"></div>
                    <button className="back-btn btn">
                        Back
                    </button>
                </div>
            </Link>
            <div className="main-container">
                <div className="flag-big" style={{backgroundImage: `url(${country.flag})`}}></div>
                <div className="info-container">
                    <div className="primary-info">
                        <h4 className="country-name">{country.name}</h4>
                        <div className="native-name before-text">{country.nativeName}</div>
                        <div className="population before-text">{parseInt(country.population).toLocaleString("en")}</div>
                        <div className="region before-text">{country.region}</div>
                        <div className="sub-region before-text">{country.subregion}</div>
                        <div className="capital before-text">{country.capital}</div>
                    </div>
                    <div className="secondary-info">
                        <div className="domain before-text">{country.topLevelDomain}</div>
                        <div className="currencies before-text">{parseList(country.currencies)}</div>
                        <div className="languages before-text">{parseList(country.languages)}</div>
                    </div>
                    <BorderButtons borders={borders} />
                </div>
            </div>
        </section>
    )
}
