class UI {
  constructor() {
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.post = document.querySelector('#posts');
    this.forState = 'add';
  }

  showPosts(posts) {
    let output = ``;
    posts.forEach(({ title, body, id }) => {
      output += `
        <div class="card mb-1">
          <div class="card-body">
            <h4 class="card-title">${title}</h4>
            <p class="card-text">${body}</p>
            <a href="#" class="edit card-link" data-id="${id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });
    this.post.innerHTML = output;
  }

  showAlert(msg, className) {
    this.clearFields();
    // create
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(msg));
    // get parent
    const container = document.querySelector('.postsContainer');
    // get posts
    const posts = document.querySelector('#posts');
    // insert alert
    container.insertBefore(div, posts);
    // time out
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currAlert = document.querySelector('.alert');
    if (currAlert) {
      currAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  fillForm(post) {
    this.titleInput.value = post.title;
    this.bodyInput.value = post.body;
    this.idInput.value = post.id;

    this.changeFormState('edit');
  }

  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'update post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';
      // create cancel btn
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));
      // insert parent
      const cardForm = document.querySelector('.card-form');
      // get element before enter
      const formEnd = document.querySelector('.form-end');
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      // remove cancel btn
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
        // clear id from field;
        this.clearIdInput();
        this.clearFields();
      }
    }
  }

  clearIdInput() {
    this.idInput.value = '';
  }
}

export const ui = new UI();
