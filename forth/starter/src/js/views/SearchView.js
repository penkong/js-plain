//
import { els } from './base';
//--------------------------------------------------

export const getInput = () => els.searchInput.value;

// -------------------------------------------------

export const clearInput = () => {
  els.searchInput.value = '';
};
//----------------------------------------------------

export const clearResults = () => {
  els.searchResultList.innerHTML = '';
  els.searchResultsPages.innerHTML = '';
};

// ----------------------------------------------------

export const highLightedSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(el => el.classList.remove('results__link--active'));
  document
    .querySelector(`a[href*="${id}"]`)
    .classList.add('results__link--active');
};

// ----------------------------------------------------

const limitRecipeName = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, curr) => {
      if (acc + curr.length <= limit) {
        newTitle.push(curr);
      }
      // new acc
      return acc + curr.length;
    }, 0);
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

// --------------------------------------------------

const renderRecipe = recipe => {
  const { recipe_id, image_url, title, publisher } = recipe;
  const markup = `
  <li>
    <a class="results__link" href="#${recipe_id}">
        <figure class="results__fig">
            <img src="${image_url}" alt="${title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeName(title)}</h4>
            <p class="results__author">${publisher}</p>
        </div>
    </a>
  </li>
  `;
  els.searchResultList.insertAdjacentHTML('beforeend', markup);
};

// ----------------------------------------------------

const createBtn = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
          type === 'prev' ? 'left' : 'right'
        }"></use>
    </svg>
  </button>
`;

const renderPaginationBtns = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    // to next page
    button = createBtn(page, 'next');
  } else if (page === pages && pages > 1) {
    // to prev page
    button = createBtn(page, 'prev');
  } else if (page < pages) {
    // both button need
    button = `${createBtn(page, 'prev')} ${createBtn(page, 'next')}`;
  }
  els.searchResultsPages.insertAdjacentHTML('beforeend', button);
};

// --------------------------------------------------------------------

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  renderPaginationBtns(page, recipes.length, resPerPage);
};
