import React, { Component } from 'react';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = { colorFormat: 'hex' };
    }

    changeFormat = val => {
        this.setState({ colorFormat: val });
    }

    gatherShades(palette, colorToFilterBy){
        let shades = [];
        let allColors = palette.colors;

        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy )
            );
        }
        
        return shades.slice(1);
    }
    
    render() {
        const { paletteName, emoji } = this.props.palette;
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                key={color.id}
                name={color.name}
                background={color[this.state.colorFormat]}
                showLink={false}
            />
        ));
        return (
            <div className='Palette'>
                <Navbar
                    handleChange={this.changeFormat}
                    showSlider={false}
                />
                <div className="Palette-colors">{colorBoxes}</div>
                <PaletteFooter
                    paletteName={paletteName}
                    emoji={emoji}
                />
            </div>
        )
    }
}

export default SingleColorPalette;