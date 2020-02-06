import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends Component {
    render() {
        const colorBoxes = this.props.colors.map(color => (
            <ColorBox background={color.color} name={color.name} />
        ));

        return (
            <div className="Palette">
                <Navbar />
                <div className="Palette-colors">{colorBoxes}</div>
                {/* footer enventually*/}
            </div>
        );
    }
}

export default Palette;