/**
 *
 * Asynchronously loads the component for Task
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
