//设计模式
module.exports = function Model () {
    //已创建的实例
    var instances = {};

    /**
     * 单例模式（开放至APi接口）
     * @param e 实例对象
     * @param key 实例对象名，如果检测到存在，则返回已存在的实例。除非singleton=false
     * @param is 是否开启单例模式，默认已开启
     */
    Model.prototype.singleton = function (e: any, key: string,is = true){
        return this.singleton({obj: e,name: key},is);
    }

    /**
     * 单例模式
     * @param e 枚举对象
     * @param is 是否开启单例模式，默认已开启
     */
    Model.prototype.singletonModel = function (e: object,is = true){
        return (function (){
            // @ts-ignore
            if(!instances[e.name]||!is){
                // @ts-ignore
                instances[e.name] = arguments.length?new e.obj(...arguments):new e.obj();
            }
            // @ts-ignore
            return instances[e.name];
        })();
    }
}


