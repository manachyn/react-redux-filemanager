import fetch from 'isomorphic-fetch';

export const FETCH_OBJECTS_REQUEST = 'FETCH_OBJECTS_REQUEST';
export const FETCH_OBJECTS_SUCCESS = 'FETCH_OBJECTS_SUCCESS';
export const FETCH_OBJECTS_FAILURE = 'FETCH_OBJECTS_FAILURE';

function fetchObjectsRequest(filesystem, path) {
    return {
        type: FETCH_OBJECTS_REQUEST,
        filesystem,
        path
    };
}

//function fetchObjectsSuccess(filesystem, path, json) {
//    return {
//        type: FETCH_OBJECTS_SUCCESS,
//        filesystem,
//        path,
//        objects: json.data.children.map(child => child.data)
//    };
//}

function fetchObjectsSuccess(filesystem, path, body) {
    return {
        type: FETCH_OBJECTS_SUCCESS,
        filesystem,
        path,
        body
    };
}

function fetchObjectsFailure(ex) {
    return {
        type: FETCH_OBJECTS_FAILURE,
        ex
    };
}

export function fetchObjects(filesystem, path) {
    return dispatch => {
        dispatch(fetchObjectsRequest(filesystem, path));
        return fetch(`http://imshop.com/api/v1/filesystems/${filesystem}/${path}`)
            .then(response => response.json())
            //.then(json => dispatch(fetchObjectsSuccess(filesystem, path, json)))
            .then(json => dispatch(fetchObjectsSuccess(filesystem, path, json.body)))
            .catch(ex => dispatch(fetchObjectsFailure(ex)));
    };
}

function shouldFetchObjects(state, filesystem, path) {
    const objects = state.objectsByPath[`${filesystem}:${path}`];
    if (!objects) {
        return true;
    } else if (objects.isFetching) {
        return false;
    }
}

export function fetchObjectsIfNeeded(filesystem, path) {
    return (dispatch, getState) => {
        if (shouldFetchObjects(getState(), filesystem, path)) {
            return dispatch(fetchObjects(filesystem, path));
        }
    };
}

export const SELECT_PATH = 'SELECT_PATH';

export function selectPath(filesystem, path) {
    return {
        type: SELECT_PATH,
        filesystem,
        path
    };
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export function resetErrorMessage() {
    return {
        type: RESET_ERROR_MESSAGE
    };
}
