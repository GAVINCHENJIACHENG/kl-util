var Throttle = require("./Throttle/Throttle");
var Debounce = require("./Debounce/Debounce");
var DeepClone = require("./DeepClone/DeepClone");
var DeepMerge = require("./DeepMerge/DeepMerge");
var Prototype = require("./Prototype/Prototype");
var Time = require("./Time/Time");
var ArrayObj = require("./Array/Array");
var Guid = require("./Guid/Guid");
var Color = require("./Color/Color");
var Params = require("./Params/Params");
var MD5 = require("./MD5/MD5");
var Trim = require("./Trim/Trim");
var Test = require("./Test/Test");

//单例模式
// var arr = [Throttle,Debounce];
// for(var i=0;i<arr.length;i++){
//     arr[i].new = (function (){
//
//         arr[i].obj = null;
//         return function (singleton:boolean){console.log(singleton)
//             if(!arr[i].obj||singleton){
//                 // @ts-ignore
//                 arr[i].obj = new arr[i](...arguments);
//             }
//             return arr[i].obj;
//         }
//     })();
// }
// @ts-ignore
var ApiFunc = function (e: any,singleton = false){
    var instances = {};
    return (function (){
        return function(){
            // @ts-ignore
            if(!e.prototype.obj||singleton){debugger
                // @ts-ignore
                e.prototype.obj = new e(...arguments);
            }
            return e.prototype.obj;
        };
    })();
};

// Throttle.new = (function (){
//     var throttle: any = null;
//     return function (singleton:boolean){
//         if(!throttle||singleton){
//             // @ts-ignore
//             throttle = new Throttle(...arguments);
//         }
//         return throttle;
//     }
// })();
// Debounce.new = (function (){
//     var debounce: any = null;
//     return function (singleton:boolean){
//         if(!debounce||singleton){
//             // @ts-ignore
//             debounce = new Debounce(...arguments);
//         }
//         return debounce;
//     }
// })();
// DeepClone.new = (function (){
//     var deepClone: any = null;
//     return function (singleton:boolean){
//         if(!deepClone||singleton){
//             // @ts-ignore
//             deepClone = new DeepClone(...arguments);
//         }
//         return deepClone;
//     }
// })();
// DeepMerge.new = (function (){
//     var deepMerge: any = null;
//     return function (singleton:boolean){
//         if(!deepMerge||singleton){
//             // @ts-ignore
//             deepMerge = new DeepMerge(...arguments);
//         }
//         return deepMerge;
//     }
// })();
// Prototype.new = (function (){
//     var prototype: any = null;
//     return function (singleton:boolean){
//         if(!prototype||singleton){
//             // @ts-ignore
//             prototype = new Prototype(...arguments);
//         }
//         return prototype;
//     }
// })();
// Time.new = (function (){
//     var time: any = null;
//     return function (singleton:boolean){
//         if(!time||singleton){
//             // @ts-ignore
//             time = new Time(...arguments);
//         }
//         return time;
//     }
// })();
// ArrayObj.new = (function (){
//     var arrayObj: any = null;
//     return function (singleton:boolean){
//         if(!arrayObj||singleton){
//             // @ts-ignore
//             arrayObj = new ArrayObj(...arguments);
//         }
//         return arrayObj;
//     }
// })();
// Guid.new = (function (){
//     var guid: any = null;
//     return function (singleton:boolean){
//         if(!guid||singleton){
//             // @ts-ignore
//             guid = new Guid(...arguments);
//         }
//         return guid;
//     }
// })();
// Color.new = (function (){
//     var color: any = null;
//     return function (singleton:boolean){
//         if(!color||singleton){
//             // @ts-ignore
//             color = new Color(...arguments);
//         }
//         return color;
//     }
// })();
// Params.new = (function (){
//     var params: any = null;
//     return function (singleton:boolean){
//         if(!params||singleton){
//             // @ts-ignore
//             params = new Params(...arguments);
//         }
//         return params;
//     }
// })();
// MD5.new = (function (){
//     var md5: any = null;
//     return function (singleton:boolean){
//         if(!md5||singleton){
//             // @ts-ignore
//             md5 = new MD5(...arguments);
//         }
//         return md5;
//     }
// })();
// Trim.new = (function (){
//     var trim: any = null;
//     return function (singleton:boolean){
//         if(!trim||singleton){
//             // @ts-ignore
//             trim = new Trim(...arguments);
//         }
//         return trim;
//     }
// })();
// Test.new = (function (){
//     var test: any = null;
//     return function (singleton:boolean){
//         if(!test||singleton){
//             // @ts-ignore
//             test = new Test(...arguments);
//         }
//         return test;
//     }
// })();

