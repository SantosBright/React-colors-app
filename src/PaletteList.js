import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MinPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';


function PaletteList(props) {
    const { palettes, classes, deletePalette } = props;

    const goToPalette = id => {
        this.props.history.push(`/palette/${id}`);
    }

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
                            deletePalette={deletePalette}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(PaletteList);