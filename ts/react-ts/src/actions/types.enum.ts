import { FetchTodosAction, DeleteTodoAction } from "./todos";
export enum ActionTypes {
  // fetchTodos if we dont assign value to it ts auto consider 0 and for
  // next line 1 and then 2 and ...
  fetchTodos,
  deleteTodo
}

export type Action = FetchTodosAction | DeleteTodoAction;
