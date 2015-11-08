import React, {
  Component,
  PropTypes
} from 'react'
import {Link} from 'react-router'

import JobList from './JobList'

class BlendedBatch extends Component {
  componentDidMount () {
    if (!this.props.initialized) {
      this.props
        .initializeAsync();
    }
  }

  render () {
    const {addJob, removeJob, updateJob, getJobsAsync, requestDeletion,
      getJobDetails, jobDic, jobs, currentJob, currentJobDetails, isRequesting} = this.props;
    return (
      <div>
        <JobList requestDeletion={requestDeletion} data={jobs}/>
      </div>
    )
  }
}

BlendedBatch.propTypes = {
  initializeAsync: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
  removeJob: PropTypes.func.isRequired,
  updateJob: PropTypes.func.isRequired,
  getJobsAsync: PropTypes.func.isRequired,
  getJobDetails: PropTypes.func.isRequired,
  jobDic: PropTypes.object.isRequired,
  jobs: PropTypes.array,
  currentJob: PropTypes.string,
  currentJobDetails: PropTypes.array,
  isRequesting: PropTypes.bool,
  requestDeletion: PropTypes.func.isRequired
}

// export default BlendedBatch

import {connect} from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from '../containers/App'
export default connect(mapStateToProps, mapDispatchToProps)(BlendedBatch)
