import { User } from "./models/User";
import { UserForm } from "./views/UserForm";
// for make model and generalize works use composition
// when we want customize use inheritance.
//
const user = User.buildUser({ name: "john", age: 320 });
const root = document.getElementById("root");
if (root) {
  const userForm = new UserForm(root, user);
  userForm.render();
} else {
  throw new Error("root element not found");
}
