import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {
    FETCH_OBJECTS_REQUEST, FETCH_OBJECTS_SUCCESS, FETCH_OBJECTS_FAILURE, SELECT_PATH
} from '../actions';

function selectedPath(state = {}, action) {
    switch (action.type) {
        case SELECT_PATH:
            return { filesystem: action.filesystem, path: action.path };
        default:
            return state;
    }
}

function objects(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case FETCH_OBJECTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_OBJECTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.objects
            });
        default:
            return state;
    }
}

function objectsByPath(state = {}, action) {
    switch (action.type) {
        case FETCH_OBJECTS_REQUEST:
        case FETCH_OBJECTS_SUCCESS:
            const path = `${action.filesystem}:${action.path}`;
            return Object.assign({}, state, {
                [path]: objects(state[path], action)
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    objectsByPath,
    selectedPath,
    routing: routeReducer
});

export default rootReducer;

