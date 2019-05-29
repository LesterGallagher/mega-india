import firebase from '../../lib/firebase';

export default class PersonalChatListItem {
    constructor(uid, blocked, userPublicData) {
        this.uid = uid;
        this.blocked = blocked;
        this.userPublicData = userPublicData;
    }

    static create = async (personalChatInfo) => {
        const uid = personalChatInfo.uid;
        const blocked = personalChatInfo.blocked;
        const userPublicData = await firebase.database().ref(`/users/${uid}/public`)
            .once('value');
        return new PersonalChatListItem(uid, blocked, userPublicData.val());
    }
}
