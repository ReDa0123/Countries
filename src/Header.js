import React from 'react'
import { useMode, useModeUpdate } from './ModeContext'

export default function Header() {
    const darkMode = useMode()
    const changeMode = useModeUpdate()

    const whiteFilter = {
        filter: darkMode ? "invert(100%) sepia(0%) saturate(7500%) hue-rotate(340deg) brightness(116%) contrast(112%)" : "",
    }
    return (
        <header>
            <h1>Where in the world</h1>
            <div onClick={changeMode} className="mode" tabIndex="0">
                <div className="mode-image" style={whiteFilter}></div>
                <span data-mode-text>Dark Mode</span>
            </div>
        </header>
    )
}
