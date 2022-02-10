# kl-util

#### 下载安装
`npm install kl-util -D`

----------

|  对象   |  说明   |
|  ----  | ---- |
|  [Stack](#Stack)  | 栈 |
|  [Queue](#Queue)  | 队列 |
|  [LinkedList](#LinkedList)  | 链表 |
|  [Utils](#Utils)  | 工具 |

----------

<span id="Stack"></span>
> ### 队列 Stack

```javascript
import { Stack } from "kl-util";

const stack = new Stack();
```

|  方法  | 返回值   | 说明   | 兼容版本  |
|  ----  |  ----  | ---- | ----  |
| [push](#Stack.push)  | 无 | 在栈顶添加一个或者多个元素 | v1.0.0 |
| pop  | Object | 移除栈顶的第一个元素，同时返回被移除的元素 | v1.0.0 |
| peek  | Object  | 返回栈顶的元素 | v1.0.0 |
| isEmpty  | Boolean  | 判断栈是否为空，是则返回true，否则返回false | v1.0.0 |
| size  | Number  | 返回栈包含元素的个数 | v1.0.0 |
| clear  | 无  | 清空队列 | v1.0.0 |
| toString  | String  | 将栈转换成字符串格式 | v1.0.0 |


<span id="Stack.push"></span>
> ##### Stack.push(element)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要新增的元素 | Object  | true  |  -  |


----------

<span id="Queue"></span>
> ### 队列 Queue对象

```javascript
import { Queue } from "kl-util";

const queue = new Queue();
```

|  方法  | 返回值   | 说明   | 兼容版本  |
|  ----  |  ----  | ---- | ----  |
| [set](#Queue.set)  | 无  | 向队列添加元素，可根据元素数字进行排序 | v1.0.0 |
| get  | Array  | 获取队列数据，并且自动解析QueueElement对象，直接返回结果 | v1.0.0 |
| [enqueue](#Queue.enqueue)  | 无  | 向队列的尾部添加元素 | v1.0.0 |
| [frontQueue](#Queue.frontQueue)  | 无  | 向队列前面添加新元素 | v1.0.0 |
| dequeue  | Object  | 向队列的开头移除第一个元素，并返回被移除的元素 | v1.0.0 |
| pop  | Object  | 向队列移除最后的，并返回被移除的元素 | v1.0.0 |
| [peekFront](#Queue.peekFront)  | Object  | 返回队列前端的第一个元素 | v1.0.0 |
| [peekBack](#Queue.frontQueue)  | Object  | 返回队列后端的第一个元素 | v1.0.0 |
| isEmpty  | Boolean  | 判断队列是否为空 | v1.0.0 |
| size  | Number  | 返回队列包含元素的个数 | v1.0.0 |
| clear  | 无  | 清空队列 | v1.0.0 |
| toString  | String  | 将队列转换成字符串格式 | v1.0.0 |

<span id="Queue.set"></span>
> ##### Queue.set(element,priority)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要新增的元素 | Object  | true  | -  |
|  priority  | 层级数，数量越高，越往后，为负数或者0时自动默认继承上一个元素的权重值并且+1 | Number  | false  | -  |

<span id="Queue.enqueue"></span>
> ##### Queue.enqueue(element)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要新增的元素 | Object  | true  |  -  |

<span id="Queue.frontQueue"></span>
> ##### Queue.frontQueue(element)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要新增的元素 | Object  | true  | -  |

<span id="Queue.peekFront"></span>
> ##### Queue.peekFront(is)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  is  | 布尔类型，为true时直接返回结果，否则返回 QueueElement对象 | Boolean  | false  | true/false  |

<span id="Queue.frontQueue"></span>
> ##### Queue.frontQueue(is)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  is  | 布尔类型，为true时直接返回结果，否则返回 QueueElement对象 | Boolean  | false  | true/false  |


----------

<span id="LinkedList"></span>
> ### 链表 LinkedList对象

```javascript
import { LinkedList } from "kl-util";

const linkedList = new LinkedList();
```

|  方法  |返回值 | 说明   | 兼容版本  |
|  ----  | ---- | ---- | ----  |
| [push](#LinkedList.push)  | 无 | 向链表尾部添加一个新元素 | v1.0.0 |
| [insert](#LinkedList.insert)  | 无 | 在链表指定位置插入一个新元素 | v1.0.0 |
| [getElementAt](#LinkedList.getElementAt)  | Node | 返回链表中特定位置的元素，如果没有则返回undefined | v1.0.0 |
| [remove](#LinkedList.remove)  | Node.element | 从链表中移除一个元素 | v1.0.0 |
| [indexOf](#LinkedList.indexOf)  | Number | 从链表指定位置移除一个元素 | v1.0.0 |
| [removeAt](#LinkedList.removeAt)  | Node.element | 从链表中移除一个元素,未找到返回-1 | v1.0.0 |
| isEmpty  | Boolean  | 判断队列是否为空 | v1.0.0 |
| size  | Number  | 返回队列包含元素的个数 | v1.0.0 |
| getHead  | Node  | 返回链表的第一个元素 | v1.0.0 |
| clear  | 无  | 清空队列 | v1.0.0 |
| toString  | String  | 将队列转换成字符串格式 | v1.0.0 |

<span id="LinkedList.push"></span>
> ##### LinkedList.push(element)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要新增的元素 | Object  | true  |  -  |


<span id="LinkedList.insert"></span>
> ##### LinkedList.insert(element,position)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要新增的元素 | Object  | true  |  -  |
|  position  | 需要插入的下标位置 | Number  | true  |  -  |

<span id="LinkedList.getElementAt"></span>
> ##### LinkedList.getElementAt(index)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  index  | 链表下标 | Number  | true  |  -  |

<span id="LinkedList.remove"></span>
> ##### LinkedList.remove(element)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要删除的元素 | Object  | true  |  -  |

<span id="LinkedList.indexOf"></span>
> ##### LinkedList.indexOf(element)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  element  | 需要查找的元素 | Object  | true  |  -  |

<span id="LinkedList.removeAt"></span>
> ##### LinkedList.removeAt(index)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  index  | 节点下标 | Object  | true  |  -  |

----------

<span id="Utils"></span>
> ### 工具 Utils

```javascript
import { Utils } from "kl-util";

const utils = new Utils();
```

|  方法  |返回值   | 说明   | 兼容版本  |
|  ----  |  ----  | ---- | ----  |
| [baseConverter](#Utils.baseConverter) | String | 在栈顶添加一个或者多个元素 | v1.0.0 |


<span id="Utils.baseConverter"></span>
> ##### Utils.baseConverter(decNumber, base)方法

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  decNumber  | 转换的数字 | Number  | true  |  -  |
|  base  | 转换的类型 | Number  | false  |  -  |

