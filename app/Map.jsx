import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import React from 'react';
import ReactDom from 'react-dom';

export default function SimpleMap (props) {
  return (
    <section style={{height: "500px",
              width:"500px",margin: "20px"}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={10}
            center={props.center}
            defaultCenter={props.center}
            onClick={props.onMapClick}
          >
            {props.markers.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                  onRightclick={() => props.onMarkerRightclick(index)} />
              );
            })}
          </GoogleMap>
        }
      />
    </section>
  );
}