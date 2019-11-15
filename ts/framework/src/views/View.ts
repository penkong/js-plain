import { Model } from "../models/Model";
//
export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    // do this on creation == created
    this.bindModel();
  }
  // wil have and all child class must do it
  abstract template(): string;

  public bindModel(): void {
    this.model.on("change", () => {
      // for re render when on change
      this.render();
    });
  }
  // wil have and all child class not necessary to have it
  public regionsMap(): { [key: string]: string } {
    return {};
  }

  public eventsMap(): { [key: string]: () => void } {
    return {};
  }

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

  public onRender(): void {}

  public render(): void {
    this.parent.innerHTML = "";
    // make string to html template elelments
    // our fragment
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    // we should add event handler to html
    // content is DocumentFragment type = hold some html memory before attch to dom ==> use helper
    this.bindEvents(templateElement.content); // pass doc frag created by template();
    // helper method
    this.mapRegions(templateElement.content);

    // setup view nesting here
    this.onRender();

    // this is root we give on creation
    this.parent.append(templateElement.content);
  }
}
