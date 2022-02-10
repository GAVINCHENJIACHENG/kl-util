/**
 * 栈
 *
 * push()：在栈顶添加一个或者多个元素。
 * pop()：移除栈顶的第一个元素，同时返回被移除的元素。
 * peek()：返回栈顶的元素。
 * isEmpty()：判断栈是否为空，是则返回true，否则返回false
 * clear()：移除栈中的所有元素。
 * size()：返回栈中元素的个数。
 */
module.exports = function Stack() {

    this.count = 0;
    this.items = [];

    /**
     * 新增一个元素
     * @param element
     */
    Stack.prototype.push = function(element:any){
        this.items[this.count] = element;
        this.count += 1;
    }

    /**
     * 删除第一个元素
     * @returns {undefined|T}
     */
    Stack.prototype.pop = function(){
        if(this.isEmpty()){
            return undefined;
        }
        this.count -= 1;
        return this.items.pop();
    }

    /**
     * 返回栈顶得元素
     * @returns {*}
     */
    Stack.prototype.peek = function(){
        return this.items[this.count-1];
    }

    /**
     * 判断是否为空
     * @returns {boolean}
     */
    Stack.prototype.isEmpty = function(){
        return this.size() === 0;
    }

    /**
     * 清除所有
     */
    Stack.prototype.clear = function(){
        this.count = 0;
        this.items = [];
    }

    /**
     * 栈的数量
     * @returns {number}
     */
    Stack.prototype.size = function(){
        return this.count;
    }

    Stack.prototype.toString = function(){
        if(this.isEmpty()){
            return '';
        }
        return this.items.join(",");
    }
}

