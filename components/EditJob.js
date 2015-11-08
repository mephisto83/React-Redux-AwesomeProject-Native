import React, {
  Component,
  PropTypes
}
from 'react'

import {Link} from 'react-router'
const TextField = require('material-ui/lib/text-field');
const FlatButton = require('material-ui/lib/flat-button');

class EditJob extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.requestAddAsync = this.props.requestAddAsync;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {}
  goBack(e) {
    history.back();
  }
  handleSubmit(e) {
    e.preventDefault();


    var title = (this.refs.title.getValue() || "").trim();
    var description =(this.refs.description.getValue() || "").trim();
    var link = (this.refs.link.getValue() || "").trim();
    var keywords = (this.refs.keywords.getValue() || "").trim();

    if (!title || !link || !description) {
      return;
    }
    this.requestAddAsync(title, link, description, keywords)

  }
  render() {
    const {
      currentJob,
      isRequestAddJob,
      currentJobDetails
    } = this.props;


    return ( < div >
      <h2> New Job </h2>
      <form className = "newJobForm"
      onSubmit = {
        this.handleSubmit
      } > 
          <div className="col-md-12">
            <TextField style={{width: "100%"}} hintText="Title" ref = "title"/>
          </div>
          <div className="col-md-12 center-block">
            <TextField style={{width: "100%"}} hintText="Description" ref = "description"/>
          </div>
          <div className="col-md-12 center-block">
            <TextField style={{width: "100%"}} hintText="Link" ref = "link"/>
          </div>
          <div className="col-md-12">
            <TextField style={{width: "100%"}} hintText="Key Words" ref = "keywords"/>
          </div>
        <FlatButton label="Add New Job" type="submit" primary={true} value = "Post"/>
      < /form>
    < /div >
    );
  }
}
EditJob.propTypes = {
  initializeAsync: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
  removeJob: PropTypes.func.isRequired,
  updateJob: PropTypes.func.isRequired,
  requestAddAsync: PropTypes.func.isRequired,
  getJobsAsync: PropTypes.func.isRequired,
  getJobDetails: PropTypes.func.isRequired,
  requestJobDetailsAsync: PropTypes.func.isRequired,
  jobDic: PropTypes.object.isRequired,
  jobs: PropTypes.array,
  currentJob: PropTypes.string,
  currentJobDetails: PropTypes.array,
  isRequesting: PropTypes.bool,
  isRequestAddJob: PropTypes.bool
}

// export default Details
import {
  connect
}
from 'react-redux'
import {
  mapStateToProps, mapDispatchToProps
}
from '../containers/App'
export default connect(mapStateToProps, mapDispatchToProps)(EditJob)
