// template are tags of html not instantly load up to dom
// and let us load them with js
// name space don't shout on wrong import there for we prefer
// use import export pattern.

// for import name spacing elements :
// / <reference path="./models/dragDrop.ts"/>
// / <reference path="./models/project.ts"/>
// / <reference path="./state/ProjectState.ts"/>
// / <reference path="./util/validation.ts"/>
// / <reference path="./decorators/autoBindDecorator.ts"/>
// / <reference path="./components/base-component.ts" />
// / <reference path="./components/ProjectInput.ts" />
// / <reference path="./components/ProjectItem.ts" />
// / <reference path="./components/ProjectList.ts" />

// in ts.config file with out file we say ts must concatenate all
// namespace files in one javascript file.concatenate
import { ProjectInput } from "./components/ProjectInput";
import { ProjectList } from "./components/ProjectList";

// namespace App {
// =======================================================
// initiate class and load up to dom;
// load up form for create Projects
// const projectInput =
new ProjectInput();
// load up list of finished or active Projects
// const activePrjList =
new ProjectList("active");
// const finishedPrjList =
new ProjectList("finished");
// }

// when we use es6 module component style we import like this
// import {} from './components/ProjectInput.js'
