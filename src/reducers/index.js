import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import filterForm from './filterForm';
import itemEditing from './itemEditing';
import searchTask from './searchTask';
import sortTask from './sortTask';

const myReducer = combineReducers({
    tasks, // tasks: tasks
    isDisplayForm,
    itemEditing,
    filterForm,
    searchTask,
    sortTask
});

export default myReducer;