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
        <div id="locations-item-description" hidden>
          This is one of the locations displayed on the map. Press enter to find out more about this location. Press tab to hear the next location.
        </div>
        <div id="last-locations-item-description" hidden>
          This is one of the locations displayed on the map. Press enter to find out more about this location.
        </div>
        <ul className="locations-list">
          {this.props.locations.map( (location, index) =>
            (
              index < this.props.locations.length - 1
            ) ? (
              <li key={location.placeId} className="location-item" tabIndex="0" aria-describedby="locations-item-description"
                onClick={ event => this.props.handleClickOnSidebar(event.target.innerHTML) }
                onKeyPress={ event => (event.key === "Enter") && this.props.handleClickOnSidebar(event.target.innerHTML) }
              >{location.name}</li>
            ) : (
              <li key={location.placeId} className="location-item" tabIndex="0" aria-describedby="last-locations-item-description"
                onClick={ event => this.props.handleClickOnSidebar(event.target.innerHTML) }
                onKeyPress={ event => (event.key === "Enter") && this.props.handleClickOnSidebar(event.target.innerHTML) }
              >{location.name}</li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
