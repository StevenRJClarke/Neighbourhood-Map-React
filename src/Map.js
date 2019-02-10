import React, { Component } from 'react';
import './App.css';

class Map extends Component {
  state = {
    apiKey: process.env.REACT_APP_MAP_API_KEY,
    markers: []
  }

  componentDidMount() {
    // After Google Maps API is fetched, uses initMap() callback.
    // The function it calls belongs to the window, need to give it to the window.
    // Pass the window the <Map/> initMap() function
    window.initMap = this.initMap;

    const API = this.state.apiKey;

    // Create the <script> that will call the Google Maps API and call initMap()
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 51.407660, lng: -0.220460 },
      zoom: 12
    });

    // Find places - find location of 5 default places
    this.findPlaces(map, this.props.locations);
  }

  componentDidUpdate() {
    this.filterMarkers()
  }

  // Returns LatLng location of places, given String of name
  // @param {Object} map - google.maps.Map
  // @param {Object[]} places - an array of objects containing place Strings
  findPlaces(map, locations) {
    let thisRef = this;

    // Create a PlacesService
    var service = new window.google.maps.places.PlacesService(map);

    // Create an array of location with more information from PlaceResult
    var newLocations = [];

    // Each element in our location array is being passed into an asynchroous
    // function, where it is updated. Each element must updated BEFORE sending
    // the updated array to the <App/>.

    // Use Promise.all(), which takes in an array of Promises
    let locationsPromise = Promise.all(

      // Promise.all() needs an array of Promises, use map() to return an array...

      locations.map( location => {
        // ... of Promises. Wrap in a Promise
        return new Promise(
          (resolve, reject) => {
            // Now we update each location using Google Maps Places API

            // findPlaceFromQuery() returns a PlaceResult from a text String
            service.findPlaceFromQuery(
              //  Pass a request
              {
                // Pass the location title as the query to search
                query: location.name,

                // Pass fields, indicating what information you want about the place.
                fields: ['geometry', 'formatted_address', 'name', 'place_id' ]
              },

              // Pass a callback function to get the PlaceResult and status of the search
              function(result, status) {
                // If the query has returned a result
                if (status === 'OK') {
                  // Return a place object with an address and LatLng location
                  let placeObject = {
                    name: result[0].name,
                    address: result[0].formatted_address,
                    location: result[0].geometry.location,
                    placeId: result[0].place_id
                  }

                  resolve(placeObject)
                }
                // If the query was unsuccessful, return the name only
                else {
                  reject()
                }
              }
            )
          }
        )
      })
    )
    // When all location elements have been updated, all the Promises have been passed
    // (in an array) to Promise.all()
    // Assuming all Promises resolve(), the value they return are the updated locations.
    // Use this in the then()
    .then( newLocations => {
      thisRef.props.getLocations(newLocations);
      thisRef.createMarkersForPlaces(map, newLocations);
    } )
  }

  // Returns a marker for each place with a location
  // @param {Object} map - google.maps.Map
  // @param {Object[]} places - an array of objects containing place information (with locations)
  createMarkersForPlaces(map, places) {
    let marker;

    places.forEach(
      place => {
        marker = new window.google.maps.Marker({
          animation: window.google.maps.Animation.DROP,
          map: map,
          position: place.location
        });
      }
    )

    let newMarkers = this.state.markers.concat(marker);

    this.setState({
      markers: newMarkers
    })
  }

  // Filters markers based on text input
  // @param {Object} map - google.maps.Map
  filterMarkers(map) {

  }

  render() {
    return (
      <div id="map" className="Map">
      </div>
    );
  }
}

export default Map;
