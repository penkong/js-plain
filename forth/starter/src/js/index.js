// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as SearchView from './views/SearchView';
import * as RecipeView from './views/RecipeView';
import * as ListView from './views/ListView';
import { els, renderLoader, clearLoader } from './views/base';
// ------------------------------------------------------------
// --------------------------- STATE ----------------------------

// globe state of app;
// search object
// current recipe
// shopping list
// like recipe
const state = {};

// ------------------------------------------------------------
// --------------------------- SEARCH -----------------------------
const controlSearch = async () => {
  // get query from the view
  const q = SearchView.getInput();

  if (q) {
    // search object and add to state
    state.search = new Search(q);

    // prepare ui for result
    // --- clear input
    SearchView.clearInput();
    // --- clear last results
    SearchView.clearResults();
    renderLoader(els.searchResults);
    try {
      // search for recipes
      await state.search.getResult();

      // render result to ui
      clearLoader();
      SearchView.renderResults(state.search.results);
    } catch (error) {
      console.log(error);
      clearLoader();
    }
  }
};

els.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
// btns under list show pagination
els.searchResultsPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    SearchView.clearResults();
    SearchView.renderResults(state.search.results, goToPage);
  }
});

// -------------------------------------------------------------------

// -------------------------- GET Recipe ----------------------------
// respond to hashchange event
// for read data from url
// how to add same event listener to multiple events.

const controlRecipe = async () => {
  // get id from url
  const id = window.location.hash.replace('#', '');
  if (id) {
    RecipeView.clearRecipe();
    renderLoader(els.recipe);

    if (state.search) {
      SearchView.highLightedSelected(id);
    }

    // create recipe object.
    state.recipe = new Recipe(id);
    try {
      // get recipe data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      // calculate serving time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      clearLoader();
      RecipeView.renderRecipe(state.recipe);
    } catch (error) {
      console.log(error);
    }
  }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));
// ------------------------------------------------------------------

// ------------------------------ LIST -------------------------------

const controlList = () => {
  // create a new list if there is not yet
  if (!state.list) state.list = new List();
  // add each ingredient to the list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    ListView.renderItem(item);
  });
};
// ------------------------------------------------------------

// handle delete and update list item
els.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // handle del btn
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from state
    state.list.deleteItem(id);

    // delete from ui
    ListView.deleteItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value);
    state.list.updateCount(id, val);
  }
});
// ------------------------------------------------------------------
// handling recipe btn clicks
els.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // decrease is click
    if (state.recipe.servings) {
      state.recipe.updateServings('dec');
      RecipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // increase is click
    state.recipe.updateServings('inc');
    RecipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }
});
