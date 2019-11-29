import { Todo, FetchTodosAction } from "../actions/index";
import { ActionTypes } from "../actions/types.enum";
//
export const todoReducer = (state: Todo[] = [], action: FetchTodosAction) => {
  switch (action.type) {
    case ActionTypes.fetchTodos:
      return action.payload;
    default:
      return state;
  }
};
