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

module.exports = function Api() {
    Api.prototype.throttle = function (func: Function, wait: number) {
        return new Throttle(func, wait);
    };
    Api.prototype.debounce = function (func: Function, wait: number) {
        return new Debounce(func, wait);
    };
    Api.prototype.deepClone = function (target: any) {
        return new DeepClone(target);
    };
    Api.prototype.deepMerge = function (target: object, source: object) {
        return new DeepMerge(target, source);
    };
    Api.prototype.getPrototype = function (obj: object, key: string) {
        return new Prototype().get(obj, key);
    };
    Api.prototype.setPrototype = function (obj: object, key: string, val: string) {
        return new Prototype().set(obj, key, val);
    };
    Api.prototype.timeFormat = function (dateTime: any, fmt: string) {
        return new Time().timeFormat(dateTime, fmt);
    };
    Api.prototype.randomArray = function (array: Array<any>) {
        return new ArrayObj().randomArray(array);
    };
    Api.prototype.guid = function (len: number, firstU:boolean, radix: number) {
        return new Guid().get(len,firstU,radix);
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
        return new Color().colorGradient(startColor, endColor, step);
    };

    /**
     * 十六进制Hex转RGB
     *
     * 该函数可以将一个Hex的十六进制颜色值转换成一个RGB颜色值
     * @param sColor <String> HEx颜色值，如#0afdce
     */
    Api.prototype.hexToRgb = function (sColor: string): any{
        return new Color().hexToRgb(sColor);
    };

    /**
     * RGB转十六进制Hex
     * 该函数可以将一个RGB颜色值转换成一个Hex的十六进制颜色值
     * @param rgb <String> RGB颜色值，如rgb(230, 231, 233)
     */
    Api.prototype.rgbToHex = function (rgb: string): string {
        return new Color().rgbToHex(rgb);
    };

    /**
     * 颜色透明度
     * 该函数可以接受一个十六进制或者rgb格式的颜色值(不能接受命名式颜色格式，比如white)，返回此颜色的rgba格式值
     * @param color <String> 颜色值，只能hex或者rgba格式
     * @param opacity <Number> 不透明度值，取值为0-1之间
     */
    Api.prototype.colorToRgba = function (color: string, opacity: number): string {
        return new Color().colorToRgba(color,opacity);
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
        return new Params().objToParams(data,isPrefix,arrayFormat);
    };

    /**
     * MD5
     *
     * @param string 需要加密的字符串
     * @param key 密钥，如果不填，默认为 “30ce71a73bdd908c3955a90e8f7429ef”
     */
    Api.prototype.md5 = function (string: string | number | boolean, key = "30ce71a73bdd908c3955a90e8f7429ef", raw = false): string {
        return new MD5().get(string, key, raw);
    };

    /**
     * 去除空格
     * @param  str 需要去除空格的字符串
     * @param  pos both(左右)|left|right|all 默认both
     */
    Api.prototype.trim = function (str: string, pos: string): string {
        return new Trim().trim(str, pos);
    };

    /**
     * 校验是否为验证码
     * @param value 验证码字符串
     * @param len 验证码长度，不填默认为6位数
     * @return Boolean
     */
    Api.prototype.isCode = function (value: string, len: number): boolean{
        return new Test().code(value, len);
    };

    /**
     * 校验是否为数组
     * @param array 数组
     * @return Boolean
     */
    Api.prototype.isArray = function (array: Array<any>):boolean {
        return new Test().array(array);
    };

    /**
     * 校验是否为json字符串
     * @param json
     * @return Boolean
     */
    Api.prototype.isJsonString = function (json: string): boolean {
        return new Test().jsonString(json);
    };

    /**
     * 校验是否为有效值的json
     * @param json
     * @return Boolean
     */
    Api.prototype.isJson = function (json: object): boolean {
        return new Test().json(json);
    };

    /**
     * 校验是否为对象
     * @param object
     * @return Boolean
     */
    Api.prototype.isObject = function (object: object): boolean {
        return new Test().object(object);
    };

    /**
     * 校验是否为邮箱号
     * @param value
     * @return Boolean
     */
    Api.prototype.isEmail = function (value: string): boolean {
        return new Test().email(value);
    };

    /**
     * 校验是否为手机号
     * @param value
     * @return Boolean
     */
    Api.prototype.isPhone = function (value: string): boolean{
        return new Test().phone(value);
    };

    /**
     * 校验是否为URL
     * @param value
     * @return Boolean
     */
    Api.prototype.isUrl = function (value: string): boolean{
        return new Test().url(value);
    };

    /**
     * 校验是否为空
     * @param value
     * @return Boolean
     */
    Api.prototype.isEmpty = function (value: any): boolean{
        return new Test().empty(value);
    };

    /**
     * 校验是否为普通日期
     * @param value
     * @return Boolean
     */
    Api.prototype.isDate = function (value: any): boolean{
        return new Test().date(value);
    };

    /**
     * 校验是否为十进制数值
     * @param value
     * @return Boolean
     */
    Api.prototype.isNumber = function (value: any): boolean{
        return new Test().number(value);
    };

    /**
     * 校验是否为身份证号
     * @param value
     * @return Boolean
     */
    Api.prototype.isIdCard = function (value: string): boolean{
        return new Test().idCard(value);
    };

    /**
     * 判断是否为车牌号
     * @param value
     * @return Boolean
     */
    Api.prototype.isCarNo = function (value: string): boolean{
        return new Test().carNo(value);
    };

    /**
     * 校验是否为金额
     * @param value
     * @return Boolean
     */
    Api.prototype.isAmount = function (value: string): boolean{
        return new Test().amount(value);
    };

    /**
     * 校验是否为中文（汉字）
     * @param value
     * @return Boolean
     */
    Api.prototype.isChinese = function (value: string): boolean{
        return new Test().chinese(value);
    };

    /**
     * 校验是否为英文字母
     * @param value
     * @return Boolean
     */
    Api.prototype.isLetter = function (value: string): boolean{
        return new Test().letter(value);
    };

    /**
     * 校验是否为字母或者数字
     * @param value
     * @return Boolean
     */
    Api.prototype.isEnOrNum = function (value: any): boolean{
        return new Test().enOrNum(value);
    };

    /**
     * 校验是否包含某个值（如果为object，默认判断某个key是否存在，如果需要判断值，isValue = true 即可）
     * @param value
     * @param param
     * @param isValue
     * @return Boolean
     */
    Api.prototype.isContains = function (value: any, param: any, isValue: boolean) {
        return new Test().contains(value, param, isValue);
    };

    /**
     * 校验是否为验证一个值范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Api.prototype.isRange = function (value: number, param: Array<any>): boolean {
        return new Test().range(value, param);
    };

    /**
     * 校验是否为验证一个长度范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Api.prototype.isRangeLength = function (value: string, param: Array<any>): boolean {
        return new Test().rangeLength(value, param);
    };

    /**
     * 校验是否为函数方法
     * @param value
     * @return Boolean
     */
    Api.prototype.isFunc = function (value: string): boolean{
        return new Test().func(value);
    };

    /**
     * 校验是否为promise对象
     * @param value
     * @return Boolean
     */
    Api.prototype.isPromise = function (value: any): boolean{
        return new Test().promise(value);
    };

    /**
     * 校验是否为图片格式
     * @param value
     * @return Boolean
     */
    Api.prototype.isImage = function (value: string): boolean{
        return new Test().image(value);
    };

    /**
     * 校验是否为视频格式
     * @param value
     * @return Boolean
     */
    Api.prototype.isVideo = function (value: string): boolean{
        return new Test().video(value);
    };

    /**
     * 校验是否为正则对象
     * @param value
     * @return Boolean
     */
    Api.prototype.isRegExp = function (value: any): boolean{
        return new Test().regExp(value);
    };

}
