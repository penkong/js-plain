/// <reference path="base-component.ts" />

namespace App {
  // ==========================================================
  // Project List class
  // responsible to out put to screen;
  export class ProjectList extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    //
    // tempEl: HTMLTemplateElement;
    // hostEl: HTMLDivElement;
    // el: HTMLElement;
    assignedProjects: Project[] = [];

    // for id there is two kind of project active and inactive
    constructor(private type: "active" | "finished") {
      // before super finish runnig we can not use this;
      // point
      super("project-list", "app", false, `${type}-projects`);
      // this.tempEl = <HTMLTemplateElement>document.getElementById("project-list")!;
      // this.hostEl = <HTMLDivElement>document.getElementById("app")!;
      // ------------------------------
      // to immedietly run content of template to dom on making class we use it on constructor
      // true == means do with deep clone;
      // const importedNode = document.importNode(this.tempEl.content, true);
      // ---------------------------/
      // this point to real element we want that form inside template
      // this.el = <HTMLElement>importedNode.firstElementChild;
      // this.el.id = `${this.type}-projects`;
      // list of projects come from top
      // this.assignedProjects = [];
      // projectState.addListener((projects: Project[]) => {
      //   const relevantProjects = projects.filter(proj => {
      //     if (this.type === "active") {
      //       return proj.status === ProjectStatus.Active;
      //     }
      //     return proj.status === ProjectStatus.Finished;
      //   });
      //   this.assignedProjects = relevantProjects;
      //   this.renderProjects();
      // });
      //
      // this.attach();
      this.configure();
      this.renderContent();
    }

    private renderProjects() {
      const listEl = <HTMLUListElement>(
        document.getElementById(`${this.type}-projects-list`)!
      );
      listEl.innerHTML = "";
      for (const projItem of this.assignedProjects) {
        // const listItem = document.createElement("li");
        // listItem.textContent = projItem.title;
        // listEl.appendChild(listItem);
        new ProjectItem(this.el.querySelector("ul")!.id, projItem);
      }
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listEl = this.el.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
      const projId = event.dataTransfer!.getData("text/plain");
      projectState.move(
        projId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    dragLeaveHandler(event: DragEvent): void {
      const listEl = this.el.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    // render content base of type of project
    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.el.querySelector("ul")!.id = listId;
      this.el.querySelector("h2")!.textContent =
        this.type.toUpperCase() + "PROJECTS";
    }

    configure() {
      this.el.addEventListener("dragover", this.dragOverHandler);
      this.el.addEventListener("dragleave", this.dragLeaveHandler);
      this.el.addEventListener("drop", this.dropHandler);
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
    }

    // attach to dom;
    // private attach() {
    //   this.hostEl.insertAdjacentElement("beforeend", this.el);
    // }
  }
}
