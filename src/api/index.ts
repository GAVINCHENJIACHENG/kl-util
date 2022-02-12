var Model = require("../Model/Model")
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

//引入设计模式
var model = new Model();
//单例模式
var singleton = model.singleton;

module.exports = function Api() {
    Api.prototype.throttle = function (func: Function, wait: number) {
        return singleton(Throttle,"Throttle").throttle(func, wait);
    };
    Api.prototype.debounce = function (func: Function, wait: number) {
        return singleton(Debounce,"Debounce").debounce(func, wait);
    };
    Api.prototype.deepClone = function (target: any) {
        return singleton(DeepClone,"DeepClone").deepClone(target);
    };
    Api.prototype.deepMerge = function (target: object, source: object) {
        return singleton(DeepMerge,"DeepMerge").deepMerge(target, source);
    };
    Api.prototype.getPrototype = function (obj: object, key: string) {
        return singleton(Prototype,"Prototype").get(obj, key);
    };
    Api.prototype.setPrototype = function (obj: object, key: string, val: string) {
        return singleton(Prototype,"Prototype").set(obj, key, val);
    };
    Api.prototype.timeFormat = function (dateTime: any, fmt: string) {
        return singleton(Time,"Time").timeFormat(dateTime, fmt);
    };
    Api.prototype.randomArray = function (array: Array<any>) {
        return singleton(ArrayObj,"ArrayObj").randomArray(array);
    };
    Api.prototype.guid = function (len: number, firstU:boolean, radix: number) {
        return singleton(Guid,"Guid").get(len,firstU,radix);
    };
    Api.prototype.colorGradient = function (startColor: string, endColor: string, step: number): Array<any> {
        return singleton(Color,"Color").colorGradient(startColor, endColor, step);
    };
    Api.prototype.hexToRgb = function (sColor: string): any{
        return singleton(Color,"Color").hexToRgb(sColor);
    };
    Api.prototype.rgbToHex = function (rgb: string): string {
        return singleton(Color,"Color").rgbToHex(rgb);
    };
    Api.prototype.colorToRgba = function (color: string, opacity: number): string {
        return singleton(Color,"Color").colorToRgba(color,opacity);
    };
    Api.prototype.objToParams = function (data: object, isPrefix: boolean, arrayFormat: string): string {
        return singleton(Params,"Params").objToParams(data,isPrefix,arrayFormat);
    };
    Api.prototype.md5 = function (string: string | number | boolean, key = "30ce71a73bdd908c3955a90e8f7429ef", raw = false): string {
        return singleton(MD5,"MD5").get(string, key, raw);
    };
    Api.prototype.trim = function (str: string, pos: string): string {
        return singleton(Trim,"Trim").trim(str, pos);
    };
    Api.prototype.isCode = function (value: string, len: number): () => any{
        return singleton(Test,"Test").code(value, len);
    };
    Api.prototype.isArray = function (array: Array<any>):boolean {
        return singleton(Test,"Test").array(array);
    };
    Api.prototype.isJsonString = function (json: string): boolean {
        return singleton(Test,"Test").jsonString(json);
    };
    Api.prototype.isJson = function (json: object): boolean {
        return singleton(Test,"Test").json(json);
    };
    Api.prototype.isObject = function (object: object): boolean {
        return singleton(Test,"Test").object(object);
    };
    Api.prototype.isEmail = function (value: string): boolean {
        return singleton(Test,"Test").email(value);
    };
    Api.prototype.isPhone = function (value: string): boolean{
        return singleton(Test,"Test").phone(value);
    };
    Api.prototype.isUrl = function (value: string): boolean{
        return singleton(Test,"Test").url(value);
    };
    Api.prototype.isEmpty = function (value: any): boolean{
        return singleton(Test,"Test").empty(value);
    };
    Api.prototype.isDate = function (value: any): boolean{
        return singleton(Test,"Test").date(value);
    };
    Api.prototype.isNumber = function (value: any): boolean{
        return singleton(Test,"Test").number(value);
    };
    Api.prototype.isIdCard = function (value: string): boolean{
        return singleton(Test,"Test").idCard(value);
    };
    Api.prototype.isCarNo = function (value: string): boolean{
        return singleton(Test,"Test").carNo(value);
    };
    Api.prototype.isAmount = function (value: string): boolean{
        return singleton(Test,"Test").amount(value);
    };
    Api.prototype.isChinese = function (value: string): boolean{
        return singleton(Test,"Test").chinese(value);
    };
    Api.prototype.isLetter = function (value: string): boolean{
        return singleton(Test,"Test").letter(value);
    };
    Api.prototype.isEnOrNum = function (value: any): boolean{
        return singleton(Test,"Test").enOrNum(value);
    };
    Api.prototype.isContains = function (value: any, param: any, isValue: boolean) {
        return singleton(Test,"Test").contains(value, param, isValue);
    };
    Api.prototype.isRange = function (value: number, param: Array<any>): boolean {
        return singleton(Test,"Test").range(value, param);
    };
    Api.prototype.isRangeLength = function (value: string, param: Array<any>): boolean {
        return singleton(Test,"Test").rangeLength(value, param);
    };
    Api.prototype.isFunc = function (value: string): boolean{
        return singleton(Test,"Test").func(value);
    };
    Api.prototype.isPromise = function (value: any): boolean{
        return singleton(Test,"Test").promise(value);
    };
    Api.prototype.isImage = function (value: string): boolean{
        return singleton(Test,"Test").image(value);
    };
    Api.prototype.isVideo = function (value: string): boolean{
        return singleton(Test,"Test").video(value);
    };
    Api.prototype.isRegExp = function (value: any): boolean{
        return singleton(Test,"Test").regExp(value);
    };

}
