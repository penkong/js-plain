//
// dom queries
const chatList = document.querySelector('.chat-list');

// init app here controller
const chatUI = new ChatUI(chatList);
const chat = new Chat('game', 'mk');

chat.getChats(data => chatUI.renderChat(data));