module.exports = function Api() {
    Api.prototype.throttle = function (func: Function, wait: number) {
        var throttle = Throttle(func, wait);
        return ApiFunc(throttle)
        // return Throttle.new(Throttle,func, wait);
    };
    Api.prototype.debounce = function (func: Function, wait: number) {
        // return Debounce.new(func, wait);
        return ApiFunc(Debounce(func, wait))
    };
    Api.prototype.deepClone = function (target: any) {
        return DeepClone.new(target);
    };
    Api.prototype.deepMerge = function (target: object, source: object) {
        return DeepMerge.new(target, source);
    };
    Api.prototype.getPrototype = function (obj: object, key: string) {
        return Prototype.new().get(obj, key);
    };
    Api.prototype.setPrototype = function (obj: object, key: string, val: string) {
        return Prototype.new().set(obj, key, val);
    };
    Api.prototype.timeFormat = function (dateTime: any, fmt: string) {
        return Time.new().timeFormat(dateTime, fmt);
    };
    Api.prototype.randomArray = function (array: Array<any>) {
        return ArrayObj.new().randomArray(array);
    };
    Api.prototype.guid = function (len: number, firstU:boolean, radix: number) {
        return Guid.new().get(len,firstU,radix);
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
    Api.prototype.colorGradient = function (startColor: string, endColor: string, step: number): Array<any> {
        return Color.new().colorGradient(startColor, endColor, step);
    };

    /**
     * 十六进制Hex转RGB
     *
     * 该函数可以将一个Hex的十六进制颜色值转换成一个RGB颜色值
     * @param sColor <String> HEx颜色值，如#0afdce
     */
    Api.prototype.hexToRgb = function (sColor: string): any{
        return Color.new().hexToRgb(sColor);
    };

    /**
     * RGB转十六进制Hex
     * 该函数可以将一个RGB颜色值转换成一个Hex的十六进制颜色值
     * @param rgb <String> RGB颜色值，如rgb(230, 231, 233)
     */
    Api.prototype.rgbToHex = function (rgb: string): string {
        return Color.new().rgbToHex(rgb);
    };

    /**
     * 颜色透明度
     * 该函数可以接受一个十六进制或者rgb格式的颜色值(不能接受命名式颜色格式，比如white)，返回此颜色的rgba格式值
     * @param color <String> 颜色值，只能hex或者rgba格式
     * @param opacity <Number> 不透明度值，取值为0-1之间
     */
    Api.prototype.colorToRgba = function (color: string, opacity: number): string {
        return Color.new().colorToRgba(color,opacity);
    };

    /**
     * 对象转url参数
     *
     * 该方法，可以将一个对象形式参数转换成get传参所需参数形式，如把{name: 'lisa', age: 20}转换成?name=lisa&age=20
     * @param data 对象
     * @param isPrefix isPrefix,是否自动加上"?"
     * @param arrayFormat 规则 indices|brackets|repeat|comma
     */
    Api.prototype.objToParams = function (data: object, isPrefix: boolean, arrayFormat: string): string {
        return Params.new().objToParams(data,isPrefix,arrayFormat);
    };

    /**
     * MD5
     *
     * @param string 需要加密的字符串
     * @param key 密钥，如果不填，默认为 “30ce71a73bdd908c3955a90e8f7429ef”
     */
    Api.prototype.md5 = function (string: string | number | boolean, key = "30ce71a73bdd908c3955a90e8f7429ef", raw = false): string {
        return MD5.new().get(string, key, raw);
    };

    /**
     * 去除空格
     * @param  str 需要去除空格的字符串
     * @param  pos both(左右)|left|right|all 默认both
     */
    Api.prototype.trim = function (str: string, pos: string): string {
        return Trim.new().trim(str, pos);
    };

    /**
     * 校验是否为验证码
     * @param value 验证码字符串
     * @param len 验证码长度，不填默认为6位数
     * @return Boolean
     */
    Api.prototype.isCode = function (value: string, len: number): boolean{
        return Test.new().code(value, len);
    };

    /**
     * 校验是否为数组
     * @param array 数组
     * @return Boolean
     */
    Api.prototype.isArray = function (array: Array<any>):boolean {
        return Test.new().array(array);
    };

    /**
     * 校验是否为json字符串
     * @param json
     * @return Boolean
     */
    Api.prototype.isJsonString = function (json: string): boolean {
        return Test.new().jsonString(json);
    };

    /**
     * 校验是否为有效值的json
     * @param json
     * @return Boolean
     */
    Api.prototype.isJson = function (json: object): boolean {
        return Test.new().json(json);
    };

    /**
     * 校验是否为对象
     * @param object
     * @return Boolean
     */
    Api.prototype.isObject = function (object: object): boolean {
        return Test.new().object(object);
    };

    /**
     * 校验是否为邮箱号
     * @param value
     * @return Boolean
     */
    Api.prototype.isEmail = function (value: string): boolean {
        return Test.new().email(value);
    };

    /**
     * 校验是否为手机号
     * @param value
     * @return Boolean
     */
    Api.prototype.isPhone = function (value: string): boolean{
        return Test.new().phone(value);
    };

    /**
     * 校验是否为URL
     * @param value
     * @return Boolean
     */
    Api.prototype.isUrl = function (value: string): boolean{
        return Test.new().url(value);
    };

    /**
     * 校验是否为空
     * @param value
     * @return Boolean
     */
    Api.prototype.isEmpty = function (value: any): boolean{
        return Test.new().empty(value);
    };

    /**
     * 校验是否为普通日期
     * @param value
     * @return Boolean
     */
    Api.prototype.isDate = function (value: any): boolean{
        return Test.new().date(value);
    };

    /**
     * 校验是否为十进制数值
     * @param value
     * @return Boolean
     */
    Api.prototype.isNumber = function (value: any): boolean{
        return Test.new().number(value);
    };

    /**
     * 校验是否为身份证号
     * @param value
     * @return Boolean
     */
    Api.prototype.isIdCard = function (value: string): boolean{
        return Test.new().idCard(value);
    };

    /**
     * 判断是否为车牌号
     * @param value
     * @return Boolean
     */
    Api.prototype.isCarNo = function (value: string): boolean{
        return Test.new().carNo(value);
    };

    /**
     * 校验是否为金额
     * @param value
     * @return Boolean
     */
    Api.prototype.isAmount = function (value: string): boolean{
        return Test.new().amount(value);
    };

    /**
     * 校验是否为中文（汉字）
     * @param value
     * @return Boolean
     */
    Api.prototype.isChinese = function (value: string): boolean{
        return Test.new().chinese(value);
    };

    /**
     * 校验是否为英文字母
     * @param value
     * @return Boolean
     */
    Api.prototype.isLetter = function (value: string): boolean{
        return Test.new().letter(value);
    };

    /**
     * 校验是否为字母或者数字
     * @param value
     * @return Boolean
     */
    Api.prototype.isEnOrNum = function (value: any): boolean{
        return Test.new().enOrNum(value);
    };

    /**
     * 校验是否包含某个值（如果为object，默认判断某个key是否存在，如果需要判断值，isValue = true 即可）
     * @param value
     * @param param
     * @param isValue
     * @return Boolean
     */
    Api.prototype.isContains = function (value: any, param: any, isValue: boolean) {
        return Test.new().contains(value, param, isValue);
    };

    /**
     * 校验是否为验证一个值范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Api.prototype.isRange = function (value: number, param: Array<any>): boolean {
        return Test.new().range(value, param);
    };

    /**
     * 校验是否为验证一个长度范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Api.prototype.isRangeLength = function (value: string, param: Array<any>): boolean {
        return Test.new().rangeLength(value, param);
    };

    /**
     * 校验是否为函数方法
     * @param value
     * @return Boolean
     */
    Api.prototype.isFunc = function (value: string): boolean{
        return Test.new().func(value);
    };

    /**
     * 校验是否为promise对象
     * @param value
     * @return Boolean
     */
    Api.prototype.isPromise = function (value: any): boolean{
        return Test.new().promise(value);
    };

    /**
     * 校验是否为图片格式
     * @param value
     * @return Boolean
     */
    Api.prototype.isImage = function (value: string): boolean{
        return Test.new().image(value);
    };

    /**
     * 校验是否为视频格式
     * @param value
     * @return Boolean
     */
    Api.prototype.isVideo = function (value: string): boolean{
        return Test.new().video(value);
    };

    /**
     * 校验是否为正则对象
     * @param value
     * @return Boolean
     */
    Api.prototype.isRegExp = function (value: any): boolean{
        return Test.new().regExp(value);
    };

}
