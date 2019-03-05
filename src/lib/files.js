import 'jimp/browser/lib/jimp';
const Jimp = window.Jimp;

export const getBase64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

export const getBuffer = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const generateThumbnail = async buffer => {
    const image = await Jimp.read(buffer);
    return await image
        .cover(256, 256)
        .quality(80);
};
