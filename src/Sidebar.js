import React, { Component } from 'react';
import LocationFilter from './LocationFilter'
import './App.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <LocationFilter
          getFilter={this.props.getFilter}
        />
        <div id="locations-list-description" hidden>
          The locations display on the map are listed here. Cycle through them using the tab key and press enter to find out more information about that location
        </div>
        <ul className="locations-list" role="menu" aria-describedby="locations-list-description">
          {this.props.locations.map( location => (
            <li key={location.placeId} className="location-item" tabIndex="0"
              onClick={ event => this.props.handleClickOnSidebar(event.target.innerHTML) }
              onKeyPress={ event => (event.key === "Enter") && this.props.handleClickOnSidebar(event.target.innerHTML) }
            >{location.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
