// type system
// annotations = hashie nevisi
// we add annotations like comment

// tsc
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos/1";
// tsc index.ts
axios
  .get(url)
  .then(res => console.log(res.data))
  .catch();

// to run on node
// node index.js
/// ====> ts-node index.ts
