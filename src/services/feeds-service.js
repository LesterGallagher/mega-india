export const fetchFeed = url => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resolve(xhr.responseXML);
            } else {
                reject();
            }
        }
    }
    xhr.open('GET', url);
    xhr.send();
});

