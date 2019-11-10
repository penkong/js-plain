//
const searchUser = document.getElementById('searchUser');

const github = new Github();
const ui = new UI();
//
searchUser.addEventListener('keyup', e => {
  // get text input
  const userText = e.target.value;
  if (userText) {
    // make http call
    github
      .getUser(userText)
      .then(data => {
        if (data.profile.message === 'Not Found') {
          // show alert user not found
          // ui make here;
          ui.showAlert('user Not found', 'alert alert-danger');
        } else {
          // show profile
          // ui do this;
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
        }
      })
      .catch(err => console.log(err));
  } else {
    // if del input we want profile to disappear;
    // clear profile by ui
    ui.clearProfile();
  }
});
