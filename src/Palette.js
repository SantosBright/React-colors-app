import React, { Component } from 'react';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = { level : 500, colorFormat: 'hex' };
    }

    changeLevel = level =>{
        this.setState({ level });
    }

    changeFormat = val => {
        this.setState({ colorFormat: val });
    }

    render() {
        const { level, colorFormat } = this.state;
        const { colors, paletteName, emoji, id } = this.props.palette;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                key={color.id}
                background={color[colorFormat]}
                name={color.name}
                id={color.id}
                paletteId={id}
                showLink={true}
            />
        ));

        return (
            <div className="Palette">
                <Navbar
                    changeLevel={this.changeLevel}
                    level={this.state.level}
                    handleChange={this.changeFormat}
                    showSlider
                />
                <div className="Palette-colors">{colorBoxes}</div>
                <PaletteFooter
                    paletteName={paletteName}
                    emoji={emoji}
                />
            </div>
        );
    }
}

export default Palette;