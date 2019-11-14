import axios, { AxiosPromise } from "axios";

interface HasId {
  id?: number;
}

//
// this is constraints on T
export class Sync<T extends HasId> {
  constructor(public url: string) {}

  public fetch(id: number): AxiosPromise {
    return axios.get(`${this.url}/${id}`);
  }

  public save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      return axios.put(`${this.url}/${id}`, data);
    } else {
      return axios.post(this.url, data);
    }
  }
}
