import React, {
  Component,
  PropTypes
}
from 'react'
import Job from './Job'
const List = require('material-ui/lib/lists/list');
class JobList extends Component {
  render() {
     var jobNodes = this.props.data.map( (job) => {
          return (
            <Job requestDeletion={this.props.requestDeletion}
              job={job}
              key={job.id} id={job.id} title={job.midiTitle} link={job.midiLink} description={job.midiDescription}>
            </Job>
          );
        });
    return (
      <div>
        <div className="jobList" asdfasdf>
          <List>
            {jobNodes}
          </List>
        </div>
      </div>
    );
  }
}

JobList.propTypes = {
  data: PropTypes.array.isRequired,
  requestDeletion: PropTypes.func
}

export default JobList
