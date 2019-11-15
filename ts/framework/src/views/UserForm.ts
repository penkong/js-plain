import { View } from "./View";
import { User, UserProps } from "../models/User";
// when we have bio directional relationship maybe compsition is not good
export class UserForm extends View<User, UserProps> {
  public eventsMap(): { [key: string]: () => void } {
    return {
      // left side of string become query selector all
      // all event handler go to be arrow functions
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveClick
    };
  }

  // ---------------------------------------------
  // events must be arrow funcs
  public onSaveClick = (): void => {
    this.model.save();
  };

  public onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  public onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };
  // -----------------------------------------------------

  public template(): string {
    return `
      <div>
        <input placeholder="${this.model.get("name")}"/>
        <br>
        <br>
        <button class="set-name">update name</button>
        <br>
        <br>
        <button class="set-age">set random age</button>
        <br>
        <br>
        <button class="save-model">save</button>
      </div>
    `;
  }
}
