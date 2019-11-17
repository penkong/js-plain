import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
// import { router } from "./routes/loginRoutes";
import { AppRouter } from "./AppRouter";
//
import "./controllers/LoginController";
import "./controllers/RootController";

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cookieSession({ keys: ["fsdfsdfh"] }));
// app.use(router);
app.use(AppRouter.getInstance());
// ----------------------------------------------------------------
app.listen(3000, () => {
  console.log("listening on port 3000.");
});

// @sth === is decorator
// can create controller
// a class that has some router handler that tie to it
// decoratro : is func that can be used to modify change different props methods in the class.
// understand the order in which decorators work
