import { EventEmitter } from "events";
import { ChatMeta } from "../lib/chats/chat-meta";
import { ChatThread } from "../lib/chats/chat-thread";
import AbstractChatStore from "./AbstractChatStore";
import AuthStore from "./AuthStore";
import firebase from '../lib/firebase';

class PersonalChatStore extends AbstractChatStore {
    constructor() {
        super();

        this.threads = {};
        this.init();

        setTimeout(async () => {
            console.log(await this.getAllPersonalChats());
        }, 3000);
    }

    init = async () => {
        this.chatMeta = await this.getChatsMetas();
        console.log(this.chatMeta);
        this.isReady = true;
        this.emit('change');
    }

    getChatMetaIds = async () => {
        return [];
    }

    getField = async (id, key) => {
        await firebase.ready;
        const snapshot = await firebase.database().ref(`/chats/personal/${id}/${key}`).once('value');
        return snapshot.val();
    }

    getSingleChatMeta = async (id) => {
        await firebase.ready;
        const [title, slug, isLeaf] = await Promise.all(
            ['title', 'slug', 'isLeaf'].map(key => this.getField(id, key))
        );
        return new ChatMeta(title, isLeaf, slug, id);
    }

    getChatMetaItem = otherUidSlug => {
        console.log('getChatMetaItem', otherUidSlug);
        const myUid = AuthStore.user.uid;
        const uid1 = myUid > otherUidSlug ? otherUidSlug : myUid;
        const uid2 = myUid > otherUidSlug ? myUid : otherUidSlug;
        this.trySetChatToUserData(otherUidSlug);
        return {
            "title": "",
            "isLeaf": false,
            "slug": otherUidSlug,
            "id": `${uid1}/${uid2}`
        };
    }

    getChatsMetas = async () => {
        await firebase.ready;
        const ids = await this.getChatMetaIds();
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
        if (chatMeta === null) throw new Error('Invalid chat meta');
        if (this.threads[chatMeta.id]) return this.threads[chatMeta.id];
        await firebase.ready;
        const chatThread = ChatThread.fromChatMeta(chatMeta, firebase.database().ref(`/chats/personal/${chatMeta.id}/thread`));
        this.threads[chatMeta.id] = chatThread;
        return chatThread;
    };

    getAllPersonalChats = async () => {
        await firebase.ready;
        await AuthStore.readyPromise;
        const loggedIn = AuthStore.isAuthenticated;
        if (!loggedIn) return null;
        const snapshot = await firebase.database()
            .ref(`/users/${AuthStore.user.uid}/personalchatswithusers`)
            .once('value');
        const chats = snapshot.val() || {};
        return Object.keys(chats).map(key => {
            const chat = chats[key];
            chat.uid = key;
            return chat;
        }).filter(chat => chat.blocked !== true);
    }

    trySetChatToUserData = async (otherUserUid) => {
        await firebase.ready;
        await AuthStore.readyPromise;
        const loggedIn = AuthStore.isAuthenticated;
        if (!loggedIn) return false;
        const snapshot = await firebase.database()
            .ref(`/users/${AuthStore.user.uid}/personalchatswithusers/${otherUserUid}`)
            .once('value');
        if (snapshot.val() === null) {
            await await firebase.database()
                .ref(`/users/${AuthStore.user.uid}/personalchatswithusers/${otherUserUid}`)
                .set({
                    blocked: false
                });
            const snapshot2 = await firebase.database()
                .ref(`/users/${otherUserUid}/personalchatswithusers/${AuthStore.user.uid}`)
                .once('value');
            if (snapshot2.val() === null) {
                await await firebase.database()
                    .ref(`/users/${otherUserUid}/personalchatswithusers/${AuthStore.user.uid}`)
                    .set({
                        blocked: false
                    });
            }
        }
    }
}

export default new PersonalChatStore();
