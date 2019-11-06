//
const addForms = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const generateTemplate = todo => {
  const markup = `
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += markup;
};

addForms.addEventListener('submit', e => {
  e.preventDefault();
  const todo = addForms.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForms.reset();
  }
});

list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});

const filterTodos = term => {
  Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));
  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();

  filterTodos(term);
});
