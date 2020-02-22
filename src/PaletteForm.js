import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import useStyles from './styles/PaletteFormStyles';
import { Button } from '@material-ui/core';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [newColorName, setNewColorName] = React.useState("");
  const [colors, setColors] = React.useState([]);
  const [newPaletteName, setNewPaletteName] = React.useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', value => (
      colors.every(({ name }) => (
        name.toLowerCase() !== value.toLowerCase()
      ))
    ));
    ValidatorForm.addValidationRule('isColorUnique', value => (
      colors.every(({ color }) => (
        color.toLowerCase() !== currentColor.toLowerCase()
      ))
    ));
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
      props.palettes.every(({ paletteName }) => (
        paletteName.toLowerCase() !== value.toLowerCase()
      ))
    ));
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorChange = newColor => {
    setCurrentColor(newColor.hex);
  }

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    }
    setColors([...colors, newColor]);
    setNewColorName("");
  }

  const handleNewColorChange = e => {
    setNewColorName(e.target.value);
  }

  const handlePaletteNameChange = e => {
    setNewPaletteName(e.target.value);
  }

  const handleSubmit = () => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors
    };
    props.savePalette(newPalette);
    props.history.push('/');
  }

  const handleDeleteColor = name => {
    let newColors = colors.filter(color => color.name !== name);
    setColors(newColors);
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
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
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
            <Button variant="contained" color="secondary">
                CLEAR PALETTE
            </Button>
            <Button variant="contained" color="primary">
                RANDOM COLOR
            </Button>
        </div>
        <ChromePicker
            color={currentColor}
            onChangeComplete={handleColorChange}
        />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={newColorName}
            onChange={handleNewColorChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'this is field is required',
              'Color name is already taken',
              'Color already used'
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: currentColor }}
            type="submit"
          >
            Add Color
          </Button>
        </ValidatorForm>
        </Drawer>
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            {colors.map(color => (
              <DraggableColorBox
                color={color.color}
                name={color.name}
                key={color.name}
                handleDeleteColor={handleDeleteColor.bind(this, color.name)}
              />
            ))}
        </main>
    </div>
  );
}