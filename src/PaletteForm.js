import React from 'react';
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


export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [colors, setColors] = React.useState(["teal", "skyblue", "#a429f0", "#62c5ef"]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorChange = newColor => {
    setCurrentColor(newColor.hex);
  }

  const addColor = () => {
    setColors([...colors, currentColor]);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
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
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: currentColor }}
          onClick={addColor}
        >
            Add Color
        </Button>
        </Drawer>
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            {colors.map(color => (
              <DraggableColorBox color={color} />
            ))}
        </main>
    </div>
  );
}
