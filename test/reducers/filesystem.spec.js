import expect from 'expect';
import filesystem from '../../reducers';
import * as actions from '../../actions';

describe('selectedPath reducer', () => {
    it('should handle initial state', () => {
        expect(
            filesystem(undefined, {}).selectedPath
        ).toEqual({});
    });

    it('should handle SELECT_PATH', () => {
        expect(
            filesystem({}, {
                type: actions.SELECT_PATH,
                filesystem: 'local',
                path: '/tmp'
            }).selectedPath
        ).toEqual({
            filesystem: 'local',
            path: '/tmp'
        });
    });
});
