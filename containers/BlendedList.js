import {connect} from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from '../maps/Maps';

var React = require('react-native');
var {AppRegistry, StyleSheet, Text, View} = React;
var {ListView,
TouchableHighlight,
Image, PixelRatio, ScrollView} = React;

var ActionButton = require('react-native-action-button'),
    Icon = require('react-native-vector-icons/Ionicons');
var FontAwesome = require('react-native-vector-icons/FontAwesome');

var { DrawerLayoutAndroid, ProgressBarAndroid } = React;

BlendedList = React.createClass({

  componentDidMount: function() {
    if (!this.props.initialized) {
      this.props
        .initializeAsync();
    }
    else if( this.props.view ==='details'){

    }
    else{
      this.props.changeView("new-task");
    }
  },
  propTypes: {
    initialized: React.PropTypes.bool,
    initializeAsync: React.PropTypes.func,
    jobs: React.PropTypes.array,
    changeView: React.PropTypes.func
  },
  _renderRow: function(rowData, sectionId, rowID) {
    return  (<TouchableHighlight onPress={() => this._pressRow(rowData)}>
          <View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {rowData.midiTitle}
              </Text>
           </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {rowData.midiDescription}
              </Text>
           </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {rowData.midiLink}
              </Text>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );

  },
  _renderDetailsRow: function(rowData){
    return  (<TouchableHighlight>
          <View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {rowData.log.split('):')[1]}
              </Text>
              <Text>{rowData.created}</Text>
            </View>

            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );

  },
  _pressRow: function(rowData) {
    this.setState({view:'details', pressId : rowData.id });
    this.props.getJobDetailsAsync(rowData.id);
    this.props.changeView("details");
  },
  getInitialState: function() {
    return {
    };
  },
   render: function() {
    var parts = [] , navigationView = (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
           <View>
           <Text>Selected Job {currentJob}</Text>
           <Text>Detail #: {currentJobDetails ? currentJobDetails.length : '_' }</Text>
           <Text>{this.state.pressId}</Text>
             <Text>Jobs
               {this.props.jobs
                 ? this.props.jobs.length
                 : '0'}</Text>
                   <Text>Current View :
                     {this.props.view}</Text>
           </View>
            <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#9b59b6' title="Jobs" onPress={() => {
                  this.props.changeView("jobs");
                }}>
                 <Text style={styles.actionButtonIcon}>Jobs</Text>
               </ActionButton.Item>
               <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => {
                   this.props.changeView("new-task");
                 }}>
                  <Text style={styles.actionButtonIcon}>+</Text>
                </ActionButton.Item>
            </ActionButton>
        </View>
      ), list;
      const {currentJob, currentJobDetails} = this.props;
      if( this.props.view ==='details') {
        if(currentJobDetails && currentJobDetails.length){

            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            list = (<ScrollView>
                      <ListView
                        dataSource={ds.cloneWithRows(currentJobDetails)}
                        renderRow={this._renderDetailsRow} />
                    </ScrollView>);
            parts.push(list);
        }
      }
      else if(this.props.jobs.length>0){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        list = (<ScrollView>
          <ListView
            dataSource={ds.cloneWithRows(this.props.jobs)}
            renderRow={this._renderRow}
          />
          </ScrollView>);
          parts.push(list);
      }
    return (

          <DrawerLayoutAndroid
             drawerWidth={300}
             drawerPosition={DrawerLayoutAndroid.positions.Left}
             renderNavigationView={() => navigationView}>
              {parts}
          </DrawerLayoutAndroid>
    );
  }
});
var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(BlendedList)
