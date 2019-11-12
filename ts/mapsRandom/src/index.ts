// parcel index.html
// to inform ts from global object need to install type definitio9n of it
// declare namespace means there will be a global var named sth
import { User } from "./User";
import { Company } from "./Company";
import { GMap } from "./Map";

const user = new User();
const company = new Company();
const map = new GMap("maphere");
map.addMarker(user);
map.addMarker(company);
