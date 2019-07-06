import * as types from '../constants/ActionType';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
var generateID = () => {
    return s4() + "-" + s4() + "-" + s4() + "-" + s4();
}

var findIndex = (id, tasks) => {
   
    var result = -1;

    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }
var myReducer = (state = initialState, action) =>{
  var id = '';
  var index = -1;
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:{ 
            var task = {
                id : action.task.id, 
                name: action.task.name,
                status: action.task.status,
            }
            if(!task.id){
              task.id = generateID();
              state.push(task);
            }else{
              index = findIndex(task.id, state);
              state[index] = task;
            }
            
            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];
        }
        case types.UPDATE_STATUS:{
                id = action.id;
                index = findIndex(id, state);
                
                state[index] = {
                  ...state[index],
                  status: !state[index].status,

                }
                //state[index].status = !state[index].status;
                localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        }
        case types.DELETE_TASK:{
            id = action.id;
            index = findIndex(id, state);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        }
        default: return state;
    }
};
export default myReducer;