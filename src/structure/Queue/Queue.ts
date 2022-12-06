/**
 * 队列
 *
 * set()：向队列添加元素，可根据元素数字进行排序
 * get()：获取队列数据，并且自动解析QueueElement对象，直接返回结果
 * enqueue()：向队列的尾部添加元素。
 * frontQueue()：向队列前面添加新元素。
 * dequeue()：向队列的开头移除第一个元素，并返回被移除的元素。
 * pop()：向队列移除最后的，并返回被移除的元素。
 * peekFront()：返回队列前端的第一个元素。
 * peekBack()：返回队列后端的第一个元素。
 * isEmpty()：判断队列是否为空。
 * size()：返回队列包含元素的个数。
 * clear()：清空队列。
 * toString()：将队列转换成字符串格式。
 *
 * */
module.exports = function Queue(){
    Queue.prototype.count = 0;
    Queue.prototype.items = [];

    /**
     * 元素和优先级
     * @constructor
     */
    function QueueElement (element:any,priority:number){
        QueueElement.prototype.element = element;
        QueueElement.prototype.priority = priority;
    }

    /**
     * 添加一个有排序的数据
     * @param element----添加元素----必传
     * @param priority----层级数，数量越高，越往后，为负数或者0时自动默认继承上一个元素的权重值并且+1----非必传
     */
    Queue.prototype.set = function (element:any,priority:number){
        //判断为真数值，或者大于0时，为有效权重
        if(priority && priority > 0){
            // @ts-ignore
            const queueElement = new QueueElement(element,priority);
            //锁，如果有插入元素，就为true
            let isAdd = false;
            for(let i=0;i<this.count;i++){
                if(this.items[i].priority > priority){
                    this.items.splice(i,0,queueElement);
                    isAdd = true;
                    break;
                }
            }
            if(!isAdd){
                this.items[this.count] = queueElement;
            }
            this.count += 1;
        }else{
            this.enqueue(element);
        }
    }

    /**
     * 获取队列数据，并且筛选掉权重字段
     * @returns {[]}
     */
    Queue.prototype.get = function (){
        const res = [];
        for(let i=0;i<this.count;i++){
            res.push(this.items[i].element);
        }
        return res;
    }

    /**
     * 向队列的尾部添加元素
     * @param element
     */
    Queue.prototype.enqueue = function (element:any){
        let queueElement;
        if(this.isEmpty()){
            //默认使用数组长度为元素权重值
            // @ts-ignore
            queueElement = new QueueElement(element,this.count+1);
        }else{
            //默认继承上一个元素的权重值并且+1
            // @ts-ignore
            queueElement = new QueueElement(element,this.items[this.count-1].priority+1);
        }
        this.items[this.count] = queueElement;
        this.count += 1;
    }

    /**
     * 向队列前面添加新元素
     * @param element
     * @returns {*}
     */
    Queue.prototype.frontQueue = function(element:any){
        let queueElement;
        if(this.isEmpty()){
            //默认使用数组长度为元素权重值
            // @ts-ignore
            queueElement = new QueueElement(element,this.count+1);
        }else{
            //默认继承上一个元素的权重值
            // @ts-ignore
            queueElement = new QueueElement(element,this.peekFront().priority);
            //改变所有排序值+1
            for(let i=0;i<this.count;i++){
                this.items[i].priority += 1;
            }
        }
        this.items.splice(0,0,queueElement);
        this.count += 1;
    }

    /**
     * 在队列的开头移除第一个元素，并返回被移除的元素。
     * @returns {null|T}
     */
    Queue.prototype.dequeue = function (){
        if(this.isEmpty()){
            return null;
        }
        this.count -= 1;
        return this.items.shift();
    }

    /**
     * 在队列的移除最后一个元素，并返回被移除的元素。
     * @returns {null|T}
     */
    Queue.prototype.pop = function (){
        if(this.isEmpty()){
            return null;
        }
        this.count -= 1;
        return this.items.pop();
    }

    /**
     * 返回队列的第一个元素
     * @param is----布尔类型，为true时直接返回结果，否则返回 QueueElement对象----非必填
     * @returns {*}
     */
    Queue.prototype.peekFront = function(is:boolean){
        if(this.isEmpty()){
            return undefined;
        }
        return is?this.items[0].element:this.items[0];
    }

    /**
     * 返回队列的第一个元素
     * @param is----布尔类型，为true时直接返回结果，否则返回 QueueElement对象----非必填
     * @returns {*}
     */
    Queue.prototype.peekBack = function(is:boolean){
        if(this.isEmpty()){
            return undefined;
        }
        return is?this.items[this.count-1].element:this.items[this.count-1];
    }

    /**
     * 判断队列是否为空
     * @returns {boolean}
     */
    Queue.prototype.isEmpty = function (){
        return this.count === 0;
    }

    /**
     * 返回队列包含元素的个数
     * @returns {number}
     */
    Queue.prototype.size = function (){
        return this.count;
    }

    /**
     * 清空队列
     */
    Queue.prototype.clear = function (){
        this.items = [];
        this.count = 0;
    }

    /**
     * 将队列转换成字符串格式
     * @returns {string|*[]}
     */
    Queue.prototype.toString = function(){
        if(this.isEmpty()){
            return '';
        }
        let res = "";
        this.items.forEach((item:any)=>{
            res += `QueueElement: {element: ${item.element},priority: ${item.priority}}\n`
        })
        return res;
    }
}
