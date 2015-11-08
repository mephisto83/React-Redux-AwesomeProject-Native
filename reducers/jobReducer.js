import {
  ADD_JOB,
  REMOVE_JOB,
  UPDATE_JOB, CLEAR,
  GET_JOBS,
  GET_JOB_DETAILS,
  REQUEST_JOBS,
  INITIALIZE,
  REQUEST_JOB_DETAILS,
  REQUEST_ADD_JOB,
  FAILED_TO_ADD_JOB
}
from '../actions/jobAction'

function getDefaultJob() {
  var defaultJob = {
    id: null,
    created: null,
    updated: null,
    midiLink: null,
    midiTitle: null,
    midiDescription: null,
    midiKeywords: null,
    busy: false
  };
  return defaultJob;
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
  view:'v state'
}

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

function addJobToState(state, action) {
  var newstate = duplicateState(state);

  var newjob = Object.assign(getDefaultJob(), {
    midiTitle: action.title,
    midiDescription: action.description,
    midiLink: action.url,
    busy: action.busy || false,
    id: action.id,
    created: action.created,
    keyWords: action.keyWords
  });
  newstate.addJobToState = false;
  newstate.isRequestAddJob = false;
  newstate.jobs.push(action.id);
  newstate.jobDic[action.id] = newjob;
  return newstate;
}

function removeJobFromState(state, action) {
  var newstate = duplicateState(state);
  newstate.jobs = newstate.jobs.filter(x => {
    return x !== action.id;
  });
  if (newstate.jobDic[action.id]) {
    console.log('deleted job ' + action.id)
    delete newstate.jobDic[action.id];
  }
  return newstate;
}

function updateJob(state, action) {
  var newstate = duplicateState(state);
  var job = newstate.jobDic[action.id];
  switch (action.property) {
    case 'title':
      job.midiTitle = action.value;
      break;
    case 'description':
      job.midiDescription = action.value;
      break;
    case 'url':
      job.midiLink = action.value;
      break;
  }
  return newstate;
}

function getJobs(state, action) {
  var newstate = Object.assign({}, defaultJobsState);
  if (action.jobs) {
    action.jobs.forEach(job => {
      newstate = addJobToState(newstate, {
        busy: job.busy,
        title: job.midiTitle,
        url: job.midiLink,
        description: job.midiDescription,
        id: job.id
      });
    });
  }
  newstate.isRequesting = false;
  return newstate;
}

function getJobDetails(state, action) {
  var newstate = duplicateState(state);
  newstate.currentJob = action.id;
  newstate.currentJobDetails = action.details || [];
  newstate.isRequestingCurrent = false;
  return newstate;
}

function requestJobs(state, action) {
  var newstate = duplicateState(state, action);
  newstate.isRequesting = true;
  return newstate;
}

function initialize(state, action) {
  var newstate = duplicateState(state, action);
  newstate.initialized = true;
  return newstate;
}

function requestJobDetails(state, action) {
  var newstate = duplicateState(state, action);
  newstate.isRequestingCurrent = true;
  return newstate;
}

function failedToAddJob(state, action) {
  var newstate = duplicateState(state, action);
  newstate.failedToAddJob = true;
  newstate.isRequestAddJob = false;
  return newstate;
}
export default function jobReducer(state = defaultJobsState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case FAILED_TO_ADD_JOB:
      return failedToAddJob(state, action);
    case ADD_JOB:
      return addJobToState(state, action);
    case REMOVE_JOB:
      return removeJobFromState(state, action);
    case UPDATE_JOB:
      return updateJob(state, action);
    case GET_JOBS:
      return getJobs(state, action);
    case GET_JOB_DETAILS:
      return getJobDetails(state, action);
    case CLEAR:
      return defaultJobsState;
    case REQUEST_JOBS:
      return requestJobs(state, action);
    case INITIALIZE:
      return initialize(state, action);
    case REQUEST_JOB_DETAILS:
      return requestJobDetails(state, action);
    default:
      return state
  }
}
