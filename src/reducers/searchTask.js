import * as types from '../constants/ActionType';

var initialState = "";

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.SEARCH : {
            return action.keyword;
        }
        default: return state;
    }
};
export default myReducer; 