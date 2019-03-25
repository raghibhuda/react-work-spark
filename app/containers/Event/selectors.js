import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the event state domain
 */

const selectEventDomain = state => state.get('event', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Event
 */

const makeSelectEvent = () =>
  createSelector(selectEventDomain, substate => substate.toJS());

export default makeSelectEvent;
export { selectEventDomain };
