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

var time;
/**
 * 防抖
 * @param func
 * @param wait
 */
module.exports = function Debounce(func, wait) {
    if (time) {
        clearTimeout(time);
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        time = setTimeout(function () {
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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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
module.exports = function Api() {
    Api.prototype.throttle = function (func, wait) {
        return new Throttle(func, wait);
    };
    Api.prototype.debounce = function (func, wait) {
        return new Debounce(func, wait);
    };
    Api.prototype.deepClone = function (target) {
        return new DeepClone(target);
    };
    Api.prototype.deepMerge = function (target, source) {
        return new DeepMerge(target, source);
    };
    Api.prototype.getPrototype = function (obj, key) {
        return new Prototype().get(obj, key);
    };
    Api.prototype.setPrototype = function (obj, key, val) {
        return new Prototype().set(obj, key, val);
    };
    Api.prototype.timeFormat = function (dateTime, fmt) {
        return new Time().timeFormat(dateTime, fmt);
    };
    Api.prototype.randomArray = function (array) {
        return new ArrayObj().randomArray(array);
    };
    Api.prototype.guid = function (len, firstU, radix) {
        return new Guid().get(len, firstU, radix);
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
        return new Color().colorGradient(startColor, endColor, step);
    };
    /**
     * 十六进制Hex转RGB
     *
     * 该函数可以将一个Hex的十六进制颜色值转换成一个RGB颜色值
     * @param sColor <String> HEx颜色值，如#0afdce
     */
    Api.prototype.hexToRgb = function (sColor) {
        return new Color().hexToRgb(sColor);
    };
    /**
     * RGB转十六进制Hex
     * 该函数可以将一个RGB颜色值转换成一个Hex的十六进制颜色值
     * @param rgb <String> RGB颜色值，如rgb(230, 231, 233)
     */
    Api.prototype.rgbToHex = function (rgb) {
        return new Color().rgbToHex(rgb);
    };
    /**
     * 颜色透明度
     * 该函数可以接受一个十六进制或者rgb格式的颜色值(不能接受命名式颜色格式，比如white)，返回此颜色的rgba格式值
     * @param color <String> 颜色值，只能hex或者rgba格式
     * @param opacity <Number> 不透明度值，取值为0-1之间
     */
    Api.prototype.colorToRgba = function (color, opacity) {
        return new Color().colorToRgba(color, opacity);
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
        return new Params().objToParams(data, isPrefix, arrayFormat);
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
        return new MD5().get(string, key, raw);
    };
    /**
     * 去除空格
     * @param  str 需要去除空格的字符串
     * @param  pos both(左右)|left|right|all 默认both
     */
    Api.prototype.trim = function (str, pos) {
        return new Trim().trim(str, pos);
    };
    /**
     * 校验是否为验证码
     * @param value 验证码字符串
     * @param len 验证码长度，不填默认为6位数
     * @return Boolean
     */
    Api.prototype.isCode = function (value, len) {
        return new Test().code(value, len);
    };
    /**
     * 校验是否为数组
     * @param array 数组
     * @return Boolean
     */
    Api.prototype.isArray = function (array) {
        return new Test().array(array);
    };
    /**
     * 校验是否为json字符串
     * @param json
     * @return Boolean
     */
    Api.prototype.isJsonString = function (json) {
        return new Test().jsonString(json);
    };
    /**
     * 校验是否为有效值的json
     * @param json
     * @return Boolean
     */
    Api.prototype.isJson = function (json) {
        return new Test().json(json);
    };
    /**
     * 校验是否为对象
     * @param object
     * @return Boolean
     */
    Api.prototype.isObject = function (object) {
        return new Test().object(object);
    };
    /**
     * 校验是否为邮箱号
     * @param value
     * @return Boolean
     */
    Api.prototype.isEmail = function (value) {
        return new Test().email(value);
    };
    /**
     * 校验是否为手机号
     * @param value
     * @return Boolean
     */
    Api.prototype.isPhone = function (value) {
        return new Test().phone(value);
    };
    /**
     * 校验是否为URL
     * @param value
     * @return Boolean
     */
    Api.prototype.isUrl = function (value) {
        return new Test().url(value);
    };
    /**
     * 校验是否为空
     * @param value
     * @return Boolean
     */
    Api.prototype.isEmpty = function (value) {
        return new Test().empty(value);
    };
    /**
     * 校验是否为普通日期
     * @param value
     * @return Boolean
     */
    Api.prototype.isDate = function (value) {
        return new Test().date(value);
    };
    /**
     * 校验是否为十进制数值
     * @param value
     * @return Boolean
     */
    Api.prototype.isNumber = function (value) {
        return new Test().number(value);
    };
    /**
     * 校验是否为身份证号
     * @param value
     * @return Boolean
     */
    Api.prototype.isIdCard = function (value) {
        return new Test().idCard(value);
    };
    /**
     * 判断是否为车牌号
     * @param value
     * @return Boolean
     */
    Api.prototype.isCarNo = function (value) {
        return new Test().carNo(value);
    };
    /**
     * 校验是否为金额
     * @param value
     * @return Boolean
     */
    Api.prototype.isAmount = function (value) {
        return new Test().amount(value);
    };
    /**
     * 校验是否为中文（汉字）
     * @param value
     * @return Boolean
     */
    Api.prototype.isChinese = function (value) {
        return new Test().chinese(value);
    };
    /**
     * 校验是否为英文字母
     * @param value
     * @return Boolean
     */
    Api.prototype.isLetter = function (value) {
        return new Test().letter(value);
    };
    /**
     * 校验是否为字母或者数字
     * @param value
     * @return Boolean
     */
    Api.prototype.isEnOrNum = function (value) {
        return new Test().enOrNum(value);
    };
    /**
     * 校验是否包含某个值（如果为object，默认判断某个key是否存在，如果需要判断值，isValue = true 即可）
     * @param value
     * @param param
     * @param isValue
     * @return Boolean
     */
    Api.prototype.isContains = function (value, param, isValue) {
        return new Test().contains(value, param, isValue);
    };
    /**
     * 校验是否为验证一个值范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Api.prototype.isRange = function (value, param) {
        return new Test().range(value, param);
    };
    /**
     * 校验是否为验证一个长度范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Api.prototype.isRangeLength = function (value, param) {
        return new Test().rangeLength(value, param);
    };
    /**
     * 校验是否为函数方法
     * @param value
     * @return Boolean
     */
    Api.prototype.isFunc = function (value) {
        return new Test().func(value);
    };
    /**
     * 校验是否为promise对象
     * @param value
     * @return Boolean
     */
    Api.prototype.isPromise = function (value) {
        return new Test().promise(value);
    };
    /**
     * 校验是否为图片格式
     * @param value
     * @return Boolean
     */
    Api.prototype.isImage = function (value) {
        return new Test().image(value);
    };
    /**
     * 校验是否为视频格式
     * @param value
     * @return Boolean
     */
    Api.prototype.isVideo = function (value) {
        return new Test().video(value);
    };
    /**
     * 校验是否为正则对象
     * @param value
     * @return Boolean
     */
    Api.prototype.isRegExp = function (value) {
        return new Test().regExp(value);
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDN0MsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7QUFDdkMsQ0FBQztBQUVEOztFQUVFO0FBQ0YsU0FBUyxhQUFhLENBQUUsR0FBVyxFQUFFLEdBQVc7SUFDNUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQ7O0VBRUU7QUFDRixTQUFTLE1BQU0sQ0FBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDN0UsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUUsQ0FBQztBQUNELFNBQVMsS0FBSyxDQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDdkYsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFDRCxTQUFTLEtBQUssQ0FBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO0lBQ3ZGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBQ0QsU0FBUyxLQUFLLENBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztJQUN2RixPQUFPLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFDRCxTQUFTLEtBQUssQ0FBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO0lBQ3ZGLE9BQU8sTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVEOztFQUVFO0FBQ0YsU0FBUyxPQUFPLENBQUUsQ0FBTSxFQUFFLEdBQVc7SUFDakMsb0JBQW9CO0lBQ3BCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRztJQUVyQyxJQUFJLENBQUM7SUFDTCxJQUFJLElBQUk7SUFDUixJQUFJLElBQUk7SUFDUixJQUFJLElBQUk7SUFDUixJQUFJLElBQUk7SUFDUixJQUFJLENBQUMsR0FBRyxVQUFVO0lBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUztJQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVU7SUFDbkIsSUFBSSxDQUFDLEdBQUcsU0FBUztJQUVqQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvQixJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksR0FBRyxDQUFDO1FBQ1IsSUFBSSxHQUFHLENBQUM7UUFDUixJQUFJLEdBQUcsQ0FBQztRQUVSLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDMUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDNUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQztRQUVoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUMzQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUM7UUFDN0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDO1FBQzdDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFFakQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDM0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNqRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUMzQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUM7UUFDN0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBRS9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDMUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDO1FBQy9DLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQztRQUMvQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUM7UUFDOUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDL0MsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDaEQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDO1FBQ2hELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQzlDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ2pELENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQztRQUM5QyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNB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dmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly8vLi9zcmMvVXRpbHMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9BcnJheS9BcnJheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL0NvbG9yL0NvbG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvRGVib3VuY2UvRGVib3VuY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9EZWVwQ2xvbmUvRGVlcENsb25lLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvRGVlcE1lcmdlL0RlZXBNZXJnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL0d1aWQvR3VpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL01ENS9NRDUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9QYXJhbXMvUGFyYW1zLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvUHJvdG90eXBlL1Byb3RvdHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL1Rlc3QvVGVzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL1Rocm90dGxlL1Rocm90dGxlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvVGltZS9UaW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvVHJpbS9UcmltLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJ1Y3R1cmUvRG91Ymx5TGlua2VkTGlzdC9Eb3VibHlMaW5rZWRMaXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJ1Y3R1cmUvTGlua2VkTGlzdC9MaW5rZWRMaXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJ1Y3R1cmUvUXVldWUvUXVldWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0cnVjdHVyZS9TdGFjay9TdGFjay50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJ2YXIgU3RhY2sgPSByZXF1aXJlKFwiLi4vc3RydWN0dXJlL1N0YWNrL1N0YWNrXCIpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAgZnVuY3Rpb24gVXRpbHMoKXtcclxuICAgIC8qKlxyXG4gICAgICog6L+b5Yi26L2s5o2i566X5rOVXHJcbiAgICAgKiBAcGFyYW0gZGVjTnVtYmVyIOi9rOaNoueahOaVsOWtl1xyXG4gICAgICogQHBhcmFtIGJhc2UgIOi9rOaNoueahOexu+Wei1xyXG4gICAgICovXHJcbiAgICBVdGlscy5wcm90b3R5cGUuYmFzZUNvbnZlcnRlciA9IGZ1bmN0aW9uKGRlY051bWJlcjpudW1iZXIsIGJhc2U6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrKCk7XHJcbiAgICAgICAgdmFyIHJlczpzdHJpbmcgPSAnJztcclxuICAgICAgICB2YXIgcmVtOm51bWJlcjtcclxuICAgICAgICBiYXNlID0gYmFzZXx8MjtcclxuICAgICAgICBpZihiYXNlIDwgMiB8fCBiYXNlID4gMzYpe1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlKGRlY051bWJlciA+IDApe1xyXG4gICAgICAgICAgICByZW0gPSBNYXRoLmZsb29yKGRlY051bWJlciAlIGJhc2UpO1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKHJlbSk7XHJcbiAgICAgICAgICAgIGRlY051bWJlciA9IE1hdGguZmxvb3IoZGVjTnVtYmVyIC8gYmFzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICghc3RhY2suaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgcmVzICs9IHN0YWNrLnBvcCgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQXJyYXkgKCl7XHJcbiAgICBBcnJheS5wcm90b3R5cGUucmFuZG9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyYXk6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gYXJyYXkuc29ydChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgLSAwLjU7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENvbG9yICgpe1xyXG4gICAgLyoqXHJcbiAgICAgKiDpopzoibLmuJDlj5hcclxuICAgICAqXHJcbiAgICAgKiDor6Xlh73mlbDlrp7njrDkuKTkuKrpopzoibLlgLzkuYvpl7TnrYnliIblj5blgLzvvIzov5Tlm57kuIDkuKrmlbDnu4TvvIzlhYPntKDkuLrljYHlha3ov5vliLblvaLlvI/nmoTpopzoibLlgLzvvIzmlbDnu4Tplb/luqbkuLpzdGVw5YC844CCXHJcbiAgICAgKiDkvovlpoLvvJpjb2xvckdyYWRpZW50KCdyZ2IoMjUwLCAyNTAsIDI1MCknLCAncmdiKDI1MiwgMjUyLCAyNTIpJywgMynvvIzlvpfliLDnmoTnu5PmnpzkuLpbXCIjZmFmYWZhXCIsIFwiI2ZhZmFmYVwiLCBcIiNmYmZiZmJcIl1cclxuICAgICAqIEBwYXJhbSBzdGFydENvbG9yPFN0cmluZz4g5byA5aeL6aKc6Imy5YC877yM5Y+v5Lul5pivSEVY5oiW6ICFUkdC6aKc6Imy5YC877yM5aaCIzBhZmRjZeaIluiAhXJnYigxMjAsIDEzMCwgMTUwKVxyXG4gICAgICogQHBhcmFtIGVuZENvbG9yIDxTdHJpbmc+IOe7k+adn+minOiJsuWAvO+8jOWPr+S7peaYr0hFWOaIluiAhVJHQuminOiJsuWAvO+8jOWmgiMwYWZkY2XmiJbogIVyZ2IoMTIwLCAxMzAsIDE1MClcclxuICAgICAqIEBwYXJhbSBzdGVwIDxOdW1iZXI+IOWdh+WIhuWAvO+8jOaKiuW8gOWni+WAvOWSjOe7k+adn+WAvOW5s+Wdh+WIhuaIkOWkmuWwkeS7vVxyXG4gICAgICovXHJcbiAgICBDb2xvci5wcm90b3R5cGUuY29sb3JHcmFkaWVudCA9IGZ1bmN0aW9uIChzdGFydENvbG9yOiBzdHJpbmcsIGVuZENvbG9yOiBzdHJpbmcsIHN0ZXAgPSAxMCk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHN0YXJ0Q29sb3IgPSBzdGFydENvbG9yfHwncmdiKDAsIDAsIDApJztcclxuICAgICAgICBlbmRDb2xvciA9IGVuZENvbG9yfHwncmdiKDI1NSwgMjU1LCAyNTUpJztcclxuICAgICAgICBjb25zdCBzdGFydFJHQiA9IHRoaXMuaGV4VG9SZ2Ioc3RhcnRDb2xvciwgZmFsc2UpOyAvLyDovazmjaLkuLpyZ2LmlbDnu4TmqKHlvI9cclxuICAgICAgICBjb25zdCBzdGFydFIgPSBzdGFydFJHQlswXTtcclxuICAgICAgICBjb25zdCBzdGFydEcgPSBzdGFydFJHQlsxXTtcclxuICAgICAgICBjb25zdCBzdGFydEIgPSBzdGFydFJHQlsyXTtcclxuXHJcbiAgICAgICAgY29uc3QgZW5kUkdCID0gdGhpcy5oZXhUb1JnYihlbmRDb2xvciwgZmFsc2UpXHJcbiAgICAgICAgY29uc3QgZW5kUiA9IGVuZFJHQlswXTtcclxuICAgICAgICBjb25zdCBlbmRHID0gZW5kUkdCWzFdO1xyXG4gICAgICAgIGNvbnN0IGVuZEIgPSBlbmRSR0JbMl07XHJcblxyXG4gICAgICAgIGNvbnN0IHNSID0gKGVuZFIgLSBzdGFydFIpIC8gc3RlcDsgLy8g5oC75beu5YC8XHJcbiAgICAgICAgY29uc3Qgc0cgPSAoZW5kRyAtIHN0YXJ0RykgLyBzdGVwO1xyXG4gICAgICAgIGNvbnN0IHNCID0gKGVuZEIgLSBzdGFydEIpIC8gc3RlcDtcclxuICAgICAgICBjb25zdCBjb2xvckFyciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIOiuoeeul+avj+S4gOatpeeahGhleOWAvFxyXG4gICAgICAgICAgICBsZXQgaGV4ID0gdGhpcy5yZ2JUb0hleChgcmdiKCR7TWF0aC5yb3VuZCgoc1IgKiBpICsgc3RhcnRSKSl9LCR7TWF0aC5yb3VuZCgoc0cgKiBpICsgc3RhcnRHKSl9LCR7TWF0aC5yb3VuZCgoc0JcclxuICAgICAgICAgICAgICAgICogaSArIHN0YXJ0QikpfSlgKTtcclxuICAgICAgICAgICAgLy8g56Gu5L+d56ys5LiA5Liq6aKc6Imy5YC85Li6c3RhcnRDb2xvcueahOWAvFxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkgaGV4ID0gdGhpcy5yZ2JUb0hleChzdGFydENvbG9yKTtcclxuICAgICAgICAgICAgLy8g56Gu5L+d5pyA5ZCO5LiA5Liq6aKc6Imy5YC85Li6ZW5kQ29sb3LnmoTlgLxcclxuICAgICAgICAgICAgaWYgKGkgPT09IHN0ZXAgLSAxKSBoZXggPSB0aGlzLnJnYlRvSGV4KGVuZENvbG9yKTtcclxuICAgICAgICAgICAgY29sb3JBcnIucHVzaChoZXgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xvckFyclxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y2B5YWt6L+b5Yi2SGV46L2sUkdCXHJcbiAgICAgKlxyXG4gICAgICog6K+l5Ye95pWw5Y+v5Lul5bCG5LiA5LiqSGV455qE5Y2B5YWt6L+b5Yi26aKc6Imy5YC86L2s5o2i5oiQ5LiA5LiqUkdC6aKc6Imy5YC8XHJcbiAgICAgKiBAcGFyYW0gc0NvbG9yIDxTdHJpbmc+IEhFeOminOiJsuWAvO+8jOWmgiMwYWZkY2VcclxuICAgICAqIEBwYXJhbSBzdHJcclxuICAgICAqL1xyXG4gICAgQ29sb3IucHJvdG90eXBlLmhleFRvUmdiID0gIGZ1bmN0aW9uIChzQ29sb3I6IHN0cmluZywgc3RyID0gdHJ1ZSk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgcmVnID0gL14jKFswLTlhLWZBLWZdezN9fFswLTlhLWZBLWZdezZ9KSQvXHJcbiAgICAgICAgc0NvbG9yID0gU3RyaW5nKHNDb2xvcikudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIGlmIChzQ29sb3IgJiYgcmVnLnRlc3Qoc0NvbG9yKSkge1xyXG4gICAgICAgICAgICBpZiAoc0NvbG9yLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNDb2xvck5ldyA9ICcjJ1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzQ29sb3JOZXcgKz0gc0NvbG9yLnNsaWNlKGksIGkgKyAxKS5jb25jYXQoc0NvbG9yLnNsaWNlKGksIGkgKyAxKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNDb2xvciA9IHNDb2xvck5ld1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWkhOeQhuWFreS9jeeahOminOiJsuWAvFxyXG4gICAgICAgICAgICBjb25zdCBzQ29sb3JDaGFuZ2UgPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDc7IGkgKz0gMikge1xyXG4gICAgICAgICAgICAgICAgc0NvbG9yQ2hhbmdlLnB1c2gocGFyc2VJbnQoYDB4JHtzQ29sb3Iuc2xpY2UoaSwgaSArIDIpfWApKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc3RyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc0NvbG9yQ2hhbmdlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGByZ2IoJHtzQ29sb3JDaGFuZ2VbMF19LCR7c0NvbG9yQ2hhbmdlWzFdfSwke3NDb2xvckNoYW5nZVsyXX0pYFxyXG4gICAgICAgIH0gaWYgKC9eKHJnYnxSR0IpLy50ZXN0KHNDb2xvcikpIHtcclxuICAgICAgICAgICAgY29uc3QgYXJyID0gc0NvbG9yLnJlcGxhY2UoLyg/OlxcKHxcXCl8cmdifFJHQikqL2csICcnKS5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgIHJldHVybiBhcnIubWFwKCh2YWwpID0+IE51bWJlcih2YWwpKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc0NvbG9yXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSR0LovazljYHlha3ov5vliLZIZXhcclxuICAgICAqIOivpeWHveaVsOWPr+S7peWwhuS4gOS4qlJHQuminOiJsuWAvOi9rOaNouaIkOS4gOS4qkhleOeahOWNgeWFrei/m+WItuminOiJsuWAvFxyXG4gICAgICogQHBhcmFtIHJnYiA8U3RyaW5nPiBSR0LpopzoibLlgLzvvIzlpoJyZ2IoMjMwLCAyMzEsIDIzMylcclxuICAgICAqL1xyXG4gICAgQ29sb3IucHJvdG90eXBlLnJnYlRvSGV4ID0gZnVuY3Rpb24gKHJnYjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBfdGhpcyA9IHJnYlxyXG4gICAgICAgIGNvbnN0IHJlZyA9IC9eIyhbMC05YS1mQS1mXXszfXxbMC05YS1mQS1mXXs2fSkkL1xyXG4gICAgICAgIGlmICgvXihyZ2J8UkdCKS8udGVzdChfdGhpcykpIHtcclxuICAgICAgICAgICAgY29uc3QgYUNvbG9yID0gX3RoaXMucmVwbGFjZSgvKD86XFwofFxcKXxyZ2J8UkdCKSovZywgJycpLnNwbGl0KCcsJylcclxuICAgICAgICAgICAgbGV0IHN0ckhleCA9ICcjJ1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFDb2xvci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhleCA9IE51bWJlcihhQ29sb3JbaV0pLnRvU3RyaW5nKDE2KVxyXG4gICAgICAgICAgICAgICAgaGV4ID0gU3RyaW5nKGhleCkubGVuZ3RoID09IDEgPyBgJHswfSR7aGV4fWAgOiBoZXggLy8g5L+d6K+B5q+P5Liqcmdi55qE5YC85Li6MuS9jVxyXG4gICAgICAgICAgICAgICAgaWYgKGhleCA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGV4ICs9IGhleFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RySGV4ICs9IGhleFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzdHJIZXgubGVuZ3RoICE9PSA3KSB7XHJcbiAgICAgICAgICAgICAgICBzdHJIZXggPSBfdGhpc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJIZXhcclxuICAgICAgICB9IGlmIChyZWcudGVzdChfdGhpcykpIHtcclxuICAgICAgICAgICAgY29uc3QgYU51bSA9IF90aGlzLnJlcGxhY2UoLyMvLCAnJykuc3BsaXQoJycpXHJcbiAgICAgICAgICAgIGlmIChhTnVtLmxlbmd0aCA9PT0gNikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzXHJcbiAgICAgICAgICAgIH0gaWYgKGFOdW0ubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtSGV4ID0gJyMnXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFOdW0ubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBudW1IZXggKz0gKGFOdW1baV0gKyBhTnVtW2ldKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bUhleFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSlPpopzoibLljYHlha3ov5vliLbovazmjaLkuLpyZ2LmiJZyZ2JhLOi/lOWbnueahOagvOW8j+S4uiByZ2Jh77yIMjU177yMMjU177yMMjU177yMMC4177yJ5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgPFN0cmluZz4g6aKc6Imy5YC877yM5Y+q6IO9aGV45oiW6ICFcmdiYeagvOW8j1xyXG4gICAgICogQHBhcmFtIG9wYWNpdHkgPE51bWJlcj4g5LiN6YCP5piO5bqm5YC877yM5Y+W5YC85Li6MC0x5LmL6Ze0XHJcbiAgICAgKi9cclxuICAgIENvbG9yLnByb3RvdHlwZS5jb2xvclRvUmdiYSA9IGZ1bmN0aW9uIChjb2xvcjogc3RyaW5nLCBvcGFjaXR5OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbG9yID0gdGhpcy5yZ2JUb0hleChjb2xvcik7XHJcbiAgICAgICAgLy8g5Y2B5YWt6L+b5Yi26aKc6Imy5YC855qE5q2j5YiZ6KGo6L6+5byPXHJcbiAgICAgICAgY29uc3QgcmVnID0gL14jKFswLTlhLWZBLWZdezN9fFswLTlhLWZBLWZdezZ9KSQvXHJcbiAgICAgICAgLyogMTbov5vliLbpopzoibLovazkuLpSR0LmoLzlvI8gKi9cclxuICAgICAgICBsZXQgc0NvbG9yID0gU3RyaW5nKGNvbG9yKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChzQ29sb3IgJiYgcmVnLnRlc3Qoc0NvbG9yKSkge1xyXG4gICAgICAgICAgICBpZiAoc0NvbG9yLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNDb2xvck5ldyA9ICcjJztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc0NvbG9yTmV3ICs9IHNDb2xvci5zbGljZShpLCBpICsgMSkuY29uY2F0KHNDb2xvci5zbGljZShpLCBpICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc0NvbG9yID0gc0NvbG9yTmV3O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWkhOeQhuWFreS9jeeahOminOiJsuWAvFxyXG4gICAgICAgICAgICBjb25zdCBzQ29sb3JDaGFuZ2UgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA3OyBpICs9IDIpIHtcclxuICAgICAgICAgICAgICAgIHNDb2xvckNoYW5nZS5wdXNoKHBhcnNlSW50KGAweCR7c0NvbG9yLnNsaWNlKGksIGkgKyAyKX1gKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGByZ2JhKCR7c0NvbG9yQ2hhbmdlLmpvaW4oJywnKX0sJHtvcGFjaXR5fHwxfSlgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNDb2xvcjtcclxuICAgIH1cclxufVxyXG4iLCJ2YXIgdGltZTogYW55O1xyXG5cclxuLyoqXHJcbiAqIOmYsuaKllxyXG4gKiBAcGFyYW0gZnVuY1xyXG4gKiBAcGFyYW0gd2FpdFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBEZWJvdW5jZSAoIGZ1bmM6IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIgKSB7XHJcbiAgICBpZih0aW1lKXtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZSlcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJnczogYW55KSB7XHJcbiAgICAgICAgbGV0IF90aGlzOiBhbnkgPSB0aGlzO1xyXG4gICAgICAgIHRpbWUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KF90aGlzLCBhcmdzKTtcclxuICAgICAgICB9LCB3YWl0KVxyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiDmt7HluqblhYvpmoZcclxuICog5Y+v5YWL6ZqG57G75Z6L5YyF5ous77yaU3RyaW5n77yMTnVtYmVy77yMVW5kZWZpbmVk77yMQm9vbGVhbu+8jE51bGzvvIxPYmplY3TvvIxKU09O77yMQXJyYXnvvIxEYXRl77yMUmVnRXhwLEZ1bmN0aW9uXHJcbiAqIEBwYXJhbSBvYmpcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRGVlcENsb25lKG9iajogYW55KTogYW55e1xyXG4gICAgdmFyIHQgPSB0eXBlb2Ygb2JqO1xyXG4gICAgaWYoIE9iamVjdC5pcyh0LCBcInN0cmluZ1wiKSB8fCBPYmplY3QuaXModCwgXCJudW1iZXJcIikgfHwgT2JqZWN0LmlzKHQsIFwidW5kZWZpbmVkXCIpIHx8IE9iamVjdC5pcyh0LCBcImJvb2xlYW5cIikgfHwgT2JqZWN0LmlzKHQsIFwiZnVuY3Rpb25cIikgfHwgT2JqZWN0LmlzKG9iaixudWxsKSl7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0gZWxzZSBpZiAoIE9iamVjdC5pcyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSwgXCJbb2JqZWN0IERhdGVdXCIpICl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG9iai5nZXRUaW1lKCkpXHJcbiAgICB9IGVsc2UgaWYgKCBPYmplY3QuaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaiksIFwiW29iamVjdCBSZWdFeHBdXCIpICl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAob2JqKVxyXG4gICAgfSBlbHNlIGlmICggQXJyYXkuaXNBcnJheShvYmopICkge1xyXG4gICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8b2JqLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKERlZXBDbG9uZShvYmpbaV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IHt9O1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJlc1trZXldID0gRGVlcENsb25lKG9ialtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbn1cclxuIiwidmFyIERlZXBDbG9uZSA9IHJlcXVpcmUoXCIuLi9EZWVwQ2xvbmUvRGVlcENsb25lXCIpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERlZXBNZXJnZSh0YXJnZXQ6IG9iamVjdCwgc291cmNlOiBvYmplY3QpOiBhbnkge1xyXG4gICAgdGFyZ2V0ID0gbmV3IERlZXBDbG9uZSh0YXJnZXQpXHJcbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHJldHVybiBmYWxzZVxyXG4gICAgZm9yIChjb25zdCBwcm9wIGluIHNvdXJjZSkge1xyXG4gICAgICAgIGlmICghc291cmNlLmhhc093blByb3BlcnR5KHByb3ApKSBjb250aW51ZVxyXG4gICAgICAgIGlmIChwcm9wIGluIHRhcmdldCkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRhcmdldFtwcm9wXS5jb25jYXQpXHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcF0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBzb3VyY2VbcHJvcF1cclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc291cmNlW3Byb3BdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gc291cmNlW3Byb3BdXHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0W3Byb3BdID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0W3Byb3BdLmNvbmNhdCAmJiBzb3VyY2VbcHJvcF0uY29uY2F0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB0YXJnZXRbcHJvcF0uY29uY2F0KHNvdXJjZVtwcm9wXSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IERlZXBNZXJnZSh0YXJnZXRbcHJvcF0sIHNvdXJjZVtwcm9wXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gc291cmNlW3Byb3BdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldFxyXG59XHJcbiIsIi8qKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuIHV1aWTnmoTplb/luqZcclxuICogQHBhcmFtIHtCb29sZWFufSBmaXJzdFUg5bCG6L+U5Zue55qE6aaW5a2X5q+N572u5Li6XCJrbFwiXHJcbiAqIEBwYXJhbSB7TnVibWVyfSByYWRpeCDnlJ/miJB1dWlk55qE5Z+65pWwKOaEj+WRs+edgOi/lOWbnueahOWtl+espuS4sumDveaYr+i/meS4quWfuuaVsCksMi3kuozov5vliLYsOC3lhavov5vliLYsMTAt5Y2B6L+b5Yi2LDE2LeWNgeWFrei/m+WItlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBHdWlkKCkge1xyXG4gICAgR3VpZC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGxlbiA9IDMyLCBmaXJzdFUgPSB0cnVlLCByYWRpeDogbnVtYmVyKTogc3RyaW5ne1xyXG4gICAgICAgIHJhZGl4ID0gcmFkaXh8fG51bGw7XHJcbiAgICAgICAgY29uc3QgY2hhcnM6QXJyYXk8c3RyaW5nPiA9ICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicuc3BsaXQoJycpXHJcbiAgICAgICAgY29uc3QgdXVpZDpBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgcmFkaXggPSByYWRpeCB8fCBjaGFycy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGxlbikge1xyXG4gICAgICAgICAgICAvLyDlpoLmnpzmjIflrpp1dWlk6ZW/5bqmLOWPquaYr+WPlumaj+acuueahOWtl+espiwwfHjkuLrkvY3ov5Dnrpcs6IO95Y675o6JeOeahOWwj+aVsOS9jSzov5Tlm57mlbTmlbDkvY1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykgdXVpZFtpXSA9IGNoYXJzWzAgfCBNYXRoLnJhbmRvbSgpICogcmFkaXhdXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJcclxuICAgICAgICAgICAgLy8gcmZjNDEyMuagh+WHhuimgeaxgui/lOWbnueahHV1aWTkuK0s5p+Q5Lqb5L2N5Li65Zu65a6a55qE5a2X56ymXHJcbiAgICAgICAgICAgIHV1aWRbOF0gPSB1dWlkWzEzXSA9IHV1aWRbMThdID0gdXVpZFsyM10gPSAnLSc7XHJcbiAgICAgICAgICAgIHV1aWRbMTRdID0gJzQnO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzNjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXV1aWRbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByID0gMCB8IE1hdGgucmFuZG9tKCkgKiAxNjtcclxuICAgICAgICAgICAgICAgICAgICB1dWlkW2ldID0gY2hhcnNbKGkgPT0gMTkpID8gKHIgJiAweDMpIHwgMHg4IDogcl1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnp7vpmaTnrKzkuIDkuKrlrZfnrKYs5bm255Sodeabv+S7oyzlm6DkuLrnrKzkuIDkuKrlrZfnrKbkuLrmlbDlgLzml7Ys6K+lZ3V1aWTkuI3og73nlKjkvZxpZOaIluiAhWNsYXNzXHJcbiAgICAgICAgaWYgKGZpcnN0VSkge1xyXG4gICAgICAgICAgICB1dWlkLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBga2wke3V1aWQuam9pbignJyl9YFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXVpZC5qb2luKCcnKVxyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5cclxuLyogZ2xvYmFsIGRlZmluZSAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnXHJcblxyXG4vKlxyXG4qIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcclxuKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxyXG4qL1xyXG5mdW5jdGlvbiBzYWZlQWRkICh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdmFyIGxzdyA9ICh4ICYgMHhmZmZmKSArICh5ICYgMHhmZmZmKVxyXG4gICAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpXHJcbiAgICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhmZmZmKVxyXG59XHJcblxyXG4vKlxyXG4qIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cclxuKi9cclxuZnVuY3Rpb24gYml0Um90YXRlTGVmdCAobnVtOiBudW1iZXIsIGNudDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSlcclxufVxyXG5cclxuLypcclxuKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxyXG4qL1xyXG5mdW5jdGlvbiBtZDVjbW4gKHE6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIsIHg6IG51bWJlciwgczogbnVtYmVyLCB0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBzYWZlQWRkKGJpdFJvdGF0ZUxlZnQoc2FmZUFkZChzYWZlQWRkKGEsIHEpLCBzYWZlQWRkKHgsIHQpKSwgcyksIGIpXHJcbn1cclxuZnVuY3Rpb24gbWQ1ZmYgKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIsIGQ6IG51bWJlciwgeDogbnVtYmVyLCBzOiBudW1iZXIsIHQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG1kNWNtbigoYiAmIGMpIHwgKH5iICYgZCksIGEsIGIsIHgsIHMsIHQpXHJcbn1cclxuZnVuY3Rpb24gbWQ1Z2cgKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIsIGQ6IG51bWJlciwgeDogbnVtYmVyLCBzOiBudW1iZXIsIHQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG1kNWNtbigoYiAmIGQpIHwgKGMgJiB+ZCksIGEsIGIsIHgsIHMsIHQpXHJcbn1cclxuZnVuY3Rpb24gbWQ1aGggKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIsIGQ6IG51bWJlciwgeDogbnVtYmVyLCBzOiBudW1iZXIsIHQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG1kNWNtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpXHJcbn1cclxuZnVuY3Rpb24gbWQ1aWkgKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIsIGQ6IG51bWJlciwgeDogbnVtYmVyLCBzOiBudW1iZXIsIHQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpXHJcbn1cclxuXHJcbi8qXHJcbiogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cclxuKi9cclxuZnVuY3Rpb24gYmlubE1ENSAoeDogYW55LCBsZW46IG51bWJlcikge1xyXG4gICAgLyogYXBwZW5kIHBhZGRpbmcgKi9cclxuICAgIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKGxlbiAlIDMyKVxyXG4gICAgeFsoKGxlbiArIDY0KSA+Pj4gOSA8PCA0KSArIDE0XSA9IGxlblxyXG5cclxuICAgIHZhciBpXHJcbiAgICB2YXIgb2xkYVxyXG4gICAgdmFyIG9sZGJcclxuICAgIHZhciBvbGRjXHJcbiAgICB2YXIgb2xkZFxyXG4gICAgdmFyIGEgPSAxNzMyNTg0MTkzXHJcbiAgICB2YXIgYiA9IC0yNzE3MzM4NzlcclxuICAgIHZhciBjID0gLTE3MzI1ODQxOTRcclxuICAgIHZhciBkID0gMjcxNzMzODc4XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XHJcbiAgICAgICAgb2xkYSA9IGFcclxuICAgICAgICBvbGRiID0gYlxyXG4gICAgICAgIG9sZGMgPSBjXHJcbiAgICAgICAgb2xkZCA9IGRcclxuXHJcbiAgICAgICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaV0sIDcsIC02ODA4NzY5MzYpXHJcbiAgICAgICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDFdLCAxMiwgLTM4OTU2NDU4NilcclxuICAgICAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE3LCA2MDYxMDU4MTkpXHJcbiAgICAgICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApXHJcbiAgICAgICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA3LCAtMTc2NDE4ODk3KVxyXG4gICAgICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA1XSwgMTIsIDEyMDAwODA0MjYpXHJcbiAgICAgICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpXHJcbiAgICAgICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDddLCAyMiwgLTQ1NzA1OTgzKVxyXG4gICAgICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNywgMTc3MDAzNTQxNilcclxuICAgICAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgOV0sIDEyLCAtMTk1ODQxNDQxNylcclxuICAgICAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKVxyXG4gICAgICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2MilcclxuICAgICAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA3LCAxODA0NjAzNjgyKVxyXG4gICAgICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpXHJcbiAgICAgICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKVxyXG4gICAgICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAxMjM2NTM1MzI5KVxyXG5cclxuICAgICAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApXHJcbiAgICAgICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDZdLCA5LCAtMTA2OTUwMTYzMilcclxuICAgICAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgNjQzNzE3NzEzKVxyXG4gICAgICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMilcclxuICAgICAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgNV0sIDUsIC03MDE1NTg2OTEpXHJcbiAgICAgICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDEwXSwgOSwgMzgwMTYwODMpXHJcbiAgICAgICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpXHJcbiAgICAgICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDRdLCAyMCwgLTQwNTUzNzg0OClcclxuICAgICAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgOV0sIDUsIDU2ODQ0NjQzOClcclxuICAgICAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MClcclxuICAgICAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgM10sIDE0LCAtMTg3MzYzOTYxKVxyXG4gICAgICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA4XSwgMjAsIDExNjM1MzE1MDEpXHJcbiAgICAgICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpXHJcbiAgICAgICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDJdLCA5LCAtNTE0MDM3ODQpXHJcbiAgICAgICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNCwgMTczNTMyODQ3MylcclxuICAgICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpXHJcblxyXG4gICAgICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OClcclxuICAgICAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgOF0sIDExLCAtMjAyMjU3NDQ2MylcclxuICAgICAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgMTgzOTAzMDU2MilcclxuICAgICAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KVxyXG4gICAgICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNCwgLTE1MzA5OTIwNjApXHJcbiAgICAgICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDRdLCAxMSwgMTI3Mjg5MzM1MylcclxuICAgICAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKVxyXG4gICAgICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MClcclxuICAgICAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCA0LCA2ODEyNzkxNzQpXHJcbiAgICAgICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKVxyXG4gICAgICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTYsIC03MjI1MjE5NzkpXHJcbiAgICAgICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDZdLCAyMywgNzYwMjkxODkpXHJcbiAgICAgICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KVxyXG4gICAgICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KVxyXG4gICAgICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCA1MzA3NDI1MjApXHJcbiAgICAgICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSlcclxuXHJcbiAgICAgICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaV0sIDYsIC0xOTg2MzA4NDQpXHJcbiAgICAgICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDddLCAxMCwgMTEyNjg5MTQxNSlcclxuICAgICAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpXHJcbiAgICAgICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KVxyXG4gICAgICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDYsIDE3MDA0ODU1NzEpXHJcbiAgICAgICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDNdLCAxMCwgLTE4OTQ5ODY2MDYpXHJcbiAgICAgICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKVxyXG4gICAgICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxXSwgMjEsIC0yMDU0OTIyNzk5KVxyXG4gICAgICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNiwgMTg3MzMxMzM1OSlcclxuICAgICAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KVxyXG4gICAgICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTUsIC0xNTYwMTk4MzgwKVxyXG4gICAgICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAxMzA5MTUxNjQ5KVxyXG4gICAgICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNiwgLTE0NTUyMzA3MClcclxuICAgICAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpXHJcbiAgICAgICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNSwgNzE4Nzg3MjU5KVxyXG4gICAgICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA5XSwgMjEsIC0zNDM0ODU1NTEpXHJcblxyXG4gICAgICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpXHJcbiAgICAgICAgYiA9IHNhZmVBZGQoYiwgb2xkYilcclxuICAgICAgICBjID0gc2FmZUFkZChjLCBvbGRjKVxyXG4gICAgICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gW2EsIGIsIGMsIGRdXHJcbn1cclxuXHJcbi8qXHJcbiogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGEgc3RyaW5nXHJcbiovXHJcbmZ1bmN0aW9uIGJpbmwycnN0ciAoaW5wdXQ6IHN0cmluZyB8IGFueVtdKSB7XHJcbiAgICB2YXIgaVxyXG4gICAgdmFyIG91dHB1dCA9ICcnXHJcbiAgICB2YXIgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMlxyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDMyOyBpICs9IDgpIHtcclxuICAgICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoaW5wdXRbaSA+PiA1XSA+Pj4gKGkgJSAzMikpICYgMHhmZilcclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXRcclxufVxyXG5cclxuLypcclxuKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXHJcbiogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXHJcbiovXHJcbmZ1bmN0aW9uIHJzdHIyYmlubCAoaW5wdXQ6IHN0cmluZykge1xyXG4gICAgdmFyIGlcclxuICAgIHZhciBvdXRwdXQgPSBbXVxyXG4gICAgb3V0cHV0WyhpbnB1dC5sZW5ndGggPj4gMikgLSAxXSA9IHVuZGVmaW5lZFxyXG4gICAgZm9yIChpID0gMDsgaSA8IG91dHB1dC5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIG91dHB1dFtpXSA9IDBcclxuICAgIH1cclxuICAgIHZhciBsZW5ndGg4ID0gaW5wdXQubGVuZ3RoICogOFxyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDg7IGkgKz0gOCkge1xyXG4gICAgICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dC5jaGFyQ29kZUF0KGkgLyA4KSAmIDB4ZmYpIDw8IChpICUgMzIpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0XHJcbn1cclxuXHJcbi8qXHJcbiogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYSByYXcgc3RyaW5nXHJcbiovXHJcbmZ1bmN0aW9uIHJzdHJNRDUgKHM6IGFueSkge1xyXG4gICAgcmV0dXJuIGJpbmwycnN0cihiaW5sTUQ1KHJzdHIyYmlubChzKSwgcy5sZW5ndGggKiA4KSlcclxufVxyXG5cclxuLypcclxuKiBDYWxjdWxhdGUgdGhlIEhNQUMtTUQ1LCBvZiBhIGtleSBhbmQgc29tZSBkYXRhIChyYXcgc3RyaW5ncylcclxuKi9cclxuZnVuY3Rpb24gcnN0ckhNQUNNRDUgKGtleTogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgIHZhciBpXHJcbiAgICB2YXIgYmtleSA9IHJzdHIyYmlubChrZXkpXHJcbiAgICB2YXIgaXBhZCA9IFtdXHJcbiAgICB2YXIgb3BhZCA9IFtdXHJcbiAgICB2YXIgaGFzaFxyXG4gICAgaXBhZFsxNV0gPSBvcGFkWzE1XSA9IHVuZGVmaW5lZFxyXG4gICAgaWYgKGJrZXkubGVuZ3RoID4gMTYpIHtcclxuICAgICAgICBia2V5ID0gYmlubE1ENShia2V5LCBrZXkubGVuZ3RoICogOClcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7XHJcbiAgICAgICAgaXBhZFtpXSA9IGJrZXlbaV0gXiAweDM2MzYzNjM2XHJcbiAgICAgICAgb3BhZFtpXSA9IGJrZXlbaV0gXiAweDVjNWM1YzVjXHJcbiAgICB9XHJcbiAgICBoYXNoID0gYmlubE1ENShpcGFkLmNvbmNhdChyc3RyMmJpbmwoZGF0YSkpLCA1MTIgKyBkYXRhLmxlbmd0aCAqIDgpXHJcbiAgICByZXR1cm4gYmlubDJyc3RyKGJpbmxNRDUob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDEyOCkpXHJcbn1cclxuXHJcbi8qXHJcbiogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYSBoZXggc3RyaW5nXHJcbiovXHJcbmZ1bmN0aW9uIHJzdHIyaGV4IChpbnB1dDogc3RyaW5nKSB7XHJcbiAgICB2YXIgaGV4VGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnXHJcbiAgICB2YXIgb3V0cHV0ID0gJydcclxuICAgIHZhciB4XHJcbiAgICB2YXIgaVxyXG4gICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgeCA9IGlucHV0LmNoYXJDb2RlQXQoaSlcclxuICAgICAgICBvdXRwdXQgKz0gaGV4VGFiLmNoYXJBdCgoeCA+Pj4gNCkgJiAweDBmKSArIGhleFRhYi5jaGFyQXQoeCAmIDB4MGYpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0XHJcbn1cclxuXHJcbi8qXHJcbiogRW5jb2RlIGEgc3RyaW5nIGFzIHV0Zi04XHJcbiovXHJcbmZ1bmN0aW9uIHN0cjJyc3RyVVRGOCAoaW5wdXQ6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoaW5wdXQpKVxyXG59XHJcblxyXG4vKlxyXG4qIFRha2Ugc3RyaW5nIGFyZ3VtZW50cyBhbmQgcmV0dXJuIGVpdGhlciByYXcgb3IgaGV4IGVuY29kZWQgc3RyaW5nc1xyXG4qL1xyXG5mdW5jdGlvbiByYXdNRDUgKHM6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiByc3RyTUQ1KHN0cjJyc3RyVVRGOChzKSlcclxufVxyXG5mdW5jdGlvbiBoZXhNRDUgKHM6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiByc3RyMmhleChyYXdNRDUocykpXHJcbn1cclxuZnVuY3Rpb24gcmF3SE1BQ01ENSAoazogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiwgZDogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIHJzdHJITUFDTUQ1KHN0cjJyc3RyVVRGOChrKSwgc3RyMnJzdHJVVEY4KGQpKVxyXG59XHJcbmZ1bmN0aW9uIGhleEhNQUNNRDUgKGs6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4sIGQ6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiByc3RyMmhleChyYXdITUFDTUQ1KGssIGQpKVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE1ENSAoKSB7XHJcbiAgICBNRDUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChzdHJpbmc6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4sIGtleTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiwgcmF3OiBhbnkpe1xyXG4gICAgICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgICAgIGlmICghcmF3KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGV4TUQ1KHN0cmluZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmF3TUQ1KHN0cmluZylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyYXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhleEhNQUNNRDUoa2V5LCBzdHJpbmcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByYXdITUFDTUQ1KGtleSwgc3RyaW5nKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBQYXJhbXMoKSB7XHJcbiAgICAvKipcclxuICAgICAqIOWvueixoei9rHVybOWPguaVsFxyXG4gICAgICogQHBhcmFtIGRhdGEg5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gaXNQcmVmaXggaXNQcmVmaXgs5piv5ZCm6Ieq5Yqo5Yqg5LiKXCI/XCJcclxuICAgICAqIEBwYXJhbSBhcnJheUZvcm1hdCDop4TliJkgaW5kaWNlc3xicmFja2V0c3xyZXBlYXR8Y29tbWFcclxuICAgICAqL1xyXG4gICAgUGFyYW1zLnByb3RvdHlwZS5vYmpUb1BhcmFtcyA9IGZ1bmN0aW9uIChkYXRhID0ge30sIGlzUHJlZml4ID0gdHJ1ZSwgYXJyYXlGb3JtYXQgPSAnYnJhY2tldHMnKXtcclxuICAgICAgICBjb25zdCBwcmVmaXggPSBpc1ByZWZpeCA/ICc/JyA6ICcnXHJcbiAgICAgICAgY29uc3QgX3Jlc3VsdCA9IFtdXHJcbiAgICAgICAgaWYgKFsnaW5kaWNlcycsICdicmFja2V0cycsICdyZXBlYXQnLCAnY29tbWEnXS5pbmRleE9mKGFycmF5Rm9ybWF0KSA9PSAtMSkgYXJyYXlGb3JtYXQgPSAnYnJhY2tldHMnXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtrZXldXHJcbiAgICAgICAgICAgIC8vIOWOu+aOieS4uuepuueahOWPguaVsFxyXG4gICAgICAgICAgICBpZiAoWycnLCB1bmRlZmluZWQsIG51bGxdLmluZGV4T2YodmFsdWUpID49IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5aaC5p6c5YC85Li65pWw57uE77yM5Y+m6KGM5aSE55CGXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGUuZy4ge2lkczogWzEsIDIsIDNdfVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChhcnJheUZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2luZGljZXMnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDnu5Pmnpw6IGlkc1swXT0xJmlkc1sxXT0yJmlkc1syXT0zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHQucHVzaChgJHtrZXl9WyR7aX1dPSR7dmFsdWVbaV19YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JyYWNrZXRzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g57uT5p6cOiBpZHNbXT0xJmlkc1tdPTImaWRzW109M1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChfdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHQucHVzaChgJHtrZXl9W109JHtfdmFsdWV9YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDnu5Pmnpw6IGlkcz0xJmlkcz0yJmlkcz0zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKF92YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdC5wdXNoKGAke2tleX09JHtfdmFsdWV9YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdjb21tYSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOe7k+aenDogaWRzPTEsMiwzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb21tYVN0ciA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKF92YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFTdHIgKz0gKGNvbW1hU3RyID8gJywnIDogJycpICsgX3ZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHQucHVzaChgJHtrZXl9PSR7Y29tbWFTdHJ9YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChfdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHQucHVzaChgJHtrZXl9W109JHtfdmFsdWV9YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF9yZXN1bHQucHVzaChgJHtrZXl9PSR7dmFsdWV9YClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX3Jlc3VsdC5sZW5ndGggPyBwcmVmaXggKyBfcmVzdWx0LmpvaW4oJyYnKSA6ICcnXHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUHJvdG90eXBlKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+75Y+W5bGe5oCnXHJcbiAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKi9cclxuICAgIFByb3RvdHlwZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG9iajogb2JqZWN0LCBrZXk6IHN0cmluZyl7XHJcbiAgICAgICAgLy/liKTmlq1rZXnmmK/lkKbkuI3kuLrlrZfnrKbkuLLmiJbogIXkuLrnqbrmlbDnu4RcclxuICAgICAgICBpZih0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCAha2V5IHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlzOiBBcnJheTxzdHJpbmc+ID0ga2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICAgICAgdmFyIHR1cm46IG9iamVjdCA9IHRoaXMudHVybihrZXlzWzBdKTtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB2YXIgcmVzOiBvYmplY3QgPSBPYmplY3QuaXModHVybi50eXBlLFwiYXJyYXlcIik/b2JqW3R1cm4ubmFtZV1bdHVybi5pbmRleF18fHt9Om9ialt0dXJuLm5hbWVdfHx7fTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMTsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdHVybiA9IHRoaXMudHVybihrZXlzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenGtleeS4jeWtmOWcqO+8jOWwsei/lOWbnm51bGxcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXJlc1t0dXJuLm5hbWVdKXJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICByZXMgPSBPYmplY3QuaXModHVybi50eXBlLFwiYXJyYXlcIik/cmVzW3R1cm4ubmFtZV1bdHVybi5pbmRleF18fHt9OnJlc1t0dXJuLm5hbWVdfHx7fVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoaXMudmFsdWUgPSByZXN8fG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN8fG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55bGe5oCnXHJcbiAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcGFyYW0gdmFsXHJcbiAgICAgKi9cclxuICAgIFByb3RvdHlwZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24ob2JqOiBvYmplY3QsIGtleTogc3RyaW5nLCB2YWw6IHN0cmluZykge1xyXG4gICAgICAgIC8v6I635Y+W6ZO+5ZCNXHJcbiAgICAgICAgdmFyIGtleXMgPSBrZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIHZhciB0dXJuO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8a2V5cy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgLy/ojrflj5ZrZXlz57G75Z6LXHJcbiAgICAgICAgICAgIHR1cm4gPSB0aGlzLnR1cm4oa2V5c1tpXSlcclxuICAgICAgICAgICAgLy/lpoLmnpxrZXnkuI3lrZjlnKjvvIzlsLHov5Tlm55mYWxzZe+8m1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGlmKCFvYmpbdHVybi5uYW1lXSlyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIOWmguaenGtleXPplb/luqblsI/kuo7nrYnkuo4x5oiW6ICF5p+l5om+5Yiw5pyA5ZCO5LiA5Liqa2V55pe277yM55u05o6l6LWL5YC8XHJcbiAgICAgICAgICAgIGlmKGtleXMubGVuZ3RoIDw9IDEgfHwga2V5cy5sZW5ndGgtMSA8PSBpKXtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGlmKHR1cm4udHlwZSA9PT0gXCJhcnJheVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmlbDnu4Tmk43kvZxcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqW3R1cm4ubmFtZV1bdHVybi5pbmRleF0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmma7pgJrlr7nosaHmk43kvZxcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqW3R1cm4ubmFtZV0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgaWYodHVybi50eXBlID09PSBcImFycmF5XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaVsOe7hOaTjeS9nFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSAgb2JqW3R1cm4ubmFtZV1bdHVybi5pbmRleF07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaZrumAmuWvueixoeaTjeS9nFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSAgb2JqW3R1cm4ubmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrmlbDnu4TkuIvmoIdcclxuICAgICAqIEBwYXJhbSBrZXlcclxuICAgICAqL1xyXG4gICAgUHJvdG90eXBlLnByb3RvdHlwZS5pcyA9IGZ1bmN0aW9uIChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBrZXkuaW5kZXhPZihcIltcIikgIT09IC0xICYmIGtleS5pbmRleE9mKFwiXVwiKSAhPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaVsOe7hOS4i+agh+WSjGtleSzlkKbliJnnm7TmjqXov5Tlm55rZXlcclxuICAgICAqIEBwYXJhbSBrZXlcclxuICAgICAqL1xyXG4gICAgUHJvdG90eXBlLnByb3RvdHlwZS50dXJuID0gZnVuY3Rpb24gKGtleTogc3RyaW5nKTogb2JqZWN0IHtcclxuICAgICAgICBpZih0aGlzLmlzKGtleSkpe1xyXG4gICAgICAgICAgICB2YXIgbGVmdCA9IGtleS5zcGxpdChcIltcIik7XHJcbiAgICAgICAgICAgIHZhciByaWdodCA9IGxlZnRbMV0uc3BsaXQoXCJdXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogbGVmdFswXSxcclxuICAgICAgICAgICAgICAgIGluZGV4OiBOdW1iZXIocmlnaHRbMF0pLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJhcnJheVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGtleSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFRlc3QgKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li66aqM6K+B56CBXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg6aqM6K+B56CB5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gbGVuIOmqjOivgeeggemVv+W6pu+8jOS4jeWhq+m7mOiupOS4ujbkvY3mlbBcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5jb2RlID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcsIGxlbjogbnVtYmVyKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChgXlxcXFxkeyR7bGVufHw2fX0kYCkudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrmlbDnu4RcclxuICAgICAqIEBwYXJhbSBhcnJheSDmlbDnu4RcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5hcnJheSA9IGZ1bmN0aW9uIChhcnJheTogQXJyYXk8YW55Pik6Ym9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5pcyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyYXkpLCAnW29iamVjdCBBcnJheV0nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4umpzb27lrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBqc29uXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuanNvblN0cmluZyA9IGZ1bmN0aW9uIChqc29uOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZighT2JqZWN0LmlzKHR5cGVvZiBqc29uLCAnc3RyaW5nJykpcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBvYmo6IG9iamVjdCA9IEpTT04ucGFyc2UoanNvbik7XHJcbiAgICAgICAgICAgIGlmKE9iamVjdC5pcyh0eXBlb2Ygb2JqICwgJ29iamVjdCcpICYmIG9iail7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65pyJ5pWI5YC855qEanNvblxyXG4gICAgICogQHBhcmFtIGpzb25cclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5qc29uID0gZnVuY3Rpb24gKGpzb246IG9iamVjdCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYoT2JqZWN0LmlzKHR5cGVvZiBqc29uLCAnb2JqZWN0Jykpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5qc29uU3RyaW5nKEpTT04uc3RyaW5naWZ5KGpzb24pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuS4uuWvueixoVxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLm9iamVjdCA9IGZ1bmN0aW9uIChvYmplY3Q6IG9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCksICdbb2JqZWN0IE9iamVjdF0nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuS4uumCrueuseWPt1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuZW1haWwgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeXFxcXHcrKCgtXFxcXHcrKXwoXFxcXC5cXFxcdyspKSpcXFxcQFtBLVphLXowLTldKygoXFxcXC58LSlbQS1aYS16MC05XSspKlxcXFwuW0EtWmEtejAtOV0rJCcpLnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5Li65omL5py65Y+3XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5waG9uZSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXjFbMjM0NTY3ODldXFxcXGR7OX0kJykudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLpVUkxcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLnVybCA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXigoaHR0cHN8aHR0cHxmdHB8cnRzcHxtbXMpOlxcXFwvXFxcXC8pKChbMC05YS16QS1aXyF+KlxcJygpLiY9KyQlLV0rOiApP1swLTlhLXpBLVpfIX4qXFwnKCkuJj0rJCUtXStAKT8oKFswLTldezEsM30uKXszfVswLTldezEsM318KFswLTlhLXpBLVpfIX4qXFwnKCktXSsuKSooWzAtOWEtekEtWl1bMC05YS16QS1aLV17MCw2MX0pP1swLTlhLXpBLVpdLlthLXpBLVpdezIsNn0pKDpbMC05XXsxLDR9KT8oKFxcXFwvPyl8KFxcXFwvWzAtOWEtekEtWl8hfipcXCcoKS47PzpAJj0rJCwlIy1dKykrXFxcXC8/KSQnKS50ZXN0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuS4uuepulxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbiAodmFsdWU6IGFueSk6IGJvb2xlYW57XHJcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcclxuICAgICAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUucmVwbGFjZSgvKF5bIFxcdFxcblxccl0qKXwoWyBcXHRcXG5cXHJdKiQpL2csICcnKS5sZW5ndGggPT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gMCB8fCBpc05hTih2YWx1ZSkpIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrmma7pgJrml6XmnJ9cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmRhdGUgPSBmdW5jdGlvbiAodmFsdWU6IGFueSk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgLy8g5Yik5pat5piv5ZCm5pWw5YC85oiW6ICF5a2X56ym5Liy5pWw5YC8KOaEj+WRs+edgOS4uuaXtumXtOaIsynvvIzovazkuLrmlbDlgLzvvIzlkKbliJluZXcgRGF0ZeaXoOazleivhuWIq+Wtl+espuS4suaXtumXtOaIs1xyXG4gICAgICAgIGlmICh0aGlzLm51bWJlcih2YWx1ZSkpIHZhbHVlID0gK3ZhbHVlO1xyXG4gICAgICAgIHJldHVybiAhL0ludmFsaWR8TmFOLy50ZXN0KG5ldyBEYXRlKHZhbHVlKS50b1N0cmluZygpKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65Y2B6L+b5Yi25pWw5YC8XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5udW1iZXIgPSBmdW5jdGlvbiAodmFsdWU6IGFueSk6IGJvb2xlYW57XHJcbiAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXltcXFxcKy1dPyhcXFxcZCtcXFxcLj9cXFxcZCp8XFxcXC5cXFxcZCt8XFxcXGRcXFxcLlxcXFxkK2VcXFxcK1xcXFxkKykkJykudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrouqvku73or4Hlj7dcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmlkQ2FyZCA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeWzEtOV1cXFxcZHs1fVsxLTldXFxcXGR7M30oKDBcXFxcZCl8KDFbMC0yXSkpKChbMHwxfDJdXFxcXGQpfDNbMC0xXSlcXFxcZHszfShbMC05XXxYKSQnKS50ZXN0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uui9pueJjOWPt1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuY2FyTm8gPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgLy8g5paw6IO95rqQ6L2m54mMXHJcbiAgICAgICAgY29uc3QgeHJlZyA9IC9eW+S6rOa0peayqua4neWGgOixq+S6kei+vem7kea5mOealumygeaWsOiLj+a1mei1o+mEguahgueUmOaZi+iSmemZleWQiemXvei0teeypOmdkuiXj+W3neWugeeQvOS9v+mihkEtWl17MX1bQS1aXXsxfSgoWzAtOV17NX1bREZdJCl8KFtERl1bQS1ISi1OUC1aMC05XVswLTldezR9JCkpL1xyXG4gICAgICAgIC8vIOaXp+i9pueJjFxyXG4gICAgICAgIGNvbnN0IGNyZWcgPSAvXlvkuqzmtKXmsqrmuJ3lhoDosavkupHovr3pu5HmuZjnmpbpsoHmlrDoi4/mtZnotaPphILmoYLnlJjmmYvokpnpmZXlkInpl73otLXnsqTpnZLol4/lt53lroHnkLzkvb/pooZBLVpdezF9W0EtWl17MX1bQS1ISi1OUC1aMC05XXs0fVtBLUhKLU5QLVowLTnmjILlraborabmuK/mvrNdezF9JC9cclxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSA3KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVnLnRlc3QodmFsdWUpXHJcbiAgICAgICAgfSBpZiAodmFsdWUubGVuZ3RoID09PSA4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4cmVnLnRlc3QodmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li66YeR6aKdXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5hbW91bnQgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ15bMS05XVxcXFxkKigsXFxcXGR7M30pKihcXFxcLlxcXFxkezEsMn0pPyR8XjBcXFxcLlxcXFxkezEsMn0kJykudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrkuK3mlofvvIjmsYnlrZfvvIlcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmNoaW5lc2UgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgY29uc3QgcmVnID0gL15bXFx1NGUwMC1cXHU5ZmE1XSskL2dpO1xyXG4gICAgICAgIHJldHVybiByZWcudGVzdCh2YWx1ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uuiLseaWh+Wtl+avjVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUubGV0dGVyID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeW2EtekEtWl0qJCcpLnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65a2X5q+N5oiW6ICF5pWw5a2XXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5lbk9yTnVtID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLm51bWJlcih2YWx1ZSkgfHwgdGhpcy5sZXR0ZXIodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5YyF5ZCr5p+Q5Liq5YC877yI5aaC5p6c5Li6b2JqZWN077yM6buY6K6k5Yik5pat5p+Q5Liqa2V55piv5ZCm5a2Y5Zyo77yM5aaC5p6c6ZyA6KaB5Yik5pat5YC877yMaXNWYWx1ZSA9IHRydWUg5Y2z5Y+v77yJXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEBwYXJhbSBwYXJhbVxyXG4gICAgICogQHBhcmFtIGlzVmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uICh2YWx1ZTogYW55LCBwYXJhbTogYW55LCBpc1ZhbHVlOiBib29sZWFuKTogYm9vbGVhbntcclxuICAgICAgICAvL+WIpOaWreaYr+WQpuS4uuaVsOe7hFxyXG4gICAgICAgIGlmKHRoaXMuYXJyYXkodmFsdWUpKXtcclxuICAgICAgICAgICAgZm9yICh2YXIgaT0wO2k8dmFsdWUubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZihPYmplY3QuaXModmFsdWVbaV0sIHBhcmFtKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vYmplY3QodmFsdWUpKXtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpc1ZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWreWAvFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKE9iamVjdC5pcyh2YWx1ZVtrZXldLCBwYXJhbSkpcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pata2V5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoT2JqZWN0LmlzKGtleSwgcGFyYW0pKXJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihwYXJhbSkgPj0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4HkuIDkuKrlgLzojIPlm7RbbWluLCBtYXhdXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEBwYXJhbSBwYXJhbVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLnJhbmdlID0gZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIsIHBhcmFtOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID49IHBhcmFtWzBdICYmIHZhbHVlIDw9IHBhcmFtWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B5LiA5Liq6ZW/5bqm6IyD5Zu0W21pbiwgbWF4XVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1cclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5yYW5nZUxlbmd0aCA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nLCBwYXJhbTogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPj0gcGFyYW1bMF0gJiYgdmFsdWUubGVuZ3RoIDw9IHBhcmFtWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65Ye95pWw5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5mdW5jID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbidcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4unByb21pc2Xlr7nosaFcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbiAodmFsdWU6IGFueSk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5pcyh0eXBlb2YgdmFsdWUsXCJvYmplY3RcIikgJiYgdGhpcy5mdW5jKHZhbHVlLnRoZW4pICYmIHRoaXMuZnVuYyh2YWx1ZS5jYXRjaCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrlm77niYfmoLzlvI9cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmltYWdlID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIGNvbnN0IElNQUdFX1JFR0VYUCA9IC9cXC4oanBlZ3xqcGd8Z2lmfHBuZ3xzdmd8d2VicHxqZmlmfGJtcHxkcGcpL2k7XHJcbiAgICAgICAgcmV0dXJuIElNQUdFX1JFR0VYUC50ZXN0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uuinhumikeagvOW8j1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUudmlkZW8gPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgY29uc3QgVklERU9fUkVHRVhQID0gL1xcLihtcDR8bXBnfG1wZWd8ZGF0fGFzZnxhdml8cm18cm12Ynxtb3Z8d212fGZsdnxta3YpL2k7XHJcbiAgICAgICAgcmV0dXJuIFZJREVPX1JFR0VYUC50ZXN0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuS4uuato+WImeWvueixoVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUucmVnRXhwID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBSZWdFeHBdJ1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwidmFyIHZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG4vKipcclxuICogQVBJLuiKgua1gVxyXG4gKiBAcGFyYW0gZnVuY1xyXG4gKiBAcGFyYW0gd2FpdFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUaHJvdHRsZShmdW5jOiBGdW5jdGlvbix3YWl0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiguLi5hcmdzOiBhbnkpe1xyXG4gICAgICAgIGlmKCF2YWxpZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZnVuYy5hcHBseShfdGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgIHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9LHdhaXQpXHJcbiAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUaW1lKCl7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor6Xlh73mlbDlv4XpobvkvKDlhaXnrKzkuIDkuKrlj4LmlbDvvIzmoLzlvI/kuLrku7vkvZXlkIjms5XnmoTml7bpl7TmoLzlvI/jgIHnp5LmiJbmr6vnp5LnmoTml7bpl7TmiLPvvIznrKzkuozkuKrlj4LmlbDmmK/lj6/pgInnmoTvvIzov5Tlm57nmoTlgLznsbvkvLzliJrliJrvvIwyNeWIhumSn+WJje+8jDPlsI/ml7bliY3vvIw35aSp5YmN55qE57uT5p6c44CCIOWmguaenOesrOS6jOS4quWPguaVsOaYr+aXtumXtOeahOagvOW8j++8jOW9k+WJjeWSjOS8oOWFpeaXtumXtOaIs+ebuOW3ruWkp+S6juS4gOS4quaciOaXtu+8jOi/lOWbnuagvOW8j+WMluWlveeahOaXtumXtO+8m+WmguaenOesrOS6jOS4quWPguaVsOS4umZhbHNl77yM5YiZ5LiN5Lya6L+U5Zue5qC85byP5YyW5aW955qE5pe26Ze077yM6ICM5piv6K+45aaCXCJ4eHjlubTliY1cIueahOe7k+aenOOAglxyXG4gICAgICogdGltZXN0YW1wIDxTdHJpbmc+IOaXtumXtOaIs1xyXG4gICAgICogZm9ybWF0IDxTdHJpbmcgLyBmYWxzZT4g5pe26Ze05qC85byP77yM6buY6K6k5Li6eXl5eS1tbS1kZO+8jOW5tOS4ulwieXl5eVwi77yM5pyI5Li6XCJtbVwi77yM5pel5Li6XCJkZFwi77yM5pe25Li6XCJoaFwi77yM5YiG5Li6XCJNTVwi77yM56eS5Li6XCJzc1wi77yM5qC85byP5Y+v5Lul6Ieq55Sx5pCt6YWN77yM5aaC77yaIHl5eXk6bW06ZGTvvIx5eXl5LW1tLWRk77yMeXl5eeW5tG1t5pyIZGTml6XvvIx5eXl55bm0bW3mnIhkZOaXpSBoaOaXtk1N5YiGc3Pnp5LvvIx5eXl5L21tL2RkL++8jE1NOnNz562J57uE5ZCI44CCIOWmguaenOaXtumXtOaIs+i3neemu+atpOaXtueahOaXtumXtO+8jOWkp+S6juS4gOS4quaciO+8jOWImei/lOWbnuS4gOS4quagvOW8j+WMluWlveeahOaXtumXtO+8jOWmguaenOatpOWPguaVsOS4umZhbHNl77yM6L+U5Zue5Z2H5Li6XCLlpJrkuYXkuYvliY1cIueahOe7k+aenOOAglxyXG4gICAgICogQHBhcmFtIGRhdGVUaW1lXHJcbiAgICAgKiBAcGFyYW0gZm10XHJcbiAgICAgKi9cclxuICAgIFRpbWUucHJvdG90eXBlLnRpbWVGb3JtYXQgPSBmdW5jdGlvbiAoZGF0ZVRpbWU6IGFueSwgZm10OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGRhdGVUaW1lID0gZGF0ZVRpbWV8fG51bGw7XHJcbiAgICAgICAgZm10ID0gZm10fHwneXl5eS1tbS1kZCBoaDpNTTpzcyc7XHJcbiAgICAgICAgLy8g5aaC5p6c5Li6bnVsbCzliJnmoLzlvI/ljJblvZPliY3ml7bpl7RcclxuICAgICAgICBpZiAoIWRhdGVUaW1lKSBkYXRlVGltZSA9IE51bWJlcihuZXcgRGF0ZSgpKVxyXG4gICAgICAgIC8vIOWmguaenGRhdGVUaW1l6ZW/5bqm5Li6MTDmiJbogIUxM++8jOWImeS4uuenkuWSjOavq+enkueahOaXtumXtOaIs++8jOWmguaenOi2hei/hzEz5L2N77yM5YiZ5Li65YW25LuW55qE5pe26Ze05qC85byPXHJcbiAgICAgICAgaWYgKGRhdGVUaW1lLnRvU3RyaW5nKCkubGVuZ3RoID09IDEwKSBkYXRlVGltZSAqPSAxMDAwXHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlVGltZSlcclxuICAgICAgICB2YXIgcmV0XHJcbiAgICAgICAgdmFyIG9wdCA9IHtcclxuICAgICAgICAgICAgJ3krJzogZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCksIC8vIOW5tFxyXG4gICAgICAgICAgICAnbSsnOiAoZGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKSwgLy8g5pyIXHJcbiAgICAgICAgICAgICdkKyc6IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCksIC8vIOaXpVxyXG4gICAgICAgICAgICAnaCsnOiBkYXRlLmdldEhvdXJzKCkudG9TdHJpbmcoKSwgLy8g5pe2XHJcbiAgICAgICAgICAgICdNKyc6IGRhdGUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCksIC8vIOWIhlxyXG4gICAgICAgICAgICAncysnOiBkYXRlLmdldFNlY29uZHMoKS50b1N0cmluZygpIC8vIOenklxyXG4gICAgICAgICAgICAvLyDmnInlhbbku5bmoLzlvI/ljJblrZfnrKbpnIDmsYLlj6/ku6Xnu6fnu63mt7vliqDvvIzlv4XpobvovazljJbmiJDlrZfnrKbkuLJcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiBvcHQpIHtcclxuICAgICAgICAgICAgcmV0ID0gbmV3IFJlZ0V4cChgKCR7a30pYCkuZXhlYyhmbXQpXHJcbiAgICAgICAgICAgIGlmIChyZXQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKHJldFsxXSwgKHJldFsxXS5sZW5ndGggPT0gMSkgPyAob3B0W2tdKSA6IChvcHRba10ucGFkU3RhcnQocmV0WzFdLmxlbmd0aCwgJzAnKSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZtdFxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVHJpbSAoKXtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWOu+mZpOepuuagvFxyXG4gICAgICogQHBhcmFtICBzdHIg6ZyA6KaB5Y676Zmk56m65qC855qE5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gIHBvcyBib3RoKOW3puWPsyl8bGVmdHxyaWdodHxhbGwg6buY6K6kYm90aFxyXG4gICAgICovXHJcbiAgICBUcmltLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24gKHN0cjogc3RyaW5nLCBwb3MgPSAnYm90aCcpIHtcclxuICAgICAgICBzdHIgPSBTdHJpbmcoc3RyKVxyXG4gICAgICAgIGlmIChwb3MgPT0gJ2JvdGgnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwb3MgPT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvcyA9PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFxccyokKS9nLCAnJylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvcyA9PSAnYWxsJykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccysvZywgJycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHJcclxuICAgIH1cclxuXHJcbn1cclxuIiwidmFyIFRocm90dGxlID0gcmVxdWlyZShcIi4vVGhyb3R0bGUvVGhyb3R0bGVcIik7XHJcbnZhciBEZWJvdW5jZSA9IHJlcXVpcmUoXCIuL0RlYm91bmNlL0RlYm91bmNlXCIpO1xyXG52YXIgRGVlcENsb25lID0gcmVxdWlyZShcIi4vRGVlcENsb25lL0RlZXBDbG9uZVwiKTtcclxudmFyIERlZXBNZXJnZSA9IHJlcXVpcmUoXCIuL0RlZXBNZXJnZS9EZWVwTWVyZ2VcIik7XHJcbnZhciBQcm90b3R5cGUgPSByZXF1aXJlKFwiLi9Qcm90b3R5cGUvUHJvdG90eXBlXCIpO1xyXG52YXIgVGltZSA9IHJlcXVpcmUoXCIuL1RpbWUvVGltZVwiKTtcclxudmFyIEFycmF5T2JqID0gcmVxdWlyZShcIi4vQXJyYXkvQXJyYXlcIik7XHJcbnZhciBHdWlkID0gcmVxdWlyZShcIi4vR3VpZC9HdWlkXCIpO1xyXG52YXIgQ29sb3IgPSByZXF1aXJlKFwiLi9Db2xvci9Db2xvclwiKTtcclxudmFyIFBhcmFtcyA9IHJlcXVpcmUoXCIuL1BhcmFtcy9QYXJhbXNcIik7XHJcbnZhciBNRDUgPSByZXF1aXJlKFwiLi9NRDUvTUQ1XCIpO1xyXG52YXIgVHJpbSA9IHJlcXVpcmUoXCIuL1RyaW0vVHJpbVwiKTtcclxudmFyIFRlc3QgPSByZXF1aXJlKFwiLi9UZXN0L1Rlc3RcIik7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEFwaSgpIHtcclxuICAgIEFwaS5wcm90b3R5cGUudGhyb3R0bGUgPSBmdW5jdGlvbiAoZnVuYzogRnVuY3Rpb24sIHdhaXQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGhyb3R0bGUoZnVuYywgd2FpdCk7XHJcbiAgICB9O1xyXG4gICAgQXBpLnByb3RvdHlwZS5kZWJvdW5jZSA9IGZ1bmN0aW9uIChmdW5jOiBGdW5jdGlvbiwgd2FpdDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEZWJvdW5jZShmdW5jLCB3YWl0KTtcclxuICAgIH07XHJcbiAgICBBcGkucHJvdG90eXBlLmRlZXBDbG9uZSA9IGZ1bmN0aW9uICh0YXJnZXQ6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGVlcENsb25lKHRhcmdldCk7XHJcbiAgICB9O1xyXG4gICAgQXBpLnByb3RvdHlwZS5kZWVwTWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0OiBvYmplY3QsIHNvdXJjZTogb2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEZWVwTWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xyXG4gICAgfTtcclxuICAgIEFwaS5wcm90b3R5cGUuZ2V0UHJvdG90eXBlID0gZnVuY3Rpb24gKG9iajogb2JqZWN0LCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvdG90eXBlKCkuZ2V0KG9iaiwga2V5KTtcclxuICAgIH07XHJcbiAgICBBcGkucHJvdG90eXBlLnNldFByb3RvdHlwZSA9IGZ1bmN0aW9uIChvYmo6IG9iamVjdCwga2V5OiBzdHJpbmcsIHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm90b3R5cGUoKS5zZXQob2JqLCBrZXksIHZhbCk7XHJcbiAgICB9O1xyXG4gICAgQXBpLnByb3RvdHlwZS50aW1lRm9ybWF0ID0gZnVuY3Rpb24gKGRhdGVUaW1lOiBhbnksIGZtdDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lKCkudGltZUZvcm1hdChkYXRlVGltZSwgZm10KTtcclxuICAgIH07XHJcbiAgICBBcGkucHJvdG90eXBlLnJhbmRvbUFycmF5ID0gZnVuY3Rpb24gKGFycmF5OiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheU9iaigpLnJhbmRvbUFycmF5KGFycmF5KTtcclxuICAgIH07XHJcbiAgICBBcGkucHJvdG90eXBlLmd1aWQgPSBmdW5jdGlvbiAobGVuOiBudW1iZXIsIGZpcnN0VTpib29sZWFuLCByYWRpeDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHdWlkKCkuZ2V0KGxlbixmaXJzdFUscmFkaXgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOminOiJsua4kOWPmFxyXG4gICAgICpcclxuICAgICAqIOivpeWHveaVsOWunueOsOS4pOS4quminOiJsuWAvOS5i+mXtOetieWIhuWPluWAvO+8jOi/lOWbnuS4gOS4quaVsOe7hO+8jOWFg+e0oOS4uuWNgeWFrei/m+WItuW9ouW8j+eahOminOiJsuWAvO+8jOaVsOe7hOmVv+W6puS4unN0ZXDlgLzjgIJcclxuICAgICAqIOS+i+Wmgu+8mmNvbG9yR3JhZGllbnQoJ3JnYigyNTAsIDI1MCwgMjUwKScsICdyZ2IoMjUyLCAyNTIsIDI1MiknLCAzKe+8jOW+l+WIsOeahOe7k+aenOS4ultcIiNmYWZhZmFcIiwgXCIjZmFmYWZhXCIsIFwiI2ZiZmJmYlwiXVxyXG4gICAgICogQHBhcmFtIHN0YXJ0Q29sb3I8U3RyaW5nPiDlvIDlp4vpopzoibLlgLzvvIzlj6/ku6XmmK9IRVjmiJbogIVSR0LpopzoibLlgLzvvIzlpoIjMGFmZGNl5oiW6ICFcmdiKDEyMCwgMTMwLCAxNTApXHJcbiAgICAgKiBAcGFyYW0gZW5kQ29sb3IgPFN0cmluZz4g57uT5p2f6aKc6Imy5YC877yM5Y+v5Lul5pivSEVY5oiW6ICFUkdC6aKc6Imy5YC877yM5aaCIzBhZmRjZeaIluiAhXJnYigxMjAsIDEzMCwgMTUwKVxyXG4gICAgICogQHBhcmFtIHN0ZXAgPE51bWJlcj4g5Z2H5YiG5YC877yM5oqK5byA5aeL5YC85ZKM57uT5p2f5YC85bmz5Z2H5YiG5oiQ5aSa5bCR5Lu9XHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuY29sb3JHcmFkaWVudCA9IGZ1bmN0aW9uIChzdGFydENvbG9yOiBzdHJpbmcsIGVuZENvbG9yOiBzdHJpbmcsIHN0ZXA6IG51bWJlcik6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoKS5jb2xvckdyYWRpZW50KHN0YXJ0Q29sb3IsIGVuZENvbG9yLCBzdGVwKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljYHlha3ov5vliLZIZXjovaxSR0JcclxuICAgICAqXHJcbiAgICAgKiDor6Xlh73mlbDlj6/ku6XlsIbkuIDkuKpIZXjnmoTljYHlha3ov5vliLbpopzoibLlgLzovazmjaLmiJDkuIDkuKpSR0LpopzoibLlgLxcclxuICAgICAqIEBwYXJhbSBzQ29sb3IgPFN0cmluZz4gSEV46aKc6Imy5YC877yM5aaCIzBhZmRjZVxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmhleFRvUmdiID0gZnVuY3Rpb24gKHNDb2xvcjogc3RyaW5nKTogYW55e1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoKS5oZXhUb1JnYihzQ29sb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJHQui9rOWNgeWFrei/m+WItkhleFxyXG4gICAgICog6K+l5Ye95pWw5Y+v5Lul5bCG5LiA5LiqUkdC6aKc6Imy5YC86L2s5o2i5oiQ5LiA5LiqSGV455qE5Y2B5YWt6L+b5Yi26aKc6Imy5YC8XHJcbiAgICAgKiBAcGFyYW0gcmdiIDxTdHJpbmc+IFJHQuminOiJsuWAvO+8jOWmgnJnYigyMzAsIDIzMSwgMjMzKVxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLnJnYlRvSGV4ID0gZnVuY3Rpb24gKHJnYjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbG9yKCkucmdiVG9IZXgocmdiKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpopzoibLpgI/mmI7luqZcclxuICAgICAqIOivpeWHveaVsOWPr+S7peaOpeWPl+S4gOS4quWNgeWFrei/m+WItuaIluiAhXJnYuagvOW8j+eahOminOiJsuWAvCjkuI3og73mjqXlj5flkb3lkI3lvI/popzoibLmoLzlvI/vvIzmr5TlpoJ3aGl0ZSnvvIzov5Tlm57mraTpopzoibLnmoRyZ2Jh5qC85byP5YC8XHJcbiAgICAgKiBAcGFyYW0gY29sb3IgPFN0cmluZz4g6aKc6Imy5YC877yM5Y+q6IO9aGV45oiW6ICFcmdiYeagvOW8j1xyXG4gICAgICogQHBhcmFtIG9wYWNpdHkgPE51bWJlcj4g5LiN6YCP5piO5bqm5YC877yM5Y+W5YC85Li6MC0x5LmL6Ze0XHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuY29sb3JUb1JnYmEgPSBmdW5jdGlvbiAoY29sb3I6IHN0cmluZywgb3BhY2l0eTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbG9yKCkuY29sb3JUb1JnYmEoY29sb3Isb3BhY2l0eSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+56LGh6L2sdXJs5Y+C5pWwXHJcbiAgICAgKlxyXG4gICAgICog6K+l5pa55rOV77yM5Y+v5Lul5bCG5LiA5Liq5a+56LGh5b2i5byP5Y+C5pWw6L2s5o2i5oiQZ2V05Lyg5Y+C5omA6ZyA5Y+C5pWw5b2i5byP77yM5aaC5oqKe25hbWU6ICdsaXNhJywgYWdlOiAyMH3ovazmjaLmiJA/bmFtZT1saXNhJmFnZT0yMFxyXG4gICAgICogQHBhcmFtIGRhdGEg5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gaXNQcmVmaXggaXNQcmVmaXgs5piv5ZCm6Ieq5Yqo5Yqg5LiKXCI/XCJcclxuICAgICAqIEBwYXJhbSBhcnJheUZvcm1hdCDop4TliJkgaW5kaWNlc3xicmFja2V0c3xyZXBlYXR8Y29tbWFcclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5vYmpUb1BhcmFtcyA9IGZ1bmN0aW9uIChkYXRhOiBvYmplY3QsIGlzUHJlZml4OiBib29sZWFuLCBhcnJheUZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBhcmFtcygpLm9ialRvUGFyYW1zKGRhdGEsaXNQcmVmaXgsYXJyYXlGb3JtYXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ENVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzdHJpbmcg6ZyA6KaB5Yqg5a+G55qE5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0ga2V5IOWvhumSpe+8jOWmguaenOS4jeWhq++8jOm7mOiupOS4uiDigJwzMGNlNzFhNzNiZGQ5MDhjMzk1NWE5MGU4Zjc0MjllZuKAnVxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLm1kNSA9IGZ1bmN0aW9uIChzdHJpbmc6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4sIGtleSA9IFwiMzBjZTcxYTczYmRkOTA4YzM5NTVhOTBlOGY3NDI5ZWZcIiwgcmF3ID0gZmFsc2UpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBuZXcgTUQ1KCkuZ2V0KHN0cmluZywga2V5LCByYXcpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOu+mZpOepuuagvFxyXG4gICAgICogQHBhcmFtICBzdHIg6ZyA6KaB5Y676Zmk56m65qC855qE5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gIHBvcyBib3RoKOW3puWPsyl8bGVmdHxyaWdodHxhbGwg6buY6K6kYm90aFxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbiAoc3RyOiBzdHJpbmcsIHBvczogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRyaW0oKS50cmltKHN0ciwgcG9zKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrpqozor4HnoIFcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDpqozor4HnoIHlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBsZW4g6aqM6K+B56CB6ZW/5bqm77yM5LiN5aGr6buY6K6k5Li6NuS9jeaVsFxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNDb2RlID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcsIGxlbjogbnVtYmVyKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5jb2RlKHZhbHVlLCBsZW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuaVsOe7hFxyXG4gICAgICogQHBhcmFtIGFycmF5IOaVsOe7hFxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNBcnJheSA9IGZ1bmN0aW9uIChhcnJheTogQXJyYXk8YW55Pik6Ym9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkuYXJyYXkoYXJyYXkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4umpzb27lrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBqc29uXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0pzb25TdHJpbmcgPSBmdW5jdGlvbiAoanNvbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkuanNvblN0cmluZyhqc29uKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrmnInmlYjlgLznmoRqc29uXHJcbiAgICAgKiBAcGFyYW0ganNvblxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNKc29uID0gZnVuY3Rpb24gKGpzb246IG9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmpzb24oanNvbik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65a+56LGhXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc09iamVjdCA9IGZ1bmN0aW9uIChvYmplY3Q6IG9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLm9iamVjdChvYmplY3QpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uumCrueuseWPt1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0VtYWlsID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5lbWFpbCh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65omL5py65Y+3XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzUGhvbmUgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkucGhvbmUodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4ulVSTFxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc1VybCA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS51cmwodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuepulxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmVtcHR5KHZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrmma7pgJrml6XmnJ9cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNEYXRlID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmRhdGUodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuWNgei/m+WItuaVsOWAvFxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc051bWJlciA9IGZ1bmN0aW9uICh2YWx1ZTogYW55KTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5udW1iZXIodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uui6q+S7veivgeWPt1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0lkQ2FyZCA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5pZENhcmQodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uui9pueJjOWPt1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0Nhck5vID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmNhck5vKHZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrph5Hpop1cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNBbW91bnQgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkuYW1vdW50KHZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrkuK3mlofvvIjmsYnlrZfvvIlcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNDaGluZXNlID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmNoaW5lc2UodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuiLseaWh+Wtl+avjVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0xldHRlciA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5sZXR0ZXIodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuWtl+avjeaIluiAheaVsOWtl1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0VuT3JOdW0gPSBmdW5jdGlvbiAodmFsdWU6IGFueSk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkuZW5Pck51bSh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5YyF5ZCr5p+Q5Liq5YC877yI5aaC5p6c5Li6b2JqZWN077yM6buY6K6k5Yik5pat5p+Q5Liqa2V55piv5ZCm5a2Y5Zyo77yM5aaC5p6c6ZyA6KaB5Yik5pat5YC877yMaXNWYWx1ZSA9IHRydWUg5Y2z5Y+v77yJXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEBwYXJhbSBwYXJhbVxyXG4gICAgICogQHBhcmFtIGlzVmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzQ29udGFpbnMgPSBmdW5jdGlvbiAodmFsdWU6IGFueSwgcGFyYW06IGFueSwgaXNWYWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmNvbnRhaW5zKHZhbHVlLCBwYXJhbSwgaXNWYWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li66aqM6K+B5LiA5Liq5YC86IyD5Zu0W21pbiwgbWF4XVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1cclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzUmFuZ2UgPSBmdW5jdGlvbiAodmFsdWU6IG51bWJlciwgcGFyYW06IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5yYW5nZSh2YWx1ZSwgcGFyYW0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uumqjOivgeS4gOS4qumVv+W6puiMg+WbtFttaW4sIG1heF1cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHBhcmFtXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc1JhbmdlTGVuZ3RoID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcsIHBhcmFtOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkucmFuZ2VMZW5ndGgodmFsdWUsIHBhcmFtKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrlh73mlbDmlrnms5VcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNGdW5jID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmZ1bmModmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4unByb21pc2Xlr7nosaFcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNQcm9taXNlID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLnByb21pc2UodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuWbvueJh+agvOW8j1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0ltYWdlID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmltYWdlKHZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrop4bpopHmoLzlvI9cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNWaWRlbyA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS52aWRlbyh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65q2j5YiZ5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzUmVnRXhwID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLnJlZ0V4cCh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIFN0YWNrOiByZXF1aXJlKFwiLi9zdHJ1Y3R1cmUvU3RhY2svU3RhY2tcIiksXHJcbiAgICBRdWV1ZTogcmVxdWlyZShcIi4vc3RydWN0dXJlL1F1ZXVlL1F1ZXVlXCIpLFxyXG4gICAgTGlua2VkTGlzdDogcmVxdWlyZShcIi4vc3RydWN0dXJlL0xpbmtlZExpc3QvTGlua2VkTGlzdFwiKSxcclxuICAgIERvdWJseUxpbmtlZExpc3Q6IHJlcXVpcmUoXCIuL3N0cnVjdHVyZS9Eb3VibHlMaW5rZWRMaXN0L0RvdWJseUxpbmtlZExpc3RcIiksXHJcbiAgICBBcGk6IHJlcXVpcmUoXCIuL2FwaS9pbmRleFwiKSxcclxuICAgIFV0aWxzOiByZXF1aXJlKFwiLi9VdGlscy9VdGlsc1wiKVxyXG59XHJcblxyXG5cclxuIiwiY29uc3QgTGlua2VkTGlzdCA9IHJlcXVpcmUoXCIuLi9MaW5rZWRMaXN0L0xpbmtlZExpc3RcIik7XHJcblxyXG4vKipcclxuICog5Y+M5ZCR6ZO+6KGoXHJcbiAqXHJcbiAqIHB1c2goZWxlbWVudCnvvJrlkJHpk77ooajlsL7pg6jmt7vliqDkuIDkuKrmlrDlhYPntKDjgIJcclxuICogaW5zZXJ0KGVsZW1lbnQscG9zaXRpb24p77ya5Zyo6ZO+6KGo5oyH5a6a5L2N572u5o+S5YWl5LiA5Liq5paw5YWD57Sg44CCXHJcbiAqIGdldEVsZW1lbnRBdChpbmRleCnvvJrov5Tlm57pk77ooajkuK3nibnlrprkvY3nva7nmoTlhYPntKDvvIzlpoLmnpzmsqHmnInliJnov5Tlm551bmRlZmluZWTjgIJcclxuICogcmVtb3ZlKGVsZW1lbnQp77ya5LuO6ZO+6KGo5Lit56e76Zmk5LiA5Liq5YWD57Sg44CCXHJcbiAqIGluZGV4T2YoZWxlbWVudCnvvJrov5Tlm57lhYPntKDlnKjpk77ooajkuK3nmoTntKLlvJXvvIzlpoLmnpzmsqHmnInliJnov5Tlm54tMeOAglxyXG4gKiByZW1vdmVBdChwb3NpdGlvbinvvJrku47pk77ooajmjIflrprkvY3nva7np7vpmaTkuIDkuKrlhYPntKDjgIJcclxuICogaXNFbXB0eSgp77ya5aaC5p6c6ZO+6KGo5Lit5LiN5YyF5ZCr5Lu75L2V5YWD57Sg77yM5YiZ6L+U5ZuedHJ1Ze+8jOWQpuWImei/lOWbnmZhbHNl44CCXHJcbiAqIHNpemUoKe+8mui/lOWbnumTvuihqOWMheWQq+eahOWFg+e0oOS4quaVsOOAglxyXG4gKiBnZXRIZWFkKCnvvJrov5Tlm57pk77ooajnmoTnrKzkuIDkuKrlhYPntKDjgIJcclxuICogZ2V0SGVhZCgp77ya5riF56m66ZO+6KGo44CCXHJcbiAqIHRvU3RyaW5nKCnvvJrov5Tlm57ooajnpLrmlbTkuKrpk77ooajnmoTlrZfnrKbkuLLjgIJcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIERvdWJseUxpbmtlZExpc3QoKXtcclxuICAgIC8v57uT5bC+5YWD57SgXHJcbiAgICBEb3VibHlMaW5rZWRMaXN0LnByb3RvdHlwZS50YWlsID0gbnVsbDtcclxuICAgIC8v5YaF6YOo57G7XHJcbiAgICBmdW5jdGlvbiBOb2RlKGVsZW1lbnQ6IGFueSl7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLm5leHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJldiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwdXNoKGVsZW1lbnQp77ya5ZCR6ZO+6KGo5bC+6YOo5re75Yqg5LiA5Liq5paw5YWD57Sg44CCXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBEb3VibHlMaW5rZWRMaXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZWxlbWVudDogYW55KXtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgTm9kZShlbGVtZW50KTtcclxuICAgICAgICBpZih0aGlzLmhlYWQpe1xyXG4gICAgICAgICAgICB0aGlzLnRhaWwubmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgIG5vZGUucHJldiA9IHRoaXMudGFpbDtcclxuICAgICAgICAgICAgdGhpcy50YWlsID0gbm9kZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy50YWlsID0gbm9kZTtcclxuICAgICAgICAgICAgdGhpcy5oZWFkID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo6ZO+6KGo5oyH5a6a5L2N572u5o+S5YWl5LiA5Liq5paw5YWD57Sg44CCXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBEb3VibHlMaW5rZWRMaXN0LnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoZWxlbWVudDogYW55LCBwb3NpdGlvbjogbnVtYmVyKXtcclxuICAgICAgICBpZihwb3NpdGlvbiA8IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmNvdW50IDw9IHBvc2l0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBuZXcgTm9kZShlbGVtZW50KTtcclxuICAgICAgICAgICAgaWYocG9zaXRpb24gPT09IDB8fHRoaXMuaGVhZCA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5leHQgPSB0aGlzLmhlYWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWlsID0gbm9kZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5nZXRFbGVtZW50QXQocG9zaXRpb24gLSAxKVxyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBwcmV2aW91cy5uZXh0O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gY3VycmVudDtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC5wcmV2ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIG5vZGUucHJldiA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57ooajnpLrmlbTkuKrpk77ooajnmoTlrZfnrKbkuLJcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIERvdWJseUxpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgaWYodGhpcy5jb3VudD09PTApe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgbGV0IG51bSA9IDA7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLmhlYWQ7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubmV4dCl7XHJcbiAgICAgICAgICAgIHN0ciArPSBgRG91Ymx5TGlua2VkTGlzdDogbmV4dHtlbGVtZW50OiAke2N1cnJlbnQuZWxlbWVudH0sIGluZGV4OiAke251bX19IG5leHQgLS0tLT4gJHtjdXJyZW50Lm5leHQuZWxlbWVudH1cXG5gXHJcbiAgICAgICAgICAgIG51bSArPSAxO1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIgKz0gYERvdWJseUxpbmtlZExpc3Q6IG5leHR7ZWxlbWVudDogJHtjdXJyZW50LmVsZW1lbnR9LCBpbmRleDogJHtudW19fSBuZXh0IC0tLS0+IG51bGxcXG5cXG5cXG5cXG5gXHJcbiAgICAgICAgbGV0IGN1cnJlbnQyID0gdGhpcy50YWlsO1xyXG4gICAgICAgIHdoaWxlKGN1cnJlbnQyLnByZXYpe1xyXG4gICAgICAgICAgICBzdHIgKz0gYERvdWJseUxpbmtlZExpc3Q6IHByZXZ7ZWxlbWVudDogJHtjdXJyZW50Mi5lbGVtZW50fSwgaW5kZXg6ICR7bnVtfX0gcHJldiAtLS0tPiAke2N1cnJlbnQyLnByZXYuZWxlbWVudH1cXG5gXHJcbiAgICAgICAgICAgIG51bSArPSAxO1xyXG4gICAgICAgICAgICBjdXJyZW50MiA9IGN1cnJlbnQyLnByZXY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ciArPSBgRG91Ymx5TGlua2VkTGlzdDogcHJldntlbGVtZW50OiAke2N1cnJlbnQyLmVsZW1lbnR9LCBpbmRleDogJHtudW19fSBwcmV2IC0tLS0+IG51bGxcXG5cXG5cXG5cXG5gXHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxufVxyXG4vL+e7p+aJv+WNleWQkemTvuihqFxyXG5sZXQgbGlua2VkTGlzdCA9IG5ldyBMaW5rZWRMaXN0KCk7XHJcbkRvdWJseUxpbmtlZExpc3QucHJvdG90eXBlID0gbGlua2VkTGlzdC5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XHJcbm1vZHVsZS5leHBvcnRzID0gRG91Ymx5TGlua2VkTGlzdDtcclxuIiwiLyoqXHJcbiAqIOmTvuihqFxyXG4gKlxyXG4gKiBwdXNoKGVsZW1lbnQp77ya5ZCR6ZO+6KGo5bC+6YOo5re75Yqg5LiA5Liq5paw5YWD57Sg44CCXHJcbiAqIGluc2VydChlbGVtZW50LHBvc2l0aW9uKe+8muWcqOmTvuihqOaMh+WumuS9jee9ruaPkuWFpeS4gOS4quaWsOWFg+e0oOOAglxyXG4gKiBnZXRFbGVtZW50QXQoaW5kZXgp77ya6L+U5Zue6ZO+6KGo5Lit54m55a6a5L2N572u55qE5YWD57Sg77yM5aaC5p6c5rKh5pyJ5YiZ6L+U5ZuedW5kZWZpbmVk44CCXHJcbiAqIHJlbW92ZShlbGVtZW50Ke+8muS7jumTvuihqOS4reenu+mZpOS4gOS4quWFg+e0oOOAglxyXG4gKiBpbmRleE9mKGVsZW1lbnQp77ya6L+U5Zue5YWD57Sg5Zyo6ZO+6KGo5Lit55qE57Si5byV77yM5aaC5p6c5rKh5pyJ5YiZ6L+U5ZueLTHjgIJcclxuICogcmVtb3ZlQXQocG9zaXRpb24p77ya5LuO6ZO+6KGo5oyH5a6a5L2N572u56e76Zmk5LiA5Liq5YWD57Sg44CCXHJcbiAqIGlzRW1wdHkoKe+8muWmguaenOmTvuihqOS4reS4jeWMheWQq+S7u+S9leWFg+e0oO+8jOWImei/lOWbnnRydWXvvIzlkKbliJnov5Tlm55mYWxzZeOAglxyXG4gKiBzaXplKCnvvJrov5Tlm57pk77ooajljIXlkKvnmoTlhYPntKDkuKrmlbDjgIJcclxuICogZ2V0SGVhZCgp77ya6L+U5Zue6ZO+6KGo55qE56ys5LiA5Liq5YWD57Sg44CCXHJcbiAqIGdldEhlYWQoKe+8mua4heepuumTvuihqOOAglxyXG4gKiB0b1N0cmluZygp77ya6L+U5Zue6KGo56S65pW05Liq6ZO+6KGo55qE5a2X56ym5Liy44CCXHJcbiAqXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIExpbmtlZExpc3QgKCl7XHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jb3VudCA9IDA7XHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5oZWFkID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBOb2RlIChlbGVtZW50OmFueSl7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLm5leHQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLk5vZGUgPSBOb2RlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR6ZO+6KGo5bC+6YOo5re75Yqg5LiA5Liq5paw5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGVsZW1lbnQ6YW55KXtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdmFyIG5vZGUgPSAgbmV3IE5vZGUoZWxlbWVudCk7XHJcbiAgICAgICAgaWYodGhpcy5oZWFkKXtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmhlYWQ7XHJcbiAgICAgICAgICAgIHdoaWxlKGN1cnJlbnQubmV4dCl7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IG5vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo6ZO+6KGo5oyH5a6a5L2N572u5o+S5YWl5LiA5Liq5paw5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoZWxlbWVudDphbnkscG9zaXRpb246bnVtYmVyKXtcclxuICAgICAgICBpZihwb3NpdGlvbiA8IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmNvdW50IDw9IHBvc2l0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBuZXcgTm9kZShlbGVtZW50KTtcclxuICAgICAgICAgICBpZihwb3NpdGlvbiA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgIG5vZGUubmV4dCA9IHRoaXMuaGVhZDtcclxuICAgICAgICAgICAgICAgdGhpcy5oZWFkID0gbm9kZTtcclxuICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICB2YXIgcmVzID0gdGhpcy5nZXRFbGVtZW50QXQocG9zaXRpb24gLSAxKTtcclxuICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gcmVzLm5leHQ7XHJcbiAgICAgICAgICAgICAgIHJlcy5uZXh0ID0gbm9kZTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57pk77ooajkuK3nibnlrprkvY3nva7nmoTlhYPntKDvvIzlpoLmnpzmsqHmnInliJnov5Tlm551bmRlZmluZWRcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICogQHJldHVybnMge05vZGV8dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5nZXRFbGVtZW50QXQgPSBmdW5jdGlvbiAoaW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5jb3VudCA8PSBpbmRleCl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5oZWFkO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8aW5kZXg7aSsrKXtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47pk77ooajkuK3np7vpmaTkuIDkuKrlhYPntKBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKiBAcmV0dXJucyB7Tm9kZS5lbGVtZW50fVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZWxlbWVudDogYW55KXtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVBdCh0aGlzLmluZGV4T2YoZWxlbWVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5YWD57Sg5Zyo6ZO+6KGo5Lit55qE57Si5byV77yM5aaC5p6c5rKh5pyJ5YiZ6L+U5ZueLTFcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGVsZW1lbnQ6IGFueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb3VudCA+IDApe1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuaGVhZDtcclxuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLmNvdW50O2krKyl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50LmVsZW1lbnQgPT09IGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47pk77ooajmjIflrprkvY3nva7np7vpmaTkuIDkuKrlhYPntKBcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZHwqfVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVBdCA9IGZ1bmN0aW9uIChpbmRleDogbnVtYmVyKXtcclxuICAgICAgICBpZihpbmRleCA8IDB8fHRoaXMuY291bnQgPT09IDB8fGluZGV4ID49IHRoaXMuY291bnQpe1xyXG4gICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5oZWFkXHJcbiAgICAgICAgaWYoaW5kZXggPT09IDApe1xyXG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRBdChpbmRleCAtIDEpO1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gZWxlbWVudC5uZXh0O1xyXG4gICAgICAgICAgICBlbGVtZW50Lm5leHQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY291bnQgLT0gMTtcclxuICAgICAgICByZXR1cm4gY3VycmVudC5lbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aaC5p6c6ZO+6KGo5Lit5LiN5YyF5ZCr5Lu75L2V5YWD57Sg77yM5YiZ6L+U5ZuedHJ1Ze+8jOWQpuWImei/lOWbnmZhbHNlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50ID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue6ZO+6KGo5YyF5ZCr55qE5YWD57Sg5Liq5pWwXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57pk77ooajnmoTnrKzkuIDkuKrlhYPntKBcclxuICAgICAqIEByZXR1cm5zIHtOb2RlfG51bGx9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmdldEhlYWQgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWFkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF56m66ZO+6KGoXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgdGhpcy5oZWFkID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuihqOekuuaVtOS4qumTvuihqOeahOWtl+espuS4slxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICBpZih0aGlzLmNvdW50PT09MCl7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RyID0gXCJcIjtcclxuICAgICAgICB2YXIgbnVtID0gMDtcclxuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuaGVhZDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0KXtcclxuICAgICAgICAgICAgc3RyICs9IGBMaW5rZWRMaXN0OiB7ZWxlbWVudDogJHtjdXJyZW50LmVsZW1lbnR9LCBpbmRleDogJHtudW19fSBuZXh0IC0tLS0+ICR7Y3VycmVudC5uZXh0LmVsZW1lbnR9XFxuYFxyXG4gICAgICAgICAgICBudW0gKz0gMTtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RyICs9IGBMaW5rZWRMaXN0OiB7ZWxlbWVudDogJHtjdXJyZW50LmVsZW1lbnR9LCBpbmRleDogJHtudW19fSBuZXh0IC0tLS0+IG51bGxcXG5gXHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICog6Zif5YiXXHJcbiAqXHJcbiAqIHNldCgp77ya5ZCR6Zif5YiX5re75Yqg5YWD57Sg77yM5Y+v5qC55o2u5YWD57Sg5pWw5a2X6L+b6KGM5o6S5bqPXHJcbiAqIGdldCgp77ya6I635Y+W6Zif5YiX5pWw5o2u77yM5bm25LiU6Ieq5Yqo6Kej5p6QUXVldWVFbGVtZW505a+56LGh77yM55u05o6l6L+U5Zue57uT5p6cXHJcbiAqIGVucXVldWUoKe+8muWQkemYn+WIl+eahOWwvumDqOa3u+WKoOWFg+e0oOOAglxyXG4gKiBmcm9udFF1ZXVlKCnvvJrlkJHpmJ/liJfliY3pnaLmt7vliqDmlrDlhYPntKDjgIJcclxuICogZGVxdWV1ZSgp77ya5ZCR6Zif5YiX55qE5byA5aS056e76Zmk56ys5LiA5Liq5YWD57Sg77yM5bm26L+U5Zue6KKr56e76Zmk55qE5YWD57Sg44CCXHJcbiAqIHBvcCgp77ya5ZCR6Zif5YiX56e76Zmk5pyA5ZCO55qE77yM5bm26L+U5Zue6KKr56e76Zmk55qE5YWD57Sg44CCXHJcbiAqIHBlZWtGcm9udCgp77ya6L+U5Zue6Zif5YiX5YmN56uv55qE56ys5LiA5Liq5YWD57Sg44CCXHJcbiAqIHBlZWtCYWNrKCnvvJrov5Tlm57pmJ/liJflkI7nq6/nmoTnrKzkuIDkuKrlhYPntKDjgIJcclxuICogaXNFbXB0eSgp77ya5Yik5pat6Zif5YiX5piv5ZCm5Li656m644CCXHJcbiAqIHNpemUoKe+8mui/lOWbnumYn+WIl+WMheWQq+WFg+e0oOeahOS4quaVsOOAglxyXG4gKiBjbGVhcigp77ya5riF56m66Zif5YiX44CCXHJcbiAqIHRvU3RyaW5nKCnvvJrlsIbpmJ/liJfovazmjaLmiJDlrZfnrKbkuLLmoLzlvI/jgIJcclxuICpcclxuICogKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBRdWV1ZSgpe1xyXG4gICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICB0aGlzLml0ZW1zID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhYPntKDlkozkvJjlhYjnuqdcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBRdWV1ZUVsZW1lbnQgKGVsZW1lbnQ6YW55LHByaW9yaXR5Om51bWJlcil7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDkuIDkuKrmnInmjpLluo/nmoTmlbDmja5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50LS0tLea3u+WKoOWFg+e0oC0tLS3lv4XkvKBcclxuICAgICAqIEBwYXJhbSBwcmlvcml0eS0tLS3lsYLnuqfmlbDvvIzmlbDph4/otorpq5jvvIzotorlvoDlkI7vvIzkuLrotJ/mlbDmiJbogIUw5pe26Ieq5Yqo6buY6K6k57un5om/5LiK5LiA5Liq5YWD57Sg55qE5p2D6YeN5YC85bm25LiUKzEtLS0t6Z2e5b+F5LygXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoZWxlbWVudDphbnkscHJpb3JpdHk6bnVtYmVyKXtcclxuICAgICAgICAvL+WIpOaWreS4uuecn+aVsOWAvO+8jOaIluiAheWkp+S6jjDml7bvvIzkuLrmnInmlYjmnYPph41cclxuICAgICAgICBpZihwcmlvcml0eSAmJiBwcmlvcml0eSA+IDApe1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlRWxlbWVudCA9IG5ldyBRdWV1ZUVsZW1lbnQoZWxlbWVudCxwcmlvcml0eSk7XHJcbiAgICAgICAgICAgIC8v6ZSB77yM5aaC5p6c5pyJ5o+S5YWl5YWD57Sg77yM5bCx5Li6dHJ1ZVxyXG4gICAgICAgICAgICBsZXQgaXNBZGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNvdW50O2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLml0ZW1zW2ldLnByaW9yaXR5ID4gcHJpb3JpdHkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGksMCxxdWV1ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQWRkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighaXNBZGQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1t0aGlzLmNvdW50XSA9IHF1ZXVlRWxlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvdW50ICs9IDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZW5xdWV1ZShlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpmJ/liJfmlbDmja7vvIzlubbkuJTnrZvpgInmjonmnYPph43lrZfmrrVcclxuICAgICAqIEByZXR1cm5zIHtbXX1cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5jb3VudDtpKyspe1xyXG4gICAgICAgICAgICByZXMucHVzaCh0aGlzLml0ZW1zW2ldLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR6Zif5YiX55qE5bC+6YOo5re75Yqg5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uIChlbGVtZW50OmFueSl7XHJcbiAgICAgICAgbGV0IHF1ZXVlRWxlbWVudDtcclxuICAgICAgICBpZih0aGlzLmlzRW1wdHkoKSl7XHJcbiAgICAgICAgICAgIC8v6buY6K6k5L2/55So5pWw57uE6ZW/5bqm5Li65YWD57Sg5p2D6YeN5YC8XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgcXVldWVFbGVtZW50ID0gbmV3IFF1ZXVlRWxlbWVudChlbGVtZW50LHRoaXMuY291bnQrMSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v6buY6K6k57un5om/5LiK5LiA5Liq5YWD57Sg55qE5p2D6YeN5YC85bm25LiUKzFcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxdWV1ZUVsZW1lbnQgPSBuZXcgUXVldWVFbGVtZW50KGVsZW1lbnQsdGhpcy5pdGVtc1t0aGlzLmNvdW50LTFdLnByaW9yaXR5KzEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1zW3RoaXMuY291bnRdID0gcXVldWVFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuY291bnQgKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQkemYn+WIl+WJjemdoua3u+WKoOaWsOWFg+e0oFxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZnJvbnRRdWV1ZSA9IGZ1bmN0aW9uKGVsZW1lbnQ6YW55KXtcclxuICAgICAgICBsZXQgcXVldWVFbGVtZW50O1xyXG4gICAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgLy/pu5jorqTkvb/nlKjmlbDnu4Tplb/luqbkuLrlhYPntKDmnYPph43lgLxcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxdWV1ZUVsZW1lbnQgPSBuZXcgUXVldWVFbGVtZW50KGVsZW1lbnQsdGhpcy5jb3VudCsxKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/pu5jorqTnu6fmib/kuIrkuIDkuKrlhYPntKDnmoTmnYPph43lgLxcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxdWV1ZUVsZW1lbnQgPSBuZXcgUXVldWVFbGVtZW50KGVsZW1lbnQsdGhpcy5wZWVrRnJvbnQoKS5wcmlvcml0eSk7XHJcbiAgICAgICAgICAgIC8v5pS55Y+Y5omA5pyJ5o6S5bqP5YC8KzFcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNvdW50O2krKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW2ldLnByaW9yaXR5ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoMCwwLHF1ZXVlRWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo6Zif5YiX55qE5byA5aS056e76Zmk56ys5LiA5Liq5YWD57Sg77yM5bm26L+U5Zue6KKr56e76Zmk55qE5YWD57Sg44CCXHJcbiAgICAgKiBAcmV0dXJucyB7bnVsbHxUfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY291bnQgLT0gMTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5zaGlmdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo6Zif5YiX55qE56e76Zmk5pyA5ZCO5LiA5Liq5YWD57Sg77yM5bm26L+U5Zue6KKr56e76Zmk55qE5YWD57Sg44CCXHJcbiAgICAgKiBAcmV0dXJucyB7bnVsbHxUfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCAtPSAxO1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue6Zif5YiX55qE56ys5LiA5Liq5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaXMtLS0t5biD5bCU57G75Z6L77yM5Li6dHJ1ZeaXtuebtOaOpei/lOWbnue7k+aenO+8jOWQpuWImei/lOWbniBRdWV1ZUVsZW1lbnTlr7nosaEtLS0t6Z2e5b+F5aGrXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWtGcm9udCA9IGZ1bmN0aW9uKGlzOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzP3RoaXMuaXRlbXNbMF0uZWxlbWVudDp0aGlzLml0ZW1zWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue6Zif5YiX55qE56ys5LiA5Liq5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaXMtLS0t5biD5bCU57G75Z6L77yM5Li6dHJ1ZeaXtuebtOaOpei/lOWbnue7k+aenO+8jOWQpuWImei/lOWbniBRdWV1ZUVsZW1lbnTlr7nosaEtLS0t6Z2e5b+F5aGrXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWtCYWNrID0gZnVuY3Rpb24oaXM6Ym9vbGVhbil7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXM/dGhpcy5pdGVtc1t0aGlzLmNvdW50LTFdLmVsZW1lbnQ6dGhpcy5pdGVtc1t0aGlzLmNvdW50LTFdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat6Zif5YiX5piv5ZCm5Li656m6XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb3VudCA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnumYn+WIl+WMheWQq+WFg+e0oOeahOS4quaVsFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb3VudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4heepuumYn+WIl1xyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIbpmJ/liJfovazmjaLmiJDlrZfnrKbkuLLmoLzlvI9cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8KltdfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzID0gXCJcIjtcclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW06YW55KT0+e1xyXG4gICAgICAgICAgICByZXMgKz0gYFF1ZXVlRWxlbWVudDoge2VsZW1lbnQ6ICR7aXRlbS5lbGVtZW50fSxwcmlvcml0eTogJHtpdGVtLnByaW9yaXR5fX1cXG5gXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiDmoIhcclxuICpcclxuICogcHVzaCgp77ya5Zyo5qCI6aG25re75Yqg5LiA5Liq5oiW6ICF5aSa5Liq5YWD57Sg44CCXHJcbiAqIHBvcCgp77ya56e76Zmk5qCI6aG255qE56ys5LiA5Liq5YWD57Sg77yM5ZCM5pe26L+U5Zue6KKr56e76Zmk55qE5YWD57Sg44CCXHJcbiAqIHBlZWsoKe+8mui/lOWbnuagiOmhtueahOWFg+e0oOOAglxyXG4gKiBpc0VtcHR5KCnvvJrliKTmlq3moIjmmK/lkKbkuLrnqbrvvIzmmK/liJnov5Tlm550cnVl77yM5ZCm5YiZ6L+U5ZueZmFsc2VcclxuICogY2xlYXIoKe+8muenu+mZpOagiOS4reeahOaJgOacieWFg+e0oOOAglxyXG4gKiBzaXplKCnvvJrov5Tlm57moIjkuK3lhYPntKDnmoTkuKrmlbDjgIJcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU3RhY2soKSB7XHJcblxyXG4gICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICB0aGlzLml0ZW1zID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlrDlop7kuIDkuKrlhYPntKBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIFN0YWNrLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZWxlbWVudDphbnkpe1xyXG4gICAgICAgIHRoaXMuaXRlbXNbdGhpcy5jb3VudF0gPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMuY291bnQgKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIoOmZpOesrOS4gOS4quWFg+e0oFxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZHxUfVxyXG4gICAgICovXHJcbiAgICBTdGFjay5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0aGlzLmlzRW1wdHkoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY291bnQgLT0gMTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuagiOmhtuW+l+WFg+e0oFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIFN0YWNrLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1t0aGlzLmNvdW50LTFdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li656m6XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgU3RhY2sucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpemUoKSA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOaJgOaciVxyXG4gICAgICovXHJcbiAgICBTdGFjay5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagiOeahOaVsOmHj1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgU3RhY2sucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIFN0YWNrLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmpvaW4oXCIsXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYwNyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=