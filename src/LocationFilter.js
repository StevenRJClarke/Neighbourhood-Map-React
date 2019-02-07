import React, { Component } from 'react';
import './App.css';

class LocationFilter extends Component {
  render() {
    return (
      <div className="location-filter">
        <input id="location-input" type="text" placeholder="Filter locations"/>
      </div>
    );
  }
}

export default LocationFilter;
