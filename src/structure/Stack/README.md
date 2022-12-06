# kl-util

#### 下载安装
`npm install kl-util -D`

----------

<span id="Stack"></span>
> ### 队列 Stack

```javascript
import { Stack } from "kl-util";

const stack = new Stack();
```

|  方法  | 返回值   | 说明   | 兼容版本  |
|  ----  |  ----  | ---- | ----  |
| [push](#Stack.push)  | 无 | 在栈顶添加一个或者多个元素 | v1.0.0及以上 |
| pop  | Object | 移除栈顶的第一个元素，同时返回被移除的元素 | v1.0.0及以上 |
| peek  | Object  | 返回栈顶的元素 | v1.0.0及以上 |
| isEmpty  | Boolean  | 判断栈是否为空，是则返回true，否则返回false | v1.0.0及以上 |
| size  | Number  | 返回栈包含元素的个数 | v1.0.0及以上 |
| clear  | 无  | 清空队列 | v1.0.0及以上 |
| toString  | String  | 将栈转换成字符串格式 | v1.0.0及以上 |


<span id="Stack.push"></span>
> ##### Stack.push(element)方法

|  参数   |  说明   | 类型  | 必填  | 可选  | 兼容版本  |
|  ----  | ---- | ----  | ----  | ----  | ----  |
|  element  | 需要新增的元素 | Object  | true  |  -  | v1.0.0及以上 |
