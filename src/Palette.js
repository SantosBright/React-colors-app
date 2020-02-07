import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import './Palette.css';

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
                <Navbar
                    changeLevel={this.changeLevel}
                    level={this.state.level}
                />
                <div className="Palette-colors">{colorBoxes}</div>
                {/* footer enventually*/}
            </div>
        );
    }
}

export default Palette;