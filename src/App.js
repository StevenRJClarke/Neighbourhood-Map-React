import React, { Component } from 'react';
import Sidebar from './Sidebar'
import Map from './Map'
import './App.css';

class App extends Component {
  state = {
    locations: [
      { name: 'Richmond Park', placeId: '1' },
      { name: 'Hampton Court', placeId: '2' },
      { name: 'Wimbledon Common', placeId: '3' },
      { name: 'Chessington World of Adventures', placeId: '4' },
      { name: 'Clapham Common', placeId: '5' }
    ],
    filter: ''
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
