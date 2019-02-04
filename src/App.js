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
        <Sidebar/>
        <Map
          location={this.state.locations}
        />
      </div>
    );
  }
}

export default App;
