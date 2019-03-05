import { firebaseReady } from '../authentication';

export class ChatMeta {
    constructor(title, isLeaf, slug, id) {
        this.title = title;
        this.isLeaf = isLeaf;
        this.slug = slug;
        this.id = id;
    }
}
