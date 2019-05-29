import { ChatMeta } from "../lib/chats/chat-meta";
import { ChatThread } from "../lib/chats/chat-thread";
import AbstractChatStore from "./AbstractChatStore";
import firebase from '../lib/firebase';
import AuthStore from "./AuthStore";

class PublicChatStore extends AbstractChatStore {
    constructor() {
        super();

        this.threads = {};
        this.init();
    }

    init = async () => {
        this.chatMeta = await this.getChatsMetas();
        console.log(this.chatMeta);
        this.isReady = true;
        this.emit('change');
    }

    chatMetaIds = (async () => {
        const response = await fetch(`https://megaindia-990a4.firebaseio.com/chats/public.json?shallow=true`);
        const json = await response.json();
        return Object.keys(json);
    })();

    getChatMetaItem = slug => {
        return this.chatMeta.find(meta => slug === meta.slug)
    }

    getField = async (id, key) => {
        await firebase.ready;
        console.log(firebase);
        const snapshot = await firebase.database().ref(`/chats/public/${id}/${key}`).once('value');
        return snapshot.val();
    }

    getSingleChatMeta = async (id) => {
        await firebase.ready;
        const [title, slug, isLeaf] = await Promise.all(
            ['title', 'slug', 'isLeaf'].map(key => this.getField(id, key))
        );
        return new ChatMeta(title, isLeaf, slug, id);
    }

    // getAllPublicChats = async () => {
    //     await firebase.ready;
    //     await AuthStore.readyPromise;
    //     const loggedIn = AuthStore.isAuthenticated;
    //     if (!loggedIn) return null;
    //     const snapshot = await firebase.database()
    //         .ref(`/users/${AuthStore.user.uid}/personalchatswithusers`)
    //         .once('value');
    //     const chats = snapshot.val() || {};
    //     return Object.keys(chats).map(key => {
    //         const chat = chats[key];
    //         chat.uid = key;
    //         return chat;
    //     }).filter(chat => chat.blocked !== true);
    // }

    getChatsMetas = async () => {
        await firebase.ready;
        const ids = await this.chatMetaIds;
        return await Promise.all(ids.map(this.getSingleChatMeta));
    };

    getChatSubjectsFlat = async () => {
        const chatMeta = await this.getChatsMetas();
        return chatMeta.slice().sort(this.amountOfSlashesSort);
    };
    
    getChatSubjects = async () => {
        const subjectsArray = await this.getChatSubjectsFlat();
        const subjects = [];
        subjectsArray.forEach(subject => this.nestChatSubject(subject, subjects));
        return subjects;
    };

    getChatThread = async chatMeta => {
        if (chatMeta === null) throw new Error('Invalid chatmeta');
        if (this.threads[chatMeta.id]) return this.threads[chatMeta.id];
        await firebase.ready;
        const chatThread = ChatThread.fromChatMeta(chatMeta, firebase.database().ref(`/chats/public/${chatMeta.id}/thread`));
        this.threads[chatMeta.id] = chatThread;
        return chatThread;  
    };
}

export default new PublicChatStore();
