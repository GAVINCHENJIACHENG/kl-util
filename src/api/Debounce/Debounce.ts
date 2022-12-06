var timeDebounce: any;

/**
 * 防抖
 * @param func
 * @param wait
 */
module.exports = function Debounce () {
    Debounce.prototype.debounce = function ( func: Function, wait: number ): Function{
        if(timeDebounce){
            clearTimeout(timeDebounce)
        }
        return (...args: any) => {
            let _this: any = this;
            timeDebounce = setTimeout(function() {
                func.apply(_this, args);
            }, wait)
        }
    }

}
