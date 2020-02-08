import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = { showing: false };
    }

    handleCopy = () => {
        this.setState({ showing: true }, () => {
            setTimeout(() => this.setState({ showing: false }), 1500);
        });
    }

    render() {
        const { background, name, paletteId, id, showLink } = this.props;
        const { showing } = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.7;
        return (
            <CopyToClipboard text={background} onCopy={this.handleCopy} >
                <div style={{background}} className="ColorBox">
                    <div
                        style={{background}}
                        className={`copy-overlay ${showing && 'show'}`}
                    />
                    <div className={`copy-msg ${showing && 'show'}`}>
                        <h1>copied!</h1>
                        <p className={isLightColor ? 'dark-text' : ''}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={isDarkColor ? 'light-text' : ''} style={{fontSize: '10px'}} >{name}</span>
                        </div>
                        <p className={`copy-button ${isLightColor && 'dark-text'}`}>Copy</p>
                    </div>{showLink && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={`see-more ${isLightColor && 'dark-text'}`}>More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;