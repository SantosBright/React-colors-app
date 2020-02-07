import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = { showing: false}
    }

    handleCopy = () => {
        this.setState({ showing: true }, () => {
            setTimeout(() => this.setState({ showing: false }), 1500);
        });
    }

    render() {
        const { background, name } = this.props;
        const { showing } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.handleCopy} >
                <div style={{background}} className="ColorBox">
                    <div
                        style={{background}}
                        className={`copy-overlay ${showing && 'show'}`}
                    />
                    <div className={`copy-msg ${showing && 'show'}`}>
                        <h1>copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span style={{fontSize: '10px'}} >{name}</span>
                        </div>
                        <p className="copy-button">Copy</p>
                    </div>
                    <Link to="/" onClick={e => e.stopPropagation()}>
                        <span className="see-more">More</span>
                    </Link>
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;