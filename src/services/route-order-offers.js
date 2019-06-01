import firebase from '../lib/firebase';
import AuthStore from '../stores/AuthStore';
import { getDisplayName } from '../lib/user';
import PersonalChatStore from '../stores/PersonalChatStore';

export const placeRouteOrderOffer = (price, routeOrder) => {
    firebase.firestore().collection('routeordersoffers').add({
        price,
        routeOrderId: routeOrder.objectID,
        senderUid: AuthStore.user.uid,
        senderName: getDisplayName(AuthStore.user),
        timestamp: new Date().getTime()
    });
    notifyOtherUser(price, routeOrder);
}

const notifyOtherUser = async (price, routeOrder) => {
    const chatMeta = await PersonalChatStore.getChatMetaItem(routeOrder.senderUid);
    const thread = await PersonalChatStore.getChatThread(chatMeta);
    const newMessage = {
        content: `💰 \${displayName} heeft ${price} euro geboden om een lading te bezorgen. \${routeOrderLink:${routeOrder.objectID}}` ,
        senderName: getDisplayName(AuthStore.user),
        senderUid: AuthStore.user.uid,
        timestamp: Date.now()
    };
    thread.threadObserver.push(newMessage);
}


export const notifyDeliveryGuyAccepted = async (routeOrder, routeOrderOffer) => {
    const chatMeta = await PersonalChatStore.getChatMetaItem(routeOrderOffer.senderUid);
    const thread = await PersonalChatStore.getChatThread(chatMeta);
    const newMessage = {
        content: `💰 \${displayName} heeft je aanbod van ${routeOrderOffer.price} euro om een lading te bezorgen geaccepteerd. \${routeOrderLink:${routeOrder.objectID}}` ,
        senderName: getDisplayName(AuthStore.user),
        senderUid: AuthStore.user.uid,
        timestamp: Date.now()
    };
    thread.threadObserver.push(newMessage);
}

