import { User } from "./models/User";

//
const user2 = new User({ name: "redcodr", age: 30 });

// user2.save();/
user2.events.on("click", () => {
  console.log("click");
});

user2.events.trigger("click");
