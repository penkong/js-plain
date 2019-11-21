import { Model } from "./Model";
import { Attributes } from "./Atrributes";
import { ApiSync } from "./ApiSync";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";
//
export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}
//
const url = "http://localhost:3000/users";
// it can work for blog posts also
export class User extends Model<UserProps> {
  //
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(url)
    );
  }

  // this json become val when we call fetch on collection
  static buildUserCollection(): Collection<User, UserProps> {
    //
    return new Collection<User, UserProps>(url, (json: UserProps) =>
      User.buildUser(json)
    );
  }
  // ---------------------------------------------------------------
  // because of probably more useage by other app we add
  // random age on class model itself
  public setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
