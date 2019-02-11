import React, { Component } from 'react';
import Sidebar from './Sidebar'
import Map from './Map'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
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
    filter: '',
    locationClicked: ''
  }

  // Updates location state
  // @param {Object[]} locations - an array of objects containing place information (with locations)
  getLocations = locations => this.setState({
    locations: locations
  })

  // Updates filter state
  // @param {String} query - a query string to filter locations
  getFilter = query => this.setState({
    filter: query
  })

  // Handles clicks on locations in the sidebar
  // @param {String} location - the location that has been clicked
  handleClickOnSidebar = location => this.setState({
    locationClicked: location
  })

  render() {
    // Filter locations based on the text input
    // Create a regular expression matcher to filter locations
    let showingLocations;

    if (this.state.filter) {
      let match = new RegExp(escapeRegExp(this.state.filter), 'i');
      showingLocations = this.state.locations.filter( location => match.test(location.name) );
    } else {
      showingLocations = this.state.locations;
    }

    showingLocations.sort(sortBy('name'));

    return (
      <div className="App">
        <Sidebar
          locations={showingLocations}
          getFilter={this.getFilter}
          handleClickOnSidebar={this.handleClickOnSidebar}
        />
        <Map
          locations={showingLocations}
          getLocations={this.getLocations}
          locationClicked={this.state.locationClicked}
        />
      </div>
    );
  }
}

export default App;
