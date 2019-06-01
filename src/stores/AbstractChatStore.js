import { ChatSubject } from "../lib/chats/chat-subjects";
import { EventEmitter } from "events";

export default class AbsctractChatStore extends EventEmitter {
    nestChatSubject = (subject, subjects = {}) => {
        let t = { sub: subjects };
        const path = subject.slug.split('/');
        try {
            for (let i = 0; i < path.length - 1; i++) {
                t = t.sub.find(child => child.slug === path[i]);
            }
            const newSlug = path[path.length - 1];
            t.sub.push(new ChatSubject(subject.title, newSlug, t, subject.isLeaf, subject.objectID));
        } catch (err) {
            throw new Error('Invalid Graph!', err);
        }
    }

    amountOfSlashes = str => str.replace(/[^\/]/g, '').length;
    amountOfSlashesSort = (a, b) => this.amountOfSlashes(a.slug) - this.amountOfSlashes(b.slug);
}