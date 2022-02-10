# kl-util

#### 下载安装
`npm install kl-util -D`

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
