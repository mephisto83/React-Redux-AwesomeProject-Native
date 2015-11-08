import React, {
  Component,
  PropTypes
} from 'react'
const Dialog = require('material-ui/lib/dialog');

const Colors = require('material-ui/lib/styles/colors');
const AppBar = require('material-ui/lib/app-bar');
const IconMenu = require('material-ui/lib/menus/icon-menu');

import {Link} from 'react-router';
const IconButton = require('material-ui/lib/icon-button');
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const LeftNav = require('material-ui/lib/left-nav')
const FlatButton = require('material-ui/lib/flat-button');
let Menu = require('material-ui/lib/menus/menu');
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider');


const FontIcon = require('material-ui/lib/font-icon');
const Avatar = require('material-ui/lib/avatar');

const ListItem = require('material-ui/lib/lists/list-item');
const List = require('material-ui/lib/lists/list');
let injectTapEventPlugin = require("react-tap-event-plugin");
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class Details extends Component {
  constructor (props) {
    super(props);
    this._showDialog = this._showDialog
      .bind(this);
    this.closeDialog = this.closeDialog
      .bind(this);
    this.deleteJob = this.deleteJob
      .bind(this);
  }
  componentDidMount () {
    this.loadDetails();
  }
  deleteJob (id) {
    console.log('delete job : ' + this.props.id);
    var {routeParams, isRequestingCurrent} = this.props;

    if (routeParams && routeParams.id) {
      this.props
        .requestDeletion(routeParams.id);
      history.back();
    }
  }

  loadDetails () {
    var {routeParams, isRequestingCurrent} = this.props;

    if (routeParams && routeParams.id && !isRequestingCurrent) {
      this.props
        .requestJobDetailsAsync(routeParams.id);
    }
  }
  closeDialog () {
    if (this.refs.dialog.isOpen()) {
      this.refs
        .dialog
        .dismiss();
    }
  }
  _showDialog () {
    if (!this.refs.dialog.isOpen()) {
      this.refs
        .dialog
        .show();
    }
  }
  render () {
    const {currentJob, currentJobDetails} = this.props;
    let standardActions = [
      {
        text: 'Cancel',
        onClick: this.closeDialog
      }, {
        text: 'Submit',
        onClick: this.deleteJob,
        ref: 'submit'
      }
    ];

    var detailNodes = currentJobDetails.map(function(detail) {
      return (
        <ListItem key={detail.id}>
          <Avatar icon={<FontIcon className="material-icons" >info</FontIcon>}/><span>{'  ' + detail.log.split('):')[1]}
          </span>
          <br/>
          <br/>
          <div><b>{detail.created}</b></div>
        </ListItem>
      );
    });
    return (
      <div>
        <h2>
          Details
        </h2>
        <Dialog ref="dialog" title="Delete Job" actions={standardActions} actionFocus="submit" modal={true}>
          Are you sure you would like to delete this job.
        </Dialog>
        <div style={{
          float: 'right'
        }}>
          <IconMenu iconButtonElement={<IconButton iconClassName="material-icons" tooltipPosition="bottom-center" tooltip="Sky">settings</IconButton>}>
            <MenuItem onClick={this._showDialog} primaryText="Delete"/>
          </IconMenu>
        </div>
        <span>{currentJob}</span>
        <List>
          {detailNodes}
        </List>
      </div>
    );
  }
}
Details.propTypes = {
  initializeAsync: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
  removeJob: PropTypes.func.isRequired,
  updateJob: PropTypes.func.isRequired,
  getJobsAsync: PropTypes.func.isRequired,
  getJobDetails: PropTypes.func.isRequired,
  requestJobDetailsAsync: PropTypes.func.isRequired,
  jobDic: PropTypes.object.isRequired,
  jobs: PropTypes.array,
  currentJob: PropTypes.string,
  currentJobDetails: PropTypes.array,
  isRequesting: PropTypes.bool
}

// export default Details
import {connect} from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from '../containers/App'
export default connect(mapStateToProps, mapDispatchToProps)(Details)
