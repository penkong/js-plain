import { Router, Request, Response, NextFunction } from "express";
//
// to decorator know sequence we add to each decorator some config object
// like called metadata
// last decorator to exec must be class decorator
// class decorator reads metadata from each method adds route definition to
// router express.
// metadata
// add to js also, a snippet of info that can be tied to a method prop or
// class definition.
// metadata preserve data we want pass from ts to js , it dont wipe out
// for read and write metadata we using pkg : reflect-metadata
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
// --------------------------------------------------------------------
//
const router = Router();

router.get("/login", (req: Request, res: Response) => {
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
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && email === "h@h.com" && password === "123") {
    // mark as login
    // session to store some info about person that send this request
    req.session = { loggedIn: true };
    // redirect
    res.redirect("/");
  } else {
    res.send("Invalid email");
  }
});

router.get("/", (req: RequestWithBody, res: Response) => {
  // check req.session;
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">login</a>
      </div>
    `);
  }
});

router.get("/logout", (req: RequestWithBody, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send("welcome to protected route");
});

export { router };
