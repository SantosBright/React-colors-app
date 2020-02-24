import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import arrayMove from 'array-move';
import PaletteFormNav from './PaletteFormNav';


export default function PaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [newColorName, setNewColorName] = React.useState("");
  const [newPaletteName, setNewPaletteName] = React.useState("");
  const [colors, setColors] = React.useState(props.palettes[0].colors);

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
  });

  const handleColorChange = newColor => {
    setCurrentColor(newColor.hex);
  }

  const addNewColor = () => {
    let newColor = {
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

  const handleSubmit = newPaletteName => {
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

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(colors => (arrayMove(colors, oldIndex, newIndex)));
  }

  const clearColors = () => {
    setColors([]);
  }

  const randomColor = () => {
    let allColors = props.palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    let randColor = allColors[rand];
    setColors([...colors, randColor]);
  }
    
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isPaletteFull = colors.length >= props.maxColors;
  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        classes={classes}
        palettes={props.palettes}
        newPaletteName={newPaletteName}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
        handlePaletteNameChange={handlePaletteNameChange}
      />
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
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
            >
                CLEAR PALETTE
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={randomColor}
              disabled={isPaletteFull}
            >
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
            style={{ backgroundColor: isPaletteFull ? 
              'grey' : currentColor
            }}
            type="submit"
            disabled={isPaletteFull}
          >
            {isPaletteFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
        </Drawer>
        <main
          className={clsx(classes.content, {
          [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            handleDeleteColor={handleDeleteColor}
            axis="xy"
            onSortEnd={onSortEnd}
          />
        </main>
    </div>
  );
}

PaletteForm.defaultProps = {
  maxColors: 20
}