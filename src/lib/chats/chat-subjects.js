

export class ChatSubject {
    constructor(title, slug, parent, isLeaf, id) {
        this.title = title;
        this.slug = slug;
        this.parent = parent;
        this.sub = isLeaf ? undefined : [];
        this.isLeaf = isLeaf;
        this.id = id;
    }
}

