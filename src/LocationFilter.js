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
        <input id="location-input" type="text" placeholder="Filter locations"
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
