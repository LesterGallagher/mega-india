
export const brightness = (hex, amount) => {
    hex = hex.replace('#', '');
    var h1 = hex.slice(0, 2);
    var h2 = hex.slice(2, 4);
    var h3 = hex.slice(4, 6);
    h1 = Math.min(255, Math.floor(parseInt(h1, 16) * amount)).toString(16);
    h2 = Math.min(Math.floor(parseInt(h2, 16) * amount)).toString(16);
    h3 = Math.min(Math.floor(parseInt(h3, 16) * amount)).toString(16);
    if (h1.length === 1) h1 = '0' + h1;
    if (h2.length === 1) h2 = '0' + h2;
    if (h3.length === 1) h3 = '0' + h3;
    return '#' + h1 + h2 + h3;
}
