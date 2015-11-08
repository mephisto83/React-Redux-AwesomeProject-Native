import {
  CHANGE_VIEW
}
from '../actions/jobAction'


function duplicateState(state) {
  var jobs = [];
  var details = [];
  var currentJob = state.currentJob;
  state.currentJobDetails.forEach(detail => {
    details.push(Object.assign({}, detail));
  })
  state.jobs.forEach(job => {
    jobs.push(job)
  });

  var jobDic = Object.assign({}, state.jobDic);
  var newstate = Object.assign({}, {
    jobs: jobs,
    jobDic: jobDic,
    isRequesting: state.isRequesting,
    currentJobDetails: details,
    currentJob: currentJob,
    view : state.view
  });

  return newstate;
}

function changeView(state, action) {
  var newstate = duplicateState(state, action);
  newstate.view = action.view;
  return newstate;
}

var defaultJobsState = {
  jobDic: {},
  jobs: [],
  currentJob: null,
  currentJobDetails: [],
  initialized: false,
  isRequesting: false,
  addJobToState: false,
  isRequestingCurrent: false,
  isRequestAddJob: false,
  view:'a state'
}

export default function projectReducer(state = defaultJobsState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case CHANGE_VIEW:
      return changeView(state, action);
    default:
      return state;
  }
}
