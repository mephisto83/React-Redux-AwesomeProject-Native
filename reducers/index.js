import { combineReducers } from 'redux'
import jobReducer from './jobReducer'
import projectReducer from './projectReducer'

const rootReducer = combineReducers({
  jobReducer,
  projectReducer
})

export default rootReducer
