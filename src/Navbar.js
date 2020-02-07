import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = { colorFormat: 'hex' };
    }

    handleChange = e => {
        this.setState({ colorFormat: e.target.value });
        this.props.handleChange(e.target.value);
    }

    render() {
        const { level, changeLevel } = this.props;
        return (
            <header className="Navbar">
                <div className="logo">
                    <a href="/">reactcolorpicker</a>
                </div>
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel}
                        />
                    </div>
                </div>
                <div className="select-container">
                    <Select value={this.state.colorFormat} onChange={this.handleChange} >
                        <MenuItem value="hex">HEX - #45ed84</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,80,1)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(201,209,30,0.8)</MenuItem>
                    </Select>
                </div>
            </header>
        )
    }
}

export default Navbar;