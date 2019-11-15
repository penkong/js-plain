import { User } from "./models/User";
// for make model and generalize works use composition
// when we want customize use inheritance.
//
const user = User.buildUser({ name: "mkz", age: 30 });
// user.save();
