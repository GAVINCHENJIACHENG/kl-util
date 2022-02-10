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

/***/ 395:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Throttle = __webpack_require__(516);
var Debounce = __webpack_require__(665);
var DeepClone = __webpack_require__(425);
var DeepMerge = __webpack_require__(795);
var Prototype = __webpack_require__(494);
var Time = __webpack_require__(986);
var ArrayObj = __webpack_require__(227);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjazovLy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxzL1V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvQXJyYXkvQXJyYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9EZWJvdW5jZS9EZWJvdW5jZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL0RlZXBDbG9uZS9EZWVwQ2xvbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9EZWVwTWVyZ2UvRGVlcE1lcmdlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvUHJvdG90eXBlL1Byb3RvdHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL1Rlc3QvVGVzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL1Rocm90dGxlL1Rocm90dGxlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvVGltZS9UaW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJ1Y3R1cmUvRG91Ymx5TGlua2VkTGlzdC9Eb3VibHlMaW5rZWRMaXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJ1Y3R1cmUvTGlua2VkTGlzdC9MaW5rZWRMaXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJ1Y3R1cmUvUXVldWUvUXVldWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0cnVjdHVyZS9TdGFjay9TdGFjay50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJ2YXIgU3RhY2sgPSByZXF1aXJlKFwiLi4vc3RydWN0dXJlL1N0YWNrL1N0YWNrXCIpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAgZnVuY3Rpb24gVXRpbHMoKXtcclxuICAgIC8qKlxyXG4gICAgICog6L+b5Yi26L2s5o2i566X5rOVXHJcbiAgICAgKiBAcGFyYW0gZGVjTnVtYmVyIOi9rOaNoueahOaVsOWtl1xyXG4gICAgICogQHBhcmFtIGJhc2UgIOi9rOaNoueahOexu+Wei1xyXG4gICAgICovXHJcbiAgICBVdGlscy5wcm90b3R5cGUuYmFzZUNvbnZlcnRlciA9IGZ1bmN0aW9uKGRlY051bWJlcjpudW1iZXIsIGJhc2U6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrKCk7XHJcbiAgICAgICAgdmFyIHJlczpzdHJpbmcgPSAnJztcclxuICAgICAgICB2YXIgcmVtOm51bWJlcjtcclxuICAgICAgICBiYXNlID0gYmFzZXx8MjtcclxuICAgICAgICBpZihiYXNlIDwgMiB8fCBiYXNlID4gMzYpe1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlKGRlY051bWJlciA+IDApe1xyXG4gICAgICAgICAgICByZW0gPSBNYXRoLmZsb29yKGRlY051bWJlciAlIGJhc2UpO1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKHJlbSk7XHJcbiAgICAgICAgICAgIGRlY051bWJlciA9IE1hdGguZmxvb3IoZGVjTnVtYmVyIC8gYmFzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICghc3RhY2suaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgcmVzICs9IHN0YWNrLnBvcCgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQXJyYXkgKCl7XHJcbiAgICBBcnJheS5wcm90b3R5cGUucmFuZG9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyYXk6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gYXJyYXkuc29ydChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgLSAwLjU7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iLCJ2YXIgdGltZTogYW55O1xyXG5cclxuLyoqXHJcbiAqIOmYsuaKllxyXG4gKiBAcGFyYW0gZnVuY1xyXG4gKiBAcGFyYW0gd2FpdFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBEZWJvdW5jZSAoIGZ1bmM6IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIgKSB7XHJcbiAgICBpZih0aW1lKXtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZSlcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJnczogYW55KSB7XHJcbiAgICAgICAgbGV0IF90aGlzOiBhbnkgPSB0aGlzO1xyXG4gICAgICAgIHRpbWUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KF90aGlzLCBhcmdzKTtcclxuICAgICAgICB9LCB3YWl0KVxyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiDmt7HluqblhYvpmoZcclxuICog5Y+v5YWL6ZqG57G75Z6L5YyF5ous77yaU3RyaW5n77yMTnVtYmVy77yMVW5kZWZpbmVk77yMQm9vbGVhbu+8jE51bGzvvIxPYmplY3TvvIxKU09O77yMQXJyYXnvvIxEYXRl77yMUmVnRXhwLEZ1bmN0aW9uXHJcbiAqIEBwYXJhbSBvYmpcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRGVlcENsb25lKG9iajogYW55KTogYW55e1xyXG4gICAgdmFyIHQgPSB0eXBlb2Ygb2JqO1xyXG4gICAgaWYoIE9iamVjdC5pcyh0LCBcInN0cmluZ1wiKSB8fCBPYmplY3QuaXModCwgXCJudW1iZXJcIikgfHwgT2JqZWN0LmlzKHQsIFwidW5kZWZpbmVkXCIpIHx8IE9iamVjdC5pcyh0LCBcImJvb2xlYW5cIikgfHwgT2JqZWN0LmlzKHQsIFwiZnVuY3Rpb25cIikgfHwgT2JqZWN0LmlzKG9iaixudWxsKSl7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0gZWxzZSBpZiAoIE9iamVjdC5pcyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSwgXCJbb2JqZWN0IERhdGVdXCIpICl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG9iai5nZXRUaW1lKCkpXHJcbiAgICB9IGVsc2UgaWYgKCBPYmplY3QuaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaiksIFwiW29iamVjdCBSZWdFeHBdXCIpICl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAob2JqKVxyXG4gICAgfSBlbHNlIGlmICggQXJyYXkuaXNBcnJheShvYmopICkge1xyXG4gICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8b2JqLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKERlZXBDbG9uZShvYmpbaV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IHt9O1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJlc1trZXldID0gRGVlcENsb25lKG9ialtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbn1cclxuIiwidmFyIERlZXBDbG9uZSA9IHJlcXVpcmUoXCIuLi9EZWVwQ2xvbmUvRGVlcENsb25lXCIpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERlZXBNZXJnZSh0YXJnZXQ6IG9iamVjdCwgc291cmNlOiBvYmplY3QpOiBhbnkge1xyXG4gICAgdGFyZ2V0ID0gbmV3IERlZXBDbG9uZSh0YXJnZXQpXHJcbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHJldHVybiBmYWxzZVxyXG4gICAgZm9yIChjb25zdCBwcm9wIGluIHNvdXJjZSkge1xyXG4gICAgICAgIGlmICghc291cmNlLmhhc093blByb3BlcnR5KHByb3ApKSBjb250aW51ZVxyXG4gICAgICAgIGlmIChwcm9wIGluIHRhcmdldCkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRhcmdldFtwcm9wXS5jb25jYXQpXHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcF0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBzb3VyY2VbcHJvcF1cclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc291cmNlW3Byb3BdICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gc291cmNlW3Byb3BdXHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0W3Byb3BdID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0W3Byb3BdLmNvbmNhdCAmJiBzb3VyY2VbcHJvcF0uY29uY2F0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB0YXJnZXRbcHJvcF0uY29uY2F0KHNvdXJjZVtwcm9wXSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IERlZXBNZXJnZSh0YXJnZXRbcHJvcF0sIHNvdXJjZVtwcm9wXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gc291cmNlW3Byb3BdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldFxyXG59XHJcbiIsIlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFByb3RvdHlwZSgpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOivu+WPluWxnuaAp1xyXG4gICAgICogQHBhcmFtIG9ialxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICovXHJcbiAgICBQcm90b3R5cGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvYmo6IG9iamVjdCwga2V5OiBzdHJpbmcpe1xyXG4gICAgICAgIC8v5Yik5pata2V55piv5ZCm5LiN5Li65a2X56ym5Liy5oiW6ICF5Li656m65pWw57uEXHJcbiAgICAgICAgaWYodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwgIWtleSB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIga2V5czogQXJyYXk8c3RyaW5nPiA9IGtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICAgIHZhciB0dXJuOiBvYmplY3QgPSB0aGlzLnR1cm4oa2V5c1swXSk7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdmFyIHJlczogb2JqZWN0ID0gT2JqZWN0LmlzKHR1cm4udHlwZSxcImFycmF5XCIpP29ialt0dXJuLm5hbWVdW3R1cm4uaW5kZXhdfHx7fTpvYmpbdHVybi5uYW1lXXx8e307XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDE7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHR1cm4gPSB0aGlzLnR1cm4oa2V5c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpxrZXnkuI3lrZjlnKjvvIzlsLHov5Tlm55udWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFyZXNbdHVybi5uYW1lXSlyZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gT2JqZWN0LmlzKHR1cm4udHlwZSxcImFycmF5XCIpP3Jlc1t0dXJuLm5hbWVdW3R1cm4uaW5kZXhdfHx7fTpyZXNbdHVybi5uYW1lXXx8e31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0aGlzLnZhbHVlID0gcmVzfHxudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzfHxudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWxnuaAp1xyXG4gICAgICogQHBhcmFtIG9ialxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICogQHBhcmFtIHZhbFxyXG4gICAgICovXHJcbiAgICBQcm90b3R5cGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG9iajogb2JqZWN0LCBrZXk6IHN0cmluZywgdmFsOiBzdHJpbmcpIHtcclxuICAgICAgICAvL+iOt+WPlumTvuWQjVxyXG4gICAgICAgIHZhciBrZXlzID0ga2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICB2YXIgdHVybjtcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGtleXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIC8v6I635Y+Wa2V5c+exu+Wei1xyXG4gICAgICAgICAgICB0dXJuID0gdGhpcy50dXJuKGtleXNbaV0pXHJcbiAgICAgICAgICAgIC8v5aaC5p6ca2V55LiN5a2Y5Zyo77yM5bCx6L+U5ZueZmFsc2XvvJtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBpZighb2JqW3R1cm4ubmFtZV0pcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyDlpoLmnpxrZXlz6ZW/5bqm5bCP5LqO562J5LqOMeaIluiAheafpeaJvuWIsOacgOWQjuS4gOS4qmtleeaXtu+8jOebtOaOpei1i+WAvFxyXG4gICAgICAgICAgICBpZihrZXlzLmxlbmd0aCA8PSAxIHx8IGtleXMubGVuZ3RoLTEgPD0gaSl7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBpZih0dXJuLnR5cGUgPT09IFwiYXJyYXlcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pWw57uE5pON5L2cXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIG9ialt0dXJuLm5hbWVdW3R1cm4uaW5kZXhdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pmu6YCa5a+56LGh5pON5L2cXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIG9ialt0dXJuLm5hbWVdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGlmKHR1cm4udHlwZSA9PT0gXCJhcnJheVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmlbDnu4Tmk43kvZxcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gIG9ialt0dXJuLm5hbWVdW3R1cm4uaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmma7pgJrlr7nosaHmk43kvZxcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gIG9ialt0dXJuLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65pWw57uE5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKi9cclxuICAgIFByb3RvdHlwZS5wcm90b3R5cGUuaXMgPSBmdW5jdGlvbiAoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4ga2V5LmluZGV4T2YoXCJbXCIpICE9PSAtMSAmJiBrZXkuaW5kZXhPZihcIl1cIikgIT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmlbDnu4TkuIvmoIflkoxrZXks5ZCm5YiZ55u05o6l6L+U5Zuea2V5XHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKi9cclxuICAgIFByb3RvdHlwZS5wcm90b3R5cGUudHVybiA9IGZ1bmN0aW9uIChrZXk6IHN0cmluZyk6IG9iamVjdCB7XHJcbiAgICAgICAgaWYodGhpcy5pcyhrZXkpKXtcclxuICAgICAgICAgICAgdmFyIGxlZnQgPSBrZXkuc3BsaXQoXCJbXCIpO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBsZWZ0WzFdLnNwbGl0KFwiXVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGxlZnRbMF0sXHJcbiAgICAgICAgICAgICAgICBpbmRleDogTnVtYmVyKHJpZ2h0WzBdKSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUZXN0ICgpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uumqjOivgeeggVxyXG4gICAgICogQHBhcmFtIHZhbHVlIOmqjOivgeeggeWtl+espuS4slxyXG4gICAgICogQHBhcmFtIGxlbiDpqozor4HnoIHplb/luqbvvIzkuI3loavpu5jorqTkuLo25L2N5pWwXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuY29kZSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nLCBsZW46IG51bWJlcik6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoYF5cXFxcZHske2xlbnx8Nn19JGApLnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65pWw57uEXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkg5pWw57uEXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuYXJyYXkgPSBmdW5jdGlvbiAoYXJyYXk6IEFycmF5PGFueT4pOmJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycmF5KSwgJ1tvYmplY3QgQXJyYXldJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLpqc29u5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0ganNvblxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmpzb25TdHJpbmcgPSBmdW5jdGlvbiAoanNvbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYoIU9iamVjdC5pcyh0eXBlb2YganNvbiwgJ3N0cmluZycpKXJldHVybiBmYWxzZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgb2JqOiBvYmplY3QgPSBKU09OLnBhcnNlKGpzb24pO1xyXG4gICAgICAgICAgICBpZihPYmplY3QuaXModHlwZW9mIG9iaiAsICdvYmplY3QnKSAmJiBvYmope1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuacieaViOWAvOeahGpzb25cclxuICAgICAqIEBwYXJhbSBqc29uXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuanNvbiA9IGZ1bmN0aW9uIChqc29uOiBvYmplY3QpOiBib29sZWFue1xyXG4gICAgICAgIGlmKE9iamVjdC5pcyh0eXBlb2YganNvbiwgJ29iamVjdCcpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuanNvblN0cmluZyhKU09OLnN0cmluZ2lmeShqc29uKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrlr7nosaFcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5vYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0OiBvYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpLCAnW29iamVjdCBPYmplY3RdJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrpgq7nrrHlj7dcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmVtYWlsID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXlxcXFx3KygoLVxcXFx3Kyl8KFxcXFwuXFxcXHcrKSkqXFxcXEBbQS1aYS16MC05XSsoKFxcXFwufC0pW0EtWmEtejAtOV0rKSpcXFxcLltBLVphLXowLTldKyQnKS50ZXN0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuS4uuaJi+acuuWPt1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUucGhvbmUgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14xWzIzNDU2Nzg5XVxcXFxkezl9JCcpLnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5Li6VVJMXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS51cmwgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14oKGh0dHBzfGh0dHB8ZnRwfHJ0c3B8bW1zKTpcXFxcL1xcXFwvKSgoWzAtOWEtekEtWl8hfipcXCcoKS4mPSskJS1dKzogKT9bMC05YS16QS1aXyF+KlxcJygpLiY9KyQlLV0rQCk/KChbMC05XXsxLDN9Lil7M31bMC05XXsxLDN9fChbMC05YS16QS1aXyF+KlxcJygpLV0rLikqKFswLTlhLXpBLVpdWzAtOWEtekEtWi1dezAsNjF9KT9bMC05YS16QS1aXS5bYS16QS1aXXsyLDZ9KSg6WzAtOV17MSw0fSk/KChcXFxcLz8pfChcXFxcL1swLTlhLXpBLVpfIX4qXFwnKCkuOz86QCY9KyQsJSMtXSspK1xcXFwvPykkJykudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrnqbpcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnJlcGxhY2UoLyheWyBcXHRcXG5cXHJdKil8KFsgXFx0XFxuXFxyXSokKS9nLCAnJykubGVuZ3RoID09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IDAgfHwgaXNOYU4odmFsdWUpKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65pmu6YCa5pel5pyfXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5kYXRlID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybiBmYWxzZVxyXG4gICAgICAgIC8vIOWIpOaWreaYr+WQpuaVsOWAvOaIluiAheWtl+espuS4suaVsOWAvCjmhI/lkbPnnYDkuLrml7bpl7TmiLMp77yM6L2s5Li65pWw5YC877yM5ZCm5YiZbmV3IERhdGXml6Dms5Xor4bliKvlrZfnrKbkuLLml7bpl7TmiLNcclxuICAgICAgICBpZiAodGhpcy5udW1iZXIodmFsdWUpKSB2YWx1ZSA9ICt2YWx1ZTtcclxuICAgICAgICByZXR1cm4gIS9JbnZhbGlkfE5hTi8udGVzdChuZXcgRGF0ZSh2YWx1ZSkudG9TdHJpbmcoKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uuWNgei/m+WItuaVsOWAvFxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUubnVtYmVyID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ15bXFxcXCstXT8oXFxcXGQrXFxcXC4/XFxcXGQqfFxcXFwuXFxcXGQrfFxcXFxkXFxcXC5cXFxcZCtlXFxcXCtcXFxcZCspJCcpLnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li66Lqr5Lu96K+B5Y+3XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5pZENhcmQgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXlsxLTldXFxcXGR7NX1bMS05XVxcXFxkezN9KCgwXFxcXGQpfCgxWzAtMl0pKSgoWzB8MXwyXVxcXFxkKXwzWzAtMV0pXFxcXGR7M30oWzAtOV18WCkkJykudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrovabniYzlj7dcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmNhck5vID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIC8vIOaWsOiDvea6kOi9pueJjFxyXG4gICAgICAgIGNvbnN0IHhyZWcgPSAvXlvkuqzmtKXmsqrmuJ3lhoDosavkupHovr3pu5HmuZjnmpbpsoHmlrDoi4/mtZnotaPphILmoYLnlJjmmYvokpnpmZXlkInpl73otLXnsqTpnZLol4/lt53lroHnkLzkvb/pooZBLVpdezF9W0EtWl17MX0oKFswLTldezV9W0RGXSQpfChbREZdW0EtSEotTlAtWjAtOV1bMC05XXs0fSQpKS9cclxuICAgICAgICAvLyDml6fovabniYxcclxuICAgICAgICBjb25zdCBjcmVnID0gL15b5Lqs5rSl5rKq5rid5YaA6LGr5LqR6L696buR5rmY55qW6bKB5paw6IuP5rWZ6LWj6YSC5qGC55SY5pmL6JKZ6ZmV5ZCJ6Ze96LS157Kk6Z2S6JeP5bed5a6B55C85L2/6aKGQS1aXXsxfVtBLVpdezF9W0EtSEotTlAtWjAtOV17NH1bQS1ISi1OUC1aMC055oyC5a2m6K2m5riv5r6zXXsxfSQvXHJcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gNykge1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlZy50ZXN0KHZhbHVlKVxyXG4gICAgICAgIH0gaWYgKHZhbHVlLmxlbmd0aCA9PT0gOCkge1xyXG4gICAgICAgICAgICByZXR1cm4geHJlZy50ZXN0KHZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uumHkeminVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuYW1vdW50ID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeWzEtOV1cXFxcZCooLFxcXFxkezN9KSooXFxcXC5cXFxcZHsxLDJ9KT8kfF4wXFxcXC5cXFxcZHsxLDJ9JCcpLnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65Lit5paH77yI5rGJ5a2X77yJXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5jaGluZXNlID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIGNvbnN0IHJlZyA9IC9eW1xcdTRlMDAtXFx1OWZhNV0rJC9naTtcclxuICAgICAgICByZXR1cm4gcmVnLnRlc3QodmFsdWUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLroi7HmloflrZfmr41cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLmxldHRlciA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXlthLXpBLVpdKiQnKS50ZXN0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uuWtl+avjeaIluiAheaVsOWtl1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuZW5Pck51bSA9IGZ1bmN0aW9uICh2YWx1ZTogYW55KTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5udW1iZXIodmFsdWUpIHx8IHRoaXMubGV0dGVyKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuWMheWQq+afkOS4quWAvO+8iOWmguaenOS4um9iamVjdO+8jOm7mOiupOWIpOaWreafkOS4qmtleeaYr+WQpuWtmOWcqO+8jOWmguaenOmcgOimgeWIpOaWreWAvO+8jGlzVmFsdWUgPSB0cnVlIOWNs+WPr++8iVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1cclxuICAgICAqIEBwYXJhbSBpc1ZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAodmFsdWU6IGFueSwgcGFyYW06IGFueSwgaXNWYWx1ZTogYm9vbGVhbik6IGJvb2xlYW57XHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbkuLrmlbDnu4RcclxuICAgICAgICBpZih0aGlzLmFycmF5KHZhbHVlKSl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDtpPHZhbHVlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoT2JqZWN0LmlzKHZhbHVlW2ldLCBwYXJhbSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub2JqZWN0KHZhbHVlKSl7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYoaXNWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3lgLxcclxuICAgICAgICAgICAgICAgICAgICBpZihPYmplY3QuaXModmFsdWVba2V5XSwgcGFyYW0pKXJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWrWtleVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKE9iamVjdC5pcyhrZXksIHBhcmFtKSlyZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmluZGV4T2YocGFyYW0pID49IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B5LiA5Liq5YC86IyD5Zu0W21pbiwgbWF4XVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1cclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5yYW5nZSA9IGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyLCBwYXJhbTogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA+PSBwYXJhbVswXSAmJiB2YWx1ZSA8PSBwYXJhbVsxXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmqjOivgeS4gOS4qumVv+W6puiMg+WbtFttaW4sIG1heF1cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHBhcmFtXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUucmFuZ2VMZW5ndGggPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZywgcGFyYW06IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID49IHBhcmFtWzBdICYmIHZhbHVlLmxlbmd0aCA8PSBwYXJhbVsxXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uuWHveaVsOaWueazlVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgVGVzdC5wcm90b3R5cGUuZnVuYyA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLpwcm9taXNl5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5wcm9taXNlID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuaXModHlwZW9mIHZhbHVlLFwib2JqZWN0XCIpICYmIHRoaXMuZnVuYyh2YWx1ZS50aGVuKSAmJiB0aGlzLmZ1bmModmFsdWUuY2F0Y2gpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65Zu+54mH5qC85byPXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBUZXN0LnByb3RvdHlwZS5pbWFnZSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICBjb25zdCBJTUFHRV9SRUdFWFAgPSAvXFwuKGpwZWd8anBnfGdpZnxwbmd8c3ZnfHdlYnB8amZpZnxibXB8ZHBnKS9pO1xyXG4gICAgICAgIHJldHVybiBJTUFHRV9SRUdFWFAudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrop4bpopHmoLzlvI9cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLnZpZGVvID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIGNvbnN0IFZJREVPX1JFR0VYUCA9IC9cXC4obXA0fG1wZ3xtcGVnfGRhdHxhc2Z8YXZpfHJtfHJtdmJ8bW92fHdtdnxmbHZ8bWt2KS9pO1xyXG4gICAgICAgIHJldHVybiBWSURFT19SRUdFWFAudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrmraPliJnlr7nosaFcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIFRlc3QucHJvdG90eXBlLnJlZ0V4cCA9IGZ1bmN0aW9uICh2YWx1ZTogYW55KTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdmFsdWUgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiIsInZhciB2YWxpZDpib29sZWFuID0gdHJ1ZTtcclxuLyoqXHJcbiAqIEFQSS7oioLmtYFcclxuICogQHBhcmFtIGZ1bmNcclxuICogQHBhcmFtIHdhaXRcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVGhyb3R0bGUoZnVuYzogRnVuY3Rpb24sd2FpdDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oLi4uYXJnczogYW55KXtcclxuICAgICAgICBpZighdmFsaWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkoX3RoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICB2YWxpZCA9IHRydWU7XHJcbiAgICAgICAgfSx3YWl0KVxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVGltZSgpe1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+l5Ye95pWw5b+F6aG75Lyg5YWl56ys5LiA5Liq5Y+C5pWw77yM5qC85byP5Li65Lu75L2V5ZCI5rOV55qE5pe26Ze05qC85byP44CB56eS5oiW5q+r56eS55qE5pe26Ze05oiz77yM56ys5LqM5Liq5Y+C5pWw5piv5Y+v6YCJ55qE77yM6L+U5Zue55qE5YC857G75Ly85Yia5Yia77yMMjXliIbpkp/liY3vvIwz5bCP5pe25YmN77yMN+WkqeWJjeeahOe7k+aenOOAgiDlpoLmnpznrKzkuozkuKrlj4LmlbDmmK/ml7bpl7TnmoTmoLzlvI/vvIzlvZPliY3lkozkvKDlhaXml7bpl7TmiLPnm7jlt67lpKfkuo7kuIDkuKrmnIjml7bvvIzov5Tlm57moLzlvI/ljJblpb3nmoTml7bpl7TvvJvlpoLmnpznrKzkuozkuKrlj4LmlbDkuLpmYWxzZe+8jOWImeS4jeS8mui/lOWbnuagvOW8j+WMluWlveeahOaXtumXtO+8jOiAjOaYr+ivuOWmglwieHh45bm05YmNXCLnmoTnu5PmnpzjgIJcclxuICAgICAqIHRpbWVzdGFtcCA8U3RyaW5nPiDml7bpl7TmiLNcclxuICAgICAqIGZvcm1hdCA8U3RyaW5nIC8gZmFsc2U+IOaXtumXtOagvOW8j++8jOm7mOiupOS4unl5eXktbW0tZGTvvIzlubTkuLpcInl5eXlcIu+8jOaciOS4ulwibW1cIu+8jOaXpeS4ulwiZGRcIu+8jOaXtuS4ulwiaGhcIu+8jOWIhuS4ulwiTU1cIu+8jOenkuS4ulwic3NcIu+8jOagvOW8j+WPr+S7peiHqueUseaQremFje+8jOWmgu+8miB5eXl5Om1tOmRk77yMeXl5eS1tbS1kZO+8jHl5eXnlubRtbeaciGRk5pel77yMeXl5eeW5tG1t5pyIZGTml6UgaGjml7ZNTeWIhnNz56eS77yMeXl5eS9tbS9kZC/vvIxNTTpzc+etiee7hOWQiOOAgiDlpoLmnpzml7bpl7TmiLPot53nprvmraTml7bnmoTml7bpl7TvvIzlpKfkuo7kuIDkuKrmnIjvvIzliJnov5Tlm57kuIDkuKrmoLzlvI/ljJblpb3nmoTml7bpl7TvvIzlpoLmnpzmraTlj4LmlbDkuLpmYWxzZe+8jOi/lOWbnuWdh+S4ulwi5aSa5LmF5LmL5YmNXCLnmoTnu5PmnpzjgIJcclxuICAgICAqIEBwYXJhbSBkYXRlVGltZVxyXG4gICAgICogQHBhcmFtIGZtdFxyXG4gICAgICovXHJcbiAgICBUaW1lLnByb3RvdHlwZS50aW1lRm9ybWF0ID0gZnVuY3Rpb24gKGRhdGVUaW1lOiBhbnksIGZtdDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBkYXRlVGltZSA9IGRhdGVUaW1lfHxudWxsO1xyXG4gICAgICAgIGZtdCA9IGZtdHx8J3l5eXktbW0tZGQgaGg6TU06c3MnO1xyXG4gICAgICAgIC8vIOWmguaenOS4um51bGws5YiZ5qC85byP5YyW5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgaWYgKCFkYXRlVGltZSkgZGF0ZVRpbWUgPSBOdW1iZXIobmV3IERhdGUoKSlcclxuICAgICAgICAvLyDlpoLmnpxkYXRlVGltZemVv+W6puS4ujEw5oiW6ICFMTPvvIzliJnkuLrnp5Llkozmr6vnp5LnmoTml7bpl7TmiLPvvIzlpoLmnpzotoXov4cxM+S9je+8jOWImeS4uuWFtuS7lueahOaXtumXtOagvOW8j1xyXG4gICAgICAgIGlmIChkYXRlVGltZS50b1N0cmluZygpLmxlbmd0aCA9PSAxMCkgZGF0ZVRpbWUgKj0gMTAwMFxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZVRpbWUpXHJcbiAgICAgICAgdmFyIHJldFxyXG4gICAgICAgIHZhciBvcHQgPSB7XHJcbiAgICAgICAgICAgICd5Kyc6IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLCAvLyDlubRcclxuICAgICAgICAgICAgJ20rJzogKGRhdGUuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCksIC8vIOaciFxyXG4gICAgICAgICAgICAnZCsnOiBkYXRlLmdldERhdGUoKS50b1N0cmluZygpLCAvLyDml6VcclxuICAgICAgICAgICAgJ2grJzogZGF0ZS5nZXRIb3VycygpLnRvU3RyaW5nKCksIC8vIOaXtlxyXG4gICAgICAgICAgICAnTSsnOiBkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpLCAvLyDliIZcclxuICAgICAgICAgICAgJ3MrJzogZGF0ZS5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKSAvLyDnp5JcclxuICAgICAgICAgICAgLy8g5pyJ5YW25LuW5qC85byP5YyW5a2X56ym6ZyA5rGC5Y+v5Lul57un57ut5re75Yqg77yM5b+F6aG76L2s5YyW5oiQ5a2X56ym5LiyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGsgaW4gb3B0KSB7XHJcbiAgICAgICAgICAgIHJldCA9IG5ldyBSZWdFeHAoYCgke2t9KWApLmV4ZWMoZm10KVxyXG4gICAgICAgICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBmbXQgPSBmbXQucmVwbGFjZShyZXRbMV0sIChyZXRbMV0ubGVuZ3RoID09IDEpID8gKG9wdFtrXSkgOiAob3B0W2tdLnBhZFN0YXJ0KHJldFsxXS5sZW5ndGgsICcwJykpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbXRcclxuICAgIH1cclxufVxyXG4iLCJ2YXIgVGhyb3R0bGUgPSByZXF1aXJlKFwiLi9UaHJvdHRsZS9UaHJvdHRsZVwiKTtcclxudmFyIERlYm91bmNlID0gcmVxdWlyZShcIi4vRGVib3VuY2UvRGVib3VuY2VcIik7XHJcbnZhciBEZWVwQ2xvbmUgPSByZXF1aXJlKFwiLi9EZWVwQ2xvbmUvRGVlcENsb25lXCIpO1xyXG52YXIgRGVlcE1lcmdlID0gcmVxdWlyZShcIi4vRGVlcE1lcmdlL0RlZXBNZXJnZVwiKTtcclxudmFyIFByb3RvdHlwZSA9IHJlcXVpcmUoXCIuL1Byb3RvdHlwZS9Qcm90b3R5cGVcIik7XHJcbnZhciBUaW1lID0gcmVxdWlyZShcIi4vVGltZS9UaW1lXCIpO1xyXG52YXIgQXJyYXlPYmogPSByZXF1aXJlKFwiLi9BcnJheS9BcnJheVwiKTtcclxudmFyIFRlc3QgPSByZXF1aXJlKFwiLi9UZXN0L1Rlc3RcIik7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEFwaSgpIHtcclxuICAgIEFwaS5wcm90b3R5cGUudGhyb3R0bGUgPSBmdW5jdGlvbiAoZnVuYzogRnVuY3Rpb24sIHdhaXQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGhyb3R0bGUoZnVuYywgd2FpdCk7XHJcbiAgICB9XHJcbiAgICBBcGkucHJvdG90eXBlLmRlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmM6IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERlYm91bmNlKGZ1bmMsIHdhaXQpO1xyXG4gICAgfVxyXG4gICAgQXBpLnByb3RvdHlwZS5kZWVwQ2xvbmUgPSBmdW5jdGlvbiAodGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERlZXBDbG9uZSh0YXJnZXQpO1xyXG4gICAgfVxyXG4gICAgQXBpLnByb3RvdHlwZS5kZWVwTWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0OiBvYmplY3QsIHNvdXJjZTogb2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEZWVwTWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xyXG4gICAgfVxyXG4gICAgQXBpLnByb3RvdHlwZS5nZXRQcm90b3R5cGUgPSBmdW5jdGlvbiAob2JqOiBvYmplY3QsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm90b3R5cGUoKS5nZXQob2JqLCBrZXkpO1xyXG4gICAgfVxyXG4gICAgQXBpLnByb3RvdHlwZS5zZXRQcm90b3R5cGUgPSBmdW5jdGlvbiAob2JqOiBvYmplY3QsIGtleTogc3RyaW5nLCB2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvdG90eXBlKCkuc2V0KG9iaiwga2V5LCB2YWwpO1xyXG4gICAgfVxyXG4gICAgQXBpLnByb3RvdHlwZS50aW1lRm9ybWF0ID0gZnVuY3Rpb24gKGRhdGVUaW1lOiBhbnksIGZtdDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lKCkudGltZUZvcm1hdChkYXRlVGltZSwgZm10KTtcclxuICAgIH1cclxuICAgIEFwaS5wcm90b3R5cGUucmFuZG9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyYXk6IEFycmF5PGFueT4pIHtcclxuICAgICAgICByZXR1cm4gbmV3IEFycmF5T2JqKCkucmFuZG9tQXJyYXkoYXJyYXkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrpqozor4HnoIFcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDpqozor4HnoIHlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBsZW4g6aqM6K+B56CB6ZW/5bqm77yM5LiN5aGr6buY6K6k5Li6NuS9jeaVsFxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNDb2RlID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcsIGxlbjogbnVtYmVyKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5jb2RlKHZhbHVlLCBsZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65pWw57uEXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkg5pWw57uEXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0FycmF5ID0gZnVuY3Rpb24gKGFycmF5OiBBcnJheTxhbnk+KTpib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5hcnJheShhcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLpqc29u5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0ganNvblxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNKc29uU3RyaW5nID0gZnVuY3Rpb24gKGpzb246IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmpzb25TdHJpbmcoanNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrmnInmlYjlgLznmoRqc29uXHJcbiAgICAgKiBAcGFyYW0ganNvblxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNKc29uID0gZnVuY3Rpb24gKGpzb246IG9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmpzb24oanNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrlr7nosaFcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzT2JqZWN0ID0gZnVuY3Rpb24gKG9iamVjdDogb2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkub2JqZWN0KG9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrpgq7nrrHlj7dcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNFbWFpbCA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkuZW1haWwodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65omL5py65Y+3XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzUGhvbmUgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkucGhvbmUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li6VVJMXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzVXJsID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLnVybCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrnqbpcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICh2YWx1ZTogYW55KTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5lbXB0eSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrmma7pgJrml6XmnJ9cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNEYXRlID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmRhdGUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65Y2B6L+b5Yi25pWw5YC8XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzTnVtYmVyID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLm51bWJlcih2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoKHpqozmmK/lkKbkuLrouqvku73or4Hlj7dcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNJZENhcmQgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkuaWRDYXJkKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpuS4uui9pueJjOWPt1xyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0Nhck5vID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLmNhck5vKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uumHkeminVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0Ftb3VudCA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5hbW91bnQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65Lit5paH77yI5rGJ5a2X77yJXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzQ2hpbmVzZSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5jaGluZXNlKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4uuiLseaWh+Wtl+avjVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0xldHRlciA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5sZXR0ZXIodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65a2X5q+N5oiW6ICF5pWw5a2XXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzRW5Pck51bSA9IGZ1bmN0aW9uICh2YWx1ZTogYW55KTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5lbk9yTnVtKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuWMheWQq+afkOS4quWAvO+8iOWmguaenOS4um9iamVjdO+8jOm7mOiupOWIpOaWreafkOS4qmtleeaYr+WQpuWtmOWcqO+8jOWmguaenOmcgOimgeWIpOaWreWAvO+8jGlzVmFsdWUgPSB0cnVlIOWNs+WPr++8iVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1cclxuICAgICAqIEBwYXJhbSBpc1ZhbHVlXHJcbiAgICAgKiBAcmV0dXJuIEJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5pc0NvbnRhaW5zID0gZnVuY3Rpb24gKHZhbHVlOiBhbnksIHBhcmFtOiBhbnksIGlzVmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5jb250YWlucyh2YWx1ZSwgcGFyYW0sIGlzVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li66aqM6K+B5LiA5Liq5YC86IyD5Zu0W21pbiwgbWF4XVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1cclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzUmFuZ2UgPSBmdW5jdGlvbiAodmFsdWU6IG51bWJlciwgcGFyYW06IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5yYW5nZSh2YWx1ZSwgcGFyYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li66aqM6K+B5LiA5Liq6ZW/5bqm6IyD5Zu0W21pbiwgbWF4XVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1cclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzUmFuZ2VMZW5ndGggPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZywgcGFyYW06IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5yYW5nZUxlbmd0aCh2YWx1ZSwgcGFyYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65Ye95pWw5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzRnVuYyA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3QoKS5mdW5jKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagoemqjOaYr+WQpuS4unByb21pc2Xlr7nosaFcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybiBCb29sZWFuXHJcbiAgICAgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuaXNQcm9taXNlID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLnByb21pc2UodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65Zu+54mH5qC85byPXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzSW1hZ2UgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkuaW1hZ2UodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li66KeG6aKR5qC85byPXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzVmlkZW8gPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0KCkudmlkZW8odmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCh6aqM5piv5ZCm5Li65q2j5YiZ5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAgICovXHJcbiAgICBBcGkucHJvdG90eXBlLmlzUmVnRXhwID0gZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdCgpLnJlZ0V4cCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgU3RhY2s6IHJlcXVpcmUoXCIuL3N0cnVjdHVyZS9TdGFjay9TdGFja1wiKSxcclxuICAgIFF1ZXVlOiByZXF1aXJlKFwiLi9zdHJ1Y3R1cmUvUXVldWUvUXVldWVcIiksXHJcbiAgICBMaW5rZWRMaXN0OiByZXF1aXJlKFwiLi9zdHJ1Y3R1cmUvTGlua2VkTGlzdC9MaW5rZWRMaXN0XCIpLFxyXG4gICAgRG91Ymx5TGlua2VkTGlzdDogcmVxdWlyZShcIi4vc3RydWN0dXJlL0RvdWJseUxpbmtlZExpc3QvRG91Ymx5TGlua2VkTGlzdFwiKSxcclxuICAgIEFwaTogcmVxdWlyZShcIi4vYXBpL2luZGV4XCIpLFxyXG4gICAgVXRpbHM6IHJlcXVpcmUoXCIuL1V0aWxzL1V0aWxzXCIpXHJcbn1cclxuXHJcblxyXG4iLCJjb25zdCBMaW5rZWRMaXN0ID0gcmVxdWlyZShcIi4uL0xpbmtlZExpc3QvTGlua2VkTGlzdFwiKTtcclxuXHJcbi8qKlxyXG4gKiDlj4zlkJHpk77ooahcclxuICpcclxuICogcHVzaChlbGVtZW50Ke+8muWQkemTvuihqOWwvumDqOa3u+WKoOS4gOS4quaWsOWFg+e0oOOAglxyXG4gKiBpbnNlcnQoZWxlbWVudCxwb3NpdGlvbinvvJrlnKjpk77ooajmjIflrprkvY3nva7mj5LlhaXkuIDkuKrmlrDlhYPntKDjgIJcclxuICogZ2V0RWxlbWVudEF0KGluZGV4Ke+8mui/lOWbnumTvuihqOS4reeJueWumuS9jee9rueahOWFg+e0oO+8jOWmguaenOayoeacieWImei/lOWbnnVuZGVmaW5lZOOAglxyXG4gKiByZW1vdmUoZWxlbWVudCnvvJrku47pk77ooajkuK3np7vpmaTkuIDkuKrlhYPntKDjgIJcclxuICogaW5kZXhPZihlbGVtZW50Ke+8mui/lOWbnuWFg+e0oOWcqOmTvuihqOS4reeahOe0ouW8le+8jOWmguaenOayoeacieWImei/lOWbni0x44CCXHJcbiAqIHJlbW92ZUF0KHBvc2l0aW9uKe+8muS7jumTvuihqOaMh+WumuS9jee9ruenu+mZpOS4gOS4quWFg+e0oOOAglxyXG4gKiBpc0VtcHR5KCnvvJrlpoLmnpzpk77ooajkuK3kuI3ljIXlkKvku7vkvZXlhYPntKDvvIzliJnov5Tlm550cnVl77yM5ZCm5YiZ6L+U5ZueZmFsc2XjgIJcclxuICogc2l6ZSgp77ya6L+U5Zue6ZO+6KGo5YyF5ZCr55qE5YWD57Sg5Liq5pWw44CCXHJcbiAqIGdldEhlYWQoKe+8mui/lOWbnumTvuihqOeahOesrOS4gOS4quWFg+e0oOOAglxyXG4gKiBnZXRIZWFkKCnvvJrmuIXnqbrpk77ooajjgIJcclxuICogdG9TdHJpbmcoKe+8mui/lOWbnuihqOekuuaVtOS4qumTvuihqOeahOWtl+espuS4suOAglxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gRG91Ymx5TGlua2VkTGlzdCgpe1xyXG4gICAgLy/nu5PlsL7lhYPntKBcclxuICAgIERvdWJseUxpbmtlZExpc3QucHJvdG90eXBlLnRhaWwgPSBudWxsO1xyXG4gICAgLy/lhoXpg6jnsbtcclxuICAgIGZ1bmN0aW9uIE5vZGUoZWxlbWVudDogYW55KXtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMubmV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcmV2ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHB1c2goZWxlbWVudCnvvJrlkJHpk77ooajlsL7pg6jmt7vliqDkuIDkuKrmlrDlhYPntKDjgIJcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIERvdWJseUxpbmtlZExpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihlbGVtZW50OiBhbnkpe1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKGVsZW1lbnQpO1xyXG4gICAgICAgIGlmKHRoaXMuaGVhZCl7XHJcbiAgICAgICAgICAgIHRoaXMudGFpbC5uZXh0ID0gbm9kZTtcclxuICAgICAgICAgICAgbm9kZS5wcmV2ID0gdGhpcy50YWlsO1xyXG4gICAgICAgICAgICB0aGlzLnRhaWwgPSBub2RlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnRhaWwgPSBub2RlO1xyXG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjpk77ooajmjIflrprkvY3nva7mj5LlhaXkuIDkuKrmlrDlhYPntKDjgIJcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIERvdWJseUxpbmtlZExpc3QucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChlbGVtZW50OiBhbnksIHBvc2l0aW9uOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKHBvc2l0aW9uIDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuY291bnQgPD0gcG9zaXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZihwb3NpdGlvbiA9PT0gMHx8dGhpcy5oZWFkID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIG5vZGUubmV4dCA9IHRoaXMuaGVhZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhaWwgPSBub2RlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSB0aGlzLmdldEVsZW1lbnRBdChwb3NpdGlvbiAtIDEpXHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHByZXZpb3VzLm5leHQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LnByZXYgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wcmV2ID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuihqOekuuaVtOS4qumTvuihqOeahOWtl+espuS4slxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgRG91Ymx5TGlua2VkTGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICBpZih0aGlzLmNvdW50PT09MCl7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RyID0gXCJcIjtcclxuICAgICAgICBsZXQgbnVtID0gMDtcclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuaGVhZDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0KXtcclxuICAgICAgICAgICAgc3RyICs9IGBEb3VibHlMaW5rZWRMaXN0OiBuZXh0e2VsZW1lbnQ6ICR7Y3VycmVudC5lbGVtZW50fSwgaW5kZXg6ICR7bnVtfX0gbmV4dCAtLS0tPiAke2N1cnJlbnQubmV4dC5lbGVtZW50fVxcbmBcclxuICAgICAgICAgICAgbnVtICs9IDE7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ciArPSBgRG91Ymx5TGlua2VkTGlzdDogbmV4dHtlbGVtZW50OiAke2N1cnJlbnQuZWxlbWVudH0sIGluZGV4OiAke251bX19IG5leHQgLS0tLT4gbnVsbFxcblxcblxcblxcbmBcclxuICAgICAgICBsZXQgY3VycmVudDIgPSB0aGlzLnRhaWw7XHJcbiAgICAgICAgd2hpbGUoY3VycmVudDIucHJldil7XHJcbiAgICAgICAgICAgIHN0ciArPSBgRG91Ymx5TGlua2VkTGlzdDogcHJldntlbGVtZW50OiAke2N1cnJlbnQyLmVsZW1lbnR9LCBpbmRleDogJHtudW19fSBwcmV2IC0tLS0+ICR7Y3VycmVudDIucHJldi5lbGVtZW50fVxcbmBcclxuICAgICAgICAgICAgbnVtICs9IDE7XHJcbiAgICAgICAgICAgIGN1cnJlbnQyID0gY3VycmVudDIucHJldjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RyICs9IGBEb3VibHlMaW5rZWRMaXN0OiBwcmV2e2VsZW1lbnQ6ICR7Y3VycmVudDIuZWxlbWVudH0sIGluZGV4OiAke251bX19IHByZXYgLS0tLT4gbnVsbFxcblxcblxcblxcbmBcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG59XHJcbi8v57un5om/5Y2V5ZCR6ZO+6KGoXHJcbmxldCBsaW5rZWRMaXN0ID0gbmV3IExpbmtlZExpc3QoKTtcclxuRG91Ymx5TGlua2VkTGlzdC5wcm90b3R5cGUgPSBsaW5rZWRMaXN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcclxubW9kdWxlLmV4cG9ydHMgPSBEb3VibHlMaW5rZWRMaXN0O1xyXG4iLCIvKipcclxuICog6ZO+6KGoXHJcbiAqXHJcbiAqIHB1c2goZWxlbWVudCnvvJrlkJHpk77ooajlsL7pg6jmt7vliqDkuIDkuKrmlrDlhYPntKDjgIJcclxuICogaW5zZXJ0KGVsZW1lbnQscG9zaXRpb24p77ya5Zyo6ZO+6KGo5oyH5a6a5L2N572u5o+S5YWl5LiA5Liq5paw5YWD57Sg44CCXHJcbiAqIGdldEVsZW1lbnRBdChpbmRleCnvvJrov5Tlm57pk77ooajkuK3nibnlrprkvY3nva7nmoTlhYPntKDvvIzlpoLmnpzmsqHmnInliJnov5Tlm551bmRlZmluZWTjgIJcclxuICogcmVtb3ZlKGVsZW1lbnQp77ya5LuO6ZO+6KGo5Lit56e76Zmk5LiA5Liq5YWD57Sg44CCXHJcbiAqIGluZGV4T2YoZWxlbWVudCnvvJrov5Tlm57lhYPntKDlnKjpk77ooajkuK3nmoTntKLlvJXvvIzlpoLmnpzmsqHmnInliJnov5Tlm54tMeOAglxyXG4gKiByZW1vdmVBdChwb3NpdGlvbinvvJrku47pk77ooajmjIflrprkvY3nva7np7vpmaTkuIDkuKrlhYPntKDjgIJcclxuICogaXNFbXB0eSgp77ya5aaC5p6c6ZO+6KGo5Lit5LiN5YyF5ZCr5Lu75L2V5YWD57Sg77yM5YiZ6L+U5ZuedHJ1Ze+8jOWQpuWImei/lOWbnmZhbHNl44CCXHJcbiAqIHNpemUoKe+8mui/lOWbnumTvuihqOWMheWQq+eahOWFg+e0oOS4quaVsOOAglxyXG4gKiBnZXRIZWFkKCnvvJrov5Tlm57pk77ooajnmoTnrKzkuIDkuKrlhYPntKDjgIJcclxuICogZ2V0SGVhZCgp77ya5riF56m66ZO+6KGo44CCXHJcbiAqIHRvU3RyaW5nKCnvvJrov5Tlm57ooajnpLrmlbTkuKrpk77ooajnmoTlrZfnrKbkuLLjgIJcclxuICpcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTGlua2VkTGlzdCAoKXtcclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvdW50ID0gMDtcclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmhlYWQgPSBudWxsO1xyXG5cclxuICAgIGZ1bmN0aW9uIE5vZGUgKGVsZW1lbnQ6YW55KXtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMubmV4dCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuTm9kZSA9IE5vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHpk77ooajlsL7pg6jmt7vliqDkuIDkuKrmlrDlhYPntKBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZWxlbWVudDphbnkpe1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB2YXIgbm9kZSA9ICBuZXcgTm9kZShlbGVtZW50KTtcclxuICAgICAgICBpZih0aGlzLmhlYWQpe1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuaGVhZDtcclxuICAgICAgICAgICAgd2hpbGUoY3VycmVudC5uZXh0KXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gbm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjpk77ooajmjIflrprkvY3nva7mj5LlhaXkuIDkuKrmlrDlhYPntKBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChlbGVtZW50OmFueSxwb3NpdGlvbjpudW1iZXIpe1xyXG4gICAgICAgIGlmKHBvc2l0aW9uIDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuY291bnQgPD0gcG9zaXRpb24pe1xyXG4gICAgICAgICAgICB0aGlzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IG5ldyBOb2RlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgIGlmKHBvc2l0aW9uID09PSAwKXtcclxuICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gdGhpcy5oZWFkO1xyXG4gICAgICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xyXG4gICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLmdldEVsZW1lbnRBdChwb3NpdGlvbiAtIDEpO1xyXG4gICAgICAgICAgICAgICBub2RlLm5leHQgPSByZXMubmV4dDtcclxuICAgICAgICAgICAgICAgcmVzLm5leHQgPSBub2RlO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICB0aGlzLmNvdW50ICs9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnumTvuihqOS4reeJueWumuS9jee9rueahOWFg+e0oO+8jOWmguaenOayoeacieWImei/lOWbnnVuZGVmaW5lZFxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7Tm9kZXx1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmdldEVsZW1lbnRBdCA9IGZ1bmN0aW9uIChpbmRleDogbnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmNvdW50IDw9IGluZGV4KXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmhlYWQ7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxpbmRleDtpKyspe1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3VycmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7jumTvuihqOS4reenu+mZpOS4gOS4quWFg+e0oFxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtOb2RlLmVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChlbGVtZW50OiBhbnkpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUF0KHRoaXMuaW5kZXhPZihlbGVtZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lhYPntKDlnKjpk77ooajkuK3nmoTntKLlvJXvvIzlpoLmnpzmsqHmnInliJnov5Tlm54tMVxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoZWxlbWVudDogYW55KXtcclxuICAgICAgICBpZih0aGlzLmNvdW50ID4gMCl7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5oZWFkO1xyXG4gICAgICAgICAgICBmb3IodmFyIGk9MDtpPHRoaXMuY291bnQ7aSsrKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnQuZWxlbWVudCA9PT0gZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7jumTvuihqOaMh+WumuS9jee9ruenu+mZpOS4gOS4quWFg+e0oFxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfCp9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZUF0ID0gZnVuY3Rpb24gKGluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGluZGV4IDwgMHx8dGhpcy5jb3VudCA9PT0gMHx8aW5kZXggPj0gdGhpcy5jb3VudCl7XHJcbiAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmhlYWRcclxuICAgICAgICBpZihpbmRleCA9PT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudEF0KGluZGV4IC0gMSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBlbGVtZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIGVsZW1lbnQubmV4dCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCAtPSAxO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50LmVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpoLmnpzpk77ooajkuK3kuI3ljIXlkKvku7vkvZXlhYPntKDvvIzliJnov5Tlm550cnVl77yM5ZCm5YiZ6L+U5ZueZmFsc2VcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnQgPT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57pk77ooajljIXlkKvnmoTlhYPntKDkuKrmlbBcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb3VudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnumTvuihqOeahOesrOS4gOS4quWFg+e0oFxyXG4gICAgICogQHJldHVybnMge05vZGV8bnVsbH1cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZ2V0SGVhZCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXnqbrpk77ooahcclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICB0aGlzLmhlYWQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue6KGo56S65pW05Liq6ZO+6KGo55qE5a2X56ym5LiyXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIGlmKHRoaXMuY291bnQ9PT0wKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdHIgPSBcIlwiO1xyXG4gICAgICAgIHZhciBudW0gPSAwO1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5oZWFkO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Lm5leHQpe1xyXG4gICAgICAgICAgICBzdHIgKz0gYExpbmtlZExpc3Q6IHtlbGVtZW50OiAke2N1cnJlbnQuZWxlbWVudH0sIGluZGV4OiAke251bX19IG5leHQgLS0tLT4gJHtjdXJyZW50Lm5leHQuZWxlbWVudH1cXG5gXHJcbiAgICAgICAgICAgIG51bSArPSAxO1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIgKz0gYExpbmtlZExpc3Q6IHtlbGVtZW50OiAke2N1cnJlbnQuZWxlbWVudH0sIGluZGV4OiAke251bX19IG5leHQgLS0tLT4gbnVsbFxcbmBcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiDpmJ/liJdcclxuICpcclxuICogc2V0KCnvvJrlkJHpmJ/liJfmt7vliqDlhYPntKDvvIzlj6/moLnmja7lhYPntKDmlbDlrZfov5vooYzmjpLluo9cclxuICogZ2V0KCnvvJrojrflj5bpmJ/liJfmlbDmja7vvIzlubbkuJToh6rliqjop6PmnpBRdWV1ZUVsZW1lbnTlr7nosaHvvIznm7TmjqXov5Tlm57nu5PmnpxcclxuICogZW5xdWV1ZSgp77ya5ZCR6Zif5YiX55qE5bC+6YOo5re75Yqg5YWD57Sg44CCXHJcbiAqIGZyb250UXVldWUoKe+8muWQkemYn+WIl+WJjemdoua3u+WKoOaWsOWFg+e0oOOAglxyXG4gKiBkZXF1ZXVlKCnvvJrlkJHpmJ/liJfnmoTlvIDlpLTnp7vpmaTnrKzkuIDkuKrlhYPntKDvvIzlubbov5Tlm57ooqvnp7vpmaTnmoTlhYPntKDjgIJcclxuICogcG9wKCnvvJrlkJHpmJ/liJfnp7vpmaTmnIDlkI7nmoTvvIzlubbov5Tlm57ooqvnp7vpmaTnmoTlhYPntKDjgIJcclxuICogcGVla0Zyb250KCnvvJrov5Tlm57pmJ/liJfliY3nq6/nmoTnrKzkuIDkuKrlhYPntKDjgIJcclxuICogcGVla0JhY2soKe+8mui/lOWbnumYn+WIl+WQjuerr+eahOesrOS4gOS4quWFg+e0oOOAglxyXG4gKiBpc0VtcHR5KCnvvJrliKTmlq3pmJ/liJfmmK/lkKbkuLrnqbrjgIJcclxuICogc2l6ZSgp77ya6L+U5Zue6Zif5YiX5YyF5ZCr5YWD57Sg55qE5Liq5pWw44CCXHJcbiAqIGNsZWFyKCnvvJrmuIXnqbrpmJ/liJfjgIJcclxuICogdG9TdHJpbmcoKe+8muWwhumYn+WIl+i9rOaNouaIkOWtl+espuS4suagvOW8j+OAglxyXG4gKlxyXG4gKiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFF1ZXVlKCl7XHJcbiAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFg+e0oOWSjOS8mOWFiOe6p1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFF1ZXVlRWxlbWVudCAoZWxlbWVudDphbnkscHJpb3JpdHk6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOS4gOS4quacieaOkuW6j+eahOaVsOaNrlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQtLS0t5re75Yqg5YWD57SgLS0tLeW/heS8oFxyXG4gICAgICogQHBhcmFtIHByaW9yaXR5LS0tLeWxgue6p+aVsO+8jOaVsOmHj+i2iumrmO+8jOi2iuW+gOWQju+8jOS4uui0n+aVsOaIluiAhTDml7boh6rliqjpu5jorqTnu6fmib/kuIrkuIDkuKrlhYPntKDnmoTmnYPph43lgLzlubbkuJQrMS0tLS3pnZ7lv4XkvKBcclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChlbGVtZW50OmFueSxwcmlvcml0eTpudW1iZXIpe1xyXG4gICAgICAgIC8v5Yik5pat5Li655yf5pWw5YC877yM5oiW6ICF5aSn5LqOMOaXtu+8jOS4uuacieaViOadg+mHjVxyXG4gICAgICAgIGlmKHByaW9yaXR5ICYmIHByaW9yaXR5ID4gMCl7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgY29uc3QgcXVldWVFbGVtZW50ID0gbmV3IFF1ZXVlRWxlbWVudChlbGVtZW50LHByaW9yaXR5KTtcclxuICAgICAgICAgICAgLy/plIHvvIzlpoLmnpzmnInmj5LlhaXlhYPntKDvvIzlsLHkuLp0cnVlXHJcbiAgICAgICAgICAgIGxldCBpc0FkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY291bnQ7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXRlbXNbaV0ucHJpb3JpdHkgPiBwcmlvcml0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaSwwLHF1ZXVlRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNBZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFpc0FkZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW3RoaXMuY291bnRdID0gcXVldWVFbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY291bnQgKz0gMTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5lbnF1ZXVlKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumYn+WIl+aVsOaNru+8jOW5tuS4lOetm+mAieaOieadg+mHjeWtl+autVxyXG4gICAgICogQHJldHVybnMge1tdfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgY29uc3QgcmVzID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmNvdW50O2krKyl7XHJcbiAgICAgICAgICAgIHJlcy5wdXNoKHRoaXMuaXRlbXNbaV0uZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHpmJ/liJfnmoTlsL7pg6jmt7vliqDlhYPntKBcclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW1lbnQ6YW55KXtcclxuICAgICAgICBsZXQgcXVldWVFbGVtZW50O1xyXG4gICAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgLy/pu5jorqTkvb/nlKjmlbDnu4Tplb/luqbkuLrlhYPntKDmnYPph43lgLxcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBxdWV1ZUVsZW1lbnQgPSBuZXcgUXVldWVFbGVtZW50KGVsZW1lbnQsdGhpcy5jb3VudCsxKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/pu5jorqTnu6fmib/kuIrkuIDkuKrlhYPntKDnmoTmnYPph43lgLzlubbkuJQrMVxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHF1ZXVlRWxlbWVudCA9IG5ldyBRdWV1ZUVsZW1lbnQoZWxlbWVudCx0aGlzLml0ZW1zW3RoaXMuY291bnQtMV0ucHJpb3JpdHkrMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXRlbXNbdGhpcy5jb3VudF0gPSBxdWV1ZUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR6Zif5YiX5YmN6Z2i5re75Yqg5paw5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5mcm9udFF1ZXVlID0gZnVuY3Rpb24oZWxlbWVudDphbnkpe1xyXG4gICAgICAgIGxldCBxdWV1ZUVsZW1lbnQ7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICAvL+m7mOiupOS9v+eUqOaVsOe7hOmVv+W6puS4uuWFg+e0oOadg+mHjeWAvFxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHF1ZXVlRWxlbWVudCA9IG5ldyBRdWV1ZUVsZW1lbnQoZWxlbWVudCx0aGlzLmNvdW50KzEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+m7mOiupOe7p+aJv+S4iuS4gOS4quWFg+e0oOeahOadg+mHjeWAvFxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHF1ZXVlRWxlbWVudCA9IG5ldyBRdWV1ZUVsZW1lbnQoZWxlbWVudCx0aGlzLnBlZWtGcm9udCgpLnByaW9yaXR5KTtcclxuICAgICAgICAgICAgLy/mlLnlj5jmiYDmnInmjpLluo/lgLwrMVxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuY291bnQ7aSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0ucHJpb3JpdHkgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1zLnNwbGljZSgwLDAscXVldWVFbGVtZW50KTtcclxuICAgICAgICB0aGlzLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjpmJ/liJfnmoTlvIDlpLTnp7vpmaTnrKzkuIDkuKrlhYPntKDvvIzlubbov5Tlm57ooqvnp7vpmaTnmoTlhYPntKDjgIJcclxuICAgICAqIEByZXR1cm5zIHtudWxsfFR9XHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCAtPSAxO1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnNoaWZ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjpmJ/liJfnmoTnp7vpmaTmnIDlkI7kuIDkuKrlhYPntKDvvIzlubbov5Tlm57ooqvnp7vpmaTnmoTlhYPntKDjgIJcclxuICAgICAqIEByZXR1cm5zIHtudWxsfFR9XHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICBpZih0aGlzLmlzRW1wdHkoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50IC09IDE7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMucG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57pmJ/liJfnmoTnrKzkuIDkuKrlhYPntKBcclxuICAgICAqIEBwYXJhbSBpcy0tLS3luIPlsJTnsbvlnovvvIzkuLp0cnVl5pe255u05o6l6L+U5Zue57uT5p6c77yM5ZCm5YiZ6L+U5ZueIFF1ZXVlRWxlbWVudOWvueixoS0tLS3pnZ7lv4XloatcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUucGVla0Zyb250ID0gZnVuY3Rpb24oaXM6Ym9vbGVhbil7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXM/dGhpcy5pdGVtc1swXS5lbGVtZW50OnRoaXMuaXRlbXNbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57pmJ/liJfnmoTnrKzkuIDkuKrlhYPntKBcclxuICAgICAqIEBwYXJhbSBpcy0tLS3luIPlsJTnsbvlnovvvIzkuLp0cnVl5pe255u05o6l6L+U5Zue57uT5p6c77yM5ZCm5YiZ6L+U5ZueIFF1ZXVlRWxlbWVudOWvueixoS0tLS3pnZ7lv4XloatcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUucGVla0JhY2sgPSBmdW5jdGlvbihpczpib29sZWFuKXtcclxuICAgICAgICBpZih0aGlzLmlzRW1wdHkoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpcz90aGlzLml0ZW1zW3RoaXMuY291bnQtMV0uZWxlbWVudDp0aGlzLml0ZW1zW3RoaXMuY291bnQtMV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3pmJ/liJfmmK/lkKbkuLrnqbpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50ID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue6Zif5YiX5YyF5ZCr5YWD57Sg55qE5Liq5pWwXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF56m66Zif5YiXXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhumYn+WIl+i9rOaNouaIkOWtl+espuS4suagvOW8j1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ3wqW119XHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXMgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbTphbnkpPT57XHJcbiAgICAgICAgICAgIHJlcyArPSBgUXVldWVFbGVtZW50OiB7ZWxlbWVudDogJHtpdGVtLmVsZW1lbnR9LHByaW9yaXR5OiAke2l0ZW0ucHJpb3JpdHl9fVxcbmBcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIOagiFxyXG4gKlxyXG4gKiBwdXNoKCnvvJrlnKjmoIjpobbmt7vliqDkuIDkuKrmiJbogIXlpJrkuKrlhYPntKDjgIJcclxuICogcG9wKCnvvJrnp7vpmaTmoIjpobbnmoTnrKzkuIDkuKrlhYPntKDvvIzlkIzml7bov5Tlm57ooqvnp7vpmaTnmoTlhYPntKDjgIJcclxuICogcGVlaygp77ya6L+U5Zue5qCI6aG255qE5YWD57Sg44CCXHJcbiAqIGlzRW1wdHkoKe+8muWIpOaWreagiOaYr+WQpuS4uuepuu+8jOaYr+WImei/lOWbnnRydWXvvIzlkKbliJnov5Tlm55mYWxzZVxyXG4gKiBjbGVhcigp77ya56e76Zmk5qCI5Lit55qE5omA5pyJ5YWD57Sg44CCXHJcbiAqIHNpemUoKe+8mui/lOWbnuagiOS4reWFg+e0oOeahOS4quaVsOOAglxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTdGFjaygpIHtcclxuXHJcbiAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaWsOWinuS4gOS4quWFg+e0oFxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgU3RhY2sucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihlbGVtZW50OmFueSl7XHJcbiAgICAgICAgdGhpcy5pdGVtc1t0aGlzLmNvdW50XSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5jb3VudCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk56ys5LiA5Liq5YWD57SgXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfFR9XHJcbiAgICAgKi9cclxuICAgIFN0YWNrLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCAtPSAxO1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5qCI6aG25b6X5YWD57SgXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgU3RhY2sucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW3RoaXMuY291bnQtMV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrnqbpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBTdGFjay5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZSgpID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk5omA5pyJXHJcbiAgICAgKi9cclxuICAgIFN0YWNrLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qCI55qE5pWw6YePXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBTdGFjay5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgU3RhY2sucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0aGlzLmlzRW1wdHkoKSl7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuam9pbihcIixcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNjA3KTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==