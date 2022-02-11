(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(381);
module.exports = function Utils() {
    /**
     * 进制转换算法
     * @param decNumber 转换的数字
     * @param base  转换的类型
     */
    Utils.prototype.baseConverter = function (decNumber, base) {
        var stack = new Stack();
        var res = '';
        var rem;
        base = base || 2;
        if (base < 2 || base > 36) {
            return '';
        }
        while (decNumber > 0) {
            rem = Math.floor(decNumber % base);
            stack.push(rem);
            decNumber = Math.floor(decNumber / base);
        }
        while (!stack.isEmpty()) {
            res += stack.pop().toString();
        }
        return res;
    };
};


/***/ }),

/***/ 227:
/***/ ((module) => {

module.exports = function Array() {
    Array.prototype.randomArray = function (array) {
        return array.sort(function () {
            return Math.random() - 0.5;
        });
    };
};


/***/ }),

/***/ 220:
/***/ ((module) => {

module.exports = function Color() {
    /**
     * 颜色渐变
     *
     * 该函数实现两个颜色值之间等分取值，返回一个数组，元素为十六进制形式的颜色值，数组长度为step值。
     * 例如：colorGradient('rgb(250, 250, 250)', 'rgb(252, 252, 252)', 3)，得到的结果为["#fafafa", "#fafafa", "#fbfbfb"]
     * @param startColor<String> 开始颜色值，可以是HEX或者RGB颜色值，如#0afdce或者rgb(120, 130, 150)
     * @param endColor <String> 结束颜色值，可以是HEX或者RGB颜色值，如#0afdce或者rgb(120, 130, 150)
     * @param step <Number> 均分值，把开始值和结束值平均分成多少份
     */
    Color.prototype.colorGradient = function (startColor, endColor, step) {
        if (step === void 0) { step = 10; }
        startColor = startColor || 'rgb(0, 0, 0)';
        endColor = endColor || 'rgb(255, 255, 255)';
        var startRGB = this.hexToRgb(startColor, false); // 转换为rgb数组模式
        var startR = startRGB[0];
        var startG = startRGB[1];
        var startB = startRGB[2];
        var endRGB = this.hexToRgb(endColor, false);
        var endR = endRGB[0];
        var endG = endRGB[1];
        var endB = endRGB[2];
        var sR = (endR - startR) / step; // 总差值
        var sG = (endG - startG) / step;
        var sB = (endB - startB) / step;
        var colorArr = [];
        for (var i = 0; i < step; i++) {
            // 计算每一步的hex值
            var hex = this.rgbToHex("rgb(".concat(Math.round((sR * i + startR)), ",").concat(Math.round((sG * i + startG)), ",").concat(Math.round((sB
                * i + startB)), ")"));
            // 确保第一个颜色值为startColor的值
            if (i === 0)
                hex = this.rgbToHex(startColor);
            // 确保最后一个颜色值为endColor的值
            if (i === step - 1)
                hex = this.rgbToHex(endColor);
            colorArr.push(hex);
        }
        return colorArr;
    };
    /**
     * 十六进制Hex转RGB
     *
     * 该函数可以将一个Hex的十六进制颜色值转换成一个RGB颜色值
     * @param sColor <String> HEx颜色值，如#0afdce
     * @param str
     */
    Color.prototype.hexToRgb = function (sColor, str) {
        if (str === void 0) { str = true; }
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        sColor = String(sColor).toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = '#';
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            // 处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x".concat(sColor.slice(i, i + 2))));
            }
            if (!str) {
                return sColorChange;
            }
            return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
        }
        if (/^(rgb|RGB)/.test(sColor)) {
            var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
            return arr.map(function (val) { return Number(val); });
        }
        return sColor;
    };
    /**
     * RGB转十六进制Hex
     * 该函数可以将一个RGB颜色值转换成一个Hex的十六进制颜色值
     * @param rgb <String> RGB颜色值，如rgb(230, 231, 233)
     */
    Color.prototype.rgbToHex = function (rgb) {
        var _this = rgb;
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (/^(rgb|RGB)/.test(_this)) {
            var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
            var strHex = '#';
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                hex = String(hex).length == 1 ? "".concat(0).concat(hex) : hex; // 保证每个rgb的值为2位
                if (hex === '0') {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = _this;
            }
            return strHex;
        }
        if (reg.test(_this)) {
            var aNum = _this.replace(/#/, '').split('');
            if (aNum.length === 6) {
                return _this;
            }
            if (aNum.length === 3) {
                var numHex = '#';
                for (var i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        }
        else {
            return _this;
        }
    };
    /**
     * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
     * @param color <String> 颜色值，只能hex或者rgba格式
     * @param opacity <Number> 不透明度值，取值为0-1之间
     */
    Color.prototype.colorToRgba = function (color, opacity) {
        color = this.rgbToHex(color);
        // 十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        /* 16进制颜色转为RGB格式 */
        var sColor = String(color).toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = '#';
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            // 处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x".concat(sColor.slice(i, i + 2))));
            }
            return "rgba(".concat(sColorChange.join(','), ",").concat(opacity || 1, ")");
        }
        return sColor;
    };
};


/***/ }),

/***/ 665:
/***/ ((module) => {

var timeDebounce;
/**
 * 防抖
 * @param func
 * @param wait
 */
module.exports = function Debounce(func, wait) {
    if (timeDebounce) {
        clearTimeout(timeDebounce);
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        timeDebounce = setTimeout(function () {
            func.apply(_this, args);
        }, wait);
    };
};


/***/ }),

/***/ 425:
/***/ ((module) => {

/**
 * 深度克隆
 * 可克隆类型包括：String，Number，Undefined，Boolean，Null，Object，JSON，Array，Date，RegExp,Function
 * @param obj
 */
module.exports = function DeepClone(obj) {
    var t = typeof obj;
    if (Object.is(t, "string") || Object.is(t, "number") || Object.is(t, "undefined") || Object.is(t, "boolean") || Object.is(t, "function") || Object.is(obj, null)) {
        return obj;
    }
    else if (Object.is(Object.prototype.toString.call(obj), "[object Date]")) {
        return new Date(obj.getTime());
    }
    else if (Object.is(Object.prototype.toString.call(obj), "[object RegExp]")) {
        return new RegExp(obj);
    }
    else if (Array.isArray(obj)) {
        var arr = [];
        for (var i = 0; i < obj.length; i++) {
            arr.push(DeepClone(obj[i]));
        }
        return arr;
    }
    else {
        var res = {};
        for (var key in obj) {
            // @ts-ignore
            res[key] = DeepClone(obj[key]);
        }
        return res;
    }
};


/***/ }),

/***/ 795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DeepClone = __webpack_require__(425);
module.exports = function DeepMerge(target, source) {
    target = new DeepClone(target);
    if (typeof target !== 'object' || typeof source !== 'object')
        return false;
    for (var prop in source) {
        if (!source.hasOwnProperty(prop))
            continue;
        if (prop in target) {
            // @ts-ignore
            // console.log(target[prop].concat)
            // @ts-ignore
            if (typeof target[prop] !== 'object') {
                // @ts-ignore
                target[prop] = source[prop];
                // @ts-ignore
            }
            else if (typeof source[prop] !== 'object') {
                // @ts-ignore
                target[prop] = source[prop];
                // @ts-ignore
            }
            else if (target[prop] === null) {
                // @ts-ignore
                target[prop] = null;
                // @ts-ignore
            }
            else if (target[prop].concat && source[prop].concat) {
                // @ts-ignore
                target[prop] = target[prop].concat(source[prop]);
            }
            else {
                // @ts-ignore
                target[prop] = DeepMerge(target[prop], source[prop]);
            }
        }
        else {
            // @ts-ignore
            target[prop] = source[prop];
        }
    }
    return target;
};


/***/ }),

/***/ 572:
/***/ ((module) => {

/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"kl"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
module.exports = function Guid() {
    Guid.prototype.get = function (len, firstU, radix) {
        if (len === void 0) { len = 32; }
        if (firstU === void 0) { firstU = true; }
        radix = radix || null;
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [];
        radix = radix || chars.length;
        if (len) {
            // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
            for (var i = 0; i < len; i++)
                uuid[i] = chars[0 | Math.random() * radix];
        }
        else {
            var r 
            // rfc4122标准要求返回的uuid中,某些位为固定的字符
            = void 0;
            // rfc4122标准要求返回的uuid中,某些位为固定的字符
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (var i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
        if (firstU) {
            uuid.shift();
            return "kl".concat(uuid.join(''));
        }
        return uuid.join('');
    };
};


/***/ }),

/***/ 941:
/***/ ((module) => {

"use strict";
/* global define */

/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}
/*
* Bitwise rotate a 32-bit number to the left.
*/
function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}
/*
* These functions implement the four basic operations the algorithm uses.
*/
function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
/*
* Calculate the MD5 of an array of little-endian words, and a bit length.
*/
function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32);
    x[((len + 64) >>> 9 << 4) + 14] = len;
    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
}
/*
* Convert an array of little-endian words to a string
*/
function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
    }
    return output;
}
/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/
function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
        output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
    }
    return output;
}
/*
* Calculate the MD5 of a raw string
*/
function rstrMD5(s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}
/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/
function rstrHMACMD5(key, data) {
    var i;
    var bkey = rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
        bkey = binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}
/*
* Convert a raw string to a hex string
*/
function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
        x = input.charCodeAt(i);
        output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
}
/*
* Encode a string as utf-8
*/
function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
}
/*
* Take string arguments and return either raw or hex encoded strings
*/
function rawMD5(s) {
    return rstrMD5(str2rstrUTF8(s));
}
function hexMD5(s) {
    return rstr2hex(rawMD5(s));
}
function rawHMACMD5(k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
}
function hexHMACMD5(k, d) {
    return rstr2hex(rawHMACMD5(k, d));
}
module.exports = function MD5() {
    MD5.prototype.get = function (string, key, raw) {
        if (!key) {
            if (!raw) {
                return hexMD5(string);
            }
            return rawMD5(string);
        }
        if (!raw) {
            return hexHMACMD5(key, string);
        }
        return rawHMACMD5(key, string);
    };
};


/***/ }),

/***/ 84:
/***/ ((module) => {

module.exports = function Params() {
    /**
     * 对象转url参数
     * @param data 对象
     * @param isPrefix isPrefix,是否自动加上"?"
     * @param arrayFormat 规则 indices|brackets|repeat|comma
     */
    Params.prototype.objToParams = function (data, isPrefix, arrayFormat) {
        if (data === void 0) { data = {}; }
        if (isPrefix === void 0) { isPrefix = true; }
        if (arrayFormat === void 0) { arrayFormat = 'brackets'; }
        var prefix = isPrefix ? '?' : '';
        var _result = [];
        if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1)
            arrayFormat = 'brackets';
        var _loop_1 = function (key) {
            // @ts-ignore
            var value = data[key];
            // 去掉为空的参数
            if (['', undefined, null].indexOf(value) >= 0) {
                return "continue";
            }
            // 如果值为数组，另行处理
            if (value.constructor === Array) {
                // e.g. {ids: [1, 2, 3]}
                switch (arrayFormat) {
                    case 'indices':
                        // 结果: ids[0]=1&ids[1]=2&ids[2]=3
                        for (var i = 0; i < value.length; i++) {
                            _result.push("".concat(key, "[").concat(i, "]=").concat(value[i]));
                        }
                        break;
                    case 'brackets':
                        // 结果: ids[]=1&ids[]=2&ids[]=3
                        value.forEach(function (_value) {
                            _result.push("".concat(key, "[]=").concat(_value));
                        });
                        break;
                    case 'repeat':
                        // 结果: ids=1&ids=2&ids=3
                        value.forEach(function (_value) {
                            _result.push("".concat(key, "=").concat(_value));
                        });
                        break;
                    case 'comma':
                        // 结果: ids=1,2,3
                        var commaStr_1 = '';
                        value.forEach(function (_value) {
                            commaStr_1 += (commaStr_1 ? ',' : '') + _value;
                        });
                        _result.push("".concat(key, "=").concat(commaStr_1));
                        break;
                    default:
                        value.forEach(function (_value) {
                            _result.push("".concat(key, "[]=").concat(_value));
                        });
                }
            }
            else {
                _result.push("".concat(key, "=").concat(value));
            }
        };
        for (var key in data) {
            _loop_1(key);
        }
        return _result.length ? prefix + _result.join('&') : '';
    };
};


/***/ }),

/***/ 494:
/***/ ((module) => {

module.exports = function Prototype() {
    /**
     * 读取属性
     * @param obj
     * @param key
     */
    Prototype.prototype.get = function (obj, key) {
        //判断key是否不为字符串或者为空数组
        if (typeof key !== 'string' || !key || typeof obj !== 'object') {
            return null;
        }
        else {
            var keys = key.split(".");
            var turn = this.turn(keys[0]);
            // @ts-ignore
            var res = Object.is(turn.type, "array") ? obj[turn.name][turn.index] || {} : obj[turn.name] || {};
            for (var i = 1; i < keys.length; i++) {
                if (res) {
                    turn = this.turn(keys[i]);
                    //如果key不存在，就返回null
                    // @ts-ignore
                    if (!res[turn.name])
                        return null;
                    // @ts-ignore
                    res = Object.is(turn.type, "array") ? res[turn.name][turn.index] || {} : res[turn.name] || {};
                }
            }
            // this.value = res||null;
            return res || null;
        }
    };
    /**
     * 修改属性
     * @param obj
     * @param key
     * @param val
     */
    Prototype.prototype.set = function (obj, key, val) {
        //获取链名
        var keys = key.split(".");
        var turn;
        for (var i = 0; i < keys.length; i++) {
            //获取keys类型
            turn = this.turn(keys[i]);
            //如果key不存在，就返回false；
            // @ts-ignore
            if (!obj[turn.name])
                return false;
            // 如果keys长度小于等于1或者查找到最后一个key时，直接赋值
            if (keys.length <= 1 || keys.length - 1 <= i) {
                // @ts-ignore
                if (turn.type === "array") {
                    // 数组操作
                    // @ts-ignore
                    obj[turn.name][turn.index] = val;
                }
                else {
                    // 普通对象操作
                    // @ts-ignore
                    obj[turn.name] = val;
                }
            }
            else {
                // @ts-ignore
                if (turn.type === "array") {
                    // 数组操作
                    // @ts-ignore
                    obj = obj[turn.name][turn.index];
                }
                else {
                    // 普通对象操作
                    // @ts-ignore
                    obj = obj[turn.name];
                }
            }
        }
        return true;
    };
    /**
     * 判断是否为数组下标
     * @param key
     */
    Prototype.prototype.is = function (key) {
        return key.indexOf("[") !== -1 && key.indexOf("]") != -1;
    };
    /**
     * 获取数组下标和key,否则直接返回key
     * @param key
     */
    Prototype.prototype.turn = function (key) {
        if (this.is(key)) {
            var left = key.split("[");
            var right = left[1].split("]");
            return {
                name: left[0],
                index: Number(right[0]),
                type: "array"
            };
        }
        else {
            return {
                name: key,
                type: "object"
            };
        }
    };
};


/***/ }),

/***/ 117:
/***/ ((module) => {

module.exports = function Test() {
    /**
     * 校验是否为验证码
     * @param value 验证码字符串
     * @param len 验证码长度，不填默认为6位数
     * @return Boolean
     */
    Test.prototype.code = function (value, len) {
        return new RegExp("^\\d{".concat(len || 6, "}$")).test(value);
    };
    /**
     * 校验是否为数组
     * @param array 数组
     * @return Boolean
     */
    Test.prototype.array = function (array) {
        return Object.is(Object.prototype.toString.call(array), '[object Array]');
    };
    /**
     * 校验是否为json字符串
     * @param json
     * @return Boolean
     */
    Test.prototype.jsonString = function (json) {
        if (!Object.is(typeof json, 'string'))
            return false;
        try {
            var obj = JSON.parse(json);
            if (Object.is(typeof obj, 'object') && obj) {
                return true;
            }
            return false;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * 校验是否为有效值的json
     * @param json
     * @return Boolean
     */
    Test.prototype.json = function (json) {
        if (Object.is(typeof json, 'object')) {
            return this.jsonString(JSON.stringify(json));
        }
        else {
            return false;
        }
    };
    /**
     * 是否为对象
     * @param object
     * @return Boolean
     */
    Test.prototype.object = function (object) {
        return Object.is(Object.prototype.toString.call(object), '[object Object]');
    };
    /**
     * 是否为邮箱号
     * @param value
     * @return Boolean
     */
    Test.prototype.email = function (value) {
        return new RegExp('^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$').test(value);
    };
    /**
     * 是否为手机号
     * @param value
     * @return Boolean
     */
    Test.prototype.phone = function (value) {
        return new RegExp('^1[23456789]\\d{9}$').test(value);
    };
    /**
     * 是否为URL
     * @param value
     * @return Boolean
     */
    Test.prototype.url = function (value) {
        return new RegExp('^((https|http|ftp|rtsp|mms):\\/\\/)(([0-9a-zA-Z_!~*\'().&=+$%-]+: )?[0-9a-zA-Z_!~*\'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*\'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\\/?)|(\\/[0-9a-zA-Z_!~*\'().;?:@&=+$,%#-]+)+\\/?)$').test(value);
    };
    /**
     * 是否为空
     * @param value
     * @return Boolean
     */
    Test.prototype.empty = function (value) {
        switch (typeof value) {
            case 'undefined':
                return true;
            case 'string':
                if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0)
                    return true;
                break;
            case 'boolean':
                if (!value)
                    return true;
                break;
            case 'number':
                if (value === 0 || isNaN(value))
                    return true;
                break;
            case 'object':
                // @ts-ignore
                if (value === null || value.length === 0)
                    return true;
                // @ts-ignore
                for (var i in value) {
                    return false;
                }
                return true;
        }
        return false;
    };
    /**
     * 判断是否为普通日期
     * @param value
     * @return Boolean
     */
    Test.prototype.date = function (value) {
        if (!value)
            return false;
        // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
        if (this.number(value))
            value = +value;
        return !/Invalid|NaN/.test(new Date(value).toString());
    };
    /**
     * 判断是否为十进制数值
     * @param value
     * @return Boolean
     */
    Test.prototype.number = function (value) {
        return new RegExp('^[\\+-]?(\\d+\\.?\\d*|\\.\\d+|\\d\\.\\d+e\\+\\d+)$').test(value);
    };
    /**
     * 判断是否为身份证号
     * @param value
     * @return Boolean
     */
    Test.prototype.idCard = function (value) {
        return new RegExp('^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$').test(value);
    };
    /**
     * 判断是否为车牌号
     * @param value
     * @return Boolean
     */
    Test.prototype.carNo = function (value) {
        // 新能源车牌
        var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
        // 旧车牌
        var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
        if (value.length === 7) {
            return creg.test(value);
        }
        if (value.length === 8) {
            return xreg.test(value);
        }
        return false;
    };
    /**
     * 判断是否为金额
     * @param value
     * @return Boolean
     */
    Test.prototype.amount = function (value) {
        return new RegExp('^[1-9]\\d*(,\\d{3})*(\\.\\d{1,2})?$|^0\\.\\d{1,2}$').test(value);
    };
    /**
     * 判断是否为中文（汉字）
     * @param value
     * @return Boolean
     */
    Test.prototype.chinese = function (value) {
        var reg = /^[\u4e00-\u9fa5]+$/gi;
        return reg.test(value);
    };
    /**
     * 判断是否为英文字母
     * @param value
     * @return Boolean
     */
    Test.prototype.letter = function (value) {
        return new RegExp('^[a-zA-Z]*$').test(value);
    };
    /**
     * 判断是否为字母或者数字
     * @param value
     * @return Boolean
     */
    Test.prototype.enOrNum = function (value) {
        return this.number(value) || this.letter(value);
    };
    /**
     * 判断是否包含某个值（如果为object，默认判断某个key是否存在，如果需要判断值，isValue = true 即可）
     * @param value
     * @param param
     * @param isValue
     * @return Boolean
     */
    Test.prototype.contains = function (value, param, isValue) {
        //判断是否为数组
        if (this.array(value)) {
            for (var i = 0; i < value.length; i++) {
                if (Object.is(value[i], param)) {
                    return true;
                }
            }
            return false;
        }
        else if (this.object(value)) {
            for (var key in value) {
                if (isValue) {
                    //判断值
                    if (Object.is(value[key], param))
                        return true;
                }
                else {
                    //判断key
                    if (Object.is(key, param))
                        return true;
                }
            }
            return false;
        }
        else {
            return value.indexOf(param) >= 0;
        }
    };
    /**
     * 验证一个值范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Test.prototype.range = function (value, param) {
        return value >= param[0] && value <= param[1];
    };
    /**
     * 验证一个长度范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Test.prototype.rangeLength = function (value, param) {
        return value.length >= param[0] && value.length <= param[1];
    };
    /**
     * 判断是否为函数方法
     * @param value
     * @return Boolean
     */
    Test.prototype.func = function (value) {
        return typeof value === 'function';
    };
    /**
     * 判断是否为promise对象
     * @param value
     * @return Boolean
     */
    Test.prototype.promise = function (value) {
        return Object.is(typeof value, "object") && this.func(value.then) && this.func(value.catch);
    };
    /**
     * 判断是否为图片格式
     * @param value
     * @return Boolean
     */
    Test.prototype.image = function (value) {
        var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
        return IMAGE_REGEXP.test(value);
    };
    /**
     * 判断是否为视频格式
     * @param value
     * @return Boolean
     */
    Test.prototype.video = function (value) {
        var VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;
        return VIDEO_REGEXP.test(value);
    };
    /**
     * 是否为正则对象
     * @param value
     * @return Boolean
     */
    Test.prototype.regExp = function (value) {
        return value && Object.prototype.toString.call(value) === '[object RegExp]';
    };
};


/***/ }),

/***/ 516:
/***/ ((module) => {

var valid = true;
/**
 * API.节流
 * @param func
 * @param wait
 */
module.exports = function Throttle(func, wait) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!valid) {
            return false;
        }
        valid = false;
        var _this = this;
        setTimeout(function () {
            func.apply(_this, args);
            valid = true;
        }, wait);
    };
};


