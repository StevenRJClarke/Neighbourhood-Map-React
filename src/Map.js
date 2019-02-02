import React, { Component } from 'react';
import './App.css';

class Map extends Component {
  state = {
    apiKey: process.env.REACT_APP_MAP_API_KEY
  }

  componentDidMount() {
    // After Google Maps API is fetched, uses initMap() callback.
    // The function it calls belongs to the window, need to give it to the window.
    // Pass the window the <Map/> initMap() function
    window.initMap = this.initMap;
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 51.407660, lng: -0.220460 },
      zoom: 12
    });
  }

  render() {
    return (
      <div id="map" className="Map">
      </div>
    );
  }
}

export default Map;
