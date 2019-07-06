import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/TaskControl';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';
//import _ from 'lodash';

class App extends Component {
  
  onToggleForm = () => {
    var { itemEditing } = this.props;
    if (itemEditing && itemEditing.id !== "") {
      this.props.onOpenForm();

    } else {
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: "",
      name: "",
      status: false,
    });
  }

  render() {

    var { isDisplayForm } = this.props;
    return (
      <div className="container">
        <div className="text-center">
          <h1>Work Management</h1>
          <hr></hr>
        </div>

        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "  "}>
            <TaskForm />
          </div>

          {/* Search-Sort */}
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary ml-5" onClick={this.onToggleForm}>
              <i className="fa fa-plus" aria-hidden="true">
              </i> Add Work
            </button>

            <Control />

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                <TaskList />

              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
