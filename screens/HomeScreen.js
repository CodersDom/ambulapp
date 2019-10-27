import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { black } from 'ansi-colors';
import { TextInput } from 'react-native-gesture-handler';
import { tsConstructorType } from '@babel/types';

const userinfo = {username:'admin', password: 'admin'};

export default class HomeScreen extends React.Component{

  constructor(props) {
    super(props);
    this.state = {username:'', password: ''}
  }

  _signin =()=> {
    alert('Login '+this.state.username)
 }
 render(){
  

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>
        <View>
          <Text style={styles.login}>
            Ambulance App!
          </Text>
          <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(username)=>this.setState({username})}
          value={this.state.username}
          />
          <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(password)=>this.setState({password})}
          value={this.state.password}
        
          />
        </View>
        <View>
          <TouchableOpacity
          onPress={this._signin}
          >
          <Text style={styles.btnEnter}>Login</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View> */}
    </View>
  );
 }
}

HomeScreen.navigationOptions = {
  header: null,
};

//it'll work as function outsider
function _signin(){
  alert('login')
  WebBrowser.openAuthSessionAsync(
    'https://www.google.com/',
    alert('login')
  );
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  login:{
    color:'#a192ca',
    textAlign:'center',
    margin: 70,
    fontSize:15,
  },
 
  input: {
    margin: 25,
    height:50,
    padding:7,
    fontSize: 15,
    borderBottomColor: 'black',
    alignItems: 'center',
  },

  btnEnter: {
    margin: 15,
    padding: 20,
    color: 'white',
    fontSize: 17,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent:'center',
    backgroundColor: '#a192ca'
    
  }
});
