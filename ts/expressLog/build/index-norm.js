"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var loginRoute_norm_1 = require("./routes/loginRoute-norm");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(cookie_session_1.default({ keys: ["fsdfsdfh"] }));
app.use(loginRoute_norm_1.router);
app.listen(3000, function () {
    console.log("listening on port 3000.");
});
// @sth === is decorator
// can create controller
// a class that has some router handler that tie to it
// decoratro : is func that can be used to modify change different props methods in the class.
// understand the order in which decorators work
