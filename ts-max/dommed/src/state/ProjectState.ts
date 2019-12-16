// ==========================================================
// Project state management : singletons
// we don't know in future listener back us arr of projects or els //
// therefore use of generics
namespace App {
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    // subscription pattern by listeners list of funcs
    // private listeners: Listener[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;
    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    // addListener(listenerFn: Listener) {
    //   this.listeners.push(listenerFn);
    // }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }

    // for switch states
    // drag drop
    move(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(prj => prj.id === projectId);

      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  // singleton pattern by private constructor
  export const projectState = ProjectState.getInstance();
}
