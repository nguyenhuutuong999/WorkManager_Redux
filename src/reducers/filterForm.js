import * as types from '../constants/ActionType';

var initialState = {
    name: "",
    status: -1,
};

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.FILTER_FORM : {
            action.filter.status = parseInt(action.filter.status);
            return action.filter;
        }
        default: return state;
    }
};
export default myReducer; 