import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the task state domain
 */

const selectTaskDomain = state => state.get('task', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Task
 */

const makeSelectTask = () =>
  createSelector(selectTaskDomain, substate => substate.toJS());

export default makeSelectTask;
export { selectTaskDomain };
