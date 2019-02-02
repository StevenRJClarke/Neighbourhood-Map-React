import React, { Component } from 'react';
import './App.css';

class Map extends Component {
  state = {
    apiKey: process.env.REACT_APP_MAP_API_KEY
  }

  render() {
    return (
      <div id="map" className="Map">
      </div>
    );
  }
}

export default Map;
