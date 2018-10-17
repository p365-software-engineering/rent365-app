export class ChatMessage {

    messageID: string;
    sentAt: number;
    isRead: boolean;
    // senderID: string;
    // receiverID: string;
    messageText: string;
    chatThreadID: string;

    constructor(obj?: any) {
        this.messageID          = obj.messageID;
        this.isRead             = obj.isRead || false;
        this.sentAt             = obj.sentAt;
        this.messageText        = obj.messageText;
        this.chatThreadID       = obj.chatThreadID;
    }
}

export class ChatThread {

    chatThreadID: string;
    // senderID: string;
    // receiverID: string;

    constructor(obj?: any) {
        this.chatThreadID         = obj.chatThreadID;
        // this.senderID             = obj.senderID;
        // this.receiverID           = obj.receiverID;
    }
}