// template are tags of html not instantly load up to dom
// and let us load them with js

// ============================================================
// Validation Logic
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}

// ============================================================
// auto bind decorator for bind this;
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  console.log(descriptor);
  const originalMethod = descriptor.value;
  const adjustDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjustDescriptor;
}

// ==========================================================
// Project Type
// use class rather than interface because we want instantiate it;
enum ProjectStatus {
  Active,
  Finished
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// ==========================================================
// Project state management : singletons
type Listener = (items: Project[]) => void;

class ProjectState {
  // subscription pattern by listeners list of funcs
  private listeners: Listener[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;
  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

// singleton pattern by private constructor
const projectState = ProjectState.getInstance();

// ==========================================================
// Component Base class
class Component<T extends HTMLElement, U extends HTMLElement> {
  tempEl: HTMLTemplateElement;
  hostEl: T;
  el: U;

  constructor(templateId: string, hostElId: string, newElId?: string) {
    this.tempEl = <HTMLTemplateElement>document.getElementById(templateId)!;
    this.hostEl = <T>document.getElementById(hostElId)!;
    const importedNode = document.importNode(this.tempEl.content, true);
    // ---------------------------
    // this point to real element we want that form inside template
    this.el = <HTMLFormElement>importedNode.firstElementChild;
    this.el.id = "user-input";
  }
}

// ==========================================================
// responsible for handling logic for app;
class ProjectInput {
  // ----------------------------------
  // goal of this class to get access form and template and
  // and to access div render template to div#app
  tempEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  el: HTMLFormElement;
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEL: HTMLInputElement;

  // ------------------------------------------
  constructor() {
    this.tempEl = <HTMLTemplateElement>(
      document.getElementById("project-input")!
    );
    this.hostEl = <HTMLDivElement>document.getElementById("app")!;
    // ------------------------------
    // to immedietly run content of template to dom on making class we use it on constructor
    // true == means do with deep clone;
    const importedNode = document.importNode(this.tempEl.content, true);
    // ---------------------------
    // this point to real element we want that form inside template
    this.el = <HTMLFormElement>importedNode.firstElementChild;
    this.el.id = "user-input";
    // ------------------------------
    // select element of form to future usage
    this.titleInputEl = <HTMLInputElement>this.el.querySelector("#title");
    this.descriptionInputEl = <HTMLInputElement>(
      this.el.querySelector("#description")
    );
    this.peopleInputEL = <HTMLInputElement>this.el.querySelector("#people");
    // ----------------------------------
    // logic
    this.configure();
    this.attach();
  }

  // take all user input + validation
  // tuples
  private gatherUserInput(): [string, string, number] | void {
    //
    const enteredTitle = this.titleInputEl.value;
    const enteredDescription = this.descriptionInputEl.value;
    const enteredPeople = this.peopleInputEL.value;
    // need validate here
    // construct validateable object for validate function
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("invalid input please try");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  // clear inputs after submit
  private clearInputAfterSubmit() {
    this.titleInputEl.value = "";
    this.descriptionInputEl.value = "";
    this.peopleInputEL.value = "";
  }

  // use of userInput data and make info render
  @AutoBind
  private submitHandler(e: Event) {
    // to access and validate input
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, poeple] = userInput;
      projectState.addProject(title, desc, poeple);
      this.clearInputAfterSubmit();
    }
  }

  // catch all config on event listener
  private configure() {
    this.el.addEventListener("submit", this.submitHandler);
  }

  // load up to dom
  private attach() {
    this.hostEl.insertAdjacentElement("afterbegin", this.el);
  }
}

// ==========================================================
class ProjectSingle {}

// ==========================================================
// Project List class
// responsible to out put to screen;
class ProjectList {
  //
  tempEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  el: HTMLElement;
  assignedProjects: Project[];

  // for id there is two kind of project active and inactive
  constructor(private type: "active" | "finished") {
    this.tempEl = <HTMLTemplateElement>document.getElementById("project-list")!;
    this.hostEl = <HTMLDivElement>document.getElementById("app")!;
    // ------------------------------
    // to immedietly run content of template to dom on making class we use it on constructor
    // true == means do with deep clone;
    const importedNode = document.importNode(this.tempEl.content, true);
    // ---------------------------/
    // this point to real element we want that form inside template
    this.el = <HTMLElement>importedNode.firstElementChild;
    this.el.id = `${this.type}-projects`;
    // list of projects come from top
    this.assignedProjects = [];
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(proj => {
        if (this.type === "active") {
          return proj.status === ProjectStatus.Active;
        }
        return proj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
    //
    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = <HTMLUListElement>(
      document.getElementById(`${this.type}-projects-list`)!
    );
    listEl.innerHTML = "";
    for (const projItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = projItem.title;
      listEl.appendChild(listItem);
    }
  }

  // render content base of type of project
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.el.querySelector("ul")!.id = listId;
    this.el.querySelector("h2")!.textContent =
      this.type.toUpperCase() + "PROJECTS";
  }

  // attach to dom;
  private attach() {
    this.hostEl.insertAdjacentElement("beforeend", this.el);
  }
}

// =======================================================

// initiate class and load up to dom;

// load up form for create Projects
const pojectInput = new ProjectInput();

// load up list of finished or active Projects
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
