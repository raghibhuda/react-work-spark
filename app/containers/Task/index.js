/**
 *
 * Task
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button , Jumbotron ,Form , FormGroup ,Input ,Table} from 'reactstrap';
import makeSelectTask from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { fetchTasksAction, addNewTaskAction } from './actions';


/* eslint-disable react/prefer-stateless-function */
export class Task extends React.Component {
  constructor(){
    super();
    this.state = {
      name: ''
    };
    
  }
  
  handelTaskNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  
  addTaskSubmit = (e) =>{
    e.preventDefault();
    let data ={
      name: this.state.name,
    }
    this.props.addNewTask(data);
    // this.props.task;
    this.setState({
      name: ""
    });
  }

  test = () =>{
    this.props.task.tasks.map((data,key) => {
      console.log(data.id);
      // console.log(key);

    });
  }
  
  renderTasks = () => {
    return this.props.task.tasks.map((data,key) => {
      return (
        <tr key={key}>
          <td >{data.id}</td>
          <td >{data.name}</td>
          <td >
            <Button outline color="primary">Edit</Button>
          </td>
          <td>
            <Button outline color="danger" >Delete</Button>
          </td>
        </tr>
      )
    });
  } 

  render() {
    return (
      <div>
        <Helmet>
          <title>Task</title>
          <meta name="description" content="Description of Task" />
        </Helmet>
        <Jumbotron>
          <Form onSubmit={this.addTaskSubmit}>
            <FormGroup>
              <Input name='name'placeholder="Add a new one" onChange={this.handelTaskNameChange}/>
            </FormGroup>
            <Button type="submit" className='btn btn-primary btn-lg'>Add Task</Button>
          </Form>
        </Jumbotron>
        <Button onClick={this.test}>Test button</Button>
        <Jumbotron>
          <Table className='text-center table table-primary'>
            <thead>
              <tr>
                <td>No</td>
                <td>Task</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {this.renderTasks()}
            </tbody>
          </Table>
        </Jumbotron>
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
    addNewTask: (data)=>dispatch(addNewTaskAction(data)),
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
