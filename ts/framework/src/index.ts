import { User, UserProps } from "./models/User";
import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";
// for make model and generalize works use composition
// when we want customize use inheritance.
//
const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on("change", () => {
  const root = document.getElementById("root");
  if (root) {
    new UserList(root, users).render();
  }
});
users.fetch();
