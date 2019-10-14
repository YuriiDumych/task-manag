import {ADD_TASK, DELETE_TASK, EDIT_TASK, CHECK_TASK, GET_TASKS} from '../actions/types';
const initialState = [];
export default function(state = initialState, action){
  switch(action.type){
    case ADD_TASK:
      return [action.payload, ...state];
    case DELETE_TASK:
      const index = state.findIndex(item => item._id === action.payload);
      return [...state.slice(0, index), ...state.slice(index+1)]
    case CHECK_TASK:
        return state.map(item => {
          if(item._id !== action.payload.id){
              return item
          } else {
              return Object.assign({}, item, {completed: !item.completed})
          }
        });
    case EDIT_TASK: 
      return state.map(item => {
        if(item._id !== action.payload.id){
            return item
        } else {
            return Object.assign({}, item, {title: action.payload.title})
        }
      });
    case GET_TASKS:
      return action.payload;
    default: 
      return state;
  }
}