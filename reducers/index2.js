import * as ActionTypes from '../actions';
import merge from 'lodash/object/merge';
import paginate from './paginate';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { files: {}, filesystems: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  files: paginate({
    mapActionToKey: action => action.filesystem,
    types: [
      ActionTypes.FILES_REQUEST,
      ActionTypes.FILES_REQUEST,
      ActionTypes.FILES_REQUEST
    ]
  })
});

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage
});

export default rootReducer;
