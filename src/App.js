import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import PaletteForm from './PaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import Page from './Page';

class App extends Component {
    constructor(props){
        super(props);
        const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
        this.state = {
            palettes: savedPalettes || seedColors,
            direction: ''
        };

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

    handleDirection = val => {
        this.setState({direction: val}, () => {
            setTimeout(() => this.setState({direction: ''}), 600);
        });
    }

    render() {
        const { direction } = this.state;
        return (
            <Route
                render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition classNames="page" timeout={100} key={location.key}>
                            <Switch location={location}>
                                <Route
                                    exact
                                    path='/'
                                    render={(routeProps) => (
                                        <Page direction={direction}>
                                            <PaletteList
                                                palettes={this.state.palettes}
                                                {...routeProps}
                                                deletePalette={this.deletePalette}
                                                handleDirection={this.handleDirection}
                                            />
                                        </Page>
                                    )}
                                />
                                <Route
                                    exact
                                    path='/palette/new'
                                    render={routeProps =>
                                        <Page direction={direction}>
                                            <PaletteForm
                                                savePalette={this.savePalette}
                                                {...routeProps}
                                                palettes={this.state.palettes}
                                                handleDirection={this.handleDirection}
                                            />
                                        </Page>
                                    }
                                />
                                <Route
                                    exact
                                    path='/palette/:id'
                                    render={routeProps => (
                                        <Page>
                                            <Palette
                                                palette={generatePalette(
                                                    this.findPalette(routeProps.match.params.id)
                                                )}
                                            />
                                        </Page>
                                    )}
                                />
                                <Route
                                    exact
                                    path='/palette/:paletteId/:colorId'
                                    render={routeProps => (
                                        <Page direction={direction}>
                                            <SingleColorPalette
                                                colorId={routeProps.match.params.colorId}
                                                palette={generatePalette(
                                                    this.findPalette(routeProps.match.params.paletteId)
                                                )}
                                            />
                                        </Page>
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