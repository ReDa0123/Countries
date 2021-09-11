import * as modeChanger from "/Countries/darkMode.js"

const url = new URL(window.location.href)
const countryCode = url.searchParams.get("code")

const API_URL = `https://restcountries.eu/rest/v2/alpha/${countryCode}`

const modeButton = document.querySelector(".mode")
const backButton = document.querySelector(".back-btn")


modeButton.addEventListener("click", modeChanger.changeMode)
modeButton.addEventListener("keyup", e => {
    if (e.keyCode === 13){
        modeChanger.changeMode()
    }
})

backButton.addEventListener("click", () => {
    window.location = "./index.html"
})

loadCountry(API_URL)

function loadCountry(URL){
    getCountry(URL).then(country => {
        displayCountry(country)
    })
}

function getCountry(URL){
    return fetch(URL)
            .then(res => res.json())
            .then(data => {
                return data
            })
}

function displayCountry(country){

    document.querySelector(".country-name").innerText = country.name
    const populationFormated = parseInt(country.population).toLocaleString("en")
    if (populationFormated === "0"){
        document.querySelector(".population").innerText = "Unknown"
    } else{
        document.querySelector(".population").innerText = populationFormated
    }
    if (country.region){
        document.querySelector(".region").innerText = country.region
    } else{
        document.querySelector(".region").innerText = "---"
    }
    if (country.capital){
        document.querySelector(".capital").innerText = country.capital
    } else{
        document.querySelector(".capital").innerText = "---"
    }
    const flag = document.querySelector(".flag-big")
    flag.style.backgroundImage = `url('${country.flag}')`

    if (country.nativeName){
        document.querySelector(".native-name").innerText = country.nativeName
    } else{
        document.querySelector(".native-name").innerText = "---"
    }
    if (country.subregion){
        document.querySelector(".sub-region").innerText = country.subregion
    } else{
        document.querySelector(".sub-region").innerText = "---"
    }
    if (country.topLevelDomain){
        document.querySelector(".domain").innerText = country.topLevelDomain
    } else{
        document.querySelector(".domain").innerText = "---"
    }
    if (country.currencies){
        let currencies = ""
        country.currencies.forEach(currency => {
            currencies += `${currency.name}, `
        })
        currencies = currencies.slice(0, -2)
        document.querySelector(".currencies").innerText = currencies
    } else{
        document.querySelector(".currencies").innerText = "---"
    }

    if (country.languages){
        let languages = ""
        country.languages.forEach(language => {
            languages += `${language.name}, `
        })
        languages = languages.slice(0, -2)
        document.querySelector(".languages").innerText = languages
    } else{
        document.querySelector(".languages").innerText = "---"
    }

    if (country.borders){
        country.borders.forEach(border => {
            const borderButton = document.createElement("button")
            const apiSearchURL = `https://restcountries.eu/rest/v2/alpha/${border}`
            getCountry(apiSearchURL).then(data => {
                borderButton.innerText = data.name
                borderButton.classList.add("border-btn", "btn")
                document.querySelector(".borderes-btns").appendChild(borderButton)

                borderButton.addEventListener("click", () => {
                    window.location = `./country.html?code=${data.alpha3Code}` 
                })
            })
        })
    }
}
