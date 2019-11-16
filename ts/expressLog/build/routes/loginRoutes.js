"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// ---------------------------------------------------------------------
// middleware
function requireAuth(req, res, next) {
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
var router = express_1.Router();
exports.router = router;
router.get("/login", function (req, res) {
    res.send("\n    <form method=\"POST\">\n      <div>\n        <label>Email</label>\n        <input name=\"email\"/>\n      </div>\n      <div>\n        <label>Password</label>\n        <input name=\"password\" type=\"password\"/>\n      </div>\n      <button>Submit</button>\n    </form>\n  ");
});
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === "h@h.com" && password === "123") {
        // mark as login
        // session to store some info about person that send this request
        req.session = { loggedIn: true };
        // redirect
        res.redirect("/");
    }
    else {
        res.send("Invalid email");
    }
});
router.get("/", function (req, res) {
    // check req.session;
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>You are logged in</div>\n        <a href=\"/logout\">logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n        <div>You are not logged in</div>\n        <a href=\"/login\">login</a>\n      </div>\n    ");
    }
});
router.get("/logout", function (req, res) {
    req.session = undefined;
    res.redirect("/");
});
router.get("/protected", requireAuth, function (req, res) {
    res.send("welcome to protected route");
});
