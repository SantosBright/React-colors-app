import React from 'react';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import MinPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';


function PaletteList(props) {
    const { palettes, classes, deletePalette } = props;

    const goToPalette = id => {
        props.history.push(`/palette/${id}`);
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>React Colors</h1>
                    <Link to="/palette/new">Create Palette</Link>
                </nav>
                <TransitionGroup className={classes.palettes}>
                    {palettes.map(palette => (
                        <CSSTransition
                            key={palette.id}
                            classNames="fade"
                            timeout={500}
                        >
                            <MinPalette
                                {...palette}
                                handleClick={() => goToPalette(palette.id)}
                                key={palette.id}
                                deletePalette={deletePalette}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>
    );
}

export default withStyles(styles)(PaletteList);