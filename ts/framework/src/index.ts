import { User } from "./models/User";
// for make model and generalize works use composition
// when we want customize use inheritance.
//
const url = "http://localhost:3000/users";
const collection = User.buildUserCollection();
collection.on("change", () => console.log(collection));
collection.fetch();
