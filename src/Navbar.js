import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <header className="Navbar">
                <div className="logo">
                    <a href="/">reactcolorpicker</a>
                </div>
                <div className="slider">
                    <Slider />
                </div>
            </header>
        )
    }
}

export default Navbar;