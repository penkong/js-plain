// Global app controller
import axios from 'axios';
import { SEARCH_URL, FOOD } from './constants';
//
async function getResult(q) {
  try {
    const result = await axios(`${SEARCH_URL}?key=${FOOD}&q=${q}`);
    const recipes = result.data.recipes;
    console.log(recipes);
  } catch (error) {
    console.log(error);
  }
}

getResult('pizza');
