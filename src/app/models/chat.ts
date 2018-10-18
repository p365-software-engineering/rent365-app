export class ChatMessage {

    messageID: string;
    sentAt: number;
    isRead: boolean;
    sender: string;
    messageText: string;
    chatThreadID: string;

    constructor(obj?: any) {
        this.messageID          = obj.messageID;
        this.isRead             = obj.isRead || false;
        this.sentAt             = obj.sentAt;
        this.messageText        = obj.messageText;
        this.sender             = obj.sender;
        this.chatThreadID       = obj.chatThreadID;
    }
}

export class ChatThread {

    chatThreadID: string;

    constructor(obj?: any) {
        this.chatThreadID         = obj.chatThreadID;
    }
}
