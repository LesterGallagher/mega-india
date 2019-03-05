
export class ChatMessage {
    constructor(content, timestamp, senderName, senderUid, isSelf, id, inline) {
        this.content = content;
        this.timestamp = timestamp;
        this.senderName = senderName;
        this.senderUid = senderUid;
        this.isSelf = isSelf;
        this.id = id;
        this.inline = inline;
    }
}
