import { get, controller, use } from "./decorators";
import { Response, Request, NextFunction } from "express";

// because of body maybe undefined we add this it not defined on express types
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
// ---------------------------------------------------------------------
// middleware
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  //
  res.status(403);
  res.send("Not Permitted");
}
// ------------------------------------------------------------------
@controller("")
class RootController {
  @get("/")
  getRoot(req: RequestWithBody, res: Response) {
    // check req.session;
    if (req.session && req.session.loggedIn) {
      res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/auth/logout">logout</a>
      </div>
    `);
    } else {
      res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/auth/login">login</a>
      </div>
    `);
    }
  }
  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send("welcome to protected route");
  }
}
