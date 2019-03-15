import React, { Component } from 'react';
import './App.css';

import Player from './Player/Player';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="box">
          <Player />
        </div>
      </div>
    );
  }
}

export default App;
