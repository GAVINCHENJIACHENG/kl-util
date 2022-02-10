var Stack = require("../structure/Stack/Stack");

module.exports =  function Utils(){
    /**
     * 进制转换算法
     * @param decNumber 转换的数字
     * @param base  转换的类型
     */
    Utils.prototype.baseConverter = function(decNumber:number, base:number):string{
        var stack = new Stack();
        var res:string = '';
        var rem:number;
        base = base||2;
        if(base < 2 || base > 36){
            return '';
        }
        while(decNumber > 0){
            rem = Math.floor(decNumber % base);
            stack.push(rem);
            decNumber = Math.floor(decNumber / base);
        }
        while (!stack.isEmpty()){
            res += stack.pop().toString();
        }
        return res;
    }

}
