/// <reference path="base-component.ts" />

namespace App {
  // ==========================================================
  // responsible for handling logic for app;
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    // ----------------------------------
    // goal of this class to get access form and template and
    // and to access div render template to div#app
    // tempEl: HTMLTemplateElement;
    // hostEl: HTMLDivElement;
    // el: HTMLFormElement;
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEL: HTMLInputElement;

    // ------------------------------------------
    constructor() {
      super("project-input", "app", true, "user-input");
      // this.tempEl = <HTMLTemplateElement>(
      //   document.getElementById("project-input")!
      // );
      // this.hostEl = <HTMLDivElement>document.getElementById("app")!;
      // ------------------------------
      // to immediately run content of template to dom on making class we use it on constructor
      // true == means do with deep clone;
      // const importedNode = document.importNode(this.tempEl.content, true);
      // ---------------------------
      // this point to real element we want that form inside template
      // this.el = <HTMLFormElement>importedNode.firstElementChild;
      // this.el.id = "user-input";
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
    }

    // take all user input + validation
    // tuples
    private gatherUserInput(): [string, string, number] | void {
      //
      const enteredTitle = this.titleInputEl.value;
      const enteredDescription = this.descriptionInputEl.value;
      const enteredPeople = this.peopleInputEL.value;
      // need validate here
      // construct validatable object for validate function
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
    configure() {
      this.el.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}
    // load up to dom
    // private attach() {
    //   this.hostEl.insertAdjacentElement("afterbegin", this.el);
    // }
  }
}
