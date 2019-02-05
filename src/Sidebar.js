import React, { Component } from 'react';
import './App.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <ul>
          {this.props.locations.map( location => (
            <li key={location.placeId}>{location.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
