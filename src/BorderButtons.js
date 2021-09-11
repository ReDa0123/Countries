import React from 'react'
import { Link } from 'react-router-dom'

export default function BorderButtons({ borders }) {

    return (
        <div className="border-countries">
            <span className="borderes">Border Countries:</span>
            <div className="borderes-btns">
                {
                    borders.map((border) => {
                        return <Link to={`/${border.alpha3Code}`} key={border.alpha3Code}>
                            <button className="border-btn btn">
                                {border.name}
                            </button>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}
