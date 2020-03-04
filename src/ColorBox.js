import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import clsx from 'clsx';
import styles from './styles/ColorBoxStyles';


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
        const { background, name, paletteId, id, showFullPalette, classes } = this.props;
        const { showing } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.handleCopy} >
                <div style={{background}} className={classes.ColorBox}>
                    <div
                        style={{background}}
                        className={clsx(classes.copyOverlay, {
                            [classes.showOverlay]: showing
                        })}
                    />
                    <div className={clsx(classes.copyMsg, {
                            [classes.showMsg]: showing
                        })}
                    >
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className={classes.boxContent}>
                            <span className={classes.colorName} style={{fontSize: '10px'}} >{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showFullPalette && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);