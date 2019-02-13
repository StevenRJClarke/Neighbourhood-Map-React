import React, { Component } from 'react';
import './App.css';

class Map extends Component {
  state = {
    apiKey: process.env.REACT_APP_MAP_API_KEY,
    map: '',
    markers: [],
    infoWindows: []
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

    this.setState({
      map: map
    });

    // Find places - find location of 5 default places
    this.findPlaces(map, this.props.locations);
  }

  componentDidUpdate() {
    // See if filtered locations has changed. Only show those markers that have
    // been filtered
    this.filterMarkers()

    // If a location is clicked on the sidebar, animate the marker and show
    // its infowindow
    if (this.props.locationClicked) {
      this.showLocation(this.props.locationClicked);
    }
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
      // Update the locations with more information
      thisRef.props.getLocations(newLocations);

      // Create a marker for each location
      thisRef.createMarkersForPlaces(map, newLocations);

      // Create infowindows for markers
      thisRef.createInfoWindows(map);
    } )
  }

  // Returns a marker for each place with a location
  // @param {Object} map - google.maps.Map
  // @param {Object[]} places - an array of objects containing place information (with locations)
  createMarkersForPlaces(map, places) {
    let marker,
        markers = [];

    places.forEach(
      place => {
        marker = new window.google.maps.Marker({
          animation: window.google.maps.Animation.DROP,
          map: map,
          position: place.location,
          title: place.name
        });

        markers.push(marker);
      }
    )

    this.setState({
      markers: markers
    })
  }

  // Add infowindows to markers
  // @param {Object} map - google.maps.Map
  createInfoWindows(map) {
    let infoWindow,
        infoWindows = [],
        thisRef = this;

    this.state.markers.forEach(
      marker => {

        // Fetch the Fourquare API to get more information about the location
        // to put in the infowindow
        thisRef.getFoursquareInfo(marker);

        // Create the content to displayed in each infowindow
        let infoWindow = new window.google.maps.InfoWindow({
          content: `<h3>${marker.title}</h3>`
        });

        // Add infowindow to an array
        infoWindows.push(infoWindow);

        // Add a listener so that the infowindow is displayed when a marker is
        // clicked
        marker.addListener('click', function() {
          // Only open the infowindow if it is not already opened
          if (infoWindow.marker !== marker) {
            // Cause the marker to bounce for 2.5 seconds when clicked
            thisRef.animateMarker(marker);

            infoWindow.marker = marker;
            infoWindow.open(map, marker);

            // Close the infowindow if the infowindow is clicked
            infoWindow.addListener('closeclick', function() {
              infoWindow.marker = null;
            })
          }
        });
      }
    )

    this.setState({
      infoWindows: infoWindows
    })
  }

  // Animate marker
  // @param {Object} marker - google.maps.Marker
  animateMarker(marker) {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    window.setTimeout(
      function() {
        marker.setAnimation(null)
      }, 2500
    )
  }

  // Filters markers based on text input
  filterMarkers() {
    // Find names of filtered locations
    let locationNames = this.props.locations.map( location => location.name );

    // Loop through markers array in state
    this.state.markers.forEach(
      marker => {
        // If the marker title (given by location name) is in the array
        // of filtered location names, display it
        if (locationNames.includes(marker.title))
          marker.setMap(this.state.map);

        // If the marker title is NOT in the array of filtered location
        // names, display it
        else
          marker.setMap(null);
      }
    );
  }

  // Animates marker at a location and displays its infowindow when that location
  // is clicked in the sidebar
  // @param {String} location - name of location
  showLocation = location => {
    // Find the marker at this location
    let selectedMarker = this.state.markers.find(
      marker => marker.title === location
    );

    // Find the infowindow at this location
    let selectedInfoWindow = this.state.infoWindows.find(
      infoWindow => infoWindow.content.includes(location)
    );

    this.animateMarker(selectedMarker);

    // Close all currently open infowindows.
    // Find all other infowindows (that haven't been selected)...
    this.state.infoWindows.filter(
      infowindow => infowindow !== selectedInfoWindow
    )
    // ...Loop over them...
    .forEach(
      // ... and close them
      infowindow => infowindow.close()
    )

    selectedInfoWindow.open(this.state.map, selectedMarker);
  }

  // Fetches Foursquare Places API and returns a Response object.
  // Get more detailed information about the location to show on the infowindow
  // @param {Object} marker - google.maps.Marker
  getFoursquareInfo(marker) {
    fetch()
    .then()
    .catch();
  }

  render() {
    return (
      <div id="map" className="Map">
      </div>
    );
  }
}

export default Map;
