import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';


const styles = {
    Palette: {
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
    },
    colors: {
        height: '90%'
    },
    goBack: {
        width: '20%',
        height: '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-5.8px',
        backgroundColor: 'black',
        '& a': {
        color: 'white',
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        cursor: 'pointer',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        textAlign: 'center',
        outline: 'none',
        border: 'none',
        background: 'rgba(255, 255, 255, .3)',
        fontSize: '1rem',
        lineHeight: '30px',
        textTransform: 'uppercase',
        transition: 'opacity .3s ease-out',
        textDecoration: 'none'
        }
    }
}

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
        const { paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                key={color.name}
                name={color.name}
                background={color[this.state.colorFormat]}
                showFullPalette={false}
            />
        ));
        return (
            <div className={classes.Palette}>
                <Navbar
                    handleChange={this.changeFormat}
                    showSlider={false}
                />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className="go-back-btn">Go Back</Link>
                    </div>
                </div>
                <PaletteFooter
                    paletteName={paletteName}
                    emoji={emoji}
                />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);