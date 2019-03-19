import { fromJS } from 'immutable';
import taskReducer from '../reducer';

describe('taskReducer', () => {
  it('returns the initial state', () => {
    expect(taskReducer(undefined, {})).toEqual(fromJS({}));
  });
});
