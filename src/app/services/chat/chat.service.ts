import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ChatThread, ChatMessage } from 'app/models/chat';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatThreadsCollection: AngularFirestoreCollection<ChatThread>;

  constructor(private afs: AngularFirestore,
              private _httpclient: HttpClient) { 
    this.chatThreadsCollection = afs.collection<ChatThread>('chat-threads');
  }

  // TODO: See below
  createSenderID = () => {
    return;
  }

  // Might need to be observed
  getIpAddress() {
    const url = 'http://ipv4.myexternalip.com/json';
    // return new Promise((res, rej) => {
    //   this._httpclient.get(url).toPromise().then((result: any) => {
    //       res(result.ip);
    //   });
    // });
    return this._httpclient.get(url);
  }

  // TODO: senderID: string ???
  createNewChatThread() {
    return this.getIpAddress().toPromise().then((result: any) => {
      const chatThreadID = result.ip || this.afs.createId();
      const chatThreadObj = <ChatThread> {
          chatThreadID: chatThreadID
      };
      return this.chatThreadsCollection
        .doc(chatThreadID)
        .set(chatThreadObj);
    });
  }

  getMessagesForChat(activeThreadID: string) {
    return this.chatThreadsCollection
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
    return this.chatThreadsCollection
      .doc(chatThreadID)
      .collection('Messages')
      .doc(messageID)
      .set(chatThreadObj);
  }

  markMessageAsRead(chatThreadID: string, messageID: string) {
    return this.chatThreadsCollection
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
    this.chatThreadsCollection
      .doc(chatThreadID)
      .get()
      .forEach(message => batch.delete(message.ref));
    batch.delete(this.afs.collection('ChatThreads').doc(chatThreadID).ref);
    return batch.commit();
  }

}
