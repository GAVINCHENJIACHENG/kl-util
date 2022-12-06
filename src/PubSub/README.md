# kl-util

#### 下载安装
`npm install kl-util -D`

----------

<span id="Model"></span>
> ### 设计模式-发布与订阅 PubSub

```javascript
import { PubSub } from "kl-util";

const pubSub = new PubSub();
```

|  方法  | 返回值   | 说明   | 兼容版本  |
|  ----  |  ----  | ---- | ----  |
| [subscriber](#PubSub.subscriber) | - | 订阅 | v1.0.8及以上 |
| [publish](#PubSub.publish) | - | 订阅 | v1.0.8及以上 |


<span id="PubSub.subscriber"></span>
> ##### pubSub.subscriber(name, callback)方法

|  参数   |  说明   | 类型  | 必填  | 可选  | 兼容版本  |
|  ----  | ---- | ----  | ----  | ----  | ----  |
|  name  | 订阅名称 | String  | true  |  -  | v1.0.8及以上 |
|  callback  | 回调函数，发布时会回调此函数 | Function  | true  |  -  | v1.0.8及以上 |

<span id="PubSub.publish"></span>
> ##### pubSub.publish(name, args)方法

|  参数   |  说明   | 类型  | 必填  | 可选  | 兼容版本  |
|  ----  | ---- | ----  | ----  | ----  | ----  |
|  name  | 订阅名称 | String  | true  |  -  | v1.0.8及以上 |
|  args  | 任意参数 | any  | false  |  -  | v1.0.8及以上 |
