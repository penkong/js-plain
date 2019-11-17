//
import { Request, Response, NextFunction } from "express";
import { get, controller } from "./decorators";
// import { use } from "./decorators/use";
//
// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log("req");
//   next();
// }
//
@controller("/auth")
class LoginController {
  //
  @get("/login")
  // @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email"/>
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password"/>
        </div>
        <button>Submit</button>
      </form>
    `);
  }
}
