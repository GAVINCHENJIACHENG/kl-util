var DeepClone = require("../DeepClone/DeepClone")

module.exports = function DeepMerge() {
    DeepMerge.prototype.deepMerge = function (target: object, source: object): object | boolean{
        target = new DeepClone().deepClone(target)
        if (typeof target !== 'object' || typeof source !== 'object') return false
        for (const prop in source) {
            if (!source.hasOwnProperty(prop)) continue
            if (prop in target) {
                if (typeof (<any>target)[prop] !== 'object') {
                    (<any>target)[prop] = (<any>source)[prop]
                } else if (typeof (<any>source)[prop] !== 'object') {
                    (<any>target)[prop] = (<any>source)[prop]
                } else if ((<any>target)[prop] === null){
                    (<any>target)[prop] = null;
                } else if ((<any>target)[prop].concat && (<any>source)[prop].concat) {
                    (<any>target)[prop] = (<any>target)[prop].concat((<any>source)[prop])
                } else {
                    (<any>target)[prop] = this.deepMerge((<any>target)[prop], (<any>source)[prop])
                }
            } else {
                (<any>target)[prop] = (<any>source)[prop]
            }
        }
        return target
    }

}
