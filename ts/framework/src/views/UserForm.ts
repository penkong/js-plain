import { User } from "../models/User";
//
export class UserForm {
  constructor(public parent: Element, public model: User) {}

  public eventsMap(): { [key: string]: () => void } {
    return {
      // left side of string become query selector all
      "click:.set-age": this.onSetAgeClick
    };
  }

  public onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  public template(): string {
    return `
      <div>
        <h1>user</h1>
        <div>user name: ${this.model.get("name")}</div>
        <div>user age: ${this.model.get("age")}</div>
        <input/>
        <button>click me</button>
        <button class="set-age">set random age</button>
      </div>
    `;
  }

  // helper method for use before insert to dom to add events
  public bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");
      fragment.querySelectorAll(selector).forEach(el => {
        el.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  public render(): void {
    // make string to html template elelments
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    // we should add event handler to html
    // content is DocumentFragment type = hold some html memory before attch to dom ==> use helper
    this.bindEvents(templateElement.content); // pass doc frag created by template();
    this.parent.append(templateElement.content);
  }
}
