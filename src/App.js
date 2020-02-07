import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
    render() {
        return (
            <Palette palette={generatePalette(seedColors[5])} />
        );
    }
}

export default App;