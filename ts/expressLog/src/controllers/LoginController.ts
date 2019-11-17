//
import { Request, Response, NextFunction } from "express";
import { get, controller, post, bodyValidator } from "./decorators";
// import { use } from "./decorators/use";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
//
// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log("req");
//   next();
// }
//
@controller("/auth")
class LoginController {
  // @get("/")
  // add(a: number, b: number): number {
  //   return a + b;
  // }

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

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: RequestWithBody, res: Response) {
    const { email, password } = req.body;
    if (email === "h@h.com" && password === "123") {
      // mark as login
      // session to store some info about person that send this request
      req.session = { loggedIn: true };
      // redirect
      res.redirect("/");
    } else {
      res.send("Invalid email");
    }
  }

  @get("/logout")
  getLogout(req: RequestWithBody, res: Response) {
    req.session = undefined;
    res.redirect("/");
  }
}
