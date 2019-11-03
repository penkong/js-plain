//
import axios from 'axios';
import { SEARCH_URL, FOOD } from '../constants';
//
export default class Search {
  constructor(q) {
    this.q = q;
  }

  async getResult() {
    try {
      const res = await axios(`${SEARCH_URL}?key=${FOOD}&q=${this.q}`);
      this.results = res.data.recipes;
    } catch (error) {
      console.log(error);
    }
  }
}
