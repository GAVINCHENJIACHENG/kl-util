//设计模式
module.exports = function Model () {
    //已创建的实例
    var instances = {};
    /**
     * 单例模式
     * @param e 实例对象
     * @param key 实例对象名，如果检测到存在，则返回已存在的实例。除非singleton=false
     * @param is 是否开启单例模式，默认已开启
     */
    Model.prototype.singleton = function (e: any,key: string,is = true){
        return (function (){
            // @ts-ignore
            if(!instances[key]||!is){
                // @ts-ignore
                instances[key] = arguments.length?new e(...arguments):new e();
            }
            // @ts-ignore
            return instances[key];
        })();
    }
}


