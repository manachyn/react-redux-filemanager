import expect from 'expect';
import * as actions from '../../actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Filesystem actions', () => {
    it('selectPath should create SELECT_PATH action', () => {
        expect(actions.selectPath('local', '/tmp')).toEqual({
            type: actions.SELECT_PATH,
            filesystem: 'local',
            path: '/tmp'
        });
    });

    it('resetErrorMessage should create RESET_ERROR_MESSAGE action', () => {
        expect(actions.resetErrorMessage()).toEqual({
            type: actions.RESET_ERROR_MESSAGE
        });
    });

    it('creates FETCH_OBJECTS_SUCCESS when fetching objects has been done', (done) => {
        afterEach(() => {
            nock.cleanAll();
        });
        const filesystem = 'local';
        const path = '/tmp';
        nock('http://imshop.com/api/v1/')
            .get(`/filesystems/${filesystem}/${path}`)
            .reply(200, { body: { objects: [ 'object1' ] } });

        const expectedActions = [
            { type: actions.FETCH_OBJECTS_REQUEST, filesystem, path },
            { type: actions.FETCH_OBJECTS_SUCCESS, filesystem, path, body: { objects: [ 'object1' ] } }
        ];
        const store = mockStore({ objects: [] }, expectedActions, done);
        store.dispatch(actions.fetchObjects('local', '/tmp'));
    });
});
