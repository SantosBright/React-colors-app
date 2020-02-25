import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import useStyles from './styles/PaletteFormNavStyles';


function PaletteFormNav({ newPaletteName, open, palettes, handleDrawerOpen, handleSubmit, handlePaletteNameChange }) {
    const classes = useStyles();

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
            palettes.every(({ paletteName }) => (
                paletteName.toLowerCase() !== value.toLowerCase()
            ))
        ));
    });

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
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                      Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <ValidatorForm onSubmit={handleSubmit.bind(this, newPaletteName)}>
                        <TextValidator
                            onChange={handlePaletteNameChange}
                            label="Palette Name"
                            value={newPaletteName}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={[
                            'Palette name is required',
                            'Palette name already taken'
                            ]}
                        />
                        <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        >
                        Save Palette
                        </Button>
                    </ValidatorForm>
                    <Link to="/">
                        <Button variant="contained" color="secondary">
                            Go Back
                        </Button>
                    </Link>
                </div>
            </AppBar>
        </div>
    )
}

export default PaletteFormNav;
