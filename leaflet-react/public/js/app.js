
var React = require('react');
var ReactDOM = require('react-dom');

// STORE
//var createStore =  require('redux').createStore;
//var Provider    =  require('react-redux').Provider;

/*var connect   = require('react-redux').connect;

//combine reducer
var combineReducers = require('redux').combineReducers;
var count   = require('./count.reducer');
var value = require('./value.reducer');
var globalReducers = combineReducers({count, value});
const store = createStore(globalReducers, {count: 0, value:[] });*/


//import React, { Component }  from 'react'
var ItinibizLeaflet = require('./itinibizLeaflet');
var CelebtripLeaflet = require('./celebtripLeaflet');
var PragtikLeaflet = require('./pragtikLeaflet');
import { render } from 'react-dom';
import DivIcon from 'react-leaflet-div-icon';
import { Map, TileLayer, Marker, Popup, Circle, LayerGroup } from 'react-leaflet';
 


       // composant affichage par m autour de soi
class App extends React.Component {
  constructor() {
    super()


}

  
 
  render() {
      
        


    return (
     <div>
    <ItinibizLeaflet />
   <CelebtripLeaflet />
   <PragtikLeaflet />
     </div>
    );
  }
}
 
 
render(<App />, document.getElementById('container'))