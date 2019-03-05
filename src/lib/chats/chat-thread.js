import { ChatMeta } from "./chat-meta";

export class ChatThread extends ChatMeta {
    constructor(title, slug, id, isLeaf, threadObserver) {
        super(title, isLeaf, slug, id);
        this.threadObserver = threadObserver;
    }

    static fromChatMeta(chatMeta, threadObserver) {
        return new ChatThread(
            chatMeta.title,
            chatMeta.slug,
            chatMeta.id,
            chatMeta.isLeaf,
            threadObserver);
    }
}