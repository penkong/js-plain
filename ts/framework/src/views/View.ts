import { Model } from "../models/Model";
//
interface ViewModel {
  on(eventName: string, cb: () => void): void;
}
//
export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    // do this on creation == created
    this.bindModel();
  }

  abstract template(): string;

  public regionsMap(): { [key: string]: string } {
    return {};
  }

  public eventsMap(): { [key: string]: () => void } {
    return {};
  }

  public bindModel(): void {
    this.model.on("change", () => {
      // for re render when on change
      this.render();
    });
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

  public mapRegions(fragment: DocumentFragment): void {
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
    this.parent.append(templateElement.content);
  }
}
