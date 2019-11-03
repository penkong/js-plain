//
import axios from 'axios';
import { GET_URL, FOOD } from '../constants';
//
export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`${GET_URL}?key=${FOOD}&Id=${this.id}`);
      const {
        title,
        publisher,
        image_url,
        source_url,
        ingredients
      } = res.data.recipe;
      this.title = title;
      this.author = publisher;
      this.img = image_url;
      this.url = source_url;
      this.ingredients = ingredients;
    } catch (error) {
      console.log(error);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}
