import React, { Component } from 'react';
import Sidebar from './Sidebar'
import Map from './Map'
import './App.css';

class App extends Component {
  state = {
    locations: [
      { title: 'Richmond Park' },
      { title: 'Hampton Court' },
      { title: 'Wimbledon Common' },
      { title: 'Chessington World of Adventures' },
      { title: 'Clapham Common' }
    ]
  }

  render() {
    return (
      <div className="App">
        <Sidebar/>
        <Map/>
      </div>
    );
  }
}

export default App;
