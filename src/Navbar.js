import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = { colorFormat: 'hex', showing: false };
    }

    handleFormatChange = e => {
        this.setState({ colorFormat: e.target.value, showing: true });
        this.props.handleChange(e.target.value);
    }

    closeSnackbar = () => {
        this.setState({ showing: false });
    }

    render() {
        const { level, changeLevel, showSlider, classes } = this.props;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to="/">reactcolorpicker</Link>
                </div>
                {showSlider && (
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                    </div>
                )}
                <div className={classes.selectContainer}>
                    <Select value={this.state.colorFormat} onChange={this.handleFormatChange} >
                        <MenuItem value="hex">HEX - #45ed84</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,80,1)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(201,209,30,0.8)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    open={this.state.showing}
                    autoHideDuration={3000}
                    message={<span>Format Changed To {this.state.colorFormat.toUpperCase()} </span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={() => this.setState({ showing: false })}
                    action={[
                        <IconButton
                            onClick={this.closeSnackbar}
                            color="inherit"
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        )
    }
}

export default withStyles(styles)(Navbar);