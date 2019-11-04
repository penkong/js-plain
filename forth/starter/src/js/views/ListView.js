//
import { els } from './base';

// -----------------------------------------------------------

export const renderItem = item => {
  const { id, count, unit, ingredient } = item;
  const markup = `
    <li class="shopping__item" data-itemid=${id}>
      <div class="shopping__count">
        <input type="number" value="${count}" step="${count}" class="shopping__count-value">
        <p>${unit}</p>
      </div>
      <p class="shopping__description">${ingredient}</p>
      <button class="shopping__delete btn-tiny">
        <svg>
          <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
      </button>
    </li>
  `;
  els.shopping.insertAdjacentHTML('beforeend', markup);
};

// ------------------------------------------------------------

export const deleteItem = item => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) {
    item.parentElement.removeChild(item);
  }
};
