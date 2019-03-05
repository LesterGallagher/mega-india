import firebase from 'firebase/app';
import AuthStore from '../stores/AuthStore';
import { getDisplayName } from './user';
import PersonalChatStore from '../stores/PersonalChatStore';

export const placeRouteOrderOffer = (price, routeOrder) => {
    console.log(AuthStore.user);
    firebase.firestore().collection('routeordersoffers').add({
        price,
        routeOrderId: routeOrder.id,
        senderUid: AuthStore.user.uid,
        senderName: getDisplayName(AuthStore.user),
        timestamp: new Date().getTime()
    });
    notifyOtherUser(price, routeOrder);
}

const notifyOtherUser = async (price, routeOrder) => {
    const chatMeta = await PersonalChatStore.getChatMetaItem(routeOrder.senderUid);
    const thread = await PersonalChatStore.getChatThread(chatMeta);
    console.log(thread);
    const newMessage = {
        content: `💰 \${displayName} heeft ${price} euro geboden om een lading te bezorgen. \${routeOrderLink:${routeOrder.id}}` ,
        senderName: getDisplayName(AuthStore.user),
        senderUid: AuthStore.user.uid,
        timestamp: Date.now()
    };
    thread.threadObserver.push(newMessage);
}

