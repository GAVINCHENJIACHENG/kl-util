var valid:boolean = true;
/**
 * API.节流
 * @param func
 * @param wait
 */
module.exports = function Throttle() {
    Throttle.prototype.throttle = function (func: Function,wait: number){
        return (...args: any) =>{
            if(!valid){
                return false
            }
            valid = false;
            let _this = this;
            setTimeout( function(){
                func.apply(_this, args);
                valid = true;
            },wait)
        }
    }

}
