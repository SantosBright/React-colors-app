import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Button } from '@material-ui/core';
import useStyles from './styles/PaletteFormNavStyles';
import PaletteMetaForm from './PaletteMetaForm';


function PaletteFormNav({ open, palettes, handleDrawerOpen, handleSubmit, handleDirection }) {
    const classes = useStyles();
    const [formShowing, setFormShowing] = React.useState(false);

    const showForm = () => {
        setFormShowing(true);
    }

    const hideForm = () => {
        setFormShowing(false);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                className={clsx(classes.appBar, {
                   [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        {!open && <AddToPhotosIcon />}
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to="/" onClick={handleDirection.bind(this, 'ltr')}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >
                            Go Back
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={showForm}
                        className={classes.button}
                    >
                        save
                    </Button>
                </div>
            </AppBar>
            {formShowing && 
                <PaletteMetaForm
                    palettes={palettes}
                    handleSubmit={handleSubmit}
                    hideForm={hideForm}
                />
            }
        </div>
    )
}

export default PaletteFormNav;
