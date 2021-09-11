import * as modeChanger from "/Countries/darkMode.js"

const API_URL = "https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag;alpha3Code"

const countryTemplate = document.querySelector("[data-country-template]")
const countriesContainer = document.querySelector("[data-countries-container]")
const modeButton = document.querySelector(".mode")
const searchButton = document.querySelector(".search-btn")
const searchBar = document.querySelector("#search")
const regionFilter = document.querySelector("#regions-select")

const regionMap = new Map()

let allCountries
let selectedCountries

modeButton.addEventListener("click", modeChanger.changeMode)
modeButton.addEventListener("keyup", e => {
    if (e.keyCode === 13){
        modeChanger.changeMode()
    }
})

regionFilter.addEventListener("change", () => {
    selectedCountries = []
    displayCountries(allCountries, true)
    search()
})

searchButton.addEventListener("click", search)
searchBar.addEventListener("keyup", e => {
    if (e.keyCode === 13){
        search()
    }
})

regionMap.set("Europe", "Europe")
regionMap.set("America", "Americas")
regionMap.set("Asia", "Asia")
regionMap.set("Antarctica", "Polar")
regionMap.set("Africa", "Africa")
regionMap.set("Oceania", "Oceania")

loadCountries()

function loadCountries(){
    getCountries().then(countries => {
        allCountries = countries
        selectedCountries = countries
        displayCountries(allCountries)
    })
}

function getCountries(){
    return fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                return data
            })
}

function displayCountries(countries, regionChange){
    regionChange = regionChange || false
    countriesContainer.innerText = ""
    countries.forEach(country => {
        if (regionFilter.value === "" || country.region === regionMap.get(regionFilter.value)){
            if (regionChange){
                selectedCountries.push(country)
            }
            const countryContainer = countryTemplate.content.cloneNode(true)
            countryContainer.querySelector(".country-name").innerText = country.name
            const populationFormated = parseInt(country.population).toLocaleString("en")
            if (populationFormated === "0"){
                countryContainer.querySelector(".population").innerText = "Unknown"
            } else{
                countryContainer.querySelector(".population").innerText = populationFormated
            }
            if (country.region){
                countryContainer.querySelector(".region").innerText = country.region
            } else{
                countryContainer.querySelector(".region").innerText = "---"
            }
            if (country.capital){
                countryContainer.querySelector(".capital").innerText = country.capital
            } else{
                countryContainer.querySelector(".capital").innerText = "---"
            }
            const flag = countryContainer.querySelector("img")
            flag.src = country.flag
            countriesContainer.appendChild(countryContainer)
            countriesContainer.lastChild.previousSibling.addEventListener("click", () => {
                window.location = `./country.html?code=${country.alpha3Code}` 
            })
        }
    })
}

function search(){
    if (searchBar.value === ""){
        displayCountries(selectedCountries)
        return
    }
    const result = []
    selectedCountries.forEach(country => {
        const nameLowerCase = country.name.toLowerCase()
        const searchedLowerCase = searchBar.value.toLowerCase()
        if (nameLowerCase.includes(searchedLowerCase)){
            result.push(country)
        }
    })
    displayCountries(result)
}
