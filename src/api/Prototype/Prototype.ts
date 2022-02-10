
module.exports = function Prototype() {

    /**
     * 读取属性
     * @param obj
     * @param key
     */
    Prototype.prototype.get = function (obj: object, key: string){
        //判断key是否不为字符串或者为空数组
        if(typeof key !== 'string' || !key || typeof obj !== 'object') {
            return null;
        } else {
            var keys: Array<string> = key.split(".");
            var turn: object = this.turn(keys[0]);
            // @ts-ignore
            var res: object = Object.is(turn.type,"array")?obj[turn.name][turn.index]||{}:obj[turn.name]||{};
            for(var i = 1; i < keys.length; i++) {
                if(res){
                    turn = this.turn(keys[i]);
                    //如果key不存在，就返回null
                    // @ts-ignore
                    if(!res[turn.name])return null;
                    // @ts-ignore
                    res = Object.is(turn.type,"array")?res[turn.name][turn.index]||{}:res[turn.name]||{}
                }
            }
            // this.value = res||null;
            return res||null;
        }
    }

    /**
     * 修改属性
     * @param obj
     * @param key
     * @param val
     */
    Prototype.prototype.set = function(obj: object, key: string, val: string) {
        //获取链名
        var keys = key.split(".");
        var turn;
        for(var i=0;i<keys.length;i++){
            //获取keys类型
            turn = this.turn(keys[i])
            //如果key不存在，就返回false；
            // @ts-ignore
            if(!obj[turn.name])return false;
            // 如果keys长度小于等于1或者查找到最后一个key时，直接赋值
            if(keys.length <= 1 || keys.length-1 <= i){
                // @ts-ignore
                if(turn.type === "array"){
                    // 数组操作
                    // @ts-ignore
                    obj[turn.name][turn.index] = val;
                }else{
                    // 普通对象操作
                    // @ts-ignore
                    obj[turn.name] = val;
                }
            }else{
                // @ts-ignore
                if(turn.type === "array"){
                    // 数组操作
                    // @ts-ignore
                    obj =  obj[turn.name][turn.index];
                } else {
                    // 普通对象操作
                    // @ts-ignore
                    obj =  obj[turn.name];
                }
            }
        }
        return true;
    }

    /**
     * 判断是否为数组下标
     * @param key
     */
    Prototype.prototype.is = function (key: string): boolean {
        return key.indexOf("[") !== -1 && key.indexOf("]") != -1;
    }

    /**
     * 获取数组下标和key,否则直接返回key
     * @param key
     */
    Prototype.prototype.turn = function (key: string): object {
        if(this.is(key)){
            var left = key.split("[");
            var right = left[1].split("]");
            return {
                name: left[0],
                index: Number(right[0]),
                type: "array"
            }
        }else{
            return {
                name: key,
                type: "object"
            }
        }

    }

}

