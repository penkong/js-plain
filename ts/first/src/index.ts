// type system
// annotations = hashie nevisi
// we add annotations like comment

// tsc
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos/1";
// tsc index.ts

// to run on node
// node index.js
/// ====> ts-node index.ts

// to define structure of an object.
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios
  .get(url)
  .then(res => {
    const todo = res.data as Todo;
    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;
    logTodo(id, title, completed);
  })
  .catch();

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(id, "--", title, "--", completed);
};
