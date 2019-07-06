import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItems extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.tasks.id);
    }
    onDelete = () => {
        this.props.onDeleteForm(this.props.tasks.id);
        this.props.onCloseForm(this.props.tasks.id);
    }
    onEditTask = () => { 
        // this.props.onUpdate(this.props.tasks.id);
        this.props.onOpenFrom();
        this.props.onEditTask(this.props.tasks);
        

    }
    render() {
        var { tasks, index } = this.props;

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{tasks.name}</td>
                <td className="text-center">
                    <span
                        onClick={this.onUpdateStatus}
                        className={tasks.status === true ? "label label-success" : "label label-danger"}>
                        {tasks.status === true ? "Active" : "Hiden"}</span>
                </td>
                <td className="text-center">

                    <button onClick={this.onEditTask} type="button" className="btn btn-warning ml-5"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</button>
                    <button onClick={this.onDelete} type="button" className="btn btn-danger ml-5"><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>

                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteForm: (id) => {
            dispatch(actions.deleteTask(id));

        },
        onCloseForm: () => {
            dispatch(actions.closeForm());

        },
        onOpenFrom: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItems);
