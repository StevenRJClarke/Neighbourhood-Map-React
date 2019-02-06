import React, { Component } from 'react';
import './App.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <ul className="locations-list">
          {this.props.locations.map( location => (
            <li key={location.placeId} className="location-item">{location.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
