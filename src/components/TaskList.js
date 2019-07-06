import React, { Component } from 'react';
import TaskItems from './TaskItems';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            filterName: '',
            filterStatus: -1
        });
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };

        this.props.onFilterTable(filter);

        this.setState({
            [name]: value,
        });
    }

    render() {
        var { tasks, filterForm, keyword, sort } = this.props;

        var { filterName, filterStatus } = this.state;

        if (filterForm.name) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterForm.name) !== -1;
            });
        }

        tasks = tasks.filter((task) => {
            if (filterForm.status === - 1) {
                return task;
            } else {
                return task.status === (filterForm.status === 1 ? true : false);
            }
        });

        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword) !== -1;
        });

         
        if(sort.by === "name"){
            tasks.sort((a,b) =>{
                if(a.name > b.name) return sort.value;
                else if(a.name < b.name) return -sort.value;
                else return 0;
            })
        }else{
            tasks.sort((a,b) =>{
                if(a.status > b.status) return -sort.value;
                else if(a.status < b.status) return sort.value;
                else return 0;
            })
        }
    

        var elmTask = tasks.map((task, index) => {
            return <TaskItems
                key={task.id}
                index={index}
                tasks={task}
            />
        });
        return (
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td></td>
                        <td><input
                            type="text"
                            className="form-control"
                            name="filterName"
                            value={filterName}
                            onChange={this.onChange}
                        ></input></td>
                        <td>
                            <select
                                value={filterStatus}
                                onChange={this.onChange}
                                className="form-control"
                                name="filterStatus">
                                <option value={-1}>All</option>
                                <option value={0}>Hiden</option>
                                <option value={1}>Active</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmTask}

                </tbody>
            </table>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterForm: state.filterForm,
        keyword: state.searchTask,
        sort: state.sortTask,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterForm(filter));
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
