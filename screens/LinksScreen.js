import React from 'react';
import { View, ScrollView, StyleSheet ,Text} from 'react-native';
import MapView from 'react-native-maps';


export default class LinksScreen extends React.Component{
  render() {
    return (
      // <Text>LOLOLOLOLOL</Text>
      <MapView 
      style={styles.mapStyle} 
      showsUserLocation={true} 
      showsUserLocation = {false}
      followUserLocation = {false}
      zoomEnabled = {true}
      />
    );
  }
}

LinksScreen.navigationOptions = {
  title: 'Maps',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});