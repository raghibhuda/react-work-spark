/**
 *
 * Task
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button , Jumbotron ,Form , FormGroup ,Input ,Table} from 'reactstrap';
import makeSelectTask from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchTasksAction, addNewTaskAction, deleteTaskAction } from './actions';


/* eslint-disable react/prefer-stateless-function */
export class Task extends React.Component {
  constructor(){
    super();
    this.state = {
      name: '',
      id: null,
    };
    
  }
  
  handelTaskNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  
  addTaskSubmit = (e) => {
    e.preventDefault();
    let data ={
      name: this.state.name,
    }
    this.props.addNewTask(data);
    this.setState({
      name: ""
    });
  }

  handleTaskDelete = (e) => {
    let id = e.target.value;
    this.props.deleteATask(id);
  }
  ///All task render UI
  renderTasks = () => {
    return this.props.task.tasks.map((data,key) => {
      return (
        <tr key={key}>
          <td >{data.id}</td>
          <td >{data.name}</td>
          <td >
            <Button outline color="primary" >Edit</Button>
          </td>
          <td>
            <Button outline color="danger"  value={data.id} onClick={this.handleTaskDelete}>Delete</Button>
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
              <Input name='name'placeholder="Add a new one" value={this.state.name} onChange={this.handelTaskNameChange}/>
            </FormGroup>
            <Button type="submit" className='btn btn-primary btn-lg'>Add Task</Button>
          </Form>
        </Jumbotron>
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
    addNewTask: (data) => dispatch(addNewTaskAction(data)),
    deleteATask: (taskID) => dispatch(deleteTaskAction(taskID)),
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