/***/ }),

/***/ 986:
/***/ ((module) => {

module.exports = function Time() {
    /**
     * 该函数必须传入第一个参数，格式为任何合法的时间格式、秒或毫秒的时间戳，第二个参数是可选的，返回的值类似刚刚，25分钟前，3小时前，7天前的结果。 如果第二个参数是时间的格式，当前和传入时间戳相差大于一个月时，返回格式化好的时间；如果第二个参数为false，则不会返回格式化好的时间，而是诸如"xxx年前"的结果。
     * timestamp <String> 时间戳
     * format <String / false> 时间格式，默认为yyyy-mm-dd，年为"yyyy"，月为"mm"，日为"dd"，时为"hh"，分为"MM"，秒为"ss"，格式可以自由搭配，如： yyyy:mm:dd，yyyy-mm-dd，yyyy年mm月dd日，yyyy年mm月dd日 hh时MM分ss秒，yyyy/mm/dd/，MM:ss等组合。 如果时间戳距离此时的时间，大于一个月，则返回一个格式化好的时间，如果此参数为false，返回均为"多久之前"的结果。
     * @param dateTime
     * @param fmt
     */
    Time.prototype.timeFormat = function (dateTime, fmt) {
        dateTime = dateTime || null;
        fmt = fmt || 'yyyy-mm-dd hh:MM:ss';
        // 如果为null,则格式化当前时间
        if (!dateTime)
            dateTime = Number(new Date());
        // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
        if (dateTime.toString().length == 10)
            dateTime *= 1000;
        var date = new Date(dateTime);
        var ret;
        var opt = {
            'y+': date.getFullYear().toString(),
            'm+': (date.getMonth() + 1).toString(),
            'd+': date.getDate().toString(),
            'h+': date.getHours().toString(),
            'M+': date.getMinutes().toString(),
            's+': date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (var k in opt) {
            ret = new RegExp("(".concat(k, ")")).exec(fmt);
            if (ret) {
                // @ts-ignore
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
            }
        }
        return fmt;
    };
};


/***/ }),

/***/ 597:
/***/ ((module) => {

module.exports = function Trim() {
    /**
     * @description 去除空格
     * @param  str 需要去除空格的字符串
     * @param  pos both(左右)|left|right|all 默认both
     */
    Trim.prototype.trim = function (str, pos) {
        if (pos === void 0) { pos = 'both'; }
        str = String(str);
        if (pos == 'both') {
            return str.replace(/^\s+|\s+$/g, '');
        }
        if (pos == 'left') {
            return str.replace(/^\s*/, '');
        }
        if (pos == 'right') {
            return str.replace(/(\s*$)/g, '');
        }
        if (pos == 'all') {
            return str.replace(/\s+/g, '');
        }
        return str;
    };
};


/***/ }),

/***/ 395:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Throttle = __webpack_require__(516);
var Debounce = __webpack_require__(665);
var DeepClone = __webpack_require__(425);
var DeepMerge = __webpack_require__(795);
var Prototype = __webpack_require__(494);
var Time = __webpack_require__(986);
var ArrayObj = __webpack_require__(227);
var Guid = __webpack_require__(572);
var Color = __webpack_require__(220);
var Params = __webpack_require__(84);
var MD5 = __webpack_require__(941);
var Trim = __webpack_require__(597);
var Test = __webpack_require__(117);
//单例模式
Throttle.new = (function () {
    var throttle = null;
    return function (singleton) {
        if (!throttle || singleton) {
            // @ts-ignore
            throttle = new (Throttle.bind.apply(Throttle, __spreadArray([void 0], arguments, false)))();
        }
        return throttle;
    };
})();
Debounce.new = (function () {
    var debounce = null;
    return function (singleton) {
        if (!debounce || singleton) {
            // @ts-ignore
            debounce = new (Debounce.bind.apply(Debounce, __spreadArray([void 0], arguments, false)))();
        }
        return debounce;
    };
})();
DeepClone.new = (function () {
    var deepClone = null;
    return function (singleton) {
        if (!deepClone || singleton) {
            // @ts-ignore
            deepClone = new (DeepClone.bind.apply(DeepClone, __spreadArray([void 0], arguments, false)))();
        }
        return deepClone;
    };
})();
DeepMerge.new = (function () {
    var deepMerge = null;
    return function (singleton) {
        if (!deepMerge || singleton) {
            // @ts-ignore
            deepMerge = new (DeepMerge.bind.apply(DeepMerge, __spreadArray([void 0], arguments, false)))();
        }
        return deepMerge;
    };
})();
Prototype.new = (function () {
    var prototype = null;
    return function (singleton) {
        if (!prototype || singleton) {
            // @ts-ignore
            prototype = new (Prototype.bind.apply(Prototype, __spreadArray([void 0], arguments, false)))();
        }
        return prototype;
    };
})();
Time.new = (function () {
    var time = null;
    return function (singleton) {
        if (!time || singleton) {
            // @ts-ignore
            time = new (Time.bind.apply(Time, __spreadArray([void 0], arguments, false)))();
        }
        return time;
    };
})();
ArrayObj.new = (function () {
    var arrayObj = null;
    return function (singleton) {
        if (!arrayObj || singleton) {
            // @ts-ignore
            arrayObj = new (ArrayObj.bind.apply(ArrayObj, __spreadArray([void 0], arguments, false)))();
        }
        return arrayObj;
    };
})();
Guid.new = (function () {
    var guid = null;
    return function (singleton) {
        if (!guid || singleton) {
            // @ts-ignore
            guid = new (Guid.bind.apply(Guid, __spreadArray([void 0], arguments, false)))();
        }
        return guid;
    };
})();
Color.new = (function () {
    var color = null;
    return function (singleton) {
        if (!color || singleton) {
            // @ts-ignore
            color = new (Color.bind.apply(Color, __spreadArray([void 0], arguments, false)))();
        }
        return color;
    };
})();
Params.new = (function () {
    var params = null;
    return function (singleton) {
        if (!params || singleton) {
            // @ts-ignore
            params = new (Params.bind.apply(Params, __spreadArray([void 0], arguments, false)))();
        }
        return params;
    };
})();
MD5.new = (function () {
    var md5 = null;
    return function (singleton) {
        if (!md5 || singleton) {
            // @ts-ignore
            md5 = new (MD5.bind.apply(MD5, __spreadArray([void 0], arguments, false)))();
        }
        return md5;
    };
})();
Trim.new = (function () {
    var trim = null;
    return function (singleton) {
        if (!trim || singleton) {
            // @ts-ignore
            trim = new (Trim.bind.apply(Trim, __spreadArray([void 0], arguments, false)))();
        }
        return trim;
    };
})();
Test.new = (function () {
    var test = null;
    return function (singleton) {
        if (!test || singleton) {
            // @ts-ignore
            test = new (Test.bind.apply(Test, __spreadArray([void 0], arguments, false)))();
        }
        return test;
    };
})();
module.exports = function Api() {
    Api.prototype.throttle = function (func, wait) {
        return Throttle.new(func, wait);
    };
    Api.prototype.debounce = function (func, wait) {
        return Debounce.new(func, wait);
    };
    Api.prototype.deepClone = function (target) {
        return DeepClone.new(target);
    };
    Api.prototype.deepMerge = function (target, source) {
        return DeepMerge.new(target, source);
    };
    Api.prototype.getPrototype = function (obj, key) {
        return Prototype.new().get(obj, key);
    };
    Api.prototype.setPrototype = function (obj, key, val) {
        return Prototype.new().set(obj, key, val);
    };
    Api.prototype.timeFormat = function (dateTime, fmt) {
        return Time.new().timeFormat(dateTime, fmt);
    };
    Api.prototype.randomArray = function (array) {
        return ArrayObj.new().randomArray(array);
    };
    Api.prototype.guid = function (len, firstU, radix) {
        return Guid.new().get(len, firstU, radix);
    };
    /**
     * 颜色渐变
     *
     * 该函数实现两个颜色值之间等分取值，返回一个数组，元素为十六进制形式的颜色值，数组长度为step值。
     * 例如：colorGradient('rgb(250, 250, 250)', 'rgb(252, 252, 252)', 3)，得到的结果为["#fafafa", "#fafafa", "#fbfbfb"]
     * @param startColor<String> 开始颜色值，可以是HEX或者RGB颜色值，如#0afdce或者rgb(120, 130, 150)
     * @param endColor <String> 结束颜色值，可以是HEX或者RGB颜色值，如#0afdce或者rgb(120, 130, 150)
     * @param step <Number> 均分值，把开始值和结束值平均分成多少份
     */
    Api.prototype.colorGradient = function (startColor, endColor, step) {
        return Color.new().colorGradient(startColor, endColor, step);
    };
    /**
     * 十六进制Hex转RGB
     *
     * 该函数可以将一个Hex的十六进制颜色值转换成一个RGB颜色值
     * @param sColor <String> HEx颜色值，如#0afdce
     */
    Api.prototype.hexToRgb = function (sColor) {
        return Color.new().hexToRgb(sColor);
    };
    /**
     * RGB转十六进制Hex
     * 该函数可以将一个RGB颜色值转换成一个Hex的十六进制颜色值
     * @param rgb <String> RGB颜色值，如rgb(230, 231, 233)
     */
    Api.prototype.rgbToHex = function (rgb) {
        return Color.new().rgbToHex(rgb);
    };
    /**
     * 颜色透明度
     * 该函数可以接受一个十六进制或者rgb格式的颜色值(不能接受命名式颜色格式，比如white)，返回此颜色的rgba格式值
     * @param color <String> 颜色值，只能hex或者rgba格式
     * @param opacity <Number> 不透明度值，取值为0-1之间
     */
    Api.prototype.colorToRgba = function (color, opacity) {
        return Color.new().colorToRgba(color, opacity);
    };
    /**
     * 对象转url参数
     *
     * 该方法，可以将一个对象形式参数转换成get传参所需参数形式，如把{name: 'lisa', age: 20}转换成?name=lisa&age=20
     * @param data 对象
     * @param isPrefix isPrefix,是否自动加上"?"
     * @param arrayFormat 规则 indices|brackets|repeat|comma
     */
    Api.prototype.objToParams = function (data, isPrefix, arrayFormat) {
        return Params.new().objToParams(data, isPrefix, arrayFormat);
    };
    /**
     * MD5
     *
     * @param string 需要加密的字符串
     * @param key 密钥，如果不填，默认为 “30ce71a73bdd908c3955a90e8f7429ef”
     */
    Api.prototype.md5 = function (string, key, raw) {
        if (key === void 0) { key = "30ce71a73bdd908c3955a90e8f7429ef"; }
        if (raw === void 0) { raw = false; }
        return MD5.new().get(string, key, raw);
    };
    /**
     * 去除空格
     * @param  str 需要去除空格的字符串
     * @param  pos both(左右)|left|right|all 默认both
     */
    Api.prototype.trim = function (str, pos) {
        return Trim.new().trim(str, pos);
    };
    /**
     * 校验是否为验证码
     * @param value 验证码字符串
     * @param len 验证码长度，不填默认为6位数
     * @return Boolean
     */
    Api.prototype.isCode = function (value, len) {
        return Test.new().code(value, len);
    };
    /**
     * 校验是否为数组
     * @param array 数组
     * @return Boolean
     */
    Api.prototype.isArray = function (array) {
        return Test.new().array(array);
    };
    /**
     * 校验是否为json字符串
     * @param json
     * @return Boolean
     */
    Api.prototype.isJsonString = function (json) {
        return Test.new().jsonString(json);
    };
    /**
     * 校验是否为有效值的json
     * @param json
     * @return Boolean
     */
    Api.prototype.isJson = function (json) {
        return Test.new().json(json);
    };
    /**
     * 校验是否为对象
     * @param object
     * @return Boolean
     */
    Api.prototype.isObject = function (object) {
        return Test.new().object(object);
    };
    /**
     * 校验是否为邮箱号
     * @param value
     * @return Boolean
     */
    Api.prototype.isEmail = function (value) {
        return Test.new().email(value);
    };
    /**
     * 校验是否为手机号
     * @param value
     * @return Boolean
     */
    Api.prototype.isPhone = function (value) {
        return Test.new().phone(value);
    };
    /**
     * 校验是否为URL
     * @param value
     * @return Boolean
     */
    Api.prototype.isUrl = function (value) {
        return Test.new().url(value);
    };
    /**
     * 校验是否为空
     * @param value
     * @return Boolean
     */
    Api.prototype.isEmpty = function (value) {
        return Test.new().empty(value);
    };
    /**
     * 校验是否为普通日期
     * @param value
     * @return Boolean
     */
    Api.prototype.isDate = function (value) {
        return Test.new().date(value);
    };
    /**
     * 校验是否为十进制数值
     * @param value
     * @return Boolean
     */
    Api.prototype.isNumber = function (value) {
        return Test.new().number(value);
    };
    /**
     * 校验是否为身份证号
     * @param value
     * @return Boolean
     */
    Api.prototype.isIdCard = function (value) {
        return Test.new().idCard(value);
    };
    /**
     * 判断是否为车牌号
     * @param value
     * @return Boolean
     */
    Api.prototype.isCarNo = function (value) {
        return Test.new().carNo(value);
    };
    /**
     * 校验是否为金额
     * @param value
     * @return Boolean
     */
    Api.prototype.isAmount = function (value) {
        return Test.new().amount(value);
    };
    /**
     * 校验是否为中文（汉字）
     * @param value
     * @return Boolean
     */
    Api.prototype.isChinese = function (value) {
        return Test.new().chinese(value);
    };
    /**
     * 校验是否为英文字母
     * @param value
     * @return Boolean
     */
    Api.prototype.isLetter = function (value) {
        return Test.new().letter(value);
    };
    /**
     * 校验是否为字母或者数字
     * @param value
     * @return Boolean
     */
    Api.prototype.isEnOrNum = function (value) {
        return Test.new().enOrNum(value);
    };
    /**
     * 校验是否包含某个值（如果为object，默认判断某个key是否存在，如果需要判断值，isValue = true 即可）
     * @param value
     * @param param
     * @param isValue
     * @return Boolean
     */
    Api.prototype.isContains = function (value, param, isValue) {
        return Test.new().contains(value, param, isValue);
    };
    /**
     * 校验是否为验证一个值范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Api.prototype.isRange = function (value, param) {
        return Test.new().range(value, param);
    };
    /**
     * 校验是否为验证一个长度范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Api.prototype.isRangeLength = function (value, param) {
        return Test.new().rangeLength(value, param);
    };
    /**
     * 校验是否为函数方法
     * @param value
     * @return Boolean
     */
    Api.prototype.isFunc = function (value) {
        return Test.new().func(value);
    };
    /**
     * 校验是否为promise对象
     * @param value
     * @return Boolean
     */
    Api.prototype.isPromise = function (value) {
        return Test.new().promise(value);
    };
    /**
     * 校验是否为图片格式
     * @param value
     * @return Boolean
     */
    Api.prototype.isImage = function (value) {
        return Test.new().image(value);
    };
    /**
     * 校验是否为视频格式
     * @param value
     * @return Boolean
     */
    Api.prototype.isVideo = function (value) {
        return Test.new().video(value);
    };
    /**
     * 校验是否为正则对象
     * @param value
     * @return Boolean
     */
    Api.prototype.isRegExp = function (value) {
        return Test.new().regExp(value);
    };
};


/***/ }),

/***/ 607:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
    Stack: __webpack_require__(381),
    Queue: __webpack_require__(20),
    LinkedList: __webpack_require__(547),
    DoublyLinkedList: __webpack_require__(559),
    Api: __webpack_require__(395),
    Utils: __webpack_require__(544)
};


/***/ }),

/***/ 559:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var LinkedList = __webpack_require__(547);
/**
 * 双向链表
 *
 * push(element)：向链表尾部添加一个新元素。
 * insert(element,position)：在链表指定位置插入一个新元素。
 * getElementAt(index)：返回链表中特定位置的元素，如果没有则返回undefined。
 * remove(element)：从链表中移除一个元素。
 * indexOf(element)：返回元素在链表中的索引，如果没有则返回-1。
 * removeAt(position)：从链表指定位置移除一个元素。
 * isEmpty()：如果链表中不包含任何元素，则返回true，否则返回false。
 * size()：返回链表包含的元素个数。
 * getHead()：返回链表的第一个元素。
 * getHead()：清空链表。
 * toString()：返回表示整个链表的字符串。
 *
 */
function DoublyLinkedList() {
    //结尾元素
    DoublyLinkedList.prototype.tail = null;
    //内部类
    function Node(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    }
    /**
     * push(element)：向链表尾部添加一个新元素。
     * @param element
     */
    DoublyLinkedList.prototype.push = function (element) {
        // @ts-ignore
        var node = new Node(element);
        if (this.head) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        else {
            this.tail = node;
            this.head = node;
        }
        this.count += 1;
    };
    /**
     * 在链表指定位置插入一个新元素。
     * @param element
     * @param position
     * @returns {undefined}
     */
    // @ts-ignore
    DoublyLinkedList.prototype.insert = function (element, position) {
        if (position < 0) {
            return undefined;
        }
        else if (this.count <= position) {
            this.push(element);
        }
        else {
            // @ts-ignore
            var node = new Node(element);
            if (position === 0 || this.head === null) {
                node.next = this.head;
                this.head = node;
                this.tail = node;
            }
            else {
                var previous = this.getElementAt(position - 1);
                var current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count += 1;
        }
    };
    /**
     * 返回表示整个链表的字符串
     * @returns {string}
     */
    DoublyLinkedList.prototype.toString = function () {
        if (this.count === 0) {
            return "";
        }
        var str = "";
        var num = 0;
        var current = this.head;
        while (current.next) {
            str += "DoublyLinkedList: next{element: ".concat(current.element, ", index: ").concat(num, "} next ----> ").concat(current.next.element, "\n");
            num += 1;
            current = current.next;
        }
        str += "DoublyLinkedList: next{element: ".concat(current.element, ", index: ").concat(num, "} next ----> null\n\n\n\n");
        var current2 = this.tail;
        while (current2.prev) {
            str += "DoublyLinkedList: prev{element: ".concat(current2.element, ", index: ").concat(num, "} prev ----> ").concat(current2.prev.element, "\n");
            num += 1;
            current2 = current2.prev;
        }
        str += "DoublyLinkedList: prev{element: ".concat(current2.element, ", index: ").concat(num, "} prev ----> null\n\n\n\n");
        return str;
    };
}
//继承单向链表
var linkedList = new LinkedList();
DoublyLinkedList.prototype = linkedList.constructor.prototype;
module.exports = DoublyLinkedList;


/***/ }),

