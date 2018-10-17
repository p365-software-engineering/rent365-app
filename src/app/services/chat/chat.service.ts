import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatThread, ChatMessage } from 'app/models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private afs: AngularFirestore) { }

  // TODO: See below
  createSenderID = () => {
    return;
  }

  // TODO: senderID: string ???
  createNewChatThread() {
    const chatThreadID = this.afs.createId();
    const chatThreadObj = <ChatThread> {
        chatThreadID: chatThreadID
    };
    return this.afs.collection('ChatThreads')
      .doc(chatThreadID)
      .set(chatThreadObj);
  }

  getMessagesForChat(activeThreadID: string) {
    return this.afs.collection('ChatThreads')
      .doc(activeThreadID)
      .collection('Messages');
  }

  sendMessage(chatThreadID: string, messageText: string) {
    const messageID = this.afs.createId();
    const chatThreadObj = <ChatMessage> {
      messageID: messageID,
      isRead: false,
      sentAt: Date.now(),
      messageText: messageText,
      chatThreadID: chatThreadID,
    };
    return this.afs.collection('ChatThreads')
      .doc(chatThreadID)
      .collection('Messages')
      .doc(messageID)
      .set(chatThreadObj);
  }

  markMessageAsRead(chatThreadID: string, messageID: string) {
    return this.afs.collection('ChatThreads')
      .doc(chatThreadID)
      .collection('Messages')
      .doc(messageID)
      .update({
        read: true
      });
  }

  // TODO: Concurrency / overlapping request issue predictions
  closeThread(chatThreadID: string) {
    const batch = this.afs.firestore.batch();
    this.afs.collection('ChatThreads')
      .doc(chatThreadID)
      .get()
      .forEach(message => batch.delete(message.ref));
    batch.delete(this.afs.collection('ChatThreads').doc(chatThreadID).ref);
    return batch.commit();
  }

}
