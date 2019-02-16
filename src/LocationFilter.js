import React, { Component } from 'react';
import './App.css';

class LocationFilter extends Component {
  state = {
    query: ''
  }

  // When the input text is changed, change the query state
  updateQuery = query => this.setState({
    query: query.trim()
  });

  render() {
    return (
      <div className="location-filter">
        <div id="location-input-description" hidden>
          Enter a location to filter the locations displayed on the map. Only locations that match the text entered will be displayed.
        </div>
        <label htmlFor="location-input">Filter locations</label>
        <input id="location-input" type="text" aria-describedby="location-input-description"
          value={this.state.query}
          onChange={ event => {
            this.updateQuery(event.target.value);
            this.props.getFilter(event.target.value.trim());
          }}
        />
      </div>
    );
  }
}

export default LocationFilter;
