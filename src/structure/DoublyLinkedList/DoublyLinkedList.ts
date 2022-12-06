const LinkedList = require("../LinkedList/LinkedList");

/**
 * 双向链表
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
function DoublyLinkedList(){
    //结尾元素
    DoublyLinkedList.prototype.tail = null;
    //内部类
    function Node(element: any){
        Node.prototype.element = element;
        Node.prototype.next = null;
        Node.prototype.prev = null;
    }

    /**
     * push(element)：向链表尾部添加一个新元素。
     * @param element
     */
    DoublyLinkedList.prototype.push = function(element: any){
        // @ts-ignore
        var node = new Node(element);
        if(this.head){
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }else{
            this.tail = node;
            this.head = node;
        }
        this.count += 1;
    }

    /**
     * 在链表指定位置插入一个新元素。
     * @param element
     * @param position
     * @returns {undefined}
     */
    // @ts-ignore
    DoublyLinkedList.prototype.insert = function (element: any, position: number){
        if(position < 0){
            return undefined;
        } else if(this.count <= position){
            this.push(element);
        } else {
            // @ts-ignore
            var node = new Node(element);
            if(position === 0||this.head === null){
                node.next = this.head;
                this.head = node;
                this.tail = node;
            } else {
                const previous = this.getElementAt(position - 1)
                let current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count += 1;
        }
    }

    /**
     * 返回表示整个链表的字符串
     * @returns {string}
     */
    DoublyLinkedList.prototype.toString = function (){
        if(this.count===0){
            return "";
        }
        let str = "";
        let num = 0;
        let current = this.head;
        while (current.next){
            str += `DoublyLinkedList: next{element: ${current.element}, index: ${num}} next ----> ${current.next.element}\n`
            num += 1;
            current = current.next;
        }
        str += `DoublyLinkedList: next{element: ${current.element}, index: ${num}} next ----> null\n\n\n\n`
        let current2 = this.tail;
        while(current2.prev){
            str += `DoublyLinkedList: prev{element: ${current2.element}, index: ${num}} prev ----> ${current2.prev.element}\n`
            num += 1;
            current2 = current2.prev;
        }
        str += `DoublyLinkedList: prev{element: ${current2.element}, index: ${num}} prev ----> null\n\n\n\n`
        return str;
    }
}
//继承单向链表
let linkedList = new LinkedList();
DoublyLinkedList.prototype = linkedList.constructor.prototype;
module.exports = DoublyLinkedList;
