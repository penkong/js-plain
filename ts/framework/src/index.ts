import { User } from "./models/User";
import { UserForm } from "./views/UserForm";
// for make model and generalize works use composition
// when we want customize use inheritance.
//
const user = User.buildUser({ name: "john", age: 320 });

const userForm = new UserForm(document.getElementById("root"), user);

userForm.render();
