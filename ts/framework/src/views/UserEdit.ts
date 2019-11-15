import { View } from "./View";
import { User, UserProps } from "../models/User";
// import classes we want for nest
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
//

export class UserEdit extends View<User, UserProps> {
  regionsMap(): { [key: string]: string } {
    return {
      userShow: ".user-show",
      userForm: ".user-form"
    };
  }

  onRender(): void {
    // do nesting
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  public template(): string {
    return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
  }
}
