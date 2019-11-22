import { Model } from "../models/Model";
// we have K becuae Model class has generic that extends hasId
// for Model class we need add K .
export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    // do this on creation == created
    // it's pattern register eventName on creation. like change and load
    this.bindModel();
  }

  // for re render when on change
  public bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }
  // ----------------- will charge by children ---------------
  // wil have and all child class not necessary to have it
  public regionsMap(): { [key: string]: string } {
    return {};
  }

  public eventsMap(): { [key: string]: () => void } {
    return {};
  }
  // will have and all child class must do it
  abstract template(): string;

  // come from parent children
  public onRender(): void {}
  // ------------------------------------------------------------
  // helper method for use before insert to dom to add events
  public bindEvents(fragment: DocumentFragment): void {
    // return obj from list of events
    const eventsMap = this.eventsMap();
    // eventKeys are click:className like
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach(el => {
        // eventsMap[eventKey] is function that exec event
        el.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  // helper method for use before insert to dom to add components like
  public mapRegions(fragment: DocumentFragment): void {
    // return obj from list of location that component want load up
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  public render(): void {
    // when update happen if we dont clear update will add to whole html
    this.parent.innerHTML = "";
    // make string to html template elements
    // our fragment
    // by template element we change string on template() to html elements
    const templateElement = document.createElement("template");
    // this.template will exec by child
    templateElement.innerHTML = this.template();
    // we should add event handler to html
    // content is DocumentFragment type = hold some html memory before attch to dom ==> use helper
    this.bindEvents(templateElement.content); // pass doc frag created by template();
    // add helper method
    this.mapRegions(templateElement.content);

    // setup view nesting here
    this.onRender();

    // this is root we give on creation
    this.parent.append(templateElement.content);
  }
}
