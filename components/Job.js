import React, {
  Component,
  PropTypes
} from 'react'
import {Link} from 'react-router';

const ListItem = require('material-ui/lib/lists/list-item');
const Dialog = require('material-ui/lib/dialog');

const Colors = require('material-ui/lib/styles/colors');
const AppBar = require('material-ui/lib/app-bar');
const IconMenu = require('material-ui/lib/menus/icon-menu');
let Avatar = require('material-ui/lib/avatar');
const IconButton = require('material-ui/lib/icon-button');
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const LeftNav = require('material-ui/lib/left-nav')
const FlatButton = require('material-ui/lib/flat-button');
let Menu = require('material-ui/lib/menus/menu');
let FontIcon = require('material-ui/lib/font-icon');
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider');
let injectTapEventPlugin = require("react-tap-event-plugin");
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class Job extends Component {
  _onDialogSubmit () {}

  render () {
    //rightIconButton={  <FlatButton to={'/details/' + this.props.id} className="detail-link">
    //   {this.props.title}
    // </Link>}
    return (
      <ListItem containerElement={<Link to={'/details/' + this.props.id}></Link>} key={this.props.id} className="job">
        <h2 className="job-title">
          <Avatar color={this.props.job.busy
            ? Colors.white : Colors.red700} backgroundColor={Colors.blue200}>
            {this.props.job.busy
              ? 'B'
              : 'A'}
          </Avatar>
          <span>
            {'  ' + this.props.title}</span>
        </h2>
        <p>
          {this.props.description}
        </p>
        {this.props.link}
      </ListItem>
    )
  }
}

Job.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  description: PropTypes.string,
  requestDeletion: PropTypes.func,
  job: PropTypes.object
}

export default Job
