//
// render chat temple to dom
// clear list of chats
class ChatUI {
  // list is element that we want render to it
  constructor(list) {
    this.list = list;
  }
  // data is single chat object
  renderChat(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true
    });
    const markup = `
      <li class="list-group-item">
        <span class="username">${data.username} :</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
      </li>
    `;
    this.list.innerHTML += markup;
  }
}
