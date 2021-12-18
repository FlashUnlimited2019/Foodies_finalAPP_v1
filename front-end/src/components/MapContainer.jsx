import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import { Icon } from '@iconify/react'
// import locationIcon from '@iconify/icons-mdi/map-marker'
// import './googlemap.css'

export class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            address: this.props.address,
            showingInfoWindow: false,
            activeMarker: {},          // Shows the marker upon click
            selectedPlace: {}
        }
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };


    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={{width: '100%', height: '100%'}}
                initialCenter={
                    {
                        lat: this.state.latitude,
                        lng: this.props.longitude
                    }
                }
                //onClick={}
                >
                <Marker
                    onClick={this.onMarkerClick}
                    name={this.state.address}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA07V2n5Xjulb892A93rI2f01XUQuDXVO0'
})(MapContainer);


