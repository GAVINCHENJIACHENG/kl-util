# kl-util

#### 下载安装
`npm install kl-util -D`

----------


<span id="DoublyLinkedList"></span>
> ### 双向链表 DoublyLinkedList对象

> ##### 双向链表继承了单向链表，因为双向链表的特性，重写了`push`，`insert`，`removeAt`，`clear`，`toString`方法

```javascript
import { DoublyLinkedList } from "kl-util";

const doublylinkedList = new DoublyLinkedList();
```

|  方法  |返回值 | 说明   | 兼容版本  |
|  ----  | ---- | ---- | ----  |
| [push](#DoublyLinkedList.push)  | 无 | 向双向链表尾部添加一个新元素 | v1.0.0 |
| [insert](#DoublyLinkedList.insert)  | 无 | 在双向链表指定位置插入一个新元素 | v1.0.0 |
| [getElementAt](#DoublyLinkedList.getElementAt)  | Node | 返回双向链表中特定位置的元素，如果没有则返回undefined | v1.0.0 |
| [remove](#DoublyLinkedList.remove)  | Node.element | 从双向链表中移除一个元素 | v1.0.0 |
| [indexOf](#DoublyLinkedList.indexOf)  | Number | 从双向链表指定位置移除一个元素 | v1.0.0 |
| [removeAt](#DoublyLinkedList.removeAt)  | Node.element | 从双向链表中移除一个元素,未找到返回-1 | v1.0.0 |
| isEmpty  | Boolean  | 判断队列是否为空 | v1.0.0 |
| size  | Number  | 返回队列包含元素的个数 | v1.0.0 |
| getHead  | Node  | 返回双向链表的第一个元素 | v1.0.0 |
| clear  | 无  | 清空队列 | v1.0.0 |
| toString  | String  | 将队列转换成字符串格式 | v1.0.0 |

<span id="DoublyLinkedList.push"></span>
> ##### DoublyLinkedList.push(element)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要新增的元素 | Object  | true  |  -  |


<span id="DoublyLinkedList.insert"></span>
> ##### DoublyLinkedList.insert(element,position)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要新增的元素 | Object  | true  |  -  |
|  position  | 需要插入的下标位置 | Number  | true  |  -  |

<span id="DoublyLinkedList.getElementAt"></span>
> ##### DoublyLinkedList.getElementAt(index)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  index  | 双向链表下标 | Number  | true  |  -  |

<span id="DoublyLinkedList.remove"></span>
> ##### DoublyLinkedList.remove(element)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要删除的元素 | Object  | true  |  -  |

<span id="DoublyLinkedList.indexOf"></span>
> ##### DoublyLinkedList.indexOf(element)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要查找的元素 | Object  | true  |  -  |

<span id="DoublyLinkedList.removeAt"></span>
> ##### DoublyLinkedList.removeAt(index)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  index  | 节点下标 | Object  | true  |  -  |
