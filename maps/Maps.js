import {bindActionCreators} from 'redux'
import * as JobActions from '../actions/jobAction'
import { compose } from 'redux'
export function mapStateToProps (_state) {
  var state = _state.default;
  return {
    jobDic: state.jobReducer.jobDic,
    view: state.projectReducer.view,
    jobs: state.jobReducer
      .jobs
      .map(x => {
        if (!state.jobReducer.jobDic[x]) {
          console.log('missing job');
        }
        return state.jobReducer.jobDic[x];
      }),
      currentJob: state.jobReducer.currentJob,
      currentJobDetails: state.jobReducer.currentJobDetails,
      isRequesting: state.jobReducer.isRequesting,
      initialized: state.jobReducer.initialized
    };
}

export function mapDispatchToProps (dispatch) {
  return bindActionCreators(JobActions, dispatch)
}
