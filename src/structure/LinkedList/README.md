# kl-util

#### 下载安装
`npm install kl-util -D`

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
