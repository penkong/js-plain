/// <reference path="base-component.ts" />

namespace App {
  // ==========================================================
  // for rendering single item
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project;

    get persons() {
      if (this.project.people === 1) {
        return "1 person";
      } else {
        return `${this.project.people} persons`;
      }
    }

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
    }

    @AutoBind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData("text/plain", this.project.id);

      event.dataTransfer!.effectAllowed = "move";
    }

    dragEndHandler(event: DragEvent) {
      const projId = event.dataTransfer!.getData("text/plain");
    }

    configure() {
      this.el.addEventListener("dragstart", this.dragStartHandler);
      this.el.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent() {
      this.el.querySelector("h2")!.textContent = this.project.title;
      this.el.querySelector("h3")!.textContent = this.persons + "assigned";
      this.el.querySelector("p")!.textContent = this.project.description;
    }
  }
}
