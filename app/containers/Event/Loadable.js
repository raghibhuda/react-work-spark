/**
 *
 * Asynchronously loads the component for Event
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
