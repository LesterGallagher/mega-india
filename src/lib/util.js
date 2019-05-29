import * as ons from 'onsenui';
import slugify from 'slugify';

export const html2text = html => {
	return html.replace(/<style([\s\S]*?)<\/style>/gi, '')
		.replace(/<script([\s\S]*?)<\/script>/gi, '')
		.replace(/<\/div>/ig, '\n')
		.replace(/<\/li>/ig, '\n')
		.replace(/<li>/ig, '  *  ')
		.replace(/<\/ul>/ig, '\n')
		.replace(/<\/p>/ig, '\n')
		.replace(/<br\s*[\/]?>/gi, "\n")
		.replace(/<[^>]+>/ig, '');
};

export const debounce = (func, wait, immediate) => {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

export const excerpt = (str, maxlen) => {
	str = str || '';
	if (str.length > maxlen) return str.slice(0, maxlen).trimRight() + '...';
	else return str;
}

export const objectAssign = (obj) => {
	var newObj = {};
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			var element = obj[key];
			newObj[key] = element;
		}
	}
	return newObj;
}

export const arrayEqual = (arr1, arr2) => {
	if (arr1.length !== arr2.length) return false;
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}

export const onEnterDo = (input, func) => {
	input.addEventListener('keydown', function (e) {
		if (e.key === 'Enter') func(e);
	});
}

export const escapeRegExp = string => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const validURL = value => {
	return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

export const clearChildren = parent => {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
	return parent;
}

export const cloneWithoutChildren = parent => {
	var cNode = parent.cloneNode(false);
	parent.parentNode.replaceChild(cNode, parent);
	return cNode;
}

export const byteSizeFormat = (bytes, size) => {
	var names = size === 'long'
		? ['bytes', 'kilo bytes', 'mega bytes', 'giga bytes', 'terra bytes']
		: ['bytes', 'kb', 'mb', 'gb', 'tb'];
	if (bytes <= 0) {
		return '0 ' + names[0];
	}
	var index = Math.min(
		Math.floor(Math.log(bytes) / Math.log(1024)),
		names.length
	);
	var units = Math.round(bytes / Math.pow(1024, index));
	return units + ' ' + names[index];
}

export const strRepeat = (str, n) => {
	if (n === 0) return '';
	n = n || 1;
	return Array(n + 1).join(str);
}

export const logError = err => {
	console.error(err);
	window.setTimeout(() => { throw err; }, 0);
};

export const getParameterByName = (name, url) => {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const throttle = (func, limit) => {
	let inThrottle;
	return function () {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => inThrottle = false, limit);
		}
	};
};

export const deviceReady = new Promise((resolve, reject) => {
	if (window.cordova) {
		// The deviceready event behaves somewhat differently from others. 
		// Any event handler registered after the deviceready event fires has its callback function called immediately.
		document.addEventListener('deviceready', resolve);
	} else if (window.DOMContentLoaded) {
		resolve();
	} else {
		window.addEventListener('DOMContentLoaded', resolve);
	}
});

export const slugifyURIComponent = str => {
	return slugify(str, {
		replacement: '-',    // replace spaces with replacement
		lower: true          // result in lower case
	})
}
