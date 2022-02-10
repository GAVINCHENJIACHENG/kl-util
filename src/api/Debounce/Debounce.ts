var time: any;

/**
 * 防抖
 * @param func
 * @param wait
 */
module.exports = function Debounce ( func: Function, wait: number ) {
    if(time){
        clearTimeout(time)
    }
    return function (...args: any) {
        let _this: any = this;
        time = setTimeout(function() {
            func.apply(_this, args);
        }, wait)
    }
}
