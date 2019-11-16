import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { router } from "./routes/loginRoute";

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cookieSession({ keys: ["fsdfsdfh"] }));

app.use(router);

app.listen(3000, () => {
  console.log("listening on port 3000.");
});
