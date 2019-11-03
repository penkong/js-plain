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
    <a class="results__link" href="${recipe_id}">
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
export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};
