// namespace App {
//   // ==========================================================
// Component Base class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  tempEl: HTMLTemplateElement;
  hostEl: T;
  el: U;

  constructor(
    templateId: string,
    hostElId: string,
    insertAtStart: boolean,
    newElId?: string
  ) {
    this.tempEl = <HTMLTemplateElement>document.getElementById(templateId)!;
    this.hostEl = <T>document.getElementById(hostElId)!;
    const importedNode = document.importNode(this.tempEl.content, true);
    this.el = <U>importedNode.firstElementChild;
    if (newElId) {
      this.el.id = newElId;
    }
    this.attach(insertAtStart);
  }

  // can be private
  abstract renderContent(): void;
  abstract configure(): void;

  // load up to dom
  private attach(insertAtBeginning: boolean) {
    this.hostEl.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.el
    );
  }
}
// }
