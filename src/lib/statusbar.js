import ons from 'onsenui';
import { brightness } from '../lib/color';

export const setStatusBarColor = color => {
    return new Promise((resolve, reject) => {
        ons.ready(() => {
            const themeColorEl = document.querySelector("meta[name=theme-color]");
            if (window.cordova && window.cordova.platformId !== 'browser') {
                window.plugins.headerColor.tint(color);
                color = brightness(color, .8);
                themeColorEl.setAttribute('content', color);
                window.StatusBar.backgroundColorByHexString(color);
            } else {
                if (typeof window !== undefined) {
                    themeColorEl.setAttribute('content', color);
                }
            }
            resolve();
        });
    });
}

