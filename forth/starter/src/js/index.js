// Global app controller
import Search from './models/Search';
import * as SearchView from './views/SearchView';
import { els, renderLoader, clearLoader } from './views/base';
//
// globe state of app;
// search object
// current recipe
// shopping list
// like recipe
const state = {
  search: {},
  current: '',
  shopping: ''
};

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

    // search for recipes
    await state.search.getResult();

    // render result to ui
    clearLoader();
    SearchView.renderResults(state.search.results);
  }
};

els.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
