import React, { useState, useEffect, useRef } from "react"
import Countries from "./Countries"
import CountryFilter from "./CountryFilter"
import Header from "./Header"
import "./style.css"
import { ModeProvider } from "./ModeContext"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CountryDetailed from "./CuntryDetailed"


function App() {
  const API_URL = "https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag;alpha3Code"

  const [countries, setCountries] = useState([])
  const [region, setRegion] = useState("all")
  const [search, setSearch] = useState("")

  let allCountries = useRef([])

  useEffect(loadCountries, [])
  useEffect(getFilteredCountries, [region, search]) // eslint-disable-line react-hooks/exhaustive-deps


  function loadCountries(){
    getCountries().then(countries => {
      setCountries(countries)
      allCountries.current = countries
    })
  }

  function getCountries(){
    return fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                return data
            })
  }

  function getFilteredCountries(){
    let filteredCountries
    if (region === "all"){
      filteredCountries = allCountries.current
    }
    else{ 
      filteredCountries = allCountries.current.filter(country => {
        return country.region === region
    })}
    filteredCountries =  getSearchedCountries(filteredCountries)
    setCountries(filteredCountries)
  }

  function getSearchedCountries(filtered){
    if (search === ""){
      return filtered
    }
    return filtered.filter(country => {
      const nameLowerCase = country.name.toLowerCase()
      return nameLowerCase.includes(search)
    })
  }


  return (
    <Router>
      <ModeProvider>
        <Header />
        <Route exact path="/">
        <section>
          <CountryFilter setRegion={setRegion} setSearch={setSearch}/>
            <Countries countries={countries}/>
          </section>
        </Route>
        <Route path="/:countryCode" children={<CountryDetailed />}></Route>
      </ModeProvider>
    </Router>
  );
}

export default App;
