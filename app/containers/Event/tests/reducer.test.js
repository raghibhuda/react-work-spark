import { fromJS } from 'immutable';
import eventReducer from '../reducer';

describe('eventReducer', () => {
  it('returns the initial state', () => {
    expect(eventReducer(undefined, {})).toEqual(fromJS({}));
  });
});
