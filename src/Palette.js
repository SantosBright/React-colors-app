import React, { Component } from 'react';
import Navbar from './Navbar';
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
        const { colors, paletteName, emoji } = this.props.palette;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                key={color.id}
                background={color[colorFormat]}
                name={color.name}
            />
        ));

        return (
            <div className="Palette">
                <Navbar
                    changeLevel={this.changeLevel}
                    level={this.state.level}
                    handleChange={this.changeFormat}
                />
                <div className="Palette-colors">{colorBoxes}</div>
                <footer className="Palette-footer">
                    { paletteName }
                    <span className="emoji">{emoji}</span>
                </footer>
            </div>
        );
    }
}

export default Palette;