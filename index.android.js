/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  BackAndroid,
  Navigator,
  ToolbarAndroid
} = React;
import { Provider } from 'react-redux'


var ActionButton = require('react-native-action-button'),
    Icon = require('react-native-vector-icons/Ionicons');
var FontAwesome = require('react-native-vector-icons/FontAwesome');

var { DrawerLayoutAndroid, ProgressBarAndroid } = React;

import BlendedList from './containers/BlendedList'
//import Details from './components/Details'
//import EditJob from './components/EditJob'
//import BlendedBatch from './components/BlendedBatch'
 import configureStore from './store/configureStore'

 const store = configureStore()
 var RouteMapper = function(route, navigationOperations, onComponentRef) {
   _navigator = navigationOperations;
   //if (route.name === 'movie') {
     return (
       <View style={{flex: 1}}>
         <ToolbarAndroid
           actions={[]}
           onIconClicked={navigationOperations.pop}
           style={styles.toolbar}
           titleColor="white"
           title="Blended List" />
           <BlendedList store={store} />
         </View>
     );
   //}
 };
var state;
var BlendedNativeProject = React.createClass({
  render: function() {
    return (
                 <BlendedList store={store} />
    );
  }
});
var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BlendedNativeProject', () => BlendedNativeProject);
