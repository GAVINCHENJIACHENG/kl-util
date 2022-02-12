var DeepClone = require("../DeepClone/DeepClone")

module.exports = function DeepMerge() {
    DeepMerge.prototype.deepMerge = function (target: object, source: object){
        target = new DeepClone().deepClone(target)
        if (typeof target !== 'object' || typeof source !== 'object') return false
        for (const prop in source) {
            if (!source.hasOwnProperty(prop)) continue
            if (prop in target) {
                // @ts-ignore
                // console.log(target[prop].concat)
                // @ts-ignore
                if (typeof target[prop] !== 'object') {
                    // @ts-ignore
                    target[prop] = source[prop]
                    // @ts-ignore
                } else if (typeof source[prop] !== 'object') {
                    // @ts-ignore
                    target[prop] = source[prop]
                    // @ts-ignore
                } else if (target[prop] === null){
                    // @ts-ignore
                    target[prop] = null;
                    // @ts-ignore
                } else if (target[prop].concat && source[prop].concat) {
                    // @ts-ignore
                    target[prop] = target[prop].concat(source[prop])
                } else {
                    // @ts-ignore
                    target[prop] = this.deepMerge(target[prop], source[prop])
                }
            } else {
                // @ts-ignore
                target[prop] = source[prop]
            }
        }
        return target
    }

}
