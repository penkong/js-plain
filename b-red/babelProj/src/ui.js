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
}

export const ui = new UI();
