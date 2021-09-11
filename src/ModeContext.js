import React, { useContext, useState, useLayoutEffect } from 'react'

const ModeContext = React.createContext()
const ModeUpdateContext = React.createContext()

export function useMode(){
    return useContext(ModeContext)
}

export function useModeUpdate(){
    return useContext(ModeUpdateContext)
}


export function ModeProvider({ children }) {
    const DARKMODE = "darkMode"

    const darkModeCached = localStorage.getItem(DARKMODE) === "true"
    const [darkMode, setDarkMode] = useState(darkModeCached)

    useLayoutEffect(changeStyles, [darkMode])

    function changeMode(){
        setDarkMode(prev => !prev)
        localStorage.setItem(DARKMODE, !darkMode)
    }

    function changeStyles(){
        const bgColor = darkMode ? "var(--dark-bg)" : "var(--light-bg)"
        const textColor = darkMode ? "var(--dark-text)" : "var(--light-text)"
        const elementBg = darkMode ? "var(--dark-elements)" : "var(--light-elements)"
        const inputColor = darkMode ? "var(--dark-text)" : "var(--light-input)"
        const shadow = darkMode ? "var(--dark-shadow)" : "var(--light-shadow)"
        
        document.documentElement.style.setProperty("--bg", bgColor)
        document.documentElement.style.setProperty("--text-color", textColor)
        document.documentElement.style.setProperty("--element-bg", elementBg)
        document.documentElement.style.setProperty("--input-color", inputColor)
        document.documentElement.style.setProperty("--shadow", shadow)
    }

    return(
        <ModeContext.Provider value={darkMode}>
            <ModeUpdateContext.Provider value={changeMode}>
                {children}
            </ModeUpdateContext.Provider>
        </ModeContext.Provider>
    )

}
