import React, {useRef, useLayoutEffect} from 'react'
import { useMode } from './ModeContext'

export default function SearchBar({ setSearch }) {

    const buttonRef = useRef()
    const inputRef = useRef()

    const darkMode = useMode()
    const darkSearch = "dark-search"

    const whiteFilter = {
        filter: darkMode ? "invert(100%) sepia(0%) saturate(7500%) hue-rotate(340deg) brightness(116%) contrast(112%)" : "",
    }

    useLayoutEffect(() => {
        inputRef.current.classList.toggle(darkSearch)
    }, [darkMode])

    return (
        <>
            <div style={whiteFilter} ref={buttonRef} className="search-btn" onClick={() => setSearch(inputRef.current.value.toLowerCase())}></div>
            <form onSubmit={(e) => {
                    e.preventDefault()
                    setSearch(inputRef.current.value.toLowerCase())
                }}>
                <input ref={inputRef} type="text" name="search" id="search" placeholder="Search for a country..."></input>
            </form>
        </>
    )
}
