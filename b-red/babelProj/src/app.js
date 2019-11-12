//
import { http } from './http';
import { ui } from './UI';

// get posts on dom load
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;
  const data = {
    title,
    body
  };
  if (!title || !body) {
    ui.showAlert('please fill fields', 'alert alert-danger');
  } else {
    if (!id) {
      // create post
      http
        .post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post addeD', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // update it
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post addeD', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

// listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

function enableEdit(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    };

    // fill the form with curr post
    ui.fillForm(data);
  }
}

// listen for cancel edit mode

document.querySelector('.card-form').addEventListener('click', canceEdit);

function canceEdit(e) {
  e.preventDefault();
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
}

// listen for delete

document.querySelector('#posts').addEventListener('click', deletePost);

function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post removeD', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}
