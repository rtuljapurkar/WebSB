import React, {PropTypes} from 'react';
import {withGoogleMap, GoogleMap} from 'react-google-maps';


export const DisplayMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.location}
  />
));
