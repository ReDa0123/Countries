const searchBar = document.querySelector("#search")
const modeButton = document.querySelector(".mode")
const modeImage = document.querySelector(".mode-image")
const searchButton = document.querySelector(".search-btn")

let darkMode = localStorage.getItem("darkmode")

export function changeMode(){
    if (searchBar){
        searchBar.classList.toggle("dark-search")
    }
    
    darkMode = !darkMode
    if (darkMode){
        modeButton.querySelector("[data-mode-text]").innerText = "Dark Mode"
        modeImage.style.filter = ""
        document.documentElement.style.setProperty("--bg", "var(--light-bg)")
        document.documentElement.style.setProperty("--text-color", "var(--light-text)")
        document.documentElement.style.setProperty("--element-bg", "var(--light-elements)")
        document.documentElement.style.setProperty("--input-color", "var(--light-input)")
        document.documentElement.style.setProperty("--shadow", "var(--light-shadow)")
        if (searchButton){
            searchButton.style.filter = "invert(52%) sepia(0%) saturate(5982%) hue-rotate(122deg) brightness(103%) contrast(99%)"
        }
        localStorage.setItem("darkmode", false)
        return
    }
    const whiteyfy = "invert(100%) sepia(0%) saturate(7500%) hue-rotate(340deg) brightness(116%) contrast(112%)"

    modeButton.querySelector("[data-mode-text]").innerText = "Light Mode"
    modeImage.style.filter = whiteyfy
    document.documentElement.style.setProperty("--bg", "var(--dark-bg)")
    document.documentElement.style.setProperty("--text-color", "var(--dark-text)")
    document.documentElement.style.setProperty("--element-bg", "var(--dark-elements)")
    document.documentElement.style.setProperty("--input-color", "var(--dark-text)")
    document.documentElement.style.setProperty("--shadow", "var(--dark-shadow)")
    if (searchButton){
        searchButton.style.filter = whiteyfy
    }
    localStorage.setItem("darkmode", true)
}