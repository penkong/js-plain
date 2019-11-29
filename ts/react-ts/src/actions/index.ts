import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types.enum";

const url = "https://jsonplaceholder.typicode.com/todos";

// interface for what we recivie.
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[];
}

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Todo[]>(url);

    dispatch<FetchTodosAction>({
      type: ActionTypes.fetchTodos,
      payload: response.data
    });
  };
};
