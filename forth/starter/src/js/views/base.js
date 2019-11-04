// these base will use by numoreous models and views

export const els = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  searchResultList: document.querySelector('.results__list'),
  searchResults: document.querySelector('.results'),
  searchResultsPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe')
};

export const elsStrings = {
  loader: 'loader'
};

export const renderLoader = parent => {
  const loader = `
    <div class="${elsStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elsStrings.loader}`);
  if (loader) {
    loader.parentNode.removeChild(loader);
  }
};
