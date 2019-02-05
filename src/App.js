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

  // Updates location state
  // @param {Object[]} locations - an array of objects containing place information (with locations)
  getLocations = locations => this.setState({
    locations: locations
  })

  render() {
    return (
      <div className="App">
        <Sidebar
          locations={this.state.locations}
        />
        <Map
          locations={this.state.locations}
          getLocations={this.getLocations}
        />
      </div>
    );
  }
}

export default App;
