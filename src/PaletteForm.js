import React, { Component } from 'react';
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
import styles from './styles/PaletteFormStyles';
import { Button } from '@material-ui/core';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';


class PaletteForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: true,
      currentColor: "teal",
      newColorName: "",
      colors: []
    };
  }

  componentDidMount(){
    ValidatorForm.addValidationRule('isColorNameUnique', value => {
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false});
  };

  handleColorChange = newColor => {
    this.setState({ currentColor: newColor.hex });
  }

  addNewColor = () => {
    const { currentColor, newColorName, colors } = this.state;
    const newColor = {
      color: currentColor,
      name: newColorName
    }
    this.setState({ colors: [...colors, newColor] });
  }

  handleNewColorChange = e => {
    this.setState({ newColorName: e.target.value });
  }

  handleSubmit = () => {
    let newName = 'New Test Palette';
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  render(){
    const { classes } = this.props;
    const { open, currentColor, newColorName, colors } = this.state;
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
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Save Palette
            </Button>
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
              <IconButton onClick={this.handleDrawerClose}>
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
              onChangeComplete={this.handleColorChange}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={newColorName}
              onChange={this.handleNewColorChange}
              validators={['required', 'isColorNameUnique']}
              errorMessages={['this is field is required', 'Color name is taken.']}
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
                />
              ))}
          </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteForm);