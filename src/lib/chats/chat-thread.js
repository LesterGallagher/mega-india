import { ChatMeta } from "./chat-meta";

export class ChatThread extends ChatMeta {
    constructor(title, slug, objectID, isLeaf, threadObserver) {
        super(title, isLeaf, slug, objectID);
        this.threadObserver = threadObserver;
    }

    static fromChatMeta(chatMeta, threadObserver) {
        return new ChatThread(
            chatMeta.title,
            chatMeta.slug,
            chatMeta.objectID,
            chatMeta.isLeaf,
            threadObserver);
    }
}