import React from 'react';
import ReactDom from 'react-dom';
import AppBar from 'material-ui/AppBar';
import SimpleMap from './Map.jsx';
import update from "react-addons-update";
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
	  this.state = {
	    markers: [{
	      position: {
	        lat: 24.806552699999997,
	        lng: -107.39375360000001,
	      },
	      key: "culiacan",
	      defaultAnimation: 2,
	    }],
      center :{
          lat: 24.806552699999997,
          lng: -107.39375360000001,
        },
	  };

	  this.handleMapClick = this.handleMapClick.bind(this);
	  this.handleMarkerRightclick = this.handleMarkerRightclick.bind(this);

	}


  componentDidMount() {
    setTimeout(() => {
      let { markers } = this.state;
      markers = update(markers, {
        $push: [
          {
            position: {
          lat: 25.0112183,
          lng: 121.52067570000001
            },
            defaultAnimation: 2,
            key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
          },
        ],
      });
      this.setState({ markers });
    }, 2000);
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    let { markers } = this.state;
    markers = update(markers, {
      $push: [
        {
          icon :"http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|FF0000|12|_|155",
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });
  }

  handleMarkerRightclick(index, event) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    let { markers } = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1],
      ],
    });
    this.setState({ markers });
  }

  handlePositionClick() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }


showPosition(position) {
    this.setState({
      center :{
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
    console.log(position);
}

	render () {
		return (
			<div>
	          <AppBar
	            title="Hugo Vision"
              iconElementLeft={<IconButton tooltip="Posicion Actual" onTouchTap={this.handlePositionClick.bind(this)}><NavigationClose /></IconButton>}
	          />
	          <SimpleMap  
	           markers={this.state.markers}
          	onMapClick={this.handleMapClick}
            center={this.state.center}
          	onMarkerRightclick={this.handleMarkerRightclick}
	          />
	          </div>
		);
	}
}