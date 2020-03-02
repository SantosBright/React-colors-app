import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from './styles/PaletteFormStyles';
import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';


export default function PaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentColor] = React.useState("teal");
  const [newColorName, setNewColorName] = React.useState("");
  const [colors, setColors] = React.useState(props.palettes[0].colors);

  const addNewColor = newColor => {
    setColors([...colors, newColor]);
  }
  
  const handleSubmit = newPalette => {
    newPalette.colors = colors;
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
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
        palettes={props.palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
        handleDirection={props.handleDirection}
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
        <div className={classes.container}>
          <Typography
            variant="h5"
            gutterBottom
          >
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={classes.btn}
            >
              CLEAR PALETTE
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={randomColor}
              disabled={isPaletteFull}
              className={classes.btn}
            >
              RANDOM COLOR
            </Button>
          </div>
          <ColorPickerForm 
            isPaletteFull={isPaletteFull}
            addNewColor={addNewColor}
            currentColor={currentColor}
            newColorName={newColorName}
            setNewColorName={setNewColorName}
            colors={colors}
          />
        </div>
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
            distance={10}
          />
        </main>
    </div>
  );
}

PaletteForm.defaultProps = {
  maxColors: 20
}