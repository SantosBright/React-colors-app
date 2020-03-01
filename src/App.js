import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import PaletteForm from './PaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import './App.css';

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
            <Route
                render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition classNames="fade" timeout={500} key={location.key}>
                            <Switch location={location}>
                                <Route
                                    exact
                                    path='/'
                                    render={(routeProps) => (
                                        <div className="page">
                                            <PaletteList
                                                palettes={this.state.palettes}
                                                {...routeProps}
                                                deletePalette={this.deletePalette}
                                            />
                                        </div>
                                    )}
                                />
                                <Route
                                    exact
                                    path='/palette/new'
                                    render={routeProps =>
                                        <div className="page">
                                            <PaletteForm
                                                savePalette={this.savePalette}
                                                {...routeProps}
                                                palettes={this.state.palettes}
                                            />
                                        </div>
                                    }
                                />
                                <Route
                                    exact
                                    path='/palette/:id'
                                    render={routeProps => (
                                        <div className="page">
                                            <Palette
                                                palette={generatePalette(
                                                    this.findPalette(routeProps.match.params.id)
                                                )}
                                            />
                                        </div>
                                    )}
                                />
                                <Route
                                    exact
                                    path='/palette/:paletteId/:colorId'
                                    render={routeProps => (
                                        <div className="page">
                                            <SingleColorPalette
                                                colorId={routeProps.match.params.colorId}
                                                palette={generatePalette(
                                                    this.findPalette(routeProps.match.params.paletteId)
                                                )}
                                            />
                                        </div>
                                    )}
                                />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )}
            />
        );
    }
}


export default App;