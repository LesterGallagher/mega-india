import firebase from '../../lib/firebase';

export default class PublicChatListItem {
    constructor(uid, blocked, userPublicData) {
        this.uid = uid;
        this.blocked = blocked;
        this.userPublicData = userPublicData;
    }

    static create = async (publicChatInfo) => {
        const uid = publicChatInfo.uid;
        const blocked = publicChatInfo.blocked;
        const userPublicData = await firebase.database().ref(`/users/${uid}/public`)
            .once('value');
        return new PublicChatListItem(uid, blocked, userPublicData.val());
    }
}
