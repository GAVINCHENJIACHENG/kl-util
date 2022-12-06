/**
 * 链表
 *
 * push(element)：向链表尾部添加一个新元素。
 * insert(element,position)：在链表指定位置插入一个新元素。
 * getElementAt(index)：返回链表中特定位置的元素，如果没有则返回undefined。
 * remove(element)：从链表中移除一个元素。
 * indexOf(element)：返回元素在链表中的索引，如果没有则返回-1。
 * removeAt(position)：从链表指定位置移除一个元素。
 * isEmpty()：如果链表中不包含任何元素，则返回true，否则返回false。
 * size()：返回链表包含的元素个数。
 * getHead()：返回链表的第一个元素。
 * getHead()：清空链表。
 * toString()：返回表示整个链表的字符串。
 *
 */
module.exports = function LinkedList (){
    LinkedList.prototype.count = 0;
    LinkedList.prototype.head = null;

    function Node (element:any){
        Node.prototype.element = element;
        Node.prototype.next = null;
    }

    LinkedList.prototype.Node = Node;

    /**
     * 向链表尾部添加一个新元素
     * @param element
     */
    LinkedList.prototype.push = function (element:any){
        // @ts-ignore
        var node =  new Node(element);
        if(this.head){
            var current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = node;
        } else {
            this.head = node;
        }
        this.count += 1;
    }

    /**
     * 在链表指定位置插入一个新元素
     * @param element
     * @param position
     * @returns {undefined}
     */
    // @ts-ignore
    LinkedList.prototype.insert = function (element:any,position:number){
        if(position < 0){
            return undefined;
        } else if(this.count <= position){
            this.push(element);
        } else {
            // @ts-ignore
            var node = new Node(element);
           if(position === 0){
               node.next = this.head;
               this.head = node;
           } else {
               var res = this.getElementAt(position - 1);
               node.next = res.next;
               res.next = node;
           }
           this.count += 1;
        }

    }

    /**
     * 返回链表中特定位置的元素，如果没有则返回undefined
     * @param index
     * @returns {Node|undefined}
     */
    LinkedList.prototype.getElementAt = function (index: number){
        if(this.count <= index){
            return undefined;
        }
        var current = this.head;
        for(var i=0;i<index;i++){
            current = current.next;
        }
        return current;
    }

    /**
     * 从链表中移除一个元素
     * @param element
     * @returns {Node.element}
     */
    LinkedList.prototype.remove = function (element: any){
        return this.removeAt(this.indexOf(element));
    }

    /**
     * 返回元素在链表中的索引，如果没有则返回-1
     * @param element
     * @returns {number}
     */
    LinkedList.prototype.indexOf = function (element: any){
        if(this.count > 0){
            var current = this.head;
            for(var i=0;i<this.count;i++){
                console.log(current.element)
                if(current.element === element){
                    return i;
                }else{
                    current = current.next;
                }
            }
        }
        return -1;
    }

    /**
     * 从链表指定位置移除一个元素
     * @param index
     * @returns {undefined|*}
     */
    LinkedList.prototype.removeAt = function (index: number){
        if(index < 0||this.count === 0||index >= this.count){
           return undefined;
        }
        var current = this.head
        if(index === 0){
            this.head = current.next;
        } else {
            var element = this.getElementAt(index - 1);
            current = element.next;
            element.next = current.next;
        }
        this.count -= 1;
        return current.element;
    }

    /**
     * 如果链表中不包含任何元素，则返回true，否则返回false
     * @returns {boolean}
     */
    LinkedList.prototype.isEmpty = function (){
        return this.count === 0;
    }

    /**
     * 返回链表包含的元素个数
     * @returns {number}
     */
    LinkedList.prototype.size = function (){
        return this.count;
    }

    /**
     * 返回链表的第一个元素
     * @returns {Node|null}
     */
    LinkedList.prototype.getHead = function (){
        return this.head;
    }

    /**
     * 清空链表
     */
    LinkedList.prototype.clear = function (){
        this.head = null;
    }

    /**
     * 返回表示整个链表的字符串
     * @returns {string}
     */
    LinkedList.prototype.toString = function (){
        if(this.count===0){
            return "";
        }
        var str = "";
        var num = 0;
        var current = this.head;
        while (current.next){
            str += `LinkedList: {element: ${current.element}, index: ${num}} next ----> ${current.next.element}\n`
            num += 1;
            current = current.next;
        }
        str += `LinkedList: {element: ${current.element}, index: ${num}} next ----> null\n`
        return str;
    }
}
