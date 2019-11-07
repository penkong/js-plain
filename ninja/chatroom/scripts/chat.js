//
class Chat {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chat');
    this.unsub;
  }
  async addNewChat(message) {
    const { username, room } = this;
    // make chat obj;
    const now = new Date();
    const chat = {
      message,
      username,
      room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save chat
    const res = await this.chats.add(chat);
    return res;
  }
  getChats(cb) {
    const { chats, room } = this;
    this.unsub = chats
      .where('room', '==', room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            // update ui;
            cb(change.doc.data());
          }
        });
      });
  }

  updateUserName(newName) {
    this.username = newName;
    localStorage.setItem('username', username);
  }

  updateChatRoom(newRoom) {
    this.room = newRoom;
    if (this.unsub) {
      this.unsub();
    }
  }
}
