var key = require("./key.txt")
var Test = require("../Test/Test");

module.exports = function Sensitive() {
    let test = new Test();
    // 敏感词
    let wordArray: Array<number | string> = key.split("|");

    /**
     * 敏感词检测
     * @param str 需要检测的字符串
     */
    Sensitive.prototype.isSensitive = function (str: string): boolean{
        return !!this.sensitiveSearch(str);
    };

    /**
     * 敏感词搜索
     * @param str 需要检测的字符串
     */
    Sensitive.prototype.sensitiveSearch = function (str: string): Array<string | number> {
        if(!str)return [];
        let values: Array<string | number> = [];
        for(let i=0;i<wordArray.length;i++) {
            if(str.indexOf(wordArray[i] as string) !== -1){
                values.push(wordArray[i]);
            }
        }
        return values;
    };

    /**
     * 敏感词替换**
     * @param str 需要检测的字符串
     * @param filter 不替换以下敏感词
     */
    Sensitive.prototype.sensitiveReplace = function (str: string, filter= []): string{
        var key: string[] = this.sensitiveSearch(str);
        if(!key)return str;
        for(let i=0;i<key.length;i++){
            for(let j=0;j<filter.length;j++){
                if(key[i] === filter[j]){
                    key.splice(i,1)
                }
            }
            if(key.length === 0)return str;
            //根据字符数量来替换成*
            let rep: string = "";
            for(let j=0;j<key[i].length;j++){
                rep += "*";
            }
            str = str.replace(key[i],rep);

        }

        return str;
    };
    /**
     * 忽略敏感词
     *
     * Object: 获取value添加
     * String: 如果检测符含有“|”，既是切为另一个敏感词，比如（你好|我好|大家好）会切成3个敏感词
     *
     * @param key 敏感词对象，支持多种格式，比如：Array，Object，String，Number
     */
    Sensitive.prototype.sensitiveFilter = function (key: string[] | object | string | number ): boolean{
        if(test.array(key)){
            for(let i=0;i<(key as Array<string>).length;i++){
                this.sensitiveFilter((key as Array<string>)[i]);
            }
            return true;
        } else if (test.object(key)) {
            for(let i in (<object>key)){
                this.sensitiveFilter((key as any)[i]);
            }
            return true;
        } else if (test.number(key)||Object.prototype.toString.call(key) === "[object String]"){
            if(Object.prototype.toString.call(key) === "[object String]" && (<string>key).indexOf("|") !== -1){
                key = (<string>key).split("|");
                return this.sensitiveFilter(key);
            }else{
                for(let j=0;j<wordArray.length;j++){
                    if(key === wordArray[j]){
                        wordArray.splice(j,1);
                    }
                }
            }
            return true;
        }
        return false;
    };
    /**
     * 新增敏感词
     *
     * Array|Number: 直接添加到数组后面
     * Object: 获取value添加
     * String: 如果检测符含有“|”，既是切为另一个敏感词，比如（你好|我好|大家好）会切成3个敏感词
     *
     * @param key 敏感词对象，支持多种格式，比如：Array，Object，String，Number
     */
    Sensitive.prototype.sensitiveAdd = function (key:  Array<string> | object | string | number ): boolean{
        if(test.array(key)){
            for(let i=0;i<(key as Array<string>).length;i++){
                wordArray.push((key as  Array<string>)[i])
            }
            return true;
        } else if (test.object(key)) {
            for(let k in (<object>key)){
                wordArray.push((key as any)[k])
            }
            return true;
        } else if (test.number(key)||Object.prototype.toString.call(key) === "[object String]"){
            if(Object.prototype.toString.call(key) === "[object String]" && (<string>key).indexOf("|") !== -1){
                key = (<string>key).split("|");
                return this.sensitiveAdd(key);
            }else{
                wordArray.push(<number>key);
            }
            return true;
        }
        return false;
    };
}
