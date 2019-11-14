import { User } from "./models/User";

//
const user = new User({ name: "redcodr", age: 30 });

console.log(user.get("name"));
