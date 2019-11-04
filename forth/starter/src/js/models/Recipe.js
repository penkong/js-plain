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

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounce',
      'ounces',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds'
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound'
    ];
    const units = [...unitsShort, 'kg', 'g'];
    const newIngredients = this.ingredients.map(el => {
      // uniform units;
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });
      // remove parantheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, '');
      // parse ingre into count
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // there is unit
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }
        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };
      } else if (unitIndex === -1) {
        // there is no unit
        objIng = {
          count: 1,
          unti: '',
          ingredient
        };
      } else if (parseInt(arrIng[0], 10)) {
        // there is no unti but first el is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        };
      }
      return objIng;
    });
    this.ingredients = newIngredients;
  }
}
