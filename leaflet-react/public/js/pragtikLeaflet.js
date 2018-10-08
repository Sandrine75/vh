var React = require('react');
var ReactDOM = require('react-dom');

import { render } from 'react-dom';
import DivIcon from 'react-leaflet-div-icon';
import { Map, TileLayer, Marker, Popup, Circle, LayerGroup } from 'react-leaflet';




      // composant affichage par m autour de soi
class PragtikLeaflet extends React.Component {
  constructor() {
    super()

   this.state = {
       lat: '',
       lng: '',
       zoom: 13, 
       marker:[],
       // valeur par defaut pour exploitation des pushs et notifications
       desc: []    
          }
   

          // lieux 
      this.marker = [
  {name: 'paris', lat: 48.866667, lng: 2.333333, info: "c'est paris", close: false, distance: ''},
  {name: 'tourEiffel', lat: 48.858069, lng: 2.294385, info: 'la tour eiffel', close: false, distance: ''},
  {name: 'beaubourg', lat: 48.860649, lng: 2.35219, info: 'voila beaubourg', close: false, distance: ''},
  {name: 'wereso', lat: 48.864792, lng: 2.350152, info: 'wereso bureaux', close: false, distance: ''}
   ];

        // distance reglable de recherche
    this.detect = 500;
    this.paris = [48.866667, 2.333333];
    this.data = [];
    }
  

    // calcul des distances par rapports aux lat lng
   parseMarker() {
    for (var j = 0; j< this.state.marker.length; j++){
      var lat1 = this.state.lat;
      var lon1 = this.state.lng;
      var lat2 = this.state.marker[j].lat;
      var lon2 = this.state.marker[j].lng;
       // distance entre ma position actuelle et les markers
      this.state.marker[j].distance = this.distance(lat1, lon1, lat2, lon2, "K")*1000;
      //console.log(this.marker[j].distance);
      if(this.state.marker[j].distance <= this.detect) {
        this.state.marker[j].close = true;
        
       // ajout des data a exploiter selon la methode choisie

       // this.setState({desc: this.marker[j].info});
        if (this.state.desc.indexOf(this.state.marker[j].overview) === -1) {
        this.data.push(this.state.marker[j].overview);
        //console.log('data'+this.state.data);
        //this.setState({data: this.state.marker[j].overview});
        this.setState({desc: this.data});
        //console.log('desc'+this.desc);
        } 
      } else {
        this.state.marker[j].close = false;
      }
    }
  }
        // function de calcul des distances
  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  
  }
   

              // monitoring de la position
   componentDidMount() {
     var appObj = this;
    var options = {enableHighAccuracy: true,timeout: 3000,maximumAge: 0,desiredAccuracy: 0, frequency: 1 };
     //console.log("call componentDidMount");
   fetch('https://mighty-brushlands-14103.herokuapp.com/getAllData', {
    method: 'post'
}).then(function(response) {
    // return response.text();
     return response.json();
    
}).then(function(obj) {
  //console.log('obj'+obj);
  
  
    navigator.geolocation.watchPosition(function(Position) {
         
      let lat = Position.coords.latitude;
      let lng = Position.coords.longitude;        
      // console.log('lat: '+lat+'lon: '+lng);
     //console.log(appObj);
      appObj.setState({lat: lat, lng: lng, zoom: 13,  marker: obj});   
      appObj.parseMarker();
         
    }, appObj.options
      ); 
       });
      
        }
 
  
 
  render() {
      
        
        

 /*     <DivIcon position={myPosition} >
          <svg className="leaflet-div-icon" viewBox="100 100 100 10O"version="1.1">
            <circle cx="100" cy="100" r="100"/>
          </svg>
        </DivIcon> 

           <LayerGroup>
              <Circle center={myPosition} fillColor="black" radius={150} />
              <Circle
                center={myPosition}
                fillColor="black"
                radius={150}
                stroke={false}
                fillOpacity = {0.2}
              />
              <Circle
                center={myPosition}
                fillColor="black"
                radius={10}
                stroke={true}
              />
            </LayerGroup>

*/
      var userIcon = L.icon({
        iconUrl: '../image/806 (4).gif',
        iconSize: [20, 20],      
      })

    // position actuelle et rendu
  
    var myPosition = [this.state.lat, this.state.lng];
       var markerDisplay = [];
           var descDisplay = [];
  
    for (var i = 0; i < this.state.desc.length; i++) {
         descDisplay.push(<p>{this.state.desc[i]}</p>)
    }
    
  for (var i = 0; i<this.state.marker.length; i++){
      if (this.state.marker[i].distance < 600) {
      markerDisplay.push(
        
        <Marker position={[this.state.marker[i].lat, this.marker[i].lng]} key={i}  >
          <Popup>
          <span><br/>{this.state.marker[i].name}. A {Math.round(this.state.marker[i].distance) > 1000 ? Math.round(this.state.marker[i].distance)/1000+'km' : Math.round(this.state.marker[i].distance)+'m' } de vous</span>
          </Popup>
        </Marker>     
      )  
   }
}


    return (
        <div>
        
       <div>
      <h1>Pragtik</h1>
      
   <Map center = {this.paris}  zoom = {this.state.zoom}>
     <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

        

          <Marker position={myPosition} icon={userIcon} zIndexOffset={1000}>
          <Popup>
            <span>ma position <br/> Easily customizable.</span>
          </Popup>
        </Marker> 
      {markerDisplay}
            
        
   </Map>

  
   
   {descDisplay}
   
  </div>
     
      </div>
    );
  }
}

module.exports = PragtikLeaflet;