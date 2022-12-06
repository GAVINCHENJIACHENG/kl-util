# kl-util

#### 下载安装
`npm install kl-util -D`

----------

<span id="Model"></span>
> ### 设计模式 Model

```javascript
import { Model } from "kl-util";

const model = new Model();
```

|  方法  | 返回值   | 说明   | 兼容版本  |
|  ----  |  ----  | ---- | ----  |
| [singleton](#Model.singleton) | String | 单例模式 | v1.0.1及以上 |


<span id="Model.singleton"></span>
> ##### Model.singleton(e, key, is)方法

|  参数   |  说明   | 类型  | 必填  | 可选  | 兼容版本  |
|  ----  | ---- | ----  | ----  | ----  | ----  |
|  e  | 实例对象 | Any  | true  |  -  | v1.0.1及以上 |
|  key  | 实例对象名，如果检测到存在，则返回已存在的实例。除非singleton=false | String  | true  |  -  | v1.0.1及以上 |
|  is  | 是否开启单例模式，默认已开启 | Boolean  | false  |  -  | v1.0.1及以上 |

