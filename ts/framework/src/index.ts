import { User } from "./models/User";
// import { UserForm } from "./views/UserForm";
import { UserEdit } from "./views/UserEdit";
// for make model and generalize works use composition
// when we want customize use inheritance.
//
const user = User.buildUser({ name: "john", age: 320 });
const root = document.getElementById("root");
if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
  console.log(userEdit);
} else {
  throw new Error("root element not found");
}
