import React, { Component } from 'react';
import './App.css';

class LocationFilter extends Component {
  state = {
    query: ''
  }

  render() {
    return (
      <div className="location-filter">
        <input id="location-input" type="text" placeholder="Filter locations"
          value={this.state.query}
        />
      </div>
    );
  }
}

export default LocationFilter;
