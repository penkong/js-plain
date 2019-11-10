//
class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }
  showProfile(user) {
    // console.log(user);
    const {
      avatar_url,
      html_url,
      public_reops,
      public_gists,
      followers,
      following,
      company,
      blog,
      location,
      created_at
    } = user;
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${avatar_url}">
            <a href="${html_url}" target="_blank" class="btn btn-primary btn-block mb-4">view profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">
              Public Repos: ${public_reops}
            </span>
            <span class="badge badge-secondary">
              Public Gists: ${public_gists}
            </span>
            <span class="badge badge-success">
              Followers : ${followers}
            </span>
            <span class="badge badge-info">
              Following: ${following}
            </span>
            <br>
            <br>
            <br>
            <ul class="list-group">
              <li class="list-group-item">Company : ${company}</li>
              <li class="list-group-item">Website/Blog : ${blog}</li>
              <li class="list-group-item">Location: ${location}</li>
              <li class="list-group-item">Member Since: ${created_at}</li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repos"></div>
    `;
  }

  showRepos(repos) {
    let output = '';
    repos.forEach(repo => {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">
                ${repo.name}
              </a>
            </div>
            <div class="col-md-6">
              <span class="badge badge-primary">
                Stars : ${repo.stargazers_count}
              </span>
              <span class="badge badge-secondary">
                Watchers : ${repo.watchers}
              </span>
              <span class="badge badge-success">
                Forks : ${repo.forms_count}
              </span>
            </div>
          </div>
        </div>
      `;
    });
    // out put reps
    document.getElementById('repos').innerHTML = output;
  }

  clearProfile() {
    this.profile.innerHTML = '';
  }

  clearAlert() {
    const currAlert = document.querySelector('.alert');
    if (currAlert) {
      currAlert.remove();
    }
  }

  showAlert(msg, className) {
    // clear remain alert
    this.clearAlert();
    //
    const div = document.createElement('div');
    div.className = className;
    // add text
    div.appendChild(document.createTextNode(msg));
    // get parent
    const container = document.querySelector('.searchContainer');
    const search = document.querySelector('.search');
    //
    container.insertBefore(div, search);
    // time out alert
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
}
