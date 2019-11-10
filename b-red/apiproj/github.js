//
class Github {
  constructor() {
    this.cliend_id = 'a96eb6360ddaa7fb057e';
    this.secret = '1b467cc21c19e504bdaedef7c1741acb83fb9a06';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileRes = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.cliend_id}&client_secret=${this.secret}`
    );
    const reposRes = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.cliend_id}&client_secret=${this.secret}`
    );
    const profile = await profileRes.json();
    const repos = await reposRes.json();
    return { profile, repos };
  }
}
