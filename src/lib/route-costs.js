
export const calculateRouteCostsInEuro = (durationInSeconds, distanceInMeters) => {
    return Math.ceil(
        Math.max(0.0019 * distanceInMeters, distanceInMeters * 0.00583)
    );
}

export const routeCostsColor = euros => {
    const range = Math.min(1, Math.max(0, Math.log10(10 + euros) / 1.5 - 1));
    return toHexWithPercentage(1 - range, range, 0);
}


const pad = (str, max) => {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

const toHexWithPercentage = (red, green, blue) => {
    return '#' + pad(Math.round(red * 255).toString(16), 2)
        + pad(Math.round(green * 255).toString(16), 2)
        + pad(Math.round(blue * 255).toString(16), 2);
}
