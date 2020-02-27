import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MinPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';


class PaletteList extends Component {
    goToPalette(id){
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const { palettes, classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                            <MinPalette
                               {...palette}
                               handleClick={() => this.goToPalette(palette.id)}
                               key={palette.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);