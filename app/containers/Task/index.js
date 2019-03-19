/**
 *
 * Task
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button } from 'reactstrap';
import makeSelectTask from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { fetchTasksAction } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Task extends React.Component {
  test = e => {
    console.log(this.props.task);
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Task</title>
          <meta name="description" content="Description of Task" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <Button onClick={this.test}>Show Task</Button>
      </div>
    );
  }
}

// Task.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  task: makeSelectTask(),
});

function mapDispatchToProps(dispatch) {
  return {
    showTasks: (data) => dispatch(fetchTasksAction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'task', reducer });
const withSaga = injectSaga({ key: 'task', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Task);
