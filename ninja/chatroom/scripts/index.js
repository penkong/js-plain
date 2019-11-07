//
// dom queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const updagteMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// add new chat
newChat.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChat.message.value.trim();
  chat
    .addNewChat(message)
    .then(() => {
      newChat.reset();
    })
    .catch(err => console.log(err));
});

// update user name
newName.addEventListener('click', e => {
  e.preventDefault();
  const name = newName.name.value.trim();
  chat.updateUserName(name);
  // reset form
  newName.reset();
  // show and hid message;
  if (name) {
    updagteMssg.innerText = `Your name updated to ${name}`;
    setTimeout(() => {
      updagteMssg.innerText = '';
    }, 3000);
  }
});

// update chat room
rooms.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    console.log('clicked');
    chatUI.clearChats();
    chat.updateChatRoom(e.target.getAttribute('id'));
    chat.getChats(chat => {
      chatUI.renderChat(chat);
    });
  }
});

// check local storage for name
const username = localStorage.username ? localStorage.username : 'none';

// init app here controller
const chatUI = new ChatUI(chatList);
const chat = new Chat('general', username);

chat.getChats(data => chatUI.renderChat(data));
