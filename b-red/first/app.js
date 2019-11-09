//
// UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// load event listeners
loadEventListeners();

//
function loadEventListeners() {
  // DOM load events
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;
  localStorage.getItem('tasks') === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem('tasks')));
  tasks.forEach(task => {
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // textNode;
    li.appendChild(document.createTextNode(task));
    //
    // create new link el for del
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    //
    // append
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('add task');
  }
  // create li el;
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // textNode;
  li.appendChild(document.createTextNode(taskInput.value));
  //
  // create new link el for del
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  //
  // append
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);
  // store in ls
  storeTaskInLs(taskInput.value);
  // clear input
  taskInput.value = '';
}

function storeTaskInLs(task) {
  let tasks;
  localStorage.getItem('tasks') === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem('tasks')));
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    //
    if (confirm('are you sure?')) {
      e.target.parentElement.parentElement.remove();
      // rm from ls
      removeTaskFromLs(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLs(taskItem) {
  let tasks;
  localStorage.getItem('tasks') === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem('tasks')));
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  e.preventDefault();
  // taskList.innerHTML = '';
  // faster
  // innerHtml vs removeChild
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear from ls;
  clearTasksFromLs();
}

function clearTasksFromLs() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== 1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
