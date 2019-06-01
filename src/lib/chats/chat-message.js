
export class ChatMessage {
    constructor(content, timestamp, senderName, senderUid, isSelf, objectID, inline) {
        this.content = content;
        this.timestamp = timestamp;
        this.senderName = senderName;
        this.senderUid = senderUid;
        this.isSelf = isSelf;
        this.objectID = objectID;
        this.inline = inline;
    }
}
