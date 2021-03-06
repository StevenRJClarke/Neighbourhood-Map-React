# Neighbourhood Map (React)

## Table of Contents

* [About](#About)
* [Installation](#Installation-and-Getting-Started)

## About

A single-page web application built using the React framework. A Google Map is shown, with 5 locations displayed by markers. Clicking on a marker will show an infowindow, which will give more information about the location, as given by the [https://foursquare.com/](Foursquare) API.

The 5 locations are also listed in a sidebar. The information about the location can be found by clicking on that location in the list.

A textbox is provided to filter locations. Only those locations matching the text will show in the sidebar and map.

The application is usable by the keyboard and a screen reader.

## Installation and Getting Started

### Run in Development Mode

Clone the repository to a local project directory.

Run <code>npm install</code> to install dependencies

Run <code>npm start</code> from a terminal within the project directory.

The application will run in [http://localhost:3000](http://localhost:3000) in the browser.

### Run in Production Mode

Production mode allows service workers to be used.

Run:

<code>npm run build</code>

<code>serve -s build</code>

The application will run in [http://localhost:5000](http://localhost:5000) in the browser.
