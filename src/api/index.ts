var Model = require("../Model/Model")

var index = require("./IndexEnum");

//引入设计模式
var model = new Model();
//单例模式
var singleton = model.singletonModel;

module.exports = function Api() {
    Api.prototype.throttle = function (func: Function, wait: number) {
        return singleton(index.THROTTLE).throttle(func, wait);
    };
    Api.prototype.debounce = function (func: Function, wait: number) {
        return singleton(index.DEBOUNCE).debounce(func, wait);
    };
    Api.prototype.deepClone = function (target: any) {
        return singleton(index.DEEPCLONE).deepClone(target);
    };
    Api.prototype.deepMerge = function (target: object, source: object) {
        return singleton(index.DEEPMERGE).deepMerge(target, source);
    };
    Api.prototype.getPrototype = function (obj: object, key: string) {
        return singleton(index.PROTOTYPE).get(obj, key);
    };
    Api.prototype.setPrototype = function (obj: object, key: string, val: string) {
        return singleton(index.PROTOTYPE).set(obj, key, val);
    };
    Api.prototype.timeFormat = function (dateTime: any, fmt: string) {
        return singleton(index.TIME).timeFormat(dateTime, fmt);
    };
    Api.prototype.randomArray = function (array: Array<any>) {
        return singleton(index.ARRAY).randomArray(array);
    };
    Api.prototype.guid = function (len: number, firstU:boolean, radix: number) {
        return singleton(index.GUID).get(len,firstU,radix);
    };
    Api.prototype.colorGradient = function (startColor: string, endColor: string, step: number): Array<any> {
        return singleton(index.COLOR).colorGradient(startColor, endColor, step);
    };
    Api.prototype.hexToRgb = function (sColor: string): any{
        return singleton(index.COLOR).hexToRgb(sColor);
    };
    Api.prototype.rgbToHex = function (rgb: string): string {
        return singleton(index.COLOR).rgbToHex(rgb);
    };
    Api.prototype.colorToRgba = function (color: string, opacity: number): string {
        return singleton(index.COLOR).colorToRgba(color,opacity);
    };
    Api.prototype.objToParams = function (data: object, isPrefix: boolean, arrayFormat: string): string {
        return singleton(index.PARAMS).objToParams(data,isPrefix,arrayFormat);
    };
    Api.prototype.md5 = function (string: string | number | boolean, key = "30ce71a73bdd908c3955a90e8f7429ef", raw = false): string {
        return singleton(index.MD5).get(string, key, raw);
    };
    Api.prototype.trim = function (str: string, pos: string): string {
        return singleton(index.TRIM).trim(str, pos);
    };
    Api.prototype.isCode = function (value: string, len: number): () => any{
        return singleton(index.TEST).code(value, len);
    };
    Api.prototype.isArray = function (array: Array<any>):boolean {
        return singleton(index.TEST).array(array);
    };
    Api.prototype.isJsonString = function (json: string): boolean {
        return singleton(index.TEST).jsonString(json);
    };
    Api.prototype.isJson = function (json: object): boolean {
        return singleton(index.TEST).json(json);
    };
    Api.prototype.isObject = function (object: object): boolean {
        return singleton(index.TEST).object(object);
    };
    Api.prototype.isEmail = function (value: string): boolean {
        return singleton(index.TEST).email(value);
    };
    Api.prototype.isPhone = function (value: string): boolean{
        return singleton(index.TEST).phone(value);
    };
    Api.prototype.isUrl = function (value: string): boolean{
        return singleton(index.TEST).url(value);
    };
    Api.prototype.isEmpty = function (value: any): boolean{
        return singleton(index.TEST).empty(value);
    };
    Api.prototype.isDate = function (value: any): boolean{
        return singleton(index.TEST).date(value);
    };
    Api.prototype.isNumber = function (value: any): boolean{
        return singleton(index.TEST).number(value);
    };
    Api.prototype.isIdCard = function (value: string): boolean{
        return singleton(index.TEST).idCard(value);
    };
    Api.prototype.isCarNo = function (value: string): boolean{
        return singleton(index.TEST).carNo(value);
    };
    Api.prototype.isAmount = function (value: string): boolean{
        return singleton(index.TEST).amount(value);
    };
    Api.prototype.isChinese = function (value: string): boolean{
        return singleton(index.TEST).chinese(value);
    };
    Api.prototype.isLetter = function (value: string): boolean{
        return singleton(index.TEST).letter(value);
    };
    Api.prototype.isEnOrNum = function (value: any): boolean{
        return singleton(index.TEST).enOrNum(value);
    };
    Api.prototype.isContains = function (value: any, param: any, isValue: boolean) {
        return singleton(index.TEST).contains(value, param, isValue);
    };
    Api.prototype.isRange = function (value: number, param: Array<any>): boolean {
        return singleton(index.TEST).range(value, param);
    };
    Api.prototype.isRangeLength = function (value: string, param: Array<any>): boolean {
        return singleton(index.TEST).rangeLength(value, param);
    };
    Api.prototype.isFunc = function (value: string): boolean{
        return singleton(index.TEST).func(value);
    };
    Api.prototype.isPromise = function (value: any): boolean{
        return singleton(index.TEST).promise(value);
    };
    Api.prototype.isImage = function (value: string): boolean{
        return singleton(index.TEST).image(value);
    };
    Api.prototype.isVideo = function (value: string): boolean{
        return singleton(index.TEST).video(value);
    };
    Api.prototype.isRegExp = function (value: any): boolean{
        return singleton(index.TEST).regExp(value);
    };
    Api.prototype.isSensitive = function (str: string): boolean{
        return singleton(index.SENSITIVE).isSensitive(str);
    };
    Api.prototype.sensitiveSearch = function (str: string): Array<string>{
        return singleton(index.SENSITIVE).sensitiveSearch(str);
    };
    Api.prototype.sensitiveReplace = function (str: string,filter: Array<any>): string{
        return singleton(index.SENSITIVE).sensitiveReplace(str,filter);
    };
    Api.prototype.sensitiveFilter = function (key: (Array<any> | object | string | number | any)): boolean{
        return singleton(index.SENSITIVE).sensitiveFilter(key);
    };
    Api.prototype.sensitiveAdd = function (key: (Array<any> | object | string | number | any)): boolean{
        return singleton(index.SENSITIVE).sensitiveAdd(key);
    };
}
