import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';

class App extends Component {
    render() {
        return (
            <div className="Palette">
                {/* Navbar goes here */}
                <div className="Palette-colors">{/* a bunch of color boxes */}</div>
                <Palette {...seedColors[0]} />
            </div>
        );
    }
}

export default App;