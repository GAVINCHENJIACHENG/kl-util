var timeDebounce: any;

/**
 * 防抖
 * @param func
 * @param wait
 */
module.exports = function Debounce ( func: Function, wait: number ) {
    if(timeDebounce){
        clearTimeout(timeDebounce)
    }
    return function (...args: any) {
        let _this: any = this;
        timeDebounce = setTimeout(function() {
            func.apply(_this, args);
        }, wait)
    }
}