/***/ 547:
/***/ ((module) => {

/**
 * 链表
 *
 * push(element)：向链表尾部添加一个新元素。
 * insert(element,position)：在链表指定位置插入一个新元素。
 * getElementAt(index)：返回链表中特定位置的元素，如果没有则返回undefined。
 * remove(element)：从链表中移除一个元素。
 * indexOf(element)：返回元素在链表中的索引，如果没有则返回-1。
 * removeAt(position)：从链表指定位置移除一个元素。
 * isEmpty()：如果链表中不包含任何元素，则返回true，否则返回false。
 * size()：返回链表包含的元素个数。
 * getHead()：返回链表的第一个元素。
 * getHead()：清空链表。
 * toString()：返回表示整个链表的字符串。
 *
 */
module.exports = function LinkedList() {
    LinkedList.prototype.count = 0;
    LinkedList.prototype.head = null;
    function Node(element) {
        this.element = element;
        this.next = null;
    }
    LinkedList.prototype.Node = Node;
    /**
     * 向链表尾部添加一个新元素
     * @param element
     */
    LinkedList.prototype.push = function (element) {
        // @ts-ignore
        var node = new Node(element);
        if (this.head) {
            var current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        else {
            this.head = node;
        }
        this.count += 1;
    };
    /**
     * 在链表指定位置插入一个新元素
     * @param element
     * @param position
     * @returns {undefined}
     */
    // @ts-ignore
    LinkedList.prototype.insert = function (element, position) {
        if (position < 0) {
            return undefined;
        }
        else if (this.count <= position) {
            this.push(element);
        }
        else {
            // @ts-ignore
            var node = new Node(element);
            if (position === 0) {
                node.next = this.head;
                this.head = node;
            }
            else {
                var res = this.getElementAt(position - 1);
                node.next = res.next;
                res.next = node;
            }
            this.count += 1;
        }
    };
    /**
     * 返回链表中特定位置的元素，如果没有则返回undefined
     * @param index
     * @returns {Node|undefined}
     */
    LinkedList.prototype.getElementAt = function (index) {
        if (this.count <= index) {
            return undefined;
        }
        var current = this.head;
        for (var i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    };
    /**
     * 从链表中移除一个元素
     * @param element
     * @returns {Node.element}
     */
    LinkedList.prototype.remove = function (element) {
        return this.removeAt(this.indexOf(element));
    };
    /**
     * 返回元素在链表中的索引，如果没有则返回-1
     * @param element
     * @returns {number}
     */
    LinkedList.prototype.indexOf = function (element) {
        if (this.count > 0) {
            var current = this.head;
            for (var i = 0; i < this.count; i++) {
                console.log(current.element);
                if (current.element === element) {
                    return i;
                }
                else {
                    current = current.next;
                }
            }
        }
        return -1;
    };
    /**
     * 从链表指定位置移除一个元素
     * @param index
     * @returns {undefined|*}
     */
    LinkedList.prototype.removeAt = function (index) {
        if (index < 0 || this.count === 0 || index >= this.count) {
            return undefined;
        }
        var current = this.head;
        if (index === 0) {
            this.head = current.next;
        }
        else {
            var element = this.getElementAt(index - 1);
            current = element.next;
            element.next = current.next;
        }
        this.count -= 1;
        return current.element;
    };
    /**
     * 如果链表中不包含任何元素，则返回true，否则返回false
     * @returns {boolean}
     */
    LinkedList.prototype.isEmpty = function () {
        return this.count === 0;
    };
    /**
     * 返回链表包含的元素个数
     * @returns {number}
     */
    LinkedList.prototype.size = function () {
        return this.count;
    };
    /**
     * 返回链表的第一个元素
     * @returns {Node|null}
     */
    LinkedList.prototype.getHead = function () {
        return this.head;
    };
    /**
     * 清空链表
     */
    LinkedList.prototype.clear = function () {
        this.head = null;
    };
    /**
     * 返回表示整个链表的字符串
     * @returns {string}
     */
    LinkedList.prototype.toString = function () {
        if (this.count === 0) {
            return "";
        }
        var str = "";
        var num = 0;
        var current = this.head;
        while (current.next) {
            str += "LinkedList: {element: ".concat(current.element, ", index: ").concat(num, "} next ----> ").concat(current.next.element, "\n");
            num += 1;
            current = current.next;
        }
        str += "LinkedList: {element: ".concat(current.element, ", index: ").concat(num, "} next ----> null\n");
        return str;
    };
};


/***/ }),

/***/ 20:
/***/ ((module) => {

/**
 * 队列
 *
 * set()：向队列添加元素，可根据元素数字进行排序
 * get()：获取队列数据，并且自动解析QueueElement对象，直接返回结果
 * enqueue()：向队列的尾部添加元素。
 * frontQueue()：向队列前面添加新元素。
 * dequeue()：向队列的开头移除第一个元素，并返回被移除的元素。
 * pop()：向队列移除最后的，并返回被移除的元素。
 * peekFront()：返回队列前端的第一个元素。
 * peekBack()：返回队列后端的第一个元素。
 * isEmpty()：判断队列是否为空。
 * size()：返回队列包含元素的个数。
 * clear()：清空队列。
 * toString()：将队列转换成字符串格式。
 *
 * */
module.exports = function Queue() {
    this.count = 0;
    this.items = [];
    /**
     * 元素和优先级
     * @constructor
     */
    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }
    /**
     * 添加一个有排序的数据
     * @param element----添加元素----必传
     * @param priority----层级数，数量越高，越往后，为负数或者0时自动默认继承上一个元素的权重值并且+1----非必传
     */
    Queue.prototype.set = function (element, priority) {
        //判断为真数值，或者大于0时，为有效权重
        if (priority && priority > 0) {
            // @ts-ignore
            var queueElement = new QueueElement(element, priority);
            //锁，如果有插入元素，就为true
            var isAdd = false;
            for (var i = 0; i < this.count; i++) {
                if (this.items[i].priority > priority) {
                    this.items.splice(i, 0, queueElement);
                    isAdd = true;
                    break;
                }
            }
            if (!isAdd) {
                this.items[this.count] = queueElement;
            }
            this.count += 1;
        }
        else {
            this.enqueue(element);
        }
    };
    /**
     * 获取队列数据，并且筛选掉权重字段
     * @returns {[]}
     */
    Queue.prototype.get = function () {
        var res = [];
        for (var i = 0; i < this.count; i++) {
            res.push(this.items[i].element);
        }
        return res;
    };
    /**
     * 向队列的尾部添加元素
     * @param element
     */
    Queue.prototype.enqueue = function (element) {
        var queueElement;
        if (this.isEmpty()) {
            //默认使用数组长度为元素权重值
            // @ts-ignore
            queueElement = new QueueElement(element, this.count + 1);
        }
        else {
            //默认继承上一个元素的权重值并且+1
            // @ts-ignore
            queueElement = new QueueElement(element, this.items[this.count - 1].priority + 1);
        }
        this.items[this.count] = queueElement;
        this.count += 1;
    };
    /**
     * 向队列前面添加新元素
     * @param element
     * @returns {*}
     */
    Queue.prototype.frontQueue = function (element) {
        var queueElement;
        if (this.isEmpty()) {
            //默认使用数组长度为元素权重值
            // @ts-ignore
            queueElement = new QueueElement(element, this.count + 1);
        }
        else {
            //默认继承上一个元素的权重值
            // @ts-ignore
            queueElement = new QueueElement(element, this.peekFront().priority);
            //改变所有排序值+1
            for (var i = 0; i < this.count; i++) {
                this.items[i].priority += 1;
            }
        }
        this.items.splice(0, 0, queueElement);
        this.count += 1;
    };
    /**
     * 在队列的开头移除第一个元素，并返回被移除的元素。
     * @returns {null|T}
     */
    Queue.prototype.dequeue = function () {
        if (this.isEmpty()) {
            return null;
        }
        this.count -= 1;
        return this.items.shift();
    };
    /**
     * 在队列的移除最后一个元素，并返回被移除的元素。
     * @returns {null|T}
     */
    Queue.prototype.pop = function () {
        if (this.isEmpty()) {
            return null;
        }
        this.count -= 1;
        return this.items.pop();
    };
    /**
     * 返回队列的第一个元素
     * @param is----布尔类型，为true时直接返回结果，否则返回 QueueElement对象----非必填
     * @returns {*}
     */
    Queue.prototype.peekFront = function (is) {
        if (this.isEmpty()) {
            return undefined;
        }
        return is ? this.items[0].element : this.items[0];
    };
    /**
     * 返回队列的第一个元素
     * @param is----布尔类型，为true时直接返回结果，否则返回 QueueElement对象----非必填
     * @returns {*}
     */
    Queue.prototype.peekBack = function (is) {
        if (this.isEmpty()) {
            return undefined;
        }
        return is ? this.items[this.count - 1].element : this.items[this.count - 1];
    };
    /**
     * 判断队列是否为空
     * @returns {boolean}
     */
    Queue.prototype.isEmpty = function () {
        return this.count === 0;
    };
    /**
     * 返回队列包含元素的个数
     * @returns {number}
     */
    Queue.prototype.size = function () {
        return this.count;
    };
    /**
     * 清空队列
     */
    Queue.prototype.clear = function () {
        this.items = [];
        this.count = 0;
    };
    /**
     * 将队列转换成字符串格式
     * @returns {string|*[]}
     */
    Queue.prototype.toString = function () {
        if (this.isEmpty()) {
            return '';
        }
        var res = "";
        this.items.forEach(function (item) {
            res += "QueueElement: {element: ".concat(item.element, ",priority: ").concat(item.priority, "}\n");
        });
        return res;
    };
};


/***/ }),

/***/ 381:
/***/ ((module) => {

/**
 * 栈
 *
 * push()：在栈顶添加一个或者多个元素。
 * pop()：移除栈顶的第一个元素，同时返回被移除的元素。
 * peek()：返回栈顶的元素。
 * isEmpty()：判断栈是否为空，是则返回true，否则返回false
 * clear()：移除栈中的所有元素。
 * size()：返回栈中元素的个数。
 */
module.exports = function Stack() {
    this.count = 0;
    this.items = [];
    /**
     * 新增一个元素
     * @param element
     */
    Stack.prototype.push = function (element) {
        this.items[this.count] = element;
        this.count += 1;
    };
    /**
     * 删除第一个元素
     * @returns {undefined|T}
     */
    Stack.prototype.pop = function () {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count -= 1;
        return this.items.pop();
    };
    /**
     * 返回栈顶得元素
     * @returns {*}
     */
    Stack.prototype.peek = function () {
        return this.items[this.count - 1];
    };
    /**
     * 判断是否为空
     * @returns {boolean}
     */
    Stack.prototype.isEmpty = function () {
        return this.size() === 0;
    };
    /**
     * 清除所有
     */
    Stack.prototype.clear = function () {
        this.count = 0;
        this.items = [];
    };
    /**
     * 栈的数量
     * @returns {number}
     */
    Stack.prototype.size = function () {
        return this.count;
    };
    Stack.prototype.toString = function () {
        if (this.isEmpty()) {
            return '';
        }
        return this.items.join(",");
    };
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDN0MsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7QUFDdkMsQ0FBQztBQUVEOztFQUVFO0FBQ0YsU0FBUyxhQUFhLENBQUUsR0FBVyxFQUFFLEdBQVc7SUFDNUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQ7O0VBRUU7QUFDRixTQUFTLE1BQU0sQ0FBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDN0UsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUUsQ0FBQztBQUNELFNBQVMsS0FBSyxDQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDdkYsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFDRCxTQUFTLEtBQUssQ0FBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO0lBQ3ZGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBQ0QsU0FBUyxLQUFLLENBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztJQUN2RixPQUFPLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFDRCxTQUFTLEtBQUssQ0FBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO0lBQ3ZGLE9BQU8sTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVEOztFQUVFO0FBQ0YsU0FBUyxPQUFPLENBQUUsQ0FBTSxFQUFFLEdBQVc7SUFDakMsb0JBQW9CO0lBQ3BCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRztJQUVyQyxJQUFJLENBQUM7SUFDTCxJQUFJLElBQUk7SUFDUixJQUFJLElBQUk7SUFDUixJQUFJLElBQUk7SUFDUixJQUFJLElBQUk7SUFDUixJQUFJLENBQUMsR0FBRyxVQUFVO0lBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUztJQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVU7SUFDbkIsSUFBSSxDQUFDLEdBQUcsU0FBUztJQUVqQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvQixJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksR0FBRyxDQUFDO1FBQ1IsSUFBSSxHQUFHLENBQUM7UUFDUixJQUFJLEdBQUcsQ0FBQztRQUVSLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDMUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDNUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQztRQUVoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUMzQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUM7UUFDN0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDO1FBQzdDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFFakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDM0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUMzQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUM7UUFDN0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBRS9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDMUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFD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QyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUY7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsS0FBYTtRQUMzQyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUY7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsS0FBYTtRQUN6QyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUY7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsS0FBVTtRQUN4QyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUY7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFVBQVUsS0FBVTtRQUN2QyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUY7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVUsS0FBVTtRQUN6QyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUY7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVUsS0FBYTtRQUM1QyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUY7Ozs7T0FJRztJQUNI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Q3BDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRztRQUN0QixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUc7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUc7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRztRQUN2QixJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBQztZQUNkLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7QUFDTCxDQUFDOzs7Ozs7O1VDMUVEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy8uL3NyYy9VdGlscy9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL0FycmF5L0FycmF5LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvQ29sb3IvQ29sb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9EZWJvdW5jZS9EZWJvdW5jZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL0RlZXBDbG9uZS9EZWVwQ2xvbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9EZWVwTWVyZ2UvRGVlcE1lcmdlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvR3VpZC9HdWlkLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvTUQ1L01ENS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL1BhcmFtcy9QYXJhbXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9Qcm90b3R5cGUvUHJvdG90eXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvVGVzdC9UZXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvVGhyb3R0bGUvVGhyb3R0bGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9UaW1lL1RpbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9UcmltL1RyaW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0cnVjdHVyZS9Eb3VibHlMaW5rZWRMaXN0L0RvdWJseUxpbmtlZExpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0cnVjdHVyZS9MaW5rZWRMaXN0L0xpbmtlZExpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0cnVjdHVyZS9RdWV1ZS9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RydWN0dXJlL1N0YWNrL1N0YWNrLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsInZhciBTdGFjayA9IHJlcXVpcmUoXCIuLi9zdHJ1Y3R1cmUvU3RhY2svU3RhY2tcIik7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9ICBmdW5jdGlvbiBVdGlscygpe1xyXG4gICAgLyoqXHJcbiAgICAgKiDov5vliLbovazmjaLnrpfms5VcclxuICAgICAqIEBwYXJhbSBkZWNOdW1iZXIg6L2s5o2i55qE5pWw5a2XXHJcbiAgICAgKiBAcGFyYW0gYmFzZSAg6L2s5o2i55qE57G75Z6LXHJcbiAgICAgKi9cclxuICAgIFV0aWxzLnByb3RvdHlwZS5iYXNlQ29udmVydGVyID0gZnVuY3Rpb24oZGVjTnVtYmVyOm51bWJlciwgYmFzZTpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICB2YXIgc3RhY2sgPSBuZXcgU3RhY2soKTtcclxuICAgICAgICB2YXIgcmVzOnN0cmluZyA9ICcnO1xyXG4gICAgICAgIHZhciByZW06bnVtYmVyO1xyXG4gICAgICAgIGJhc2UgPSBiYXNlfHwyO1xyXG4gICAgICAgIGlmKGJhc2UgPCAyIHx8IGJhc2UgPiAzNil7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUoZGVjTnVtYmVyID4gMCl7XHJcbiAgICAgICAgICAgIHJlbSA9IE1hdGguZmxvb3IoZGVjTnVtYmVyICUgYmFzZSk7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gocmVtKTtcclxuICAgICAgICAgICAgZGVjTnVtYmVyID0gTWF0aC5mbG9vcihkZWNOdW1iZXIgLyBiYXNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKCFzdGFjay5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICByZXMgKz0gc3RhY2sucG9wKCkudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBBcnJheSAoKXtcclxuICAgIEFycmF5LnByb3RvdHlwZS5yYW5kb21BcnJheSA9IGZ1bmN0aW9uIChhcnJheTogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHJldHVybiBhcnJheS5zb3J0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAtIDAuNTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ29sb3IgKCl7XHJcbiAgICAvKipcclxuICAgICAqIOminOiJsua4kOWPmFxyXG4gICAgICpcclxuICAgICAqIOivpeWHveaVsOWunueOsOS4pOS4quminOiJsuWAvOS5i+mXtOetieWIhuWPluWAvO+8jOi/lOWbnuS4gOS4quaVsOe7hO+8jOWFg+e0oOS4uuWNgeWFrei/m+WItuW9ouW8j+eahOminOiJsuWAvO+8jOaVsOe7hOmVv+W6puS4unN0ZXDlgLzjgIJcclxuICAgICAqIOS+i+Wmgu+8mmNvbG9yR3JhZGllbnQoJ3JnYigyNTAsIDI1MCwgMjUwKScsICdyZ2IoMjUyLCAyNTIsIDI1MiknLCAzKe+8jOW+l+WIsOeahOe7k+aenOS4ultcIiNmYWZhZmFcIiwgXCIjZmFmYWZhXCIsIFwiI2ZiZmJmYlwiXVxyXG4gICAgICogQHBhcmFtIHN0YXJ0Q29sb3I8U3RyaW5nPiDlvIDlp4vpopzoibLlgLzvvIzlj6/ku6XmmK9IRVjmiJbogIVSR0LpopzoibLlgLzvvIzlpoIjMGFmZGNl5oiW6ICFcmdiKDEyMCwgMTMwLCAxNTApXHJcbiAgICAgKiBAcGFyYW0gZW5kQ29sb3IgPFN0cmluZz4g57uT5p2f6aKc6Imy5YC877yM5Y+v5Lul5pivSEVY5oiW6ICFUkdC6aKc6Imy5YC877yM5aaCIzBhZmRjZeaIluiAhXJnYigxMjAsIDEzMCwgMTUwKVxyXG4gICAgICogQHBhcmFtIHN0ZXAgPE51bWJlcj4g5Z2H5YiG5YC877yM5oqK5byA5aeL5YC85ZKM57uT5p2f5YC85bmz5Z2H5YiG5oiQ5aSa5bCR5Lu9XHJcbiAgICAgKi9cclxuICAgIENvbG9yLnByb3RvdHlwZS5jb2xvckdyYWRpZW50ID0gZnVuY3Rpb24gKHN0YXJ0Q29sb3I6IHN0cmluZywgZW5kQ29sb3I6IHN0cmluZywgc3RlcCA9IDEwKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgc3RhcnRDb2xvciA9IHN0YXJ0Q29sb3J8fCdyZ2IoMCwgMCwgMCknO1xyXG4gICAgICAgIGVuZENvbG9yID0gZW5kQ29sb3J8fCdyZ2IoMjU1LCAyNTUsIDI1NSknO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0UkdCID0gdGhpcy5oZXhUb1JnYihzdGFydENvbG9yLCBmYWxzZSk7IC8vIOi9rOaNouS4unJnYuaVsOe7hOaooeW8j1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0UiA9IHN0YXJ0UkdCWzBdO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0RyA9IHN0YXJ0UkdCWzFdO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0QiA9IHN0YXJ0UkdCWzJdO1xyXG5cclxuICAgICAgICBjb25zdCBlbmRSR0IgPSB0aGlzLmhleFRvUmdiKGVuZENvbG9yLCBmYWxzZSlcclxuICAgICAgICBjb25zdCBlbmRSID0gZW5kUkdCWzBdO1xyXG4gICAgICAgIGNvbnN0IGVuZEcgPSBlbmRSR0JbMV07XHJcbiAgICAgICAgY29uc3QgZW5kQiA9IGVuZFJHQlsyXTtcclxuXHJcbiAgICAgICAgY29uc3Qgc1IgPSAoZW5kUiAtIHN0YXJ0UikgLyBzdGVwOyAvLyDmgLvlt67lgLxcclxuICAgICAgICBjb25zdCBzRyA9IChlbmRHIC0gc3RhcnRHKSAvIHN0ZXA7XHJcbiAgICAgICAgY29uc3Qgc0IgPSAoZW5kQiAtIHN0YXJ0QikgLyBzdGVwO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yQXJyID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwOyBpKyspIHtcclxuICAgICAgICAgICAgLy8g6K6h566X5q+P5LiA5q2l55qEaGV45YC8XHJcbiAgICAgICAgICAgIGxldCBoZXggPSB0aGlzLnJnYlRvSGV4KGByZ2IoJHtNYXRoLnJvdW5kKChzUiAqIGkgKyBzdGFydFIpKX0sJHtNYXRoLnJvdW5kKChzRyAqIGkgKyBzdGFydEcpKX0sJHtNYXRoLnJvdW5kKChzQlxyXG4gICAgICAgICAgICAgICAgKiBpICsgc3RhcnRCKSl9KWApO1xyXG4gICAgICAgICAgICAvLyDnoa7kv53nrKzkuIDkuKrpopzoibLlgLzkuLpzdGFydENvbG9y55qE5YC8XHJcbiAgICAgICAgICAgIGlmIChpID09PSAwKSBoZXggPSB0aGlzLnJnYlRvSGV4KHN0YXJ0Q29sb3IpO1xyXG4gICAgICAgICAgICAvLyDnoa7kv53mnIDlkI7kuIDkuKrpopzoibLlgLzkuLplbmRDb2xvcueahOWAvFxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gc3RlcCAtIDEpIGhleCA9IHRoaXMucmdiVG9IZXgoZW5kQ29sb3IpO1xyXG4gICAgICAgICAgICBjb2xvckFyci5wdXNoKGhleClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbG9yQXJyXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljYHlha3ov5vliLZIZXjovaxSR0JcclxuICAgICAqXHJcbiAgICAgKiDor6Xlh73mlbDlj6/ku6XlsIbkuIDkuKpIZXjnmoTljYHlha3ov5vliLbpopzoibLlgLzovazmjaLmiJDkuIDkuKpSR0LpopzoibLlgLxcclxuICAgICAqIEBwYXJhbSBzQ29sb3IgPFN0cmluZz4gSEV46aKc6Imy5YC877yM5aaCIzBhZmRjZVxyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICovXHJcbiAgICBDb2xvci5wcm90b3R5cGUuaGV4VG9SZ2IgPSAgZnVuY3Rpb24gKHNDb2xvcjogc3RyaW5nLCBzdHIgPSB0cnVlKTogYW55IHtcclxuICAgICAgICBjb25zdCByZWcgPSAvXiMoWzAtOWEtZkEtZl17M318WzAtOWEtZkEtZl17Nn0pJC9cclxuICAgICAgICBzQ29sb3IgPSBTdHJpbmcoc0NvbG9yKS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgaWYgKHNDb2xvciAmJiByZWcudGVzdChzQ29sb3IpKSB7XHJcbiAgICAgICAgICAgIGlmIChzQ29sb3IubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc0NvbG9yTmV3ID0gJyMnXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNDb2xvck5ldyArPSBzQ29sb3Iuc2xpY2UoaSwgaSArIDEpLmNvbmNhdChzQ29sb3Iuc2xpY2UoaSwgaSArIDEpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc0NvbG9yID0gc0NvbG9yTmV3XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5aSE55CG5YWt5L2N55qE6aKc6Imy5YC8XHJcbiAgICAgICAgICAgIGNvbnN0IHNDb2xvckNoYW5nZSA9IFtdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNzsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgICAgICBzQ29sb3JDaGFuZ2UucHVzaChwYXJzZUludChgMHgke3NDb2xvci5zbGljZShpLCBpICsgMil9YCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzdHIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzQ29sb3JDaGFuZ2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYHJnYigke3NDb2xvckNoYW5nZVswXX0sJHtzQ29sb3JDaGFuZ2VbMV19LCR7c0NvbG9yQ2hhbmdlWzJdfSlgXHJcbiAgICAgICAgfSBpZiAoL14ocmdifFJHQikvLnRlc3Qoc0NvbG9yKSkge1xyXG4gICAgICAgICAgICBjb25zdCBhcnIgPSBzQ29sb3IucmVwbGFjZSgvKD86XFwofFxcKXxyZ2J8UkdCKSovZywgJycpLnNwbGl0KCcsJylcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5tYXAoKHZhbCkgPT4gTnVtYmVyKHZhbCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzQ29sb3JcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJHQui9rOWNgeWFrei/m+WItkhleFxyXG4gICAgICog6K+l5Ye95pWw5Y+v5Lul5bCG5LiA5LiqUkdC6aKc6Imy5YC86L2s5o2i5oiQ5LiA5LiqSGV455qE5Y2B5YWt6L+b5Yi26aKc6Imy5YC8XHJcbiAgICAgKiBAcGFyYW0gcmdiIDxTdHJpbmc+IFJHQuminOiJsuWAvO+8jOWmgnJnYigyMzAsIDIzMSwgMjMzKVxyXG4gICAgICovXHJcbiAgICBDb2xvci5wcm90b3R5cGUucmdiVG9IZXggPSBmdW5jdGlvbiAocmdiOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IF90aGlzID0gcmdiXHJcbiAgICAgICAgY29uc3QgcmVnID0gL14jKFswLTlhLWZBLWZdezN9fFswLTlhLWZBLWZdezZ9KSQvXHJcbiAgICAgICAgaWYgKC9eKHJnYnxSR0IpLy50ZXN0KF90aGlzKSkge1xyXG4gICAgICAgICAgICBjb25zdCBhQ29sb3IgPSBfdGhpcy5yZXBsYWNlKC8oPzpcXCh8XFwpfHJnYnxSR0IpKi9nLCAnJykuc3BsaXQoJywnKVxyXG4gICAgICAgICAgICBsZXQgc3RySGV4ID0gJyMnXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYUNvbG9yLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGV4ID0gTnVtYmVyKGFDb2xvcltpXSkudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgICAgICBoZXggPSBTdHJpbmcoaGV4KS5sZW5ndGggPT0gMSA/IGAkezB9JHtoZXh9YCA6IGhleCAvLyDkv53or4Hmr4/kuKpyZ2LnmoTlgLzkuLoy5L2NXHJcbiAgICAgICAgICAgICAgICBpZiAoaGV4ID09PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBoZXggKz0gaGV4XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdHJIZXggKz0gaGV4XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0ckhleC5sZW5ndGggIT09IDcpIHtcclxuICAgICAgICAgICAgICAgIHN0ckhleCA9IF90aGlzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHN0ckhleFxyXG4gICAgICAgIH0gaWYgKHJlZy50ZXN0KF90aGlzKSkge1xyXG4gICAgICAgICAgICBjb25zdCBhTnVtID0gX3RoaXMucmVwbGFjZSgvIy8sICcnKS5zcGxpdCgnJylcclxuICAgICAgICAgICAgaWYgKGFOdW0ubGVuZ3RoID09PSA2KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXNcclxuICAgICAgICAgICAgfSBpZiAoYU51bS5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBudW1IZXggPSAnIydcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYU51bS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bUhleCArPSAoYU51bVtpXSArIGFOdW1baV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtSGV4XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBKU+minOiJsuWNgeWFrei/m+WItui9rOaNouS4unJnYuaIlnJnYmEs6L+U5Zue55qE5qC85byP5Li6IHJnYmHvvIgyNTXvvIwyNTXvvIwyNTXvvIwwLjXvvInlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBjb2xvciA8U3RyaW5nPiDpopzoibLlgLzvvIzlj6rog71oZXjmiJbogIVyZ2Jh5qC85byPXHJcbiAgICAgKiBAcGFyYW0gb3BhY2l0eSA8TnVtYmVyPiDkuI3pgI/mmI7luqblgLzvvIzlj5blgLzkuLowLTHkuYvpl7RcclxuICAgICAqL1xyXG4gICAgQ29sb3IucHJvdG90eXBlLmNvbG9yVG9SZ2JhID0gZnVuY3Rpb24gKGNvbG9yOiBzdHJpbmcsIG9wYWNpdHk6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgY29sb3IgPSB0aGlzLnJnYlRvSGV4KGNvbG9yKTtcclxuICAgICAgICAvLyDljYHlha3ov5vliLbpopzoibLlgLznmoTmraPliJnooajovr7lvI9cclxuICAgICAgICBjb25zdCByZWcgPSAvXiMoWzAtOWEtZkEtZl17M318WzAtOWEtZkEtZl17Nn0pJC9cclxuICAgICAgICAvKiAxNui/m+WItuminOiJsui9rOS4ulJHQuagvOW8jyAqL1xyXG4gICAgICAgIGxldCBzQ29sb3IgPSBTdHJpbmcoY29sb3IpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKHNDb2xvciAmJiByZWcudGVzdChzQ29sb3IpKSB7XHJcbiAgICAgICAgICAgIGlmIChzQ29sb3IubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc0NvbG9yTmV3ID0gJyMnO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzQ29sb3JOZXcgKz0gc0NvbG9yLnNsaWNlKGksIGkgKyAxKS5jb25jYXQoc0NvbG9yLnNsaWNlKGksIGkgKyAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzQ29sb3IgPSBzQ29sb3JOZXc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5aSE55CG5YWt5L2N55qE6aKc6Imy5YC8XHJcbiAgICAgICAgICAgIGNvbnN0IHNDb2xvckNoYW5nZSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDc7IGkgKz0gMikge1xyXG4gICAgICAgICAgICAgICAgc0NvbG9yQ2hhbmdlLnB1c2gocGFyc2VJbnQoYDB4JHtzQ29sb3Iuc2xpY2UoaSwgaSArIDIpfWApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYHJnYmEoJHtzQ29sb3JDaGFuZ2Uuam9pbignLCcpfSwke29wYWNpdHl8fDF9KWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc0NvbG9yO1xyXG4gICAgfVxyXG59XHJcbiIsInZhciB0aW1lRGVib3VuY2U6IGFueTtcclxuXHJcbi8qKlxyXG4gKiDpmLLmipZcclxuICogQHBhcmFtIGZ1bmNcclxuICogQHBhcmFtIHdhaXRcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRGVib3VuY2UgKCBmdW5jOiBGdW5jdGlvbiwgd2FpdDogbnVtYmVyICkge1xyXG4gICAgaWYodGltZURlYm91bmNlKXtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZURlYm91bmNlKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzOiBhbnkpIHtcclxuICAgICAgICBsZXQgX3RoaXM6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgdGltZURlYm91bmNlID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuYy5hcHBseShfdGhpcywgYXJncyk7XHJcbiAgICAgICAgfSwgd2FpdClcclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICog5rex5bqm5YWL6ZqGXHJcbiAqIOWPr+WFi+mahuexu+Wei+WMheaLrO+8mlN0cmluZ++8jE51bWJlcu+8jFVuZGVmaW5lZO+8jEJvb2xlYW7vvIxOdWxs77yMT2JqZWN077yMSlNPTu+8jEFycmF577yMRGF0Ze+8jFJlZ0V4cCxGdW5jdGlvblxyXG4gKiBAcGFyYW0gb2JqXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERlZXBDbG9uZShvYmo6IGFueSk6IGFueXtcclxuICAgIHZhciB0ID0gdHlwZW9mIG9iajtcclxuICAgIGlmKCBPYmplY3QuaXModCwgXCJzdHJpbmdcIikgfHwgT2JqZWN0LmlzKHQsIFwibnVtYmVyXCIpIHx8IE9iamVjdC5pcyh0LCBcInVuZGVmaW5lZFwiKSB8fCBPYmplY3QuaXModCwgXCJib29sZWFuXCIpIHx8IE9iamVjdC5pcyh0LCBcImZ1bmN0aW9uXCIpIHx8IE9iamVjdC5pcyhvYmosbnVsbCkpe1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9IGVsc2UgaWYgKCBPYmplY3QuaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaiksIFwiW29iamVjdCBEYXRlXVwiKSApe1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShvYmouZ2V0VGltZSgpKVxyXG4gICAgfSBlbHNlIGlmICggT2JqZWN0LmlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopLCBcIltvYmplY3QgUmVnRXhwXVwiKSApe1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKG9iailcclxuICAgIH0gZWxzZSBpZiAoIEFycmF5LmlzQXJyYXkob2JqKSApIHtcclxuICAgICAgICB2YXIgYXJyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhcnIucHVzaChEZWVwQ2xvbmUob2JqW2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciByZXMgPSB7fTtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICByZXNba2V5XSA9IERlZXBDbG9uZShvYmpba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInZhciBEZWVwQ2xvbmUgPSByZXF1aXJlKFwiLi4vRGVlcENsb25lL0RlZXBDbG9uZVwiKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBEZWVwTWVyZ2UodGFyZ2V0OiBvYmplY3QsIHNvdXJjZTogb2JqZWN0KTogYW55IHtcclxuICAgIHRhcmdldCA9IG5ldyBEZWVwQ2xvbmUodGFyZ2V0KVxyXG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2VcclxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBzb3VyY2UpIHtcclxuICAgICAgICBpZiAoIXNvdXJjZS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkgY29udGludWVcclxuICAgICAgICBpZiAocHJvcCBpbiB0YXJnZXQpIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YXJnZXRbcHJvcF0uY29uY2F0KVxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gc291cmNlW3Byb3BdXHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNvdXJjZVtwcm9wXSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHNvdXJjZVtwcm9wXVxyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldFtwcm9wXSA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldFtwcm9wXS5jb25jYXQgJiYgc291cmNlW3Byb3BdLmNvbmNhdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdGFyZ2V0W3Byb3BdLmNvbmNhdChzb3VyY2VbcHJvcF0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBEZWVwTWVyZ2UodGFyZ2V0W3Byb3BdLCBzb3VyY2VbcHJvcF0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHNvdXJjZVtwcm9wXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXRcclxufVxyXG4iLCIvKipcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbiB1dWlk55qE6ZW/5bqmXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZmlyc3RVIOWwhui/lOWbnueahOmmluWtl+avjee9ruS4ulwia2xcIlxyXG4gKiBAcGFyYW0ge051Ym1lcn0gcmFkaXgg55Sf5oiQdXVpZOeahOWfuuaVsCjmhI/lkbPnnYDov5Tlm57nmoTlrZfnrKbkuLLpg73mmK/ov5nkuKrln7rmlbApLDIt5LqM6L+b5Yi2LDgt5YWr6L+b5Yi2LDEwLeWNgei/m+WItiwxNi3ljYHlha3ov5vliLZcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gR3VpZCgpIHtcclxuICAgIEd1aWQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChsZW4gPSAzMiwgZmlyc3RVID0gdHJ1ZSwgcmFkaXg6IG51bWJlcik6IHN0cmluZ3tcclxuICAgICAgICByYWRpeCA9IHJhZGl4fHxudWxsO1xyXG4gICAgICAgIGNvbnN0IGNoYXJzOkFycmF5PHN0cmluZz4gPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonLnNwbGl0KCcnKVxyXG4gICAgICAgIGNvbnN0IHV1aWQ6QXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIHJhZGl4ID0gcmFkaXggfHwgY2hhcnMubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW4pIHtcclxuICAgICAgICAgICAgLy8g5aaC5p6c5oyH5a6adXVpZOmVv+W6pizlj6rmmK/lj5bpmo/mnLrnmoTlrZfnrKYsMHx45Li65L2N6L+Q566XLOiDveWOu+aOiXjnmoTlsI/mlbDkvY0s6L+U5Zue5pW05pWw5L2NXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHV1aWRbaV0gPSBjaGFyc1swIHwgTWF0aC5yYW5kb20oKSAqIHJhZGl4XVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByXHJcbiAgICAgICAgICAgIC8vIHJmYzQxMjLmoIflh4bopoHmsYLov5Tlm57nmoR1dWlk5LitLOafkOS6m+S9jeS4uuWbuuWumueahOWtl+esplxyXG4gICAgICAgICAgICB1dWlkWzhdID0gdXVpZFsxM10gPSB1dWlkWzE4XSA9IHV1aWRbMjNdID0gJy0nO1xyXG4gICAgICAgICAgICB1dWlkWzE0XSA9ICc0JztcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzY7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF1dWlkW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgciA9IDAgfCBNYXRoLnJhbmRvbSgpICogMTY7XHJcbiAgICAgICAgICAgICAgICAgICAgdXVpZFtpXSA9IGNoYXJzWyhpID09IDE5KSA/IChyICYgMHgzKSB8IDB4OCA6IHJdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g56e76Zmk56ys5LiA5Liq5a2X56ymLOW5tueUqHXmm7/ku6Ms5Zug5Li656ys5LiA5Liq5a2X56ym5Li65pWw5YC85pe2LOivpWd1dWlk5LiN6IO955So5L2caWTmiJbogIVjbGFzc1xyXG4gICAgICAgIGlmIChmaXJzdFUpIHtcclxuICAgICAgICAgICAgdXVpZC5zaGlmdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gYGtsJHt1dWlkLmpvaW4oJycpfWBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHV1aWQuam9pbignJylcclxuICAgIH1cclxufVxyXG4iLCJcclxuXHJcbi8qIGdsb2JhbCBkZWZpbmUgKi9cclxuXHJcbid1c2Ugc3RyaWN0J1xyXG5cclxuLypcclxuKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XHJcbiogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cclxuKi9cclxuZnVuY3Rpb24gc2FmZUFkZCAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIHZhciBsc3cgPSAoeCAmIDB4ZmZmZikgKyAoeSAmIDB4ZmZmZilcclxuICAgIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KVxyXG4gICAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4ZmZmZilcclxufVxyXG5cclxuLypcclxuKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXHJcbiovXHJcbmZ1bmN0aW9uIGJpdFJvdGF0ZUxlZnQgKG51bTogbnVtYmVyLCBjbnQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpXHJcbn1cclxuXHJcbi8qXHJcbiogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cclxuKi9cclxuZnVuY3Rpb24gbWQ1Y21uIChxOiBudW1iZXIsIGE6IG51bWJlciwgYjogbnVtYmVyLCB4OiBudW1iZXIsIHM6IG51bWJlciwgdDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gc2FmZUFkZChiaXRSb3RhdGVMZWZ0KHNhZmVBZGQoc2FmZUFkZChhLCBxKSwgc2FmZUFkZCh4LCB0KSksIHMpLCBiKVxyXG59XHJcbmZ1bmN0aW9uIG1kNWZmIChhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIsIHg6IG51bWJlciwgczogbnVtYmVyLCB0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBtZDVjbW4oKGIgJiBjKSB8ICh+YiAmIGQpLCBhLCBiLCB4LCBzLCB0KVxyXG59XHJcbmZ1bmN0aW9uIG1kNWdnIChhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIsIHg6IG51bWJlciwgczogbnVtYmVyLCB0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBtZDVjbW4oKGIgJiBkKSB8IChjICYgfmQpLCBhLCBiLCB4LCBzLCB0KVxyXG59XHJcbmZ1bmN0aW9uIG1kNWhoIChhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIsIHg6IG51bWJlciwgczogbnVtYmVyLCB0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBtZDVjbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KVxyXG59XHJcbmZ1bmN0aW9uIG1kNWlpIChhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIsIHg6IG51bWJlciwgczogbnVtYmVyLCB0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBtZDVjbW4oYyBeIChiIHwgfmQpLCBhLCBiLCB4LCBzLCB0KVxyXG59XHJcblxyXG4vKlxyXG4qIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGguXHJcbiovXHJcbmZ1bmN0aW9uIGJpbmxNRDUgKHg6IGFueSwgbGVuOiBudW1iZXIpIHtcclxuICAgIC8qIGFwcGVuZCBwYWRkaW5nICovXHJcbiAgICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8IChsZW4gJSAzMilcclxuICAgIHhbKChsZW4gKyA2NCkgPj4+IDkgPDwgNCkgKyAxNF0gPSBsZW5cclxuXHJcbiAgICB2YXIgaVxyXG4gICAgdmFyIG9sZGFcclxuICAgIHZhciBvbGRiXHJcbiAgICB2YXIgb2xkY1xyXG4gICAgdmFyIG9sZGRcclxuICAgIHZhciBhID0gMTczMjU4NDE5M1xyXG4gICAgdmFyIGIgPSAtMjcxNzMzODc5XHJcbiAgICB2YXIgYyA9IC0xNzMyNTg0MTk0XHJcbiAgICB2YXIgZCA9IDI3MTczMzg3OFxyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xyXG4gICAgICAgIG9sZGEgPSBhXHJcbiAgICAgICAgb2xkYiA9IGJcclxuICAgICAgICBvbGRjID0gY1xyXG4gICAgICAgIG9sZGQgPSBkXHJcblxyXG4gICAgICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2ldLCA3LCAtNjgwODc2OTM2KVxyXG4gICAgICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxXSwgMTIsIC0zODk1NjQ1ODYpXHJcbiAgICAgICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KVxyXG4gICAgICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKVxyXG4gICAgICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNywgLTE3NjQxODg5NylcclxuICAgICAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KVxyXG4gICAgICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTcsIC0xNDczMjMxMzQxKVxyXG4gICAgICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyA3XSwgMjIsIC00NTcwNTk4MylcclxuICAgICAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpXHJcbiAgICAgICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDldLCAxMiwgLTE5NTg0MTQ0MTcpXHJcbiAgICAgICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2MylcclxuICAgICAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpXHJcbiAgICAgICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNywgMTgwNDYwMzY4MilcclxuICAgICAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKVxyXG4gICAgICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MClcclxuICAgICAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgMTIzNjUzNTMyOSlcclxuXHJcbiAgICAgICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA1LCAtMTY1Nzk2NTEwKVxyXG4gICAgICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyA2XSwgOSwgLTEwNjk1MDE2MzIpXHJcbiAgICAgICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMylcclxuICAgICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpXSwgMjAsIC0zNzM4OTczMDIpXHJcbiAgICAgICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA1LCAtNzAxNTU4NjkxKVxyXG4gICAgICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKVxyXG4gICAgICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KVxyXG4gICAgICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA0XSwgMjAsIC00MDU1Mzc4NDgpXHJcbiAgICAgICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpXHJcbiAgICAgICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgOSwgLTEwMTk4MDM2OTApXHJcbiAgICAgICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNCwgLTE4NzM2Mzk2MSlcclxuICAgICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKVxyXG4gICAgICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDUsIC0xNDQ0NjgxNDY3KVxyXG4gICAgICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAyXSwgOSwgLTUxNDAzNzg0KVxyXG4gICAgICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpXHJcbiAgICAgICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KVxyXG5cclxuICAgICAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgNV0sIDQsIC0zNzg1NTgpXHJcbiAgICAgICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpXHJcbiAgICAgICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpXHJcbiAgICAgICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1NilcclxuICAgICAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMV0sIDQsIC0xNTMwOTkyMDYwKVxyXG4gICAgICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpXHJcbiAgICAgICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNiwgLTE1NTQ5NzYzMilcclxuICAgICAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApXHJcbiAgICAgICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KVxyXG4gICAgICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2ldLCAxMSwgLTM1ODUzNzIyMilcclxuICAgICAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgM10sIDE2LCAtNzIyNTIxOTc5KVxyXG4gICAgICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KVxyXG4gICAgICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNCwgLTY0MDM2NDQ4NylcclxuICAgICAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSlcclxuICAgICAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKVxyXG4gICAgICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAyXSwgMjMsIC05OTUzMzg2NTEpXHJcblxyXG4gICAgICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2ldLCA2LCAtMTk4NjMwODQ0KVxyXG4gICAgICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyA3XSwgMTAsIDExMjY4OTE0MTUpXHJcbiAgICAgICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KVxyXG4gICAgICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA1XSwgMjEsIC01NzQzNDA1NSlcclxuICAgICAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA2LCAxNzAwNDg1NTcxKVxyXG4gICAgICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KVxyXG4gICAgICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMylcclxuICAgICAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMV0sIDIxLCAtMjA1NDkyMjc5OSlcclxuICAgICAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpXHJcbiAgICAgICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NClcclxuICAgICAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MClcclxuICAgICAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSlcclxuICAgICAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgNF0sIDYsIC0xNDU1MjMwNzApXHJcbiAgICAgICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KVxyXG4gICAgICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSlcclxuICAgICAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgOV0sIDIxLCAtMzQzNDg1NTUxKVxyXG5cclxuICAgICAgICBhID0gc2FmZUFkZChhLCBvbGRhKVxyXG4gICAgICAgIGIgPSBzYWZlQWRkKGIsIG9sZGIpXHJcbiAgICAgICAgYyA9IHNhZmVBZGQoYywgb2xkYylcclxuICAgICAgICBkID0gc2FmZUFkZChkLCBvbGRkKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFthLCBiLCBjLCBkXVxyXG59XHJcblxyXG4vKlxyXG4qIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xyXG4qL1xyXG5mdW5jdGlvbiBiaW5sMnJzdHIgKGlucHV0OiBzdHJpbmcgfCBhbnlbXSkge1xyXG4gICAgdmFyIGlcclxuICAgIHZhciBvdXRwdXQgPSAnJ1xyXG4gICAgdmFyIGxlbmd0aDMyID0gaW5wdXQubGVuZ3RoICogMzJcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgzMjsgaSArPSA4KSB7XHJcbiAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGlucHV0W2kgPj4gNV0gPj4+IChpICUgMzIpKSAmIDB4ZmYpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0XHJcbn1cclxuXHJcbi8qXHJcbiogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xyXG4qIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxyXG4qL1xyXG5mdW5jdGlvbiByc3RyMmJpbmwgKGlucHV0OiBzdHJpbmcpIHtcclxuICAgIHZhciBpXHJcbiAgICB2YXIgb3V0cHV0ID0gW11cclxuICAgIG91dHB1dFsoaW5wdXQubGVuZ3RoID4+IDIpIC0gMV0gPSB1bmRlZmluZWRcclxuICAgIGZvciAoaSA9IDA7IGkgPCBvdXRwdXQubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBvdXRwdXRbaV0gPSAwXHJcbiAgICB9XHJcbiAgICB2YXIgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDhcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg4OyBpICs9IDgpIHtcclxuICAgICAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXQuY2hhckNvZGVBdChpIC8gOCkgJiAweGZmKSA8PCAoaSAlIDMyKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dFxyXG59XHJcblxyXG4vKlxyXG4qIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGEgcmF3IHN0cmluZ1xyXG4qL1xyXG5mdW5jdGlvbiByc3RyTUQ1IChzOiBhbnkpIHtcclxuICAgIHJldHVybiBiaW5sMnJzdHIoYmlubE1ENShyc3RyMmJpbmwocyksIHMubGVuZ3RoICogOCkpXHJcbn1cclxuXHJcbi8qXHJcbiogQ2FsY3VsYXRlIHRoZSBITUFDLU1ENSwgb2YgYSBrZXkgYW5kIHNvbWUgZGF0YSAocmF3IHN0cmluZ3MpXHJcbiovXHJcbmZ1bmN0aW9uIHJzdHJITUFDTUQ1IChrZXk6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICB2YXIgaVxyXG4gICAgdmFyIGJrZXkgPSByc3RyMmJpbmwoa2V5KVxyXG4gICAgdmFyIGlwYWQgPSBbXVxyXG4gICAgdmFyIG9wYWQgPSBbXVxyXG4gICAgdmFyIGhhc2hcclxuICAgIGlwYWRbMTVdID0gb3BhZFsxNV0gPSB1bmRlZmluZWRcclxuICAgIGlmIChia2V5Lmxlbmd0aCA+IDE2KSB7XHJcbiAgICAgICAgYmtleSA9IGJpbmxNRDUoYmtleSwga2V5Lmxlbmd0aCAqIDgpXHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkgKz0gMSkge1xyXG4gICAgICAgIGlwYWRbaV0gPSBia2V5W2ldIF4gMHgzNjM2MzYzNlxyXG4gICAgICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1YzVjNWM1Y1xyXG4gICAgfVxyXG4gICAgaGFzaCA9IGJpbmxNRDUoaXBhZC5jb25jYXQocnN0cjJiaW5sKGRhdGEpKSwgNTEyICsgZGF0YS5sZW5ndGggKiA4KVxyXG4gICAgcmV0dXJuIGJpbmwycnN0cihiaW5sTUQ1KG9wYWQuY29uY2F0KGhhc2gpLCA1MTIgKyAxMjgpKVxyXG59XHJcblxyXG4vKlxyXG4qIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGEgaGV4IHN0cmluZ1xyXG4qL1xyXG5mdW5jdGlvbiByc3RyMmhleCAoaW5wdXQ6IHN0cmluZykge1xyXG4gICAgdmFyIGhleFRhYiA9ICcwMTIzNDU2Nzg5YWJjZGVmJ1xyXG4gICAgdmFyIG91dHB1dCA9ICcnXHJcbiAgICB2YXIgeFxyXG4gICAgdmFyIGlcclxuICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIHggPSBpbnB1dC5jaGFyQ29kZUF0KGkpXHJcbiAgICAgICAgb3V0cHV0ICs9IGhleFRhYi5jaGFyQXQoKHggPj4+IDQpICYgMHgwZikgKyBoZXhUYWIuY2hhckF0KHggJiAweDBmKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dFxyXG59XHJcblxyXG4vKlxyXG4qIEVuY29kZSBhIHN0cmluZyBhcyB1dGYtOFxyXG4qL1xyXG5mdW5jdGlvbiBzdHIycnN0clVURjggKGlucHV0OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KSlcclxufVxyXG5cclxuLypcclxuKiBUYWtlIHN0cmluZyBhcmd1bWVudHMgYW5kIHJldHVybiBlaXRoZXIgcmF3IG9yIGhleCBlbmNvZGVkIHN0cmluZ3NcclxuKi9cclxuZnVuY3Rpb24gcmF3TUQ1IChzOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICByZXR1cm4gcnN0ck1ENShzdHIycnN0clVURjgocykpXHJcbn1cclxuZnVuY3Rpb24gaGV4TUQ1IChzOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICByZXR1cm4gcnN0cjJoZXgocmF3TUQ1KHMpKVxyXG59XHJcbmZ1bmN0aW9uIHJhd0hNQUNNRDUgKGs6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4sIGQ6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiByc3RySE1BQ01ENShzdHIycnN0clVURjgoayksIHN0cjJyc3RyVVRGOChkKSlcclxufVxyXG5mdW5jdGlvbiBoZXhITUFDTUQ1IChrOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuLCBkOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XHJcbiAgICByZXR1cm4gcnN0cjJoZXgocmF3SE1BQ01ENShrLCBkKSlcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBNRDUgKCkge1xyXG4gICAgTUQ1LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoc3RyaW5nOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuLCBrZXk6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4sIHJhdzogYW55KXtcclxuICAgICAgICBpZiAoIWtleSkge1xyXG4gICAgICAgICAgICBpZiAoIXJhdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhleE1ENShzdHJpbmcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJhd01ENShzdHJpbmcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcmF3KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoZXhITUFDTUQ1KGtleSwgc3RyaW5nKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmF3SE1BQ01ENShrZXksIHN0cmluZylcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUGFyYW1zKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHovax1cmzlj4LmlbBcclxuICAgICAqIEBwYXJhbSBkYXRhIOWvueixoVxyXG4gICAgICogQHBhcmFtIGlzUHJlZml4IGlzUHJlZml4LOaYr+WQpuiHquWKqOWKoOS4ilwiP1wiXHJcbiAgICAgKiBAcGFyYW0gYXJyYXlGb3JtYXQg6KeE5YiZIGluZGljZXN8YnJhY2tldHN8cmVwZWF0fGNvbW1hXHJcbiAgICAgKi9cclxuICAgIFBhcmFtcy5wcm90b3R5cGUub2JqVG9QYXJhbXMgPSBmdW5jdGlvbiAoZGF0YSA9IHt9LCBpc1ByZWZpeCA9IHRydWUsIGFycmF5Rm9ybWF0ID0gJ2JyYWNrZXRzJyl7XHJcbiAgICAgICAgY29uc3QgcHJlZml4ID0gaXNQcmVmaXggPyAnPycgOiAnJ1xyXG4gICAgICAgIGNvbnN0IF9yZXN1bHQgPSBbXVxyXG4gICAgICAgIGlmIChbJ2luZGljZXMnLCAnYnJhY2tldHMnLCAncmVwZWF0JywgJ2NvbW1hJ10uaW5kZXhPZihhcnJheUZvcm1hdCkgPT0gLTEpIGFycmF5Rm9ybWF0ID0gJ2JyYWNrZXRzJ1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRhdGFba2V5XVxyXG4gICAgICAgICAgICAvLyDljrvmjonkuLrnqbrnmoTlj4LmlbBcclxuICAgICAgICAgICAgaWYgKFsnJywgdW5kZWZpbmVkLCBudWxsXS5pbmRleE9mKHZhbHVlKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWmguaenOWAvOS4uuaVsOe7hO+8jOWPpuihjOWkhOeQhlxyXG4gICAgICAgICAgICBpZiAodmFsdWUuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlLmcuIHtpZHM6IFsxLCAyLCAzXX1cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXJyYXlGb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbmRpY2VzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g57uT5p6cOiBpZHNbMF09MSZpZHNbMV09MiZpZHNbMl09M1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0LnB1c2goYCR7a2V5fVske2l9XT0ke3ZhbHVlW2ldfWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdicmFja2V0cyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOe7k+aenDogaWRzW109MSZpZHNbXT0yJmlkc1tdPTNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgoX3ZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0LnB1c2goYCR7a2V5fVtdPSR7X3ZhbHVlfWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVwZWF0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g57uT5p6cOiBpZHM9MSZpZHM9MiZpZHM9M1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChfdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHQucHVzaChgJHtrZXl9PSR7X3ZhbHVlfWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29tbWEnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDnu5Pmnpw6IGlkcz0xLDIsM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29tbWFTdHIgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChfdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hU3RyICs9IChjb21tYVN0ciA/ICcsJyA6ICcnKSArIF92YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0LnB1c2goYCR7a2V5fT0ke2NvbW1hU3RyfWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgoX3ZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0LnB1c2goYCR7a2V5fVtdPSR7X3ZhbHVlfWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfcmVzdWx0LnB1c2goYCR7a2V5fT0ke3ZhbHVlfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9yZXN1bHQubGVuZ3RoID8gcHJlZml4ICsgX3Jlc3VsdC5qb2luKCcmJykgOiAnJ1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFByb3RvdHlwZSgpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOivu+WPluWxnuaAp1xyXG4gICAgICogQHBhcmFtIG9ialxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICovXHJcbiAgICBQcm90b3R5cGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvYmo6IG9iamVjdCwga2V5OiBzdHJpbmcpe1xyXG4gICAgICAgIC8v5Yik5pata2V55piv5ZCm5LiN5Li65a2X56ym5Liy5oiW6ICF5Li656m65pWw57uEXHJcbiAgICAgICAgaWYodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwgIWtleSB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIga2V5czogQXJyYXk8c3RyaW5nPiA9IGtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICAgIHZhciB0dXJuOiBvYmplY3QgPSB0aGlzLnR1cm4oa2V5c1swXSk7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdmFyIHJlczogb2JqZWN0ID0gT2JqZWN0LmlzKHR1cm4udHlwZSxcImFycmF5XCIpP29ialt0dXJuLm5hbWVdW3R1cm4uaW5kZXhdfHx7fTpvYmpbdHVybi5uYW1lXXx8e307XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDE7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR1cm4gPSB0aGlzLnR1cm4oa2V5c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpxrZXnkuI3lrZjlnKjvvIzlsLHov5Tlm55udWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFyZXNbdHVybi5uYW1lXSlyZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gT2JqZWN0LmlzKHR1cm4udHlwZSxcImFycmF5XCIpP3Jlc1t0dXJuLm5hbWVdW3R1cm4uaW5kZXhdfHx7fTpyZXNbdHVybi5uYW1lXXx8e31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0aGlzLnZhbHVlID0gcmVzfHxudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzfHxudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWxnuaAp1xyXG4gICAgICogQHBhcmFtIG9ialxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICogQHBhcmFtIHZhbFxyXG4gICAgICovXHJcbiAgICBQcm90b3R5cGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG9iajogb2JqZWN0LCBrZXk6IHN0cmluZywgdmFsOiBzdHJpbmcpIHtcclxuICAgICAgICAvL+iOt+WPlumTvuWQjVxyXG4gICAgICAgIHZhciBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICB2YXIgdHVybjtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGtleXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIC8v6I635Y+Wa2V5c+exu+Wei1xyXG4gICAgICAgICAgICB0dXJuID0gdGhpcy50dXJuKGtleXNbaV0pXHJcbiAgICAgICAgICAgIC8v5aaC5p6ca2V55LiN5a2Y5Zyo77yM5bCx6L+U5ZueZmFsc2XvvJtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZighb2JqW3R1cm4ubmFtZV0pcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyDlpoLmnpxrZXlz6ZW/5bqm5bCP5LqO562J5LqOMeaIluiAheafpeaJvuWIsOacgOWQjuS4gOS4qmtleeaXtu+8jOebtOaOpei1i+WAvFxyXG4gICAgICAgICAgICBpZihrZXlzLmxlbmd0aCA8PSAxIHx8IGtleXMubGVuZ3RoLTEgPD0gaSl7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBpZih0dXJuLnR5cGUgPT09IFwiYXJyYXlcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pWw57uE5pON5L2cXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIG9ialt0dXJuLm5hbWVdW3R1cm4uaW5kZXhdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pmu6YCa5a+56LGh5pON5L2cXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIG9ialt0dXJuLm5hbWVdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGlmKHR1cm4udHlwZSA9PT0gXCJhcnJheVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmlbDnu4Tmk43kvZxcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gIG9ialt0dXJuLm5hbWVdW3R1cm4uaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmma7pgJrlr7nosaHmk43kvZxcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gIG9ialt0dXJuLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65pWw57uE5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKi9cclxuICAgIFByb3RvdHlwZS5wcm90b3R5cGUuaXMgPSBmdW5jdGlvbiAoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4ga2V5LmluZGV4T2YoXCJbXCIpICE9PSAtMSAmJiBrZXkuaW5kZXhPZihcIl1cIikgIT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmlbDnu4TkuIvmoIflkoxrZXks5ZCm5YiZ55u05o6l6L+U5Zuea2V5XHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKi9cclxuICAgIFByb3RvdHlwZS5wcm90b3R5cGUudHVybiA9IGZ1bmN0aW9uIChrZXk6IHN0cmluZyk6IG9iamVjdCB7XHJcbiAgICAgICAgaWYodGhpcy5pcyhrZXkpKXtcclxuICAgICAgICAgICAgdmFyIGxlZnQgPSBrZXkuc3BsaXQoXCJbXCIpO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBsZWZ0WzFdLnNwbGl0KFwiXVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGxlZnRbMF0sXHJcbiAgICAgICAgICAgICAgICBpbmRleDogTnVtYmVyKHJpZ2h0WzBdKSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUZXN0ICgpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uumqjOivgeeggVxyXG4gICAgICogQHBhcmFtIHZhbHVlIOmqjOivgeeggeWtl+espuS4slxyXG4gICAgICogQHBhcmFtIGxlbiDpqozor4HnoIHplb/luqbvvIzkuI3loavpu5jorqTkuLo25L2N5pWwXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuY29kZSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nLCBsZW46IG51bWJlcik6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoYF5cXFxcZHske2xlbnx8Nn19JGApLnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65pWw57uEXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkg5pWw57uEXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuYXJyYXkgPSBmdW5jdGlvbiAoYXJyYXk6IEFycmF5PGFueT4pOmJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycmF5KSwgJ1tvYmplY3QgQXJyYXldJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLpqc29u5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0ganNvblxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmpzb25TdHJpbmcgPSBmdW5jdGlvbiAoanNvbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYoIU9iamVjdC5pcyh0eXBlb2YganNvbiwgJ3N0cmluZycpKXJldHVybiBmYWxzZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgb2JqOiBvYmplY3QgPSBKU09OLnBhcnNlKGpzb24pO1xyXG4gICAgICAgICAgICBpZihPYmplY3QuaXModHlwZW9mIG9iaiAsICdvYmplY3QnKSAmJiBvYmope1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuacieaViOWAvOeahGpzb25cclxuICAgICAqIEBwYXJhbSBqc29uXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuanNvbiA9IGZ1bmN0aW9uIChqc29uOiBvYmplY3QpOiBib29sZWFue1xyXG4gICAgICAgIGlmKE9iamVjdC5pcyh0eXBlb2YganNvbiwgJ29iamVjdCcpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuanNvblN0cmluZyhKU09OLnN0cmluZ2lmeShqc29uKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrlr7nosaFcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5vYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0OiBvYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpLCAnW29iamVjdCBPYmplY3RdJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrpgq7nrrHlj7dcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmVtYWlsID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXlxcXFx3KygoLVxcXFx3Kyl8KFxcXFwuXFxcXHcrKSkqXFxcXEBbQS1aYS16MC05XSsoKFxcXFwufC0pW0EtWmEtejAtOV0rKSpcXFxcLltBLVphLXowLTldKyQnKS50ZXN0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuS4uuaJi+acuuWPt1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUucGhvbmUgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14xWzIzNDU2Nzg5XVxcXFxkezl9JCcpLnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5Li6VVJMXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS51cmwgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14oKGh0dHBzfGh0dHB8ZnRwfHJ0c3B8bW1zKTpcXFxcL1xcXFwvKSgoWzAtOWEtekEtWl8hfipcXCcoKS4mPSskJS1dKzogKT9bMC05YS16QS1aXyF+KlxcJygpLiY9KyQlLV0rQCk/KChbMC05XXsxLDN9Lil7M31bMC05XXsxLDN9fChbMC05YS16QS1aXyF+KlxcJygpLV0rLikqKFswLTlhLXpBLVpdWzAtOWEtekEtWi1dezAsNjF9KT9bMC05YS16QS1aXS5bYS16QS1aXXsyLDZ9KSg6WzAtOV17MSw0fSk/KChcXFxcLz8pfChcXFxcL1swLTlhLXpBLVpfIX4qXFwnKCkuOz86QCY9KyQsJSMtXSspK1xcXFwvPykkJykudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrnqbpcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnJlcGxhY2UoLyheWyBcXHRcXG5cXHJdKil8KFsgXFx0XFxuXFxyXSokKS9nLCAnJykubGVuZ3RoID09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IDAgfHwgaXNOYU4odmFsdWUpKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65pmu6YCa5pel5pyfXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5kYXRlID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybiBmYWxzZVxyXG4gICAgICAgIC8vIOWIpOaWreaYr+WQpuaVsOWAvOaIluiAheWtl+espuS4suaVsOWAvCjmhI/lkbPnnYDkuLrml7bpl7TmiLMp77yM6L2s5Li65pWw5YC877yM5ZCm5YiZbmV3IERhdGXml6Dms5Xor4bliKvlrZfnrKbkuLLml7bpl7TmiLNcclxuICAgICAgICBpZiAodGhpcy5udW1iZXIodmFsdWUpKSB2YWx1ZSA9ICt2YWx1ZTtcclxuICAgICAgICByZXR1cm4gIS9JbnZhbGlkfE5hTi8udGVzdChuZXcgRGF0ZSh2YWx1ZSkudG9TdHJpbmcoKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uuWNgei/m+WItuaVsOWAvFxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUubnVtYmVyID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ15bXFxcXCstXT8oXFxcXGQrXFxcXC4/XFxcXGQqfFxcXFwuXFxcXGQrfFxcXFxkXFxcXC5cXFxcZCtlXFxcXCtcXFxcZCspJCcpLnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li66Lqr5Lu96K+B5Y+3XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5pZENhcmQgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXlsxLTldXFxcXGR7NX1bMS05XVxcXFxkezN9KCgwXFxcXGQpfCgxWzAtMl0pKSgoWzB8MXwyXVxcXFxkKXwzWzAtMV0pXFxcXGR7M30oWzAtOV18WCkkJykudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrovabniYzlj7dcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmNhck5vID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIC8vIOaWsOiDvea6kOi9pueJjFxyXG4gICAgICAgIGNvbnN0IHhyZWcgPSAvXlvkuqzmtKXmsqrmuJ3lhoDosavkupHovr3pu5HmuZjnmpbpsoHmlrDoi4/mtZnotaPphILmoYLnlJjmmYvokpnpmZXlkInpl73otLXnsqTpnZLol4/lt53lroHnkLzkvb/pooZBLVpdezF9W0EtWl17MX0oKFswLTldezV9W0RGXSQpfChbREZdW0EtSEotTlAtWjAtOV1bMC05XXs0fSQpKS9cclxuICAgICAgICAvLyDml6fovabniYxcclxuICAgICAgICBjb25zdCBjcmVnID0gL15b5Lqs5rSl5rKq5rid5YaA6LGr5LqR6L696buR5rmY55qW6bKB5paw6IuP5rWZ6LWj6YSC5qGC55SY5pmL6JKZ6ZmV5ZCJ6Ze96LS157Kk6Z2S6JeP5bed5a6B55C85L2/6aKGQS1aXXsxfVtBLVpdezF9W0EtSEotTlAtWjAtOV17NH1bQS1ISi1OUC1aMC055oyC5a2m6K2m5riv5r6zXXsxfSQvXHJcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gNykge1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlZy50ZXN0KHZhbHVlKVxyXG4gICAgICAgIH0gaWYgKHZhbHVlLmxlbmd0aCA9PT0gOCkge1xyXG4gICAgICAgICAgICByZXR1cm4geHJlZy50ZXN0KHZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uumHkeminVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuYW1vdW50ID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeWzEtOV1cXFxcZCooLFxcXFxkezN9KSooXFxcXC5cXFxcZHsxLDJ9KT8kfF4wXFxcXC5cXFxcZHsxLDJ9JCcpLnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65Lit5paH77yI5rGJ5a2X77yJXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5jaGluZXNlID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIGNvbnN0IHJlZyA9IC9eW1xcdTRlMDAtXFx1OWZhNV0rJC9naTtcclxuICAgICAgICByZXR1cm4gcmVnLnRlc3QodmFsdWUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLroi7HmloflrZfmr41cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmxldHRlciA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXlthLXpBLVpdKiQnKS50ZXN0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uuWtl+avjeaIluiAheaVsOWtl1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuZW5Pck51bSA9IGZ1bmN0aW9uICh2YWx1ZTogYW55KTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5udW1iZXIodmFsdWUpIHx8IHRoaXMubGV0dGVyKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuWMheWQq+afkOS4quWAvO+8iOWmguaenOS4um9iamVjdO+8jOm7mOiupOWIpOaWreafkOS4qmtleeaYr+WQpuWtmOWcqO+8jOWmguaenOmcgOimgeWIpOaWreWAvO+8jGlzVmFsdWUgPSB0cnVlIOWNs+WPr++8iVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1cclxuICAgICAqIEBwYXJhbSBpc1ZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAodmFsdWU6IGFueSwgcGFyYW06IGFueSwgaXNWYWx1ZTogYm9vbGVhbik6IGJvb2xlYW57XHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbkuLrmlbDnu4RcclxuICAgICAgICBpZih0aGlzLmFycmF5KHZhbHVlKSl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDtpPHZhbHVlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoT2JqZWN0LmlzKHZhbHVlW2ldLCBwYXJhbSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub2JqZWN0KHZhbHVlKSl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYoaXNWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3lgLxcclxuICAgICAgICAgICAgICAgICAgICBpZihPYmplY3QuaXModmFsdWVba2V5XSwgcGFyYW0pKXJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWrWtleVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKE9iamVjdC5pcyhrZXksIHBhcmFtKSlyZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmluZGV4T2YocGFyYW0pID49IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B5LiA5Liq5YC86IyD5Zu0W21pbiwgbWF4XVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1cclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5yYW5nZSA9IGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyLCBwYXJhbTogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA+PSBwYXJhbVswXSAmJiB2YWx1ZSA8PSBwYXJhbVsxXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmqjOivgeS4gOS4qumVv+W6puiMg+WbtFttaW4sIG1heF1cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHBhcmFtXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUucmFuZ2VMZW5ndGggPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZywgcGFyYW06IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID49IHBhcmFtWzBdICYmIHZhbHVlLmxlbmd0aCA8PSBwYXJhbVsxXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uuWHveaVsOaWueazlVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuZnVuYyA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLpwcm9taXNl5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5wcm9taXNlID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuaXModHlwZW9mIHZhbHVlLFwib2JqZWN0XCIpICYmIHRoaXMuZnVuYyh2YWx1ZS50aGVuKSAmJiB0aGlzLmZ1bmModmFsdWUuY2F0Y2gpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65Zu+54mH5qC85byPXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5pbWFnZSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICBjb25zdCBJTUFHRV9SRUdFWFAgPSAvXFwuKGpwZWd8anBnfGdpZnxwbmd8c3ZnfHdlYnB8amZpZnxibXB8ZHBnKS9pO1xyXG4gICAgICAgIHJldHVybiBJTUFHRV9SRUdFWFAudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrop4bpopHmoLzlvI9cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLnZpZGVvID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIGNvbnN0IFZJREVPX1JFR0VYUCA9IC9cXC4obXA0fG1wZ3xtcGVnfGRhdHxhc2Z8YXZpfHJtfHJtdmJ8bW92fHdtdnxmbHZ8bWt2KS9pO1xyXG4gICAgICAgIHJldHVybiBWSURFT19SRUdFWFAudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrmraPliJnlr7nosaFcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLnJlZ0V4cCA9IGZ1bmN0aW9uICh2YWx1ZTogYW55KTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdmFsdWUgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiIsInZhciB2YWxpZDpib29sZWFuID0gdHJ1ZTtcclxuLyoqXHJcbiAqIEFQSS7oioLmtYFcclxuICogQHBhcmFtIGZ1bmNcclxuICogQHBhcmFtIHdhaXRcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVGhyb3R0bGUoZnVuYzogRnVuY3Rpb24sd2FpdDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oLi4uYXJnczogYW55KXtcclxuICAgICAgICBpZighdmFsaWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkoX3RoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICB2YWxpZCA9IHRydWU7XHJcbiAgICAgICAgfSx3YWl0KVxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVGltZSgpe1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+l5Ye95pWw5b+F6aG75Lyg5YWl56ys5LiA5Liq5Y+C5pWw77yM5qC85byP5Li65Lu75L2V5ZCI5rOV55qE5pe26Ze05qC85byP44CB56eS5oiW5q+r56eS55qE5pe26Ze05oiz77yM56ys5LqM5Liq5Y+C5pWw5piv5Y+v6YCJ55qE77yM6L+U5Zue55qE5YC857G75Ly85Yia5Yia77yMMjXliIbpkp/liY3vvIwz5bCP5pe25YmN77yMN+WkqeWJjeeahOe7k+aenOOAgiDlpoLmnpznrKzkuozkuKrlj4LmlbDmmK/ml7bpl7TnmoTmoLzlvI/vvIzlvZPliY3lkozkvKDlhaXml7bpl7TmiLPnm7jlt67lpKfkuo7kuIDkuKrmnIjml7bvvIzov5Tlm57moLzlvI/ljJblpb3nmoTml7bpl7TvvJvlpoLmnpznrKzkuozkuKrlj4LmlbDkuLpmYWxzZe+8jOWImeS4jeS8mui/lOWbnuagvOW8j+WMluWlveeahOaXtumXtO+8jOiAjOaYr+ivuOWmglwieHh45bm05YmNXCLnmoTnu5PmnpzjgIJcclxuICAgICAqIHRpbWVzdGFtcCA8U3RyaW5nPiDml7bpl7TmiLNcclxuICAgICAqIGZvcm1hdCA8U3RyaW5nIC8gZmFsc2U+IOaXtumXtOagvOW8j++8jOm7mOiupOS4unl5eXktbW0tZGTvvIzlubTkuLpcInl5eXlcIu+8jOaciOS4ulwibW1cIu+8jOaXpeS4ulwiZGRcIu+8jOaXtuS4ulwiaGhcIu+8jOWIhuS4ulwiTU1cIu+8jOenkuS4ulwic3NcIu+8jOagvOW8j+WPr+S7peiHqueUseaQremFje+8jOWmgu+8miB5eXl5Om1tOmRk77yMeXl5eS1tbS1kZO+8jHl5eXnlubRtbeaciGRk5pel77yMeXl5eeW5tG1t5pyIZGTml6UgaGjml7ZNTeWIhnNz56eS77yMeXl5eS9tbS9kZC/vvIxNTTpzc+etiee7hOWQiOOAgiDlpoLmnpzml7bpl7TmiLPot53nprvmraTml7bnmoTml7bpl7TvvIzlpKfkuo7kuIDkuKrmnIjvvIzliJnov5Tlm57kuIDkuKrmoLzlvI/ljJblpb3nmoTml7bpl7TvvIzlpoLmnpzmraTlj4LmlbDkuLpmYWxzZe+8jOi/lOWbnuWdh+S4ulwi5aSa5LmF5LmL5YmNXCLnmoTnu5PmnpzjgIJcclxuICAgICAqIEBwYXJhbSBkYXRlVGltZVxyXG4gICAgICogQHBhcmFtIGZtdFxyXG4gICAgICovXHJcbiAgICBUaW1lLnByb3RvdHlwZS50aW1lRm9ybWF0ID0gZnVuY3Rpb24gKGRhdGVUaW1lOiBhbnksIGZtdDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBkYXRlVGltZSA9IGRhdGVUaW1lfHxudWxsO1xyXG4gICAgICAgIGZtdCA9IGZtdHx8J3l5eXktbW0tZGQgaGg6TU06c3MnO1xyXG4gICAgICAgIC8vIOWmguaenOS4um51bGws5YiZ5qC85byP5YyW5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgaWYgKCFkYXRlVGltZSkgZGF0ZVRpbWUgPSBOdW1iZXIobmV3IERhdGUoKSlcclxuICAgICAgICAvLyDlpoLmnpxkYXRlVGltZemVv+W6puS4ujEw5oiW6ICFMTPvvIzliJnkuLrnp5Llkozmr6vnp5LnmoTml7bpl7TmiLPvvIzlpoLmnpzotoXov4cxM+S9je+8jOWImeS4uuWFtuS7lueahOaXtumXtOagvOW8j1xyXG4gICAgICAgIGlmIChkYXRlVGltZS50b1N0cmluZygpLmxlbmd0aCA9PSAxMCkgZGF0ZVRpbWUgKj0gMTAwMFxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZVRpbWUpXHJcbiAgICAgICAgdmFyIHJldFxyXG4gICAgICAgIHZhciBvcHQgPSB7XHJcbiAgICAgICAgICAgICd5Kyc6IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLCAvLyDlubRcclxuICAgICAgICAgICAgJ20rJzogKGRhdGUuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCksIC8vIOaciFxyXG4gICAgICAgICAgICAnZCsnOiBkYXRlLmdldERhdGUoKS50b1N0cmluZygpLCAvLyDml6VcclxuICAgICAgICAgICAgJ2grJzogZGF0ZS5nZXRIb3VycygpLnRvU3RyaW5nKCksIC8vIOaXtlxyXG4gICAgICAgICAgICAnTSsnOiBkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpLCAvLyDliIZcclxuICAgICAgICAgICAgJ3MrJzogZGF0ZS5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKSAvLyDnp5JcclxuICAgICAgICAgICAgLy8g5pyJ5YW25LuW5qC85byP5YyW5a2X56ym6ZyA5rGC5Y+v5Lul57un57ut5re75Yqg77yM5b+F6aG76L2s5YyW5oiQ5a2X56ym5LiyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGsgaW4gb3B0KSB7XHJcbiAgICAgICAgICAgIHJldCA9IG5ldyBSZWdFeHAoYCgke2t9KWApLmV4ZWMoZm10KVxyXG4gICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBmbXQgPSBmbXQucmVwbGFjZShyZXRbMV0sIChyZXRbMV0ubGVuZ3RoID09IDEpID8gKG9wdFtrXSkgOiAob3B0W2tdLnBhZFN0YXJ0KHJldFsxXS5sZW5ndGgsICcwJykpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbXRcclxuICAgIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFRyaW0gKCl7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDljrvpmaTnqbrmoLxcclxuICAgICAqIEBwYXJhbSAgc3RyIOmcgOimgeWOu+mZpOepuuagvOeahOWtl+espuS4slxyXG4gICAgICogQHBhcmFtICBwb3MgYm90aCjlt6blj7MpfGxlZnR8cmlnaHR8YWxsIOm7mOiupGJvdGhcclxuICAgICAqL1xyXG4gICAgVHJpbS5wcm90b3R5cGUudHJpbSA9IGZ1bmN0aW9uIChzdHI6IHN0cmluZywgcG9zID0gJ2JvdGgnKSB7XHJcbiAgICAgICAgc3RyID0gU3RyaW5nKHN0cilcclxuICAgICAgICBpZiAocG9zID09ICdib3RoJykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zID09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwb3MgPT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhcXHMqJCkvZywgJycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwb3MgPT0gJ2FsbCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMrL2csICcnKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyXHJcbiAgICB9XHJcblxyXG59XHJcbiIsInZhciBUaHJvdHRsZSA9IHJlcXVpcmUoXCIuL1Rocm90dGxlL1Rocm90dGxlXCIpO1xyXG52YXIgRGVib3VuY2UgPSByZXF1aXJlKFwiLi9EZWJvdW5jZS9EZWJvdW5jZVwiKTtcclxudmFyIERlZXBDbG9uZSA9IHJlcXVpcmUoXCIuL0RlZXBDbG9uZS9EZWVwQ2xvbmVcIik7XHJcbnZhciBEZWVwTWVyZ2UgPSByZXF1aXJlKFwiLi9EZWVwTWVyZ2UvRGVlcE1lcmdlXCIpO1xyXG52YXIgUHJvdG90eXBlID0gcmVxdWlyZShcIi4vUHJvdG90eXBlL1Byb3RvdHlwZVwiKTtcclxudmFyIFRpbWUgPSByZXF1aXJlKFwiLi9UaW1lL1RpbWVcIik7XHJcbnZhciBBcnJheU9iaiA9IHJlcXVpcmUoXCIuL0FycmF5L0FycmF5XCIpO1xyXG52YXIgR3VpZCA9IHJlcXVpcmUoXCIuL0d1aWQvR3VpZFwiKTtcclxudmFyIENvbG9yID0gcmVxdWlyZShcIi4vQ29sb3IvQ29sb3JcIik7XHJcbnZhciBQYXJhbXMgPSByZXF1aXJlKFwiLi9QYXJhbXMvUGFyYW1zXCIpO1xyXG52YXIgTUQ1ID0gcmVxdWlyZShcIi4vTUQ1L01ENVwiKTtcclxudmFyIFRyaW0gPSByZXF1aXJlKFwiLi9UcmltL1RyaW1cIik7XHJcbnZhciBUZXN0ID0gcmVxdWlyZShcIi4vVGVzdC9UZXN0XCIpO1xyXG5cclxuLy/ljZXkvovmqKHlvI9cclxuVGhyb3R0bGUubmV3ID0gKGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHRocm90dGxlOiBhbnkgPSBudWxsO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzaW5nbGV0b246Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoIXRocm90dGxlfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRocm90dGxlID0gbmV3IFRocm90dGxlKC4uLmFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aHJvdHRsZTtcclxuICAgIH1cclxufSkoKTtcclxuRGVib3VuY2UubmV3ID0gKGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGRlYm91bmNlOiBhbnkgPSBudWxsO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzaW5nbGV0b246Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoIWRlYm91bmNlfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGRlYm91bmNlID0gbmV3IERlYm91bmNlKC4uLmFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZWJvdW5jZTtcclxuICAgIH1cclxufSkoKTtcclxuRGVlcENsb25lLm5ldyA9IChmdW5jdGlvbiAoKXtcclxuICAgIHZhciBkZWVwQ2xvbmU6IGFueSA9IG51bGw7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNpbmdsZXRvbjpib29sZWFuKXtcclxuICAgICAgICBpZighZGVlcENsb25lfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGRlZXBDbG9uZSA9IG5ldyBEZWVwQ2xvbmUoLi4uYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlZXBDbG9uZTtcclxuICAgIH1cclxufSkoKTtcclxuRGVlcE1lcmdlLm5ldyA9IChmdW5jdGlvbiAoKXtcclxuICAgIHZhciBkZWVwTWVyZ2U6IGFueSA9IG51bGw7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNpbmdsZXRvbjpib29sZWFuKXtcclxuICAgICAgICBpZighZGVlcE1lcmdlfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGRlZXBNZXJnZSA9IG5ldyBEZWVwTWVyZ2UoLi4uYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlZXBNZXJnZTtcclxuICAgIH1cclxufSkoKTtcclxuUHJvdG90eXBlLm5ldyA9IChmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwcm90b3R5cGU6IGFueSA9IG51bGw7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNpbmdsZXRvbjpib29sZWFuKXtcclxuICAgICAgICBpZighcHJvdG90eXBlfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHByb3RvdHlwZSA9IG5ldyBQcm90b3R5cGUoLi4uYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb3RvdHlwZTtcclxuICAgIH1cclxufSkoKTtcclxuVGltZS5uZXcgPSAoZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgdGltZTogYW55ID0gbnVsbDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoc2luZ2xldG9uOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKCF0aW1lfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRpbWUgPSBuZXcgVGltZSguLi5hcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZTtcclxuICAgIH1cclxufSkoKTtcclxuQXJyYXlPYmoubmV3ID0gKGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGFycmF5T2JqOiBhbnkgPSBudWxsO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzaW5nbGV0b246Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoIWFycmF5T2JqfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGFycmF5T2JqID0gbmV3IEFycmF5T2JqKC4uLmFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheU9iajtcclxuICAgIH1cclxufSkoKTtcclxuR3VpZC5uZXcgPSAoZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZ3VpZDogYW55ID0gbnVsbDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoc2luZ2xldG9uOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKCFndWlkfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGd1aWQgPSBuZXcgR3VpZCguLi5hcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ3VpZDtcclxuICAgIH1cclxufSkoKTtcclxuQ29sb3IubmV3ID0gKGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGNvbG9yOiBhbnkgPSBudWxsO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzaW5nbGV0b246Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoIWNvbG9yfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGNvbG9yID0gbmV3IENvbG9yKC4uLmFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xvcjtcclxuICAgIH1cclxufSkoKTtcclxuUGFyYW1zLm5ldyA9IChmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYXJhbXM6IGFueSA9IG51bGw7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNpbmdsZXRvbjpib29sZWFuKXtcclxuICAgICAgICBpZighcGFyYW1zfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHBhcmFtcyA9IG5ldyBQYXJhbXMoLi4uYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgIH1cclxufSkoKTtcclxuTUQ1Lm5ldyA9IChmdW5jdGlvbiAoKXtcclxuICAgIHZhciBtZDU6IGFueSA9IG51bGw7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNpbmdsZXRvbjpib29sZWFuKXtcclxuICAgICAgICBpZighbWQ1fHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIG1kNSA9IG5ldyBNRDUoLi4uYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1kNTtcclxuICAgIH1cclxufSkoKTtcclxuVHJpbS5uZXcgPSAoZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgdHJpbTogYW55ID0gbnVsbDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoc2luZ2xldG9uOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKCF0cmltfHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRyaW0gPSBuZXcgVHJpbSguLi5hcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJpbTtcclxuICAgIH1cclxufSkoKTtcclxuVGVzdC5uZXcgPSAoZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgdGVzdDogYW55ID0gbnVsbDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoc2luZ2xldG9uOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKCF0ZXN0fHxzaW5nbGV0b24pe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRlc3QgPSBuZXcgVGVzdCguLi5hcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGVzdDtcclxuICAgIH1cclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQXBpKCkge1xyXG4gICAgQXBpLnByb3RvdHlwZS50aHJvdHRsZSA9IGZ1bmN0aW9uIChmdW5jOiBGdW5jdGlvbiwgd2FpdDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIFRocm90dGxlLm5ldyhmdW5jLCB3YWl0KTtcclxuICAgIH07XHJcbiAgICBBcGkucHJvdG90eXBlLmRlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmM6IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gRGVib3VuY2UubmV3KGZ1bmMsIHdhaXQpO1xyXG4gICAgfTtcclxuICAgIEFwaS5wcm90b3R5cGUuZGVlcENsb25lID0gZnVuY3Rpb24gKHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIERlZXBDbG9uZS5uZXcodGFyZ2V0KTtcclxuICAgIH07XHJcbiAgICBBcGkucHJvdG90eXBlLmRlZXBNZXJnZSA9IGZ1bmN0aW9uICh0YXJnZXQ6IG9iamVjdCwgc291cmNlOiBvYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gRGVlcE1lcmdlLm5ldyh0YXJnZXQsIHNvdXJjZSk7XHJcbiAgICB9O1xyXG4gICAgQXBpLnByb3RvdHlwZS5nZXRQcm90b3R5cGUgPSBmdW5jdGlvbiAob2JqOiBvYmplY3QsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb3RvdHlwZS5uZXcoKS5nZXQob2JqLCBrZXkpO1xyXG4gICAgfTtcclxuICAgIEFwaS5wcm90b3R5cGUuc2V0UHJvdG90eXBlID0gZnVuY3Rpb24gKG9iajogb2JqZWN0LCBrZXk6IHN0cmluZywgdmFsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gUHJvdG90eXBlLm5ldygpLnNldChvYmosIGtleSwgdmFsKTtcclxuICAgIH07XHJcbiAgICBBcGkucHJvdG90eXBlLnRpbWVGb3JtYXQgPSBmdW5jdGlvbiAoZGF0ZVRpbWU6IGFueSwgZm10OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gVGltZS5uZXcoKS50aW1lRm9ybWF0KGRhdGVUaW1lLCBmbXQpO1xyXG4gICAgfTtcclxuICAgIEFwaS5wcm90b3R5cGUucmFuZG9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyYXk6IEFycmF5PGFueT4pIHtcclxuICAgICAgICByZXR1cm4gQXJyYXlPYmoubmV3KCkucmFuZG9tQXJyYXkoYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIEFwaS5wcm90b3R5cGUuZ3VpZCA9IGZ1bmN0aW9uIChsZW46IG51bWJlciwgZmlyc3RVOmJvb2xlYW4sIHJhZGl4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gR3VpZC5uZXcoKS5nZXQobGVuLGZpcnN0VSxyYWRpeCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aKc6Imy5riQ5Y+YXHJcbiAgICAgKlxyXG4gICAgICog6K+l5Ye95pWw5a6e546w5Lik5Liq6aKc6Imy5YC85LmL6Ze0562J5YiG5Y+W5YC877yM6L+U5Zue5LiA5Liq5pWw57uE77yM5YWD57Sg5Li65Y2B5YWt6L+b5Yi25b2i5byP55qE6aKc6Imy5YC877yM5pWw57uE6ZW/5bqm5Li6c3RlcOWAvOOAglxyXG4gICAgICog5L6L5aaC77yaY29sb3JHcmFkaWVudCgncmdiKDI1MCwgMjUwLCAyNTApJywgJ3JnYigyNTIsIDI1MiwgMjUyKScsIDMp77yM5b6X5Yiw55qE57uT5p6c5Li6W1wiI2ZhZmFmYVwiLCBcIiNmYWZhZmFcIiwgXCIjZmJmYmZiXCJdXHJcbiAgICAgKiBAcGFyYW0gc3RhcnRDb2xvcjxTdHJpbmc+IOW8gOWni+minOiJsuWAvO+8jOWPr+S7peaYr0hFWOaIluiAhVJHQuminOiJsuWAvO+8jOWmgiMwYWZkY2XmiJbogIVyZ2IoMTIwLCAxMzAsIDE1MClcclxuICAgICAqIEBwYXJhbSBlbmRDb2xvciA8U3RyaW5nPiDnu5PmnZ/popzoibLlgLzvvIzlj6/ku6XmmK9IRVjmiJbogIVSR0LpopzoibLlgLzvvIzlpoIjMGFmZGNl5oiW6ICFcmdiKDEyMCwgMTMwLCAxNTApXHJcbiAgICAgKiBAcGFyYW0gc3RlcCA8TnVtYmVyPiDlnYfliIblgLzvvIzmiorlvIDlp4vlgLzlkoznu5PmnZ/lgLzlubPlnYfliIbmiJDlpJrlsJHku71cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5jb2xvckdyYWRpZW50ID0gZnVuY3Rpb24gKHN0YXJ0Q29sb3I6IHN0cmluZywgZW5kQ29sb3I6IHN0cmluZywgc3RlcDogbnVtYmVyKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIENvbG9yLm5ldygpLmNvbG9yR3JhZGllbnQoc3RhcnRDb2xvciwgZW5kQ29sb3IsIHN0ZXApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWNgeWFrei/m+WItkhleOi9rFJHQlxyXG4gICAgICpcclxuICAgICAqIOivpeWHveaVsOWPr+S7peWwhuS4gOS4qkhleOeahOWNgeWFrei/m+WItuminOiJsuWAvOi9rOaNouaIkOS4gOS4qlJHQuminOiJsuWAvFxyXG4gICAgICogQHBhcmFtIHNDb2xvciA8U3RyaW5nPiBIRXjpopzoibLlgLzvvIzlpoIjMGFmZGNlXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaGV4VG9SZ2IgPSBmdW5jdGlvbiAoc0NvbG9yOiBzdHJpbmcpOiBhbnl7XHJcbiAgICAgICAgcmV0dXJuIENvbG9yLm5ldygpLmhleFRvUmdiKHNDb2xvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUkdC6L2s5Y2B5YWt6L+b5Yi2SGV4XHJcbiAgICAgKiDor6Xlh73mlbDlj6/ku6XlsIbkuIDkuKpSR0LpopzoibLlgLzovazmjaLmiJDkuIDkuKpIZXjnmoTljYHlha3ov5vliLbpopzoibLlgLxcclxuICAgICAqIEBwYXJhbSByZ2IgPFN0cmluZz4gUkdC6aKc6Imy5YC877yM5aaCcmdiKDIzMCwgMjMxLCAyMzMpXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUucmdiVG9IZXggPSBmdW5jdGlvbiAocmdiOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBDb2xvci5uZXcoKS5yZ2JUb0hleChyZ2IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOminOiJsumAj+aYjuW6plxyXG4gICAgICog6K+l5Ye95pWw5Y+v5Lul5o6l5Y+X5LiA5Liq5Y2B5YWt6L+b5Yi25oiW6ICFcmdi5qC85byP55qE6aKc6Imy5YC8KOS4jeiDveaOpeWPl+WRveWQjeW8j+minOiJsuagvOW8j++8jOavlOWmgndoaXRlKe+8jOi/lOWbnuatpOminOiJsueahHJnYmHmoLzlvI/lgLxcclxuICAgICAqIEBwYXJhbSBjb2xvciA8U3RyaW5nPiDpopzoibLlgLzvvIzlj6rog71oZXjmiJbogIVyZ2Jh5qC85byPXHJcbiAgICAgKiBAcGFyYW0gb3BhY2l0eSA8TnVtYmVyPiDkuI3pgI/mmI7luqblgLzvvIzlj5blgLzkuLowLTHkuYvpl7RcclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5jb2xvclRvUmdiYSA9IGZ1bmN0aW9uIChjb2xvcjogc3RyaW5nLCBvcGFjaXR5OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBDb2xvci5uZXcoKS5jb2xvclRvUmdiYShjb2xvcixvcGFjaXR5KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHovax1cmzlj4LmlbBcclxuICAgICAqXHJcbiAgICAgKiDor6Xmlrnms5XvvIzlj6/ku6XlsIbkuIDkuKrlr7nosaHlvaLlvI/lj4LmlbDovazmjaLmiJBnZXTkvKDlj4LmiYDpnIDlj4LmlbDlvaLlvI/vvIzlpoLmiop7bmFtZTogJ2xpc2EnLCBhZ2U6IDIwfei9rOaNouaIkD9uYW1lPWxpc2EmYWdlPTIwXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDlr7nosaFcclxuICAgICAqIEBwYXJhbSBpc1ByZWZpeCBpc1ByZWZpeCzmmK/lkKboh6rliqjliqDkuIpcIj9cIlxyXG4gICAgICogQHBhcmFtIGFycmF5Rm9ybWF0IOinhOWImSBpbmRpY2VzfGJyYWNrZXRzfHJlcGVhdHxjb21tYVxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLm9ialRvUGFyYW1zID0gZnVuY3Rpb24gKGRhdGE6IG9iamVjdCwgaXNQcmVmaXg6IGJvb2xlYW4sIGFycmF5Rm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBQYXJhbXMubmV3KCkub2JqVG9QYXJhbXMoZGF0YSxpc1ByZWZpeCxhcnJheUZvcm1hdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTUQ1XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHN0cmluZyDpnIDopoHliqDlr4bnmoTlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBrZXkg5a+G6ZKl77yM5aaC5p6c5LiN5aGr77yM6buY6K6k5Li6IOKAnDMwY2U3MWE3M2JkZDkwOGMzOTU1YTkwZThmNzQyOWVm4oCdXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUubWQ1ID0gZnVuY3Rpb24gKHN0cmluZzogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiwga2V5ID0gXCIzMGNlNzFhNzNiZGQ5MDhjMzk1NWE5MGU4Zjc0MjllZlwiLCByYXcgPSBmYWxzZSk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIE1ENS5uZXcoKS5nZXQoc3RyaW5nLCBrZXksIHJhdyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y676Zmk56m65qC8XHJcbiAgICAgKiBAcGFyYW0gIHN0ciDpnIDopoHljrvpmaTnqbrmoLznmoTlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSAgcG9zIGJvdGgo5bem5Y+zKXxsZWZ0fHJpZ2h0fGFsbCDpu5jorqRib3RoXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUudHJpbSA9IGZ1bmN0aW9uIChzdHI6IHN0cmluZywgcG9zOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBUcmltLm5ldygpLnRyaW0oc3RyLCBwb3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uumqjOivgeeggVxyXG4gICAgICogQHBhcmFtIHZhbHVlIOmqjOivgeeggeWtl+espuS4slxyXG4gICAgICogQHBhcmFtIGxlbiDpqozor4HnoIHplb/luqbvvIzkuI3loavpu5jorqTkuLo25L2N5pWwXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0NvZGUgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZywgbGVuOiBudW1iZXIpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBUZXN0Lm5ldygpLmNvZGUodmFsdWUsIGxlbik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65pWw57uEXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkg5pWw57uEXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0FycmF5ID0gZnVuY3Rpb24gKGFycmF5OiBBcnJheTxhbnk+KTpib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gVGVzdC5uZXcoKS5hcnJheShhcnJheSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li6anNvbuWtl+espuS4slxyXG4gICAgICogQHBhcmFtIGpzb25cclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzSnNvblN0cmluZyA9IGZ1bmN0aW9uIChqc29uOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gVGVzdC5uZXcoKS5qc29uU3RyaW5nKGpzb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuacieaViOWAvOeahGpzb25cclxuICAgICAqIEBwYXJhbSBqc29uXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0pzb24gPSBmdW5jdGlvbiAoanNvbjogb2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkuanNvbihqc29uKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrlr7nosaFcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzT2JqZWN0ID0gZnVuY3Rpb24gKG9iamVjdDogb2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkub2JqZWN0KG9iamVjdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li66YKu566x5Y+3XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzRW1haWwgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBUZXN0Lm5ldygpLmVtYWlsKHZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrmiYvmnLrlj7dcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNQaG9uZSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gVGVzdC5uZXcoKS5waG9uZSh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li6VVJMXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzVXJsID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBUZXN0Lm5ldygpLnVybCh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li656m6XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAodmFsdWU6IGFueSk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkuZW1wdHkodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuaZrumAmuaXpeacn1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0RhdGUgPSBmdW5jdGlvbiAodmFsdWU6IGFueSk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkuZGF0ZSh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65Y2B6L+b5Yi25pWw5YC8XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzTnVtYmVyID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBUZXN0Lm5ldygpLm51bWJlcih2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li66Lqr5Lu96K+B5Y+3XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzSWRDYXJkID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBUZXN0Lm5ldygpLmlkQ2FyZCh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li66L2m54mM5Y+3XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzQ2FyTm8gPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkuY2FyTm8odmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uumHkeminVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0Ftb3VudCA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gVGVzdC5uZXcoKS5hbW91bnQodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuS4reaWh++8iOaxieWtl++8iVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0NoaW5lc2UgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkuY2hpbmVzZSh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li66Iux5paH5a2X5q+NXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzTGV0dGVyID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBUZXN0Lm5ldygpLmxldHRlcih2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65a2X5q+N5oiW6ICF5pWw5a2XXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzRW5Pck51bSA9IGZ1bmN0aW9uICh2YWx1ZTogYW55KTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gVGVzdC5uZXcoKS5lbk9yTnVtKHZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbljIXlkKvmn5DkuKrlgLzvvIjlpoLmnpzkuLpvYmplY3TvvIzpu5jorqTliKTmlq3mn5DkuKprZXnmmK/lkKblrZjlnKjvvIzlpoLmnpzpnIDopoHliKTmlq3lgLzvvIxpc1ZhbHVlID0gdHJ1ZSDljbPlj6/vvIlcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHBhcmFtXHJcbiAgICAgKiBAcGFyYW0gaXNWYWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNDb250YWlucyA9IGZ1bmN0aW9uICh2YWx1ZTogYW55LCBwYXJhbTogYW55LCBpc1ZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkuY29udGFpbnModmFsdWUsIHBhcmFtLCBpc1ZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrpqozor4HkuIDkuKrlgLzojIPlm7RbbWluLCBtYXhdXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEBwYXJhbSBwYXJhbVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNSYW5nZSA9IGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyLCBwYXJhbTogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBUZXN0Lm5ldygpLnJhbmdlKHZhbHVlLCBwYXJhbSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li66aqM6K+B5LiA5Liq6ZW/5bqm6IyD5Zu0W21pbiwgbWF4XVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1cclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzUmFuZ2VMZW5ndGggPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZywgcGFyYW06IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gVGVzdC5uZXcoKS5yYW5nZUxlbmd0aCh2YWx1ZSwgcGFyYW0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuWHveaVsOaWueazlVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0Z1bmMgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkuZnVuYyh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li6cHJvbWlzZeWvueixoVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc1Byb21pc2UgPSBmdW5jdGlvbiAodmFsdWU6IGFueSk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkucHJvbWlzZSh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65Zu+54mH5qC85byPXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzSW1hZ2UgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkuaW1hZ2UodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuinhumikeagvOW8j1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc1ZpZGVvID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBUZXN0Lm5ldygpLnZpZGVvKHZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrmraPliJnlr7nosaFcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNSZWdFeHAgPSBmdW5jdGlvbiAodmFsdWU6IGFueSk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIFRlc3QubmV3KCkucmVnRXhwKHZhbHVlKTtcclxuICAgIH07XHJcblxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgU3RhY2s6IHJlcXVpcmUoXCIuL3N0cnVjdHVyZS9TdGFjay9TdGFja1wiKSxcclxuICAgIFF1ZXVlOiByZXF1aXJlKFwiLi9zdHJ1Y3R1cmUvUXVldWUvUXVldWVcIiksXHJcbiAgICBMaW5rZWRMaXN0OiByZXF1aXJlKFwiLi9zdHJ1Y3R1cmUvTGlua2VkTGlzdC9MaW5rZWRMaXN0XCIpLFxyXG4gICAgRG91Ymx5TGlua2VkTGlzdDogcmVxdWlyZShcIi4vc3RydWN0dXJlL0RvdWJseUxpbmtlZExpc3QvRG91Ymx5TGlua2VkTGlzdFwiKSxcclxuICAgIEFwaTogcmVxdWlyZShcIi4vYXBpL2luZGV4XCIpLFxyXG4gICAgVXRpbHM6IHJlcXVpcmUoXCIuL1V0aWxzL1V0aWxzXCIpXHJcbn1cclxuXHJcblxyXG4iLCJjb25zdCBMaW5rZWRMaXN0ID0gcmVxdWlyZShcIi4uL0xpbmtlZExpc3QvTGlua2VkTGlzdFwiKTtcclxuXHJcbi8qKlxyXG4gKiDlj4zlkJHpk77ooahcclxuICpcclxuICogcHVzaChlbGVtZW50Ke+8muWQkemTvuihqOWwvumDqOa3u+WKoOS4gOS4quaWsOWFg+e0oOOAglxyXG4gKiBpbnNlcnQoZWxlbWVudCxwb3NpdGlvbinvvJrlnKjpk77ooajmjIflrprkvY3nva7mj5LlhaXkuIDkuKrmlrDlhYPntKDjgIJcclxuICogZ2V0RWxlbWVudEF0KGluZGV4Ke+8mui/lOWbnumTvuihqOS4reeJueWumuS9jee9rueahOWFg+e0oO+8jOWmguaenOayoeacieWImei/lOWbnnVuZGVmaW5lZOOAglxyXG4gKiByZW1vdmUoZWxlbWVudCnvvJrku47pk77ooajkuK3np7vpmaTkuIDkuKrlhYPntKDjgIJcclxuICogaW5kZXhPZihlbGVtZW50Ke+8mui/lOWbnuWFg+e0oOWcqOmTvuihqOS4reeahOe0ouW8le+8jOWmguaenOayoeacieWImei/lOWbni0x44CCXHJcbiAqIHJlbW92ZUF0KHBvc2l0aW9uKe+8muS7jumTvuihqOaMh+WumuS9jee9ruenu+mZpOS4gOS4quWFg+e0oOOAglxyXG4gKiBpc0VtcHR5KCnvvJrlpoLmnpzpk77ooajkuK3kuI3ljIXlkKvku7vkvZXlhYPntKDvvIzliJnov5Tlm550cnVl77yM5ZCm5YiZ6L+U5ZueZmFsc2XjgIJcclxuICogc2l6ZSgp77ya6L+U5Zue6ZO+6KGo5YyF5ZCr55qE5YWD57Sg5Liq5pWw44CCXHJcbiAqIGdldEhlYWQoKe+8mui/lOWbnumTvuihqOeahOesrOS4gOS4quWFg+e0oOOAglxyXG4gKiBnZXRIZWFkKCnvvJrmuIXnqbrpk77ooajjgIJcclxuICogdG9TdHJpbmcoKe+8mui/lOWbnuihqOekuuaVtOS4qumTvuihqOeahOWtl+espuS4suOAglxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gRG91Ymx5TGlua2VkTGlzdCgpe1xyXG4gICAgLy/nu5PlsL7lhYPntKBcclxuICAgIERvdWJseUxpbmtlZExpc3QucHJvdG90eXBlLnRhaWwgPSBudWxsO1xyXG4gICAgLy/lhoXpg6jnsbtcclxuICAgIGZ1bmN0aW9uIE5vZGUoZWxlbWVudDogYW55KXtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMubmV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcmV2ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHB1c2goZWxlbWVudCnvvJrlkJHpk77ooajlsL7pg6jmt7vliqDkuIDkuKrmlrDlhYPntKDjgIJcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIERvdWJseUxpbmtlZExpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihlbGVtZW50OiBhbnkpe1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKGVsZW1lbnQpO1xyXG4gICAgICAgIGlmKHRoaXMuaGVhZCl7XHJcbiAgICAgICAgICAgIHRoaXMudGFpbC5uZXh0ID0gbm9kZTtcclxuICAgICAgICAgICAgbm9kZS5wcmV2ID0gdGhpcy50YWlsO1xyXG4gICAgICAgICAgICB0aGlzLnRhaWwgPSBub2RlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnRhaWwgPSBub2RlO1xyXG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjpk77ooajmjIflrprkvY3nva7mj5LlhaXkuIDkuKrmlrDlhYPntKDjgIJcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIERvdWJseUxpbmtlZExpc3QucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChlbGVtZW50OiBhbnksIHBvc2l0aW9uOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKHBvc2l0aW9uIDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuY291bnQgPD0gcG9zaXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZihwb3NpdGlvbiA9PT0gMHx8dGhpcy5oZWFkID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIG5vZGUubmV4dCA9IHRoaXMuaGVhZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhaWwgPSBub2RlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSB0aGlzLmdldEVsZW1lbnRBdChwb3NpdGlvbiAtIDEpXHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHByZXZpb3VzLm5leHQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LnByZXYgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wcmV2ID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuihqOekuuaVtOS4qumTvuihqOeahOWtl+espuS4slxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgRG91Ymx5TGlua2VkTGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICBpZih0aGlzLmNvdW50PT09MCl7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RyID0gXCJcIjtcclxuICAgICAgICBsZXQgbnVtID0gMDtcclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuaGVhZDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0KXtcclxuICAgICAgICAgICAgc3RyICs9IGBEb3VibHlMaW5rZWRMaXN0OiBuZXh0e2VsZW1lbnQ6ICR7Y3VycmVudC5lbGVtZW50fSwgaW5kZXg6ICR7bnVtfX0gbmV4dCAtLS0tPiAke2N1cnJlbnQubmV4dC5lbGVtZW50fVxcbmBcclxuICAgICAgICAgICAgbnVtICs9IDE7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ciArPSBgRG91Ymx5TGlua2VkTGlzdDogbmV4dHtlbGVtZW50OiAke2N1cnJlbnQuZWxlbWVudH0sIGluZGV4OiAke251bX19IG5leHQgLS0tLT4gbnVsbFxcblxcblxcblxcbmBcclxuICAgICAgICBsZXQgY3VycmVudDIgPSB0aGlzLnRhaWw7XHJcbiAgICAgICAgd2hpbGUoY3VycmVudDIucHJldil7XHJcbiAgICAgICAgICAgIHN0ciArPSBgRG91Ymx5TGlua2VkTGlzdDogcHJldntlbGVtZW50OiAke2N1cnJlbnQyLmVsZW1lbnR9LCBpbmRleDogJHtudW19fSBwcmV2IC0tLS0+ICR7Y3VycmVudDIucHJldi5lbGVtZW50fVxcbmBcclxuICAgICAgICAgICAgbnVtICs9IDE7XHJcbiAgICAgICAgICAgIGN1cnJlbnQyID0gY3VycmVudDIucHJldjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RyICs9IGBEb3VibHlMaW5rZWRMaXN0OiBwcmV2e2VsZW1lbnQ6ICR7Y3VycmVudDIuZWxlbWVudH0sIGluZGV4OiAke251bX19IHByZXYgLS0tLT4gbnVsbFxcblxcblxcblxcbmBcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG59XHJcbi8v57un5om/5Y2V5ZCR6ZO+6KGoXHJcbmxldCBsaW5rZWRMaXN0ID0gbmV3IExpbmtlZExpc3QoKTtcclxuRG91Ymx5TGlua2VkTGlzdC5wcm90b3R5cGUgPSBsaW5rZWRMaXN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcclxubW9kdWxlLmV4cG9ydHMgPSBEb3VibHlMaW5rZWRMaXN0O1xyXG4iLCIvKipcclxuICog6ZO+6KGoXHJcbiAqXHJcbiAqIHB1c2goZWxlbWVudCnvvJrlkJHpk77ooajlsL7pg6jmt7vliqDkuIDkuKrmlrDlhYPntKDjgIJcclxuICogaW5zZXJ0KGVsZW1lbnQscG9zaXRpb24p77ya5Zyo6ZO+6KGo5oyH5a6a5L2N572u5o+S5YWl5LiA5Liq5paw5YWD57Sg44CCXHJcbiAqIGdldEVsZW1lbnRBdChpbmRleCnvvJrov5Tlm57pk77ooajkuK3nibnlrprkvY3nva7nmoTlhYPntKDvvIzlpoLmnpzmsqHmnInliJnov5Tlm551bmRlZmluZWTjgIJcclxuICogcmVtb3ZlKGVsZW1lbnQp77ya5LuO6ZO+6KGo5Lit56e76Zmk5LiA5Liq5YWD57Sg44CCXHJcbiAqIGluZGV4T2YoZWxlbWVudCnvvJrov5Tlm57lhYPntKDlnKjpk77ooajkuK3nmoTntKLlvJXvvIzlpoLmnpzmsqHmnInliJnov5Tlm54tMeOAglxyXG4gKiByZW1vdmVBdChwb3NpdGlvbinvvJrku47pk77ooajmjIflrprkvY3nva7np7vpmaTkuIDkuKrlhYPntKDjgIJcclxuICogaXNFbXB0eSgp77ya5aaC5p6c6ZO+6KGo5Lit5LiN5YyF5ZCr5Lu75L2V5YWD57Sg77yM5YiZ6L+U5ZuedHJ1Ze+8jOWQpuWImei/lOWbnmZhbHNl44CCXHJcbiAqIHNpemUoKe+8mui/lOWbnumTvuihqOWMheWQq+eahOWFg+e0oOS4quaVsOOAglxyXG4gKiBnZXRIZWFkKCnvvJrov5Tlm57pk77ooajnmoTnrKzkuIDkuKrlhYPntKDjgIJcclxuICogZ2V0SGVhZCgp77ya5riF56m66ZO+6KGo44CCXHJcbiAqIHRvU3RyaW5nKCnvvJrov5Tlm57ooajnpLrmlbTkuKrpk77ooajnmoTlrZfnrKbkuLLjgIJcclxuICpcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTGlua2VkTGlzdCAoKXtcclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvdW50ID0gMDtcclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmhlYWQgPSBudWxsO1xyXG5cclxuICAgIGZ1bmN0aW9uIE5vZGUgKGVsZW1lbnQ6YW55KXtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMubmV4dCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuTm9kZSA9IE5vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHpk77ooajlsL7pg6jmt7vliqDkuIDkuKrmlrDlhYPntKBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZWxlbWVudDphbnkpe1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB2YXIgbm9kZSA9ICBuZXcgTm9kZShlbGVtZW50KTtcclxuICAgICAgICBpZih0aGlzLmhlYWQpe1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuaGVhZDtcclxuICAgICAgICAgICAgd2hpbGUoY3VycmVudC5uZXh0KXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gbm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjpk77ooajmjIflrprkvY3nva7mj5LlhaXkuIDkuKrmlrDlhYPntKBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChlbGVtZW50OmFueSxwb3NpdGlvbjpudW1iZXIpe1xyXG4gICAgICAgIGlmKHBvc2l0aW9uIDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuY291bnQgPD0gcG9zaXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgIGlmKHBvc2l0aW9uID09PSAwKXtcclxuICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gdGhpcy5oZWFkO1xyXG4gICAgICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xyXG4gICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLmdldEVsZW1lbnRBdChwb3NpdGlvbiAtIDEpO1xyXG4gICAgICAgICAgICAgICBub2RlLm5leHQgPSByZXMubmV4dDtcclxuICAgICAgICAgICAgICAgcmVzLm5leHQgPSBub2RlO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICB0aGlzLmNvdW50ICs9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnumTvuihqOS4reeJueWumuS9jee9rueahOWFg+e0oO+8jOWmguaenOayoeacieWImei/lOWbnnVuZGVmaW5lZFxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7Tm9kZXx1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmdldEVsZW1lbnRBdCA9IGZ1bmN0aW9uIChpbmRleDogbnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmNvdW50IDw9IGluZGV4KXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmhlYWQ7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxpbmRleDtpKyspe1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3VycmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7jumTvuihqOS4reenu+mZpOS4gOS4quWFg+e0oFxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtOb2RlLmVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChlbGVtZW50OiBhbnkpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUF0KHRoaXMuaW5kZXhPZihlbGVtZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lhYPntKDlnKjpk77ooajkuK3nmoTntKLlvJXvvIzlpoLmnpzmsqHmnInliJnov5Tlm54tMVxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoZWxlbWVudDogYW55KXtcclxuICAgICAgICBpZih0aGlzLmNvdW50ID4gMCl7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5oZWFkO1xyXG4gICAgICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuY291bnQ7aSsrKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQuZWxlbWVudCA9PT0gZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7jumTvuihqOaMh+WumuS9jee9ruenu+mZpOS4gOS4quWFg+e0oFxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfCp9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZUF0ID0gZnVuY3Rpb24gKGluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGluZGV4IDwgMHx8dGhpcy5jb3VudCA9PT0gMHx8aW5kZXggPj0gdGhpcy5jb3VudCl7XHJcbiAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmhlYWRcclxuICAgICAgICBpZihpbmRleCA9PT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEF0KGluZGV4IC0gMSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBlbGVtZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIGVsZW1lbnQubmV4dCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCAtPSAxO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50LmVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpoLmnpzpk77ooajkuK3kuI3ljIXlkKvku7vkvZXlhYPntKDvvIzliJnov5Tlm550cnVl77yM5ZCm5YiZ6L+U5ZueZmFsc2VcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnQgPT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57pk77ooajljIXlkKvnmoTlhYPntKDkuKrmlbBcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb3VudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnumTvuihqOeahOesrOS4gOS4quWFg+e0oFxyXG4gICAgICogQHJldHVybnMge05vZGV8bnVsbH1cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZ2V0SGVhZCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXnqbrpk77ooahcclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICB0aGlzLmhlYWQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue6KGo56S65pW05Liq6ZO+6KGo55qE5a2X56ym5LiyXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIGlmKHRoaXMuY291bnQ9PT0wKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHZhciBudW0gPSAwO1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5oZWFkO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Lm5leHQpe1xyXG4gICAgICAgICAgICBzdHIgKz0gYExpbmtlZExpc3Q6IHtlbGVtZW50OiAke2N1cnJlbnQuZWxlbWVudH0sIGluZGV4OiAke251bX19IG5leHQgLS0tLT4gJHtjdXJyZW50Lm5leHQuZWxlbWVudH1cXG5gXHJcbiAgICAgICAgICAgIG51bSArPSAxO1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIgKz0gYExpbmtlZExpc3Q6IHtlbGVtZW50OiAke2N1cnJlbnQuZWxlbWVudH0sIGluZGV4OiAke251bX19IG5leHQgLS0tLT4gbnVsbFxcbmBcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiDpmJ/liJdcclxuICpcclxuICogc2V0KCnvvJrlkJHpmJ/liJfmt7vliqDlhYPntKDvvIzlj6/moLnmja7lhYPntKDmlbDlrZfov5vooYzmjpLluo9cclxuICogZ2V0KCnvvJrojrflj5bpmJ/liJfmlbDmja7vvIzlubbkuJToh6rliqjop6PmnpBRdWV1ZUVsZW1lbnTlr7nosaHvvIznm7TmjqXov5Tlm57nu5PmnpxcclxuICogZW5xdWV1ZSgp77ya5ZCR6Zif5YiX55qE5bC+6YOo5re75Yqg5YWD57Sg44CCXHJcbiAqIGZyb250UXVldWUoKe+8muWQkemYn+WIl+WJjemdoua3u+WKoOaWsOWFg+e0oOOAglxyXG4gKiBkZXF1ZXVlKCnvvJrlkJHpmJ/liJfnmoTlvIDlpLTnp7vpmaTnrKzkuIDkuKrlhYPntKDvvIzlubbov5Tlm57ooqvnp7vpmaTnmoTlhYPntKDjgIJcclxuICogcG9wKCnvvJrlkJHpmJ/liJfnp7vpmaTmnIDlkI7nmoTvvIzlubbov5Tlm57ooqvnp7vpmaTnmoTlhYPntKDjgIJcclxuICogcGVla0Zyb250KCnvvJrov5Tlm57pmJ/liJfliY3nq6/nmoTnrKzkuIDkuKrlhYPntKDjgIJcclxuICogcGVla0JhY2soKe+8mui/lOWbnumYn+WIl+WQjuerr+eahOesrOS4gOS4quWFg+e0oOOAglxyXG4gKiBpc0VtcHR5KCnvvJrliKTmlq3pmJ/liJfmmK/lkKbkuLrnqbrjgIJcclxuICogc2l6ZSgp77ya6L+U5Zue6Zif5YiX5YyF5ZCr5YWD57Sg55qE5Liq5pWw44CCXHJcbiAqIGNsZWFyKCnvvJrmuIXnqbrpmJ/liJfjgIJcclxuICogdG9TdHJpbmcoKe+8muWwhumYn+WIl+i9rOaNouaIkOWtl+espuS4suagvOW8j+OAglxyXG4gKlxyXG4gKiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFF1ZXVlKCl7XHJcbiAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFg+e0oOWSjOS8mOWFiOe6p1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFF1ZXVlRWxlbWVudCAoZWxlbWVudDphbnkscHJpb3JpdHk6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOS4gOS4quacieaOkuW6j+eahOaVsOaNrlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQtLS0t5re75Yqg5YWD57SgLS0tLeW/heS8oFxyXG4gICAgICogQHBhcmFtIHByaW9yaXR5LS0tLeWxgue6p+aVsO+8jOaVsOmHj+i2iumrmO+8jOi2iuW+gOWQju+8jOS4uui0n+aVsOaIluiAhTDml7boh6rliqjpu5jorqTnu6fmib/kuIrkuIDkuKrlhYPntKDnmoTmnYPph43lgLzlubbkuJQrMS0tLS3pnZ7lv4XkvKBcclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChlbGVtZW50OmFueSxwcmlvcml0eTpudW1iZXIpe1xyXG4gICAgICAgIC8v5Yik5pat5Li655yf5pWw5YC877yM5oiW6ICF5aSn5LqOMOaXtu+8jOS4uuacieaViOadg+mHjVxyXG4gICAgICAgIGlmKHByaW9yaXR5ICYmIHByaW9yaXR5ID4gMCl7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgY29uc3QgcXVldWVFbGVtZW50ID0gbmV3IFF1ZXVlRWxlbWVudChlbGVtZW50LHByaW9yaXR5KTtcclxuICAgICAgICAgICAgLy/plIHvvIzlpoLmnpzmnInmj5LlhaXlhYPntKDvvIzlsLHkuLp0cnVlXHJcbiAgICAgICAgICAgIGxldCBpc0FkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY291bnQ7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXRlbXNbaV0ucHJpb3JpdHkgPiBwcmlvcml0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaSwwLHF1ZXVlRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNBZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFpc0FkZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW3RoaXMuY291bnRdID0gcXVldWVFbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQgKz0gMTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5lbnF1ZXVlKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumYn+WIl+aVsOaNru+8jOW5tuS4lOetm+mAieaOieadg+mHjeWtl+autVxyXG4gICAgICogQHJldHVybnMge1tdfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgY29uc3QgcmVzID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNvdW50O2krKyl7XHJcbiAgICAgICAgICAgIHJlcy5wdXNoKHRoaXMuaXRlbXNbaV0uZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHpmJ/liJfnmoTlsL7pg6jmt7vliqDlhYPntKBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW1lbnQ6YW55KXtcclxuICAgICAgICBsZXQgcXVldWVFbGVtZW50O1xyXG4gICAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgLy/pu5jorqTkvb/nlKjmlbDnu4Tplb/luqbkuLrlhYPntKDmnYPph43lgLxcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxdWV1ZUVsZW1lbnQgPSBuZXcgUXVldWVFbGVtZW50KGVsZW1lbnQsdGhpcy5jb3VudCsxKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/pu5jorqTnu6fmib/kuIrkuIDkuKrlhYPntKDnmoTmnYPph43lgLzlubbkuJQrMVxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHF1ZXVlRWxlbWVudCA9IG5ldyBRdWV1ZUVsZW1lbnQoZWxlbWVudCx0aGlzLml0ZW1zW3RoaXMuY291bnQtMV0ucHJpb3JpdHkrMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXRlbXNbdGhpcy5jb3VudF0gPSBxdWV1ZUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR6Zif5YiX5YmN6Z2i5re75Yqg5paw5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5mcm9udFF1ZXVlID0gZnVuY3Rpb24oZWxlbWVudDphbnkpe1xyXG4gICAgICAgIGxldCBxdWV1ZUVsZW1lbnQ7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICAvL+m7mOiupOS9v+eUqOaVsOe7hOmVv+W6puS4uuWFg+e0oOadg+mHjeWAvFxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHF1ZXVlRWxlbWVudCA9IG5ldyBRdWV1ZUVsZW1lbnQoZWxlbWVudCx0aGlzLmNvdW50KzEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+m7mOiupOe7p+aJv+S4iuS4gOS4quWFg+e0oOeahOadg+mHjeWAvFxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHF1ZXVlRWxlbWVudCA9IG5ldyBRdWV1ZUVsZW1lbnQoZWxlbWVudCx0aGlzLnBlZWtGcm9udCgpLnByaW9yaXR5KTtcclxuICAgICAgICAgICAgLy/mlLnlj5jmiYDmnInmjpLluo/lgLwrMVxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY291bnQ7aSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0ucHJpb3JpdHkgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1zLnNwbGljZSgwLDAscXVldWVFbGVtZW50KTtcclxuICAgICAgICB0aGlzLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjpmJ/liJfnmoTlvIDlpLTnp7vpmaTnrKzkuIDkuKrlhYPntKDvvIzlubbov5Tlm57ooqvnp7vpmaTnmoTlhYPntKDjgIJcclxuICAgICAqIEByZXR1cm5zIHtudWxsfFR9XHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCAtPSAxO1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnNoaWZ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjpmJ/liJfnmoTnp7vpmaTmnIDlkI7kuIDkuKrlhYPntKDvvIzlubbov5Tlm57ooqvnp7vpmaTnmoTlhYPntKDjgIJcclxuICAgICAqIEByZXR1cm5zIHtudWxsfFR9XHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICBpZih0aGlzLmlzRW1wdHkoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50IC09IDE7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57pmJ/liJfnmoTnrKzkuIDkuKrlhYPntKBcclxuICAgICAqIEBwYXJhbSBpcy0tLS3luIPlsJTnsbvlnovvvIzkuLp0cnVl5pe255u05o6l6L+U5Zue57uT5p6c77yM5ZCm5YiZ6L+U5ZueIFF1ZXVlRWxlbWVudOWvueixoS0tLS3pnZ7lv4XloatcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUucGVla0Zyb250ID0gZnVuY3Rpb24oaXM6Ym9vbGVhbil7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXM/dGhpcy5pdGVtc1swXS5lbGVtZW50OnRoaXMuaXRlbXNbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57pmJ/liJfnmoTnrKzkuIDkuKrlhYPntKBcclxuICAgICAqIEBwYXJhbSBpcy0tLS3luIPlsJTnsbvlnovvvIzkuLp0cnVl5pe255u05o6l6L+U5Zue57uT5p6c77yM5ZCm5YiZ6L+U5ZueIFF1ZXVlRWxlbWVudOWvueixoS0tLS3pnZ7lv4XloatcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUucGVla0JhY2sgPSBmdW5jdGlvbihpczpib29sZWFuKXtcclxuICAgICAgICBpZih0aGlzLmlzRW1wdHkoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpcz90aGlzLml0ZW1zW3RoaXMuY291bnQtMV0uZWxlbWVudDp0aGlzLml0ZW1zW3RoaXMuY291bnQtMV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3pmJ/liJfmmK/lkKbkuLrnqbpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50ID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue6Zif5YiX5YyF5ZCr5YWD57Sg55qE5Liq5pWwXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF56m66Zif5YiXXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhumYn+WIl+i9rOaNouaIkOWtl+espuS4suagvOW8j1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ3wqW119XHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXMgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbTphbnkpPT57XHJcbiAgICAgICAgICAgIHJlcyArPSBgUXVldWVFbGVtZW50OiB7ZWxlbWVudDogJHtpdGVtLmVsZW1lbnR9LHByaW9yaXR5OiAke2l0ZW0ucHJpb3JpdHl9fVxcbmBcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIOagiFxyXG4gKlxyXG4gKiBwdXNoKCnvvJrlnKjmoIjpobbmt7vliqDkuIDkuKrmiJbogIXlpJrkuKrlhYPntKDjgIJcclxuICogcG9wKCnvvJrnp7vpmaTmoIjpobbnmoTnrKzkuIDkuKrlhYPntKDvvIzlkIzml7bov5Tlm57ooqvnp7vpmaTnmoTlhYPntKDjgIJcclxuICogcGVlaygp77ya6L+U5Zue5qCI6aG255qE5YWD57Sg44CCXHJcbiAqIGlzRW1wdHkoKe+8muWIpOaWreagiOaYr+WQpuS4uuepuu+8jOaYr+WImei/lOWbnnRydWXvvIzlkKbliJnov5Tlm55mYWxzZVxyXG4gKiBjbGVhcigp77ya56e76Zmk5qCI5Lit55qE5omA5pyJ5YWD57Sg44CCXHJcbiAqIHNpemUoKe+8mui/lOWbnuagiOS4reWFg+e0oOeahOS4quaVsOOAglxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTdGFjaygpIHtcclxuXHJcbiAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaWsOWinuS4gOS4quWFg+e0oFxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgU3RhY2sucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihlbGVtZW50OmFueSl7XHJcbiAgICAgICAgdGhpcy5pdGVtc1t0aGlzLmNvdW50XSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk56ys5LiA5Liq5YWD57SgXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfFR9XHJcbiAgICAgKi9cclxuICAgIFN0YWNrLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCAtPSAxO1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5qCI6aG25b6X5YWD57SgXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgU3RhY2sucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW3RoaXMuY291bnQtMV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrnqbpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBTdGFjay5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZSgpID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk5omA5pyJXHJcbiAgICAgKi9cclxuICAgIFN0YWNrLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCI55qE5pWw6YePXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBTdGFjay5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgU3RhY2sucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0aGlzLmlzRW1wdHkoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuam9pbihcIixcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNjA3KTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==