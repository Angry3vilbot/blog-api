import React, { SyntheticEvent, useRef } from 'react'
import logoIcon from '../assets/logoicon.svg'
import logoIconHover from '../assets/logoicon-hover.svg'
import { Link } from "react-router-dom"
import '../styles/Navbar.css'

function Navbar() {
    const logoImage = useRef<HTMLImageElement>(null!)

    function changeImage(ev: SyntheticEvent) {
        if(ev.type === 'mouseenter') {
            return logoImage.current.src = logoIconHover
        }
        return logoImage.current.src = logoIcon
    } 
    return (
        <nav>
            <div>
                <Link to='/' onMouseEnter={changeImage} onMouseLeave={changeImage}>
                    <img ref={logoImage} src={logoIcon} alt="logo" />
                    <h1>Angry3vilbot</h1>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar