import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
class Palette extends Component {
    constructor(props){
        super(props);
        this.state = { level : 500 };
    }

    changeLevel = level =>{
        this.setState({ level });
    }

    render() {
        const colorBoxes = this.props.palette.colors[this.state.level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ));

        return (
            <div className="Palette">
                {/* <Navbar
                    changeLevel={this.changeLevel}
                    level={this.state.level}
                /> */}
                <div className="slider">
                    <Slider
                        defaultValue={this.state.level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={this.changeLevel}
                    />
                </div>
                <div className="Palette-colors">{colorBoxes}</div>
                {/* footer enventually*/}
            </div>
        );
    }
}

export default Palette;