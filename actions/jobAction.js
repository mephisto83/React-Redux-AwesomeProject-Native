export const REMOVE_FAILED = 'REMOVE_FAILED';
export const ADD_JOB = 'ADD_JOB';
export const REMOVE_JOB = 'REMOVE_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';
export const REQUEST_JOBS = 'REQUEST_JOBS';
export const GET_JOBS = 'GET_JOBS';
export const GET_JOB_DETAILS = 'GET_JOB_DETAILS';
export const REQUEST_JOB_DETAILS = 'REQUEST_JOB_DETAILS';
export const CLEAR = 'CLEAR';
export const INITIALIZE = 'INITIALIZE';
export const REQUEST_ADD_JOB = 'REQUEST_ADD_JOB';
export const FAILED_TO_ADD_JOB = 'FAILED_TO_ADD_JOB';
export const CHANGE_VIEW = 'CHANGE_VIEW';


export function changeView(view) {
  return {
    type: CHANGE_VIEW,
    view: view
  }
}

export function addJob(job) {
  return {
    type: ADD_JOB,
    busy: job.busy,
    title: job.midiTitle,
    url: job.midiLink,
    description: job.midiDescription,
    created: job.created,
    keyWords: job.keyWords,
    id: job.id
  }
}

export function removeJob(id) {
  return {
    type: REMOVE_JOB,
    id
  }
}
export function removeFailed(id) {
  return {
    type: REMOVE_FAILED,
    id: id
  }
}
export function updateJob(id, property, value) {
  return {
    type: UPDATE_JOB,
    id,
    property,
    value
  }
}

export function getJobs(jobs) {
  return {
    type: GET_JOBS,
    jobs: jobs
  }
}

export function getJobDetails(id, details) {
  return {
    type: GET_JOB_DETAILS,
    id,
    details
  }
}

export function requestJobs() {
  return {
    type: REQUEST_JOBS
  }
}

export function initialize() {
  return {
    type: INITIALIZE
  }
}
export function requestJobDetails(id) {
  return {
    type: REQUEST_JOB_DETAILS,
    id
  }
}
export function requestAdd() {
  return {
    type: REQUEST_ADD_JOB
  }
}
export function failedToAddJob() {
  return {
    type: FAILED_TO_ADD_JOB
  }
}
export function requestJobDetailsAsync(id) {
  return dispatch => {
    dispatch(requestJobDetails(id));
    return getJobDetailsAsync(id)(dispatch);
  }
}

export function initializeAsync() {
  return dispatch => {
    dispatch(initialize());
    return getJobsAsync()(dispatch);
  }
}

var domain = 'http://blendedmusic.azurewebsites.net/';

function createMidiModel(title, midiLink, description, keyWords) {
  return {
    description: description,
    midiLink: midiLink,
    title: title,
    keyWords: keyWords
  };
}
export function requestDeletion(id) {
  return dispatch => {
    return fetch(domain + 'api/job/' + id, {
        method: "DELETE"
      }).then(response => response.json())
      .then(json => {
        if (!json.failed) {
          return dispatch(removeJob(id))
        } else {
          return dispatch(removeFailed(id))
        }
      });
  }

}
export function requestAddAsync(title, link, description, keyWords) {
  return dispatch => {
    dispatch(requestAdd());
    var midiModel = createMidiModel(title, link, description);

    var data = JSON.stringify(midiModel)

    return fetch(domain + 'api/jobs', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: data
      }).then(response => response.json())
      .then(json => {
        if (!json.failed) {
          return dispatch(addJob(json.job))
        } else {
          return dispatch(failedToAddJob());
        }
      });

  }
}
export function getJobDetailsAsync(id) {
  return dispatch => {
    dispatch(requestJobs());
    return fetch(domain + 'api/logs/' + id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => dispatch(getJobDetails(id, json.logs)))
  }
}

export function getJobsAsync() {
  return dispatch => {
    dispatch(requestJobs());
    return fetch(domain + 'api/jobs', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => dispatch(getJobs(json.jobs)))
  }
}
