// template are tags of html not instantly load up to dom
// and let us load them with js

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
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
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

  // use of userInput data
  @AutoBind
  private submitHandler(e: Event) {
    // to access and validate input
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, poeple] = userInput;
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

const pojectInput = new ProjectInput();
