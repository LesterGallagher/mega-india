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
    }

    init = async () => {
        this.chatMeta = await this.getChatsMetas();
        this.isReady = true;
        this.emit('change');
    }

    getChatMetaIds = async () => {
        return [];
    }

    getField = async (objectID, key) => {
        await firebase.ready;
        const snapshot = await firebase.database().ref(`/chats/personal/${objectID}/${key}`).once('value');
        return snapshot.val();
    }

    getSingleChatMeta = async (objectID) => {
        await firebase.ready;
        const [title, slug, isLeaf] = await Promise.all(
            ['title', 'slug', 'isLeaf'].map(key => this.getField(objectID, key))
        );
        return new ChatMeta(title, isLeaf, slug, objectID);
    }

    getChatMetaItem = otherUidSlug => {
        const myUid = AuthStore.user.uid;
        const uid1 = myUid > otherUidSlug ? otherUidSlug : myUid;
        const uid2 = myUid > otherUidSlug ? myUid : otherUidSlug;
        this.trySetChatToUserData(otherUidSlug);
        return {
            title: "",
            isLeaf: false,
            slug: otherUidSlug,
            objectID: `${uid1}/${uid2}`
        };
    }

    getChatsMetas = async () => {
        await firebase.ready;
        const objectIDs = await this.getChatMetaIds();
        return await Promise.all(objectIDs.map(this.getSingleChatMeta));
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
        if (this.threads[chatMeta.objectID]) return this.threads[chatMeta.objectID];
        await firebase.ready;
        const chatThread = ChatThread.fromChatMeta(chatMeta, firebase.database().ref(`/chats/personal/${chatMeta.objectID}/thread`));
        this.threads[chatMeta.objectID] = chatThread;
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
