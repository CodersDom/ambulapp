import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity, TextInput } from "react-native";
import { Container, Text } from "native-base";

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import { black } from "ansi-colors";


class LocationA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      concat: null,
      coords:[],
      x: 'false',
      cordLatitude:23.04,
      cordLongitude:88.36,
    };

    this.mergeLot = this.mergeLot.bind(this);

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );

   }

  mergeLot(){
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.getDirections(concatLot, "-6.270565,106.759550");
       });
     }

   }

   async getDirections(startLoc, destinationLoc) {

         try {
             let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
             let respJson = await resp.json();
             let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
             let coords = points.map((point, index) => {
                 return  {
                     latitude : point[0],
                     longitude : point[1]
                 }
             })
             this.setState({coords: coords})
             this.setState({x: "true"})
             return coords
         } catch(error) {
           console.log('masuk fungsi')
             this.setState({x: "error"})
             return error
         }
     }


  render() {

    return (
      <View style={styles.overallViewContainer}>
        <MapView style={styles.map} initialRegion={{
       latitude:this.state.latitude,
       longitude:this.state.longitude,
       latitudeDelta: 1,
       longitudeDelta: 1
      }}>

      {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
        
       />}

       {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
          coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
          title={"Your Destination"}
        />}

       {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="blue"/>
        }

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
          coordinates={[
              {latitude: this.state.latitude, longitude: this.state.longitude},
              {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
          ]}
          strokeWidth={2}
          strokeColor="red"/>
         }

      </MapView>
      <View>
      <TextInput
          placeholder="Where to"
          style={styles.input}
          onChangeText={(username)=>this.setState({username})}
          value={this.state.username}
          />
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    height:"100%",
    width:"100%"
  },
  overallViewContainer:{
    height:"100%",
    width:"100%"
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  input: {
    elevation: 1,
    width: '90%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'black',
    color: 'white',
  },
  allNonMapThings: {
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  inputContainer: {
    elevation: 1,
    backgroundColor: 'white',
    width: '90%',
    height: '6%',
    top: 40,
    borderRadius: 3,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0}
  },
});

export default LocationA;