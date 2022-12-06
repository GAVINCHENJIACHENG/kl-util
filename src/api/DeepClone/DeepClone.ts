/**
 * 深度克隆
 * 可克隆类型包括：String，Number，Undefined，Boolean，Null，Object，JSON，Array，Date，RegExp,Function
 * @param obj
 */
module.exports = function DeepClone(){
    DeepClone.prototype.deepClone = function (obj: any): any{
        let t: any = typeof obj;
        if( Object.is(t, "string") || Object.is(t, "number") || Object.is(t, "undefined") || Object.is(t, "boolean") || Object.is(t, "function") || Object.is(obj,null)){
            return obj;
        } else if ( Object.is(Object.prototype.toString.call(obj), "[object Date]") ){
            return new Date(obj.getTime())
        } else if ( Object.is(Object.prototype.toString.call(obj), "[object RegExp]") ){
            return new RegExp(obj)
        } else if ( Array.isArray(obj) ) {
            let arr: Array<any> = [];
            for (let i=0; i<obj.length; i++) {
                // @ts-ignore
                arr.push(this.deepClone(obj[i]));
            }
            return arr;
        } else {
            var res: object = {};
            for(var key in obj) {
                // @ts-ignore
                res[key] = this.deepClone(obj[key]);
            }
            return res;
        }
    }

}
