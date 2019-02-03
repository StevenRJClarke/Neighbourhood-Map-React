import React, { Component } from 'react';
import './App.css';

class Map extends Component {
  state = {
    apiKey: process.env.REACT_APP_MAP_API_KEY,
    locations: [
      { title: 'Richmond Park' },
      { title: 'Hampton Court' },
      { title: 'Wimbledon Common' },
      { title: 'Chessington World of Adventures' },
      { title: 'Clapham Common' }
    ]
  }

  componentDidMount() {
    // After Google Maps API is fetched, uses initMap() callback.
    // The function it calls belongs to the window, need to give it to the window.
    // Pass the window the <Map/> initMap() function
    window.initMap = this.initMap;

    const API = this.state.apiKey;

    // Create the <script> that will call the Google Maps API and call initMap()
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=initMap`;
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
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
