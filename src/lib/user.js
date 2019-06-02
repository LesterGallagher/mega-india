import AuthStore from "../stores/AuthStore";
import defaultAvatar from '../images/img_avatar.png';
import loadingIcon from '../images/loading.svg';
import firebase from '../lib/firebase';

export const getDefaultAvatar = () => defaultAvatar;

export const getLoadingIcon = () => loadingIcon;

const profileImages = {}; // CACHE

export const getProfileImage = async userUid => {
    if (userUid in profileImages) return profileImages[userUid].url; // CACHE
    await firebase.ready;
    try {
        const ref = await firebase.storage().ref('/users/' + userUid + '/thumb@256_profile-picture.jpg')
        const url = await ref.getDownloadURL();
        profileImages[userUid] = { url, _t: Date.now() }; // CACHE
        return url;
    } catch (err) {
        // most likely 404.
        // resolve this with the default avatar url
        profileImages[userUid] = { url: defaultAvatar, _t: Date.now() }; // CACHE
        return defaultAvatar;
    }
}


/**
 * @callback onProgress
 * @param {number} progress - Progress in percentages
 * @param {number} bytesTransferred
 * @param {number} totalBytes
 */

/**
 * @param {string} uid - User's firebase uid
 * @param {File} file - the avatar image file to upload
 * @param {string} contentType - The content type of the image e.g: 'image/jpeg'
 * @param {onProgress} onProgress - Gets called every time the profile image upload progresses
 */
export const uploadProfilePicture = (userUid, file, onProgress) => {
    return new Promise((resolve, reject) => {
        firebase.ready.then(firebase => {

            const ref = firebase.storage().ref(`/users/${userUid}/profile-picture.jpg`)
            const uploadTask = ref.put(file, { contentType: 'image/jpeg' });
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (onProgress) onProgress(progress, snapshot.bytesTransferred, snapshot.totalBytes);
                }, function (error) {
                    reject(error);
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        const blob = window.URL.createObjectURL(file);
                        AuthStore.setPhotoURL(blob);
                        resolve(blob);
                    });
                });
        });
    });
};

export const getDisplayName = () => {
    const authStoreUserDataDisplayName = AuthStore.userData
        && AuthStore.userData.public
        && AuthStore.userData.public.displayName;
    const userAuthDisplayName = (!AuthStore.user
        || AuthStore.user.displayName === undefined
        || AuthStore.user.displayName === null) === false
        && AuthStore.user.displayName;

    return authStoreUserDataDisplayName || userAuthDisplayName || 'Anonymous';
}


