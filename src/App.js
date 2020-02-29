import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import PaletteForm from './PaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
    constructor(props){
        super(props);
        const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
        this.state = { palettes: savedPalettes || seedColors};

    }
    findPalette = id => {
        return this.state.palettes.find(palette => (
            palette.id === id
        ));
    }

    syncLocalStorage = () => {
        window.localStorage.setItem(
            "palettes",
            JSON.stringify(this.state.palettes)
        );
    }

    savePalette = newPalette => {
        this.setState({ 
            palettes: [
                ...this.state.palettes, 
                newPalette
            ] 
        }, this.syncLocalStorage);
    }
    
    deletePalette = id => {
        let newPalette = this.state.palettes.filter(p => (
            p.id !== id
        ));

        this.setState(
            { palettes: newPalette }, 
            this.syncLocalStorage
        );
    }

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path='/'
                    render={(routeProps) => (
                        <PaletteList
                            palettes={this.state.palettes}
                            {...routeProps}
                            deletePalette={this.deletePalette}
                        />
                    )}
                />
                <Route
                    exact
                    path='/palette/new'
                    render={routeProps => 
                        <PaletteForm
                            savePalette={this.savePalette}
                            {...routeProps}
                            palettes={this.state.palettes}
                        />
                    }
                />
                <Route
                    exact
                    path='/palette/:id'
                    render={routeProps => (
                        <Palette
                           palette={generatePalette(
                               this.findPalette(routeProps.match.params.id)
                            )}
                        />
                    )}
                />
                <Route
                    exact
                    path='/palette/:paletteId/:colorId'
                    render={routeProps => (
                        <SingleColorPalette
                           colorId={routeProps.match.params.colorId}
                           palette={generatePalette(
                                this.findPalette(routeProps.match.params.paletteId)
                            )}
                        />
                    )}
                />
            </Switch>
        );
    }
}


export default App;