import {connect} from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from '../maps/Maps';

var React = require('react-native');
var {AppRegistry, StyleSheet, Text, View} = React;
var {Image, PixelRatio, ScrollView} = React;

App = React.createClass({

  render: function() {
    var parts = [];
    /*if(this.props.view){

    }
    else {
      parts.push(<BlendedList  store={store}  />)
    }*/
    return (
        <View>
          <Text>App { JSON.stringify(this.props) }</Text>
        </View>
    );
  }
});

var styles = StyleSheet.create({});

export default (App)
