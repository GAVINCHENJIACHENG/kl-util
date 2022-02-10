# kl-util

#### 下载安装
`npm install kl-util -D`

----------

|  方法  | 返回值   | 说明   | 兼容版本  |
|  ----  |  ----  | ---- | ----  |
|  [throttle](#Api.throttle)  | Boolean | 节流 | v1.0.0 |
|  [debounce](#Api.debounce)  | Boolean | 防抖 | v1.0.0 |
|  [deepClone](#Api.deepClone)  | Any | 深度克隆 | v1.0.0 |
|  [deepMerge](#Api.deepMerge)  | Any | 对象深度合并 | v1.0.0 |
|  [getProperty](#Api.getProperty) | Any | 链式读取对象属性 | v1.0.0 |
|  [setPrototype](#Api.setPrototype) | Boolean | 链式设置对象属性 | v1.0.0 |
|  [timeFormat](#Api.timeFormat)  | String | 格式化时间 | v1.0.0 |
|  [randomArray](#Api.randomArray)  | Array | 数组乱序 | v1.0.0 |
|  [colorGradient](#Api.colorGradient)  | Array | 颜色渐变 | v1.0.0 |
|  [hexToRgb](#Api.hexToRgb)  | String | 十六进制Hex转RGB | v1.0.0 |
|  [rgbToHex](#Api.rgbToHex)  | String | RGB转十六进制Hex | v1.0.0 |
|  [colorToRgba](#Api.colorToRgba)  | String | 颜色透明度 | v1.0.0 |
|  [objToParams](#Api.objToParams)  | String | 对象转url参数 | v1.0.0 |
|  [md5](#Api.md5)  | String | md5加密 | v1.0.0 |
|  [trim](#Api.trim)  | String | 去除空格 | v1.0.0 |

#### 校验方法
|  方法  | 返回值   | 说明   | 兼容版本  |
|  ----  |  ----  | ---- | ----  |
|  [isCode](#Api.isCode)  | Boolean | 校验是否为 “验证码” | v1.0.0 |
|  [isArray](#Api.isArray)  | Boolean | 校验是否为 “数组” | v1.0.0 |
|  [isJsonString](#Api.isJsonString)  | Boolean | 校验是否为 “json字符串” | v1.0.0 |
|  [isJson](#Api.isJson)  | Boolean | 校验是否为 “有效值的json” | v1.0.0 |
|  [isObject](#Api.isObject)  | Boolean | 校验是否为 “对象” | v1.0.0 |
|  [isEmail](#Api.isEmail)  | Boolean | 校验是否为 “邮箱号 | v1.0.0 |
|  [isPhone](#Api.isPhone)  | Boolean | 校验是否为 “手机号” | v1.0.0 |
|  [isUrl](#Api.isUrl)  | Boolean | 校验是否为 “URL” | v1.0.0 |
|  [isEmpty](#Api.isEmpty)  | Boolean | 校验是否为 “空” | v1.0.0 |
|  [isDate](#Api.isDate)  | Boolean | 校验是否为 “普通日期” | v1.0.0 |
|  [isNumber](#Api.isNumber)  | Boolean | 校验是否为 “十进制数值” | v1.0.0 |
|  [isIdCard](#Api.isIdCard)  | Boolean | 校验是否为 “身份证号” | v1.0.0 |
|  [isCarNo](#Api.isCarNo)  | Boolean | 校验是否为 “车牌号” | v1.0.0 |
|  [isAmount](#Api.isAmount)  | Boolean | 校验是否为 “金额” | v1.0.0 |
|  [isChinese](#Api.isChinese)  | Boolean | 校验是否为 “中文（汉字）” | v1.0.0 |
|  [isLetter](#Api.isLetter)  | Boolean | 校验是否为 “英文字母” | v1.0.0 |
|  [isEnOrNum](#Api.isEnOrNum)  | Boolean | 校验是否为 “字母或者数字” | v1.0.0 |
|  [isContains](#Api.isContains)  | Boolean | 校验是否 “包含某个值” | v1.0.0 |
|  [isRange](#Api.isRange)  | Boolean | 校验是否为 “验证一个值范围[min, max]” | v1.0.0 |
|  [isRangeLength](#Api.isRangeLength)  | Boolean | 校验是否为 “验证一个长度范围[min, max]” | v1.0.0 |
|  [isFunc](#Api.isFunc)  | Boolean | 校验是否为 “函数方法” | v1.0.0 |
|  [isPromise](#Api.isPromise)  | Boolean | 校验是否为 “promise对象” | v1.0.0 |
|  [isImage](#Api.isImage)  | Boolean | 校验是否为 “图片格式” | v1.0.0 |
|  [isVideo](#Api.isVideo)  | Boolean | 校验是否为 “视频格式” | v1.0.0 |
|  [isRegExp](#Api.isRegExp)  | Boolean | 校验是否为 “正则对象” | v1.0.0 |
----------

<span id="Api.throttle"></span>
> ##### Api.throttle(func, wait)节流
> >规定时间内，只触发一次，可以通过设置immediate来决定触发的时机在这个时间的开始，还是结束的时候执行。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  func  | 回调函数 | Function  | true  |  -  |
|  wait  | 时间间隔，单位ms | Number  | true  |  -  |

> ##### 示例：

````vue
<script>
    import { Api } from 'kl-util';
    var api = new Api();
    export default {
        methods: {
            btnBClick() {
                // 此处用法为在js中调用
                api.throttle(this.toNext, 500)
            },
            toNext() {
                console.log('btnBClick');
            }
        }
    }
</script>
````
----------

<span id="Api.debounce"></span>
> ##### Api.debounce(func, wait)防抖
>> 在连续的操作中，无论进行了多长时间，只有某一次的操作后在指定的时间内没有再操作，这一次才被判定有效

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  func  | 回调函数 | Function  | true  |  -  |
|  wait  | 时间间隔，单位ms | Number  | true  |  -  |

> ##### 示例：
````vue
<script>
    import { Api } from 'kl-util';
    var api = new Api();
    export default {
        methods: {
            btnBClick() {
                // 此处用法为在js中调用
                api.debounce(this.toNext, 500)
            },
            toNext() {
                console.log('btnBClick');
            }
        }
    }
</script>
````

----------

<span id="Api.deepClone"></span>
> ##### Api.deepClone(target)深度克隆
>> 场景：

>>   我们平时可能会遇到需要通过console.log打印一个对象，至执行打印的时刻，此对象为空，后面的逻辑中对此对象进行了修改赋值，但是我们在控制台直接看到的打印结果 却是修改后的值，这让人匪夷所思，虽然我们可以通过console.log(JSON.parse(JSON.stringify(object)))的形式处理，但是需要写这长长的一串，难免让人心生抵触。

>>   当我们将一个对象(变量A)赋值给另一个变量(变量B)时，修改变量B，因为对象引用的特性，导致A也同时被修改，所以有时候我们需要将A克隆给B，这样修改B的时候，就不会 导致A也被修改。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  target  | 克隆对象 | Object  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
var api = new Api();
let a = {
	name: 'mary'
};

// 直接赋值，为对象引用，即修改b等于修改a，因为a和b为同一个值
let b = a;

b.name = 'juli';
console.log(b); // 结果为 {name: 'juli'}
console.log(a); // 结果为 {name: 'juli'}


// 深度克隆
let b = api.deepClone(a);

b.name = 'juli';
console.log(b); // 结果为 {name: 'juli'}
console.log(a); // 结果为 {name: 'mary'}
````

----------

<span id="Api.deepMerge"></span>
> ##### Api.deepMerge(target, source)对象深度合并
>>在ES6中，我们可以很方便的使用Object.assign进行对象合并，但这只是浅层的合并，如果对象的属性为数组或者对象的时候，会导致属性内部的值丢失。
  
>>  注意： 此处合并不同于Object.assign，因为Object.assign(a, b)会修改a的值为最终的结果(这往往不是我们所期望的)，但是deepMerge(a, b)并不会修改a的值。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  target  | 目标对象 | Object  | true  |  -  |
|  source  | 源对象 | Object  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
var api = new Api();
let a = {
	info: {
		name: 'mary'
	}
}

let b = {
	info: {
		age: '22'
	}
}

let c = api.deepMerge(a, b);

// c为我们期望的结果
c = {
	info: {
		age: '22',
		name: 'mary'
	}
}
````
----------

<span id="Api.getProperty"></span>
> ##### Api.getProperty(obj, key)链式读取对象属性
>> 读取属性时，我们需要从一个对象中进行操作，否则就会引起报错，因此提供了一个链式属性的读取方式。当然，我们也可以使用可选链操作符的形式去获取。支持使用数组下标

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  obj  | 目标对象 | Object  | true  |  -  |
|  key  | 对象属性名 | String  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
var api = new Api();
// 假设有如下一个对象
const object = {
	userInfo: {
		address: {
			province: '深圳'
		}
	}
}

// 可以通过如下写法获取province属性
api.getProperty(object, 'userInfo.address.province')
````

----------

<span id="Api.setPrototype"></span>
> ##### Api.setPrototype(obj, key)链式设置对象属性
>> 设置属性时，我们需要从一个对象中进行操作，否则就会引起报错，因此提供了一个链式属性的设置方式。支持使用数组下标

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  obj  | 目标对象 | Object  | true  |  -  |
|  key  | 对象属性名 | String  | true  |  -  |
|  val  | 值 | Object  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
var api = new Api();
// 设置一个空对象
const object = {}

// 链式设置属性
api.setProperty(object, 'userInfo.address.province')

// object将会变成如下对象：
{
	userInfo: {
		address: {
			province: '深圳'
		}
	}
}
````

----------

<span id="Api.timeFormat"></span>
> ##### Api.timeFormat(dateTime, fmt)格式化时间
>> 该函数必须传入第一个参数，格式为任何合法的时间格式、秒或毫秒的时间戳，第二个参数是可选的，返回的值类似刚刚，25分钟前，3小时前，7天前的结果。 如果第二个参数是时间的格式，当前和传入时间戳相差大于一个月时，返回格式化好的时间；如果第二个参数为false，则不会返回格式化好的时间，而是诸如"xxx年前"的结果。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  obj  | 目标对象 | Object  | true  |  -  |
|  key  | 对象属性名 | String  | true  |  -  |
|  val  | 值 | Object  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
var api = new Api();
console.log(api.timeFormat(new Date()));
console.log(api.timeFormat(new Date(), 'yyyy-mm-dd'));
console.log(api.timeFormat(new Date().getTime(), 'yyyy-mm-dd'));
````

----------

<span id="Api.randomArray"></span>
> ##### Api.randomArray(array)数组乱序
>> 该函数可以打乱一维数组元素的顺序，这是随机过程

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  array  | 数组 | Array  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.randomArray([1,2,3,4,5,6,7,8,9]))
````

----------

<span id="Api.colorGradient"></span>
> ##### Api.colorGradient(startColor, endColor, step)颜色渐变
>> 该函数实现两个颜色值之间等分取值，返回一个数组，元素为十六进制形式的颜色值，数组长度为step值。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  startColor  | 开始颜色值，可以是HEX或者RGB颜色值，如#0afdce或者rgb(120, 130, 150) | String  | true  |  -  |
|  endColor  | 结束颜色值，可以是HEX或者RGB颜色值，如#0afdce或者rgb(120, 130, 150) | String  | true  |  -  |
|  step  | 均分值，把开始值和结束值平均分成多少份 | Number  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.colorGradient('rgb(250,250,250)', 'rgb(252,252,252)', 3))

//返回结果 (3) ['#fafafa', '#fbfbfb', '#fcfcfc']
````

----------

<span id="Api.hexToRgb"></span>
> ##### Api.hexToRgb(sColor)十六进制Hex转RGB
>> 该函数可以将一个Hex的十六进制颜色值转换成一个RGB颜色值

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  sColor  | HEx颜色值，如#0afdce | String  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.hexToRgb("#000"));

//返回结果 rgb(0,0,0)
````

----------

<span id="Api.rgbToHex"></span>
> ##### Api.rgbToHex(rgb)RGB转十六进制Hex
>> 该函数可以将一个RGB颜色值转换成一个Hex的十六进制颜色值

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  rgb  | RGB颜色值，如rgb(230, 231, 233) | String  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.rgbToHex("rgb(0,0,0)"));

//返回结果 #000000
````

----------

<span id="Api.colorToRgba"></span>
> ##### Api.colorToRgba(color,opacity)颜色透明度
>> 该函数可以接受一个十六进制或者rgb格式的颜色值(不能接受命名式颜色格式，比如white)，返回此颜色的rgba格式值

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  color  | 颜色值，只能hex或者rgba格式 | String  | true  |  -  |
|  opacity  | 不透明度值，取值为0-1之间 | Number  | false  |  0-1  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

//返回 rgba(0,0,0,0.35)
console.log(api.colorToRgba('#000000', 0.35));
//返回 rgba(109,180,0,0.4)
console.log(api.colorToRgba('rgb(109, 180, 0)', 0.4));
````

----------

<span id="Api.objToParams"></span>
> ##### Api.objToParams(color,opacity)对象转url参数
>> 该方法，可以将一个对象形式参数转换成get传参所需参数形式，如把{name: 'lisa', age: 20}转换成?name=lisa&age=20

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  data  | 对象 | Object  | true  |  -  |
|  isPrefix  | 是否自动加上"?"，默认自动true | Boolean  | false  |  -  |
|  arrayFormat  | 规则 indices、brackets、repeat、comma | String  | false  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

let data = {
    name: "gavin",
    age: 20,
    fruits: ['apple', 'banana', 'orange']
}

//返回结果 ?name=gavin&age=20&fruits[]=apple&fruits[]=banana&fruits[]=orange
console.log(api.objToParams(data));


//返回结果 name=gavin&age=20&fruits[]=apple&fruits[]=banana&fruits[]=orange
console.log(api.objToParams(data,false));


//返回结果 name=gavin&age=20&fruits[0]=apple&fruits[1]=banana&fruits[2]=orange
console.log(api.objToParams(data, false, "indices"));


//返回结果 name=gavin&age=20&fruits[]=apple&fruits[]=banana&fruits[]=orange
console.log(api.objToParams(data, false, "brackets"));


//返回结果 name=gavin&age=20&fruits=apple&fruits=banana&fruits=orange
console.log(api.objToParams(data, false, "repeat"));


//返回结果 name=gavin&age=20&fruits=apple,banana,orange
console.log(api.objToParams(data, false, "comma"));
````

----------

<span id="Api.md5"></span>
> ##### Api.md5(string, key)md5加密

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  string  | 需要加密的字符串 | String  | true  |  -  |
|  key  | 密钥，如果不填，默认为 “30ce71a73bdd908c3955a90e8f7429ef” | String  | false  |    |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

// 不传key的情况下 返回8072f1be03f75681ef28a1b16b481a43
console.log(api.md5("123456"));


// key的情况下 返回2fa5a2a2d2e9d68a2cfb9821e2415464
console.log(api.md5("123456", "123456789"));
````

----------

<span id="Api.trim"></span>
> ##### Api.trim(str, pos)md5加密

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  str  | 需要去除空格的字符串 | String  | true  |  -  |
|  pos  | 模式，默认both | String  | false  |  both、left、right、all  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

// 返回结果 "a b c"
console.log(api.trim(" a b c "));


// 返回结果 "a b c "
console.log(api.trim(" a b c ", "left"));


// 返回结果 " a b c"
console.log(api.trim(" a b c", "right"));


// 返回结果 "abc"
console.log(api.trim(" a b c ", "all"));
````

----------

<span id="Api.isCode"></span>
> ##### Api.isCode(value, len)校验是否为验证码
>> 校验是否验证码，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 验证码字符串 | String  | true  |  -  |
|  len  | 验证码长度，不填默认为6位数 | Number  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isCode(123456));    // 不传验证码长度，默认为6位数 返回true
console.log(api.isCode(123456, 6));    // true
console.log(api.isCode("123456", 6));    // true
console.log(api.isCode("123456", 4));    // false
console.log(api.isCode("1234567", 6));   // false
console.log(api.isCode("12345a", 6));   // false
````

----------

<span id="Api.isArray"></span>
> ##### Api.isArray(array)校验是否为验证码
>> 校验是否为验证码，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  array  | 需要校验的值 | any  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isArray([]));   // true
console.log(api.isArray([1,2,3]));  // true
console.log(api.isArray("[1,2,3]"));    //false
console.log(api.isArray({}));   //false
````

----------

<span id="Api.isJsonString"></span>
> ##### Api.isJsonString(json)校验是否为json字符串
>> 校验是否为json字符串，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  json  | Json字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isJsonString({}));      // false
console.log(api.isJsonString({"name": "gavin"}));   //false
console.log(api.isJsonString({"name": "gavin"}));   //false
console.log(api.isJsonString("{'name': 'gavin'}"));   //false
console.log(api.isJsonString("{name: 'gavin'}"));   //false
console.log(api.isJsonString('{"name": "gavin"}'));   //true
````

----------

<span id="Api.isJson"></span>
> ##### Api.isJson(json)校验是否为有效值的json
>> 校验是否为有效值的json，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  json  | Json字符串 | object  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isJson('{"name": "gavin"}'));   //false
console.log(api.isJsonString({name: "gavin"}));   //false
console.log(api.isJson({"name": "gavin"}));   //true
````

----------

<span id="Api.isJson"></span>
> ##### Api.isJson(object)校验是否为对象
>> 校验是否为对象，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  object  | 对象 | object  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isObject("123"));   //false
console.log(api.isObject([]));      //false
console.log(api.isObject(new RegExp('')));  //false
console.log(api.isObject(new Object()));    //true
console.log(api.isObject({}));      //true
````

----------

<span id="Api.isEmail"></span>
> ##### Api.isEmail(value)校验是否为邮箱号
>> 校验是否为邮箱号，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isEmail("gavin@163.com"));  //true
console.log(api.isEmail("gavin@qq.com"));  //true
console.log(api.isEmail("gavin@253.com"));  //true
console.log(api.isEmail("gavin.com"));  //false
````

----------

<span id="Api.isPhone"></span>
> ##### Api.isPhone(value)校验是否为手机号
>> 校验是否为手机号，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isPhone("1370000000"));     //false
console.log(api.isPhone("10000000000"));    //false
console.log(api.isPhone("13700000000"));    //true
console.log(api.isPhone(13700000000));      //true
````

----------

<span id="Api.isUrl"></span>
> ##### Api.isUrl(value)校验是否为URL
>> 校验是否为URL，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isUrl("www.baidu.com"));    //false
console.log(api.isUrl("baidu.com"));    //false
console.log(api.isUrl("http://www.baidu.com"));    //true
console.log(api.isUrl("https://www.baidu.com"));    //true
console.log(api.isUrl("https://baidu.com"));    //true
````

----------

<span id="Api.isEmpty"></span>
> ##### Api.isEmpty(value)校验是否为空
>> 校验是否为空，返回true或者false。

>>1、值为undefined(一种类型)，非字符串"undefined"
  
>>2、字符串长度为0，也即空字符串
  
>>3、值为false(布尔类型)，非字符串"false"
  
>>4、值为数值0(非字符串"0")，或者NaN
  
>>5、值为null，空对象{}，或者长度为0的数组

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的值 | any  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isEmpty(""));    //true
console.log(api.isEmpty({}));    //true
console.log(api.isEmpty([]));    //true
console.log(api.isEmpty(null));    //true
console.log(api.isEmpty(undefined));    //true
console.log(api.isEmpty(NaN));    //true
console.log(api.isEmpty(123));    //false
console.log(api.isEmpty({name: "gavin"}));    //false
console.log(api.isEmpty([1,2,3]));    //false
````

----------

<span id="Api.isDate"></span>
> ##### Api.isDate(value)校验是否为普通日期
>> 校验是否为普通日期，返回true或者false。

####### 如下行为正确：
###### `2020-02-10`，`2020-02-10 08:32:10`，`2020/02/10 3:10`，`2020/02/10 03:10`，`2020/02-10 3:10`
####### 如下为错误：
###### `2020年02月10日`，`2020-02-10 25:32`

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isDate("2022-02-10"));    //true
console.log(api.isDate("2022-02-10 08:32:10"));    //true
console.log(api.isDate("2022/02/10 3:10"));    //true
console.log(api.isDate("2022/02/10 03:10"));    //true
console.log(api.isDate("2022/02-10 3:10"));    //true
console.log(api.isDate(new Date()));    //true
console.log(api.isDate(1644393909689));    //true
console.log(api.isDate("2022年02月10日"));    //false
console.log(api.isDate("2022-02-10 25:32"));    //false
````

----------

<span id="Api.isNumber"></span>
> ##### Api.isNumber(value)校验是否为十进制数值
>> 校验是否为十进制数值，整数，小数，负数，带千分位数(2,359.08)等可以检验通过，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的值 | any  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isNumber("abc"));   //false
console.log(api.isNumber([]));   //false
console.log(api.isNumber({}));   //false
console.log(api.isNumber(null));   //false
console.log(api.isNumber(NaN));   //false
console.log(api.isNumber(123));   //true
console.log(api.isNumber(123.12));   //true
console.log(api.isNumber("2359.08"));   //true
console.log(api.isNumber("1000"));   //true
console.log(api.isNumber(-1000));   //true
````

----------

<span id="Api.isIdCard"></span>
> ##### Api.isIdCard(value)校验是否为身份证号
>> 校验是否为身份证号，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isIdCard("441283199910310775"));    //true
````

----------

<span id="Api.isCarNo"></span>
> ##### Api.isCarNo(value)判断是否为车牌号
>> 判断是否为车牌号，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isCarNo("粤A57034"));    //true
console.log(api.isCarNo("粤57034"));     //false
````

----------

<span id="Api.isAmount"></span>
> ##### Api.isAmount(value)校验是否为金额
>> 校验是否为金额，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isAmount("3,233.08"));    //true
console.log(api.isAmount("233.08"));    //true
console.log(api.isAmount(233.08));   //true
console.log(api.isAmount("-3,233.08"));     //false
console.log(api.isAmount("$3,233.08"));     //false
console.log(api.isAmount("￥3,233.08"));     //false
````

----------

<span id="Api.isChinese"></span>
> ##### Api.isChinese(value)校验是否为中文（汉字）
>> 校验是否为中文（汉字），返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isChinese("中国人不骗中国人"));    //true
console.log(api.isChinese("中国人不骗中国人1"));    //false
````

----------

<span id="Api.isLetter"></span>
> ##### Api.isLetter(value)校验是否为英文字母
>> 校验是否为英文字母，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isLetter("123"));     //false
console.log(api.isLetter("abc1"));     //false
console.log(api.isLetter("ABC1"));     //false
console.log(api.isLetter("abc"));    //true
console.log(api.isLetter("ABC"));    //true
````

----------

<span id="Api.isEnOrNum"></span>
> ##### Api.isEnOrNum(value)校验是否为字母或者数字
>> 校验是否为字母或者数字，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的字符串 | any  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isEnOrNum("123abc"));     //false
console.log(api.isEnOrNum("~)"));     //false
console.log(api.isEnOrNum("123)"));     //false
console.log(api.isEnOrNum("abc)"));     //false
console.log(api.isEnOrNum("abc"));    //true
console.log(api.isEnOrNum(123));    //true
console.log(api.isEnOrNum("123"));    //true
````

----------

<span id="Api.isContains"></span>
> ##### Api.isContains(value, param, isValue)校验是否为字母或者数字
>> 校验是否为字母或者数字，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 需要校验的对象 | any  | true  |  -  |
|  param  | 匹配的对象 | any  | true  |  -  |
|  isValue  | 是否切换为判断属性值（object类型才生效） | Boolean  | false  |  -  |

> ##### 字符串示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

let str = "123";
console.log(api.isContains(str,12));       //true
console.log(api.isContains(str,23));       //true
console.log(api.isContains(str,"23"));       //true
console.log(api.isContains(str,"234"));       //false
````

> ##### 数组示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

let arr = [1,2,3,4,5,6,"gavin","yami","7","8","9"];
console.log(api.isContains(arr,1));       //true
console.log(api.isContains(arr,"yami"));       //true
console.log(api.isContains(arr,"kl"));       //false
console.log(api.isContains(arr,9));       //false
````

> ##### 校验对象是否包含key示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

let obj = {
    "code": "success",
    "message": "success",

}
console.log(api.isContains(obj,"message"));    //true
console.log(api.isContains(obj,"code"));    //true
console.log(api.isContains(obj,"data"));    //false
console.log(api.isContains(obj,"success"));    //false
````

> ##### 校验对象是否包含value示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

let obj = {
    "code": "success",
    "message": "success",
    "date": new Date(),
    "reg": /.png/,
    // @ts-ignore
    "nulls": null,
    // @ts-ignore
    "undefined": undefined,

}
console.log(api.isContains(obj,"success",true));     //true;
console.log(api.isContains(obj,null,true));     //true;
console.log(api.isContains(obj,undefined,true));     //true;
console.log(api.isContains(obj,/.png/,true));     //false;
console.log(api.isContains(obj,new Date(),true));     //false;
console.log(api.isContains(obj,"message",true));     //false;
````

----------

<span id="Api.isRange"></span>
> ##### Api.isRange(value, param)校验是否为验证一个值范围[min, max]
>> 校验是否为验证一个值范围[min, max]，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 数值 | Number  | true  |  -  |
|  param  | 范围，如[10,25] | Array  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isRange(35, [30, 34]));     //false;
console.log(api.isRange(31, [30, 34]));     //true;
````

----------

<span id="Api.isRangeLength"></span>
> ##### Api.isRangeLength(value, param)校验是否为验证一个长度范围[min, max]
>> 校验是否为验证一个长度范围[min, max]，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 校验字符串 | String  | true  |  -  |
|  param  | 范围，如[10,25] | Array  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isRangeLength("abc",[3,20]));     //true;
console.log(api.isRangeLength("ab",[3,20]));     //false;
console.log(api.isRangeLength("a0",[3,20]));     //false;
````

----------

<span id="Api.isFunc"></span>
> ##### Api.isFunc(value)校验是否为函数方法
>> 校验是否为函数方法，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 校验字符串 | String  | true  |  -  |
|  param  | 范围，如[10,25] | Array  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isFunc(()=>{}));     //true;
console.log(api.isFunc(function(){}));     //false;
console.log(api.isFunc("function(){}"));     //false;
````

----------

<span id="Api.isPromise"></span>
> ##### Api.isPromise(value)校验是否为promise对象
>> 校验是否为promise对象，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 校验对象 | any  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isPromise(new Promise(()=>{})));    //true
````


----------

<span id="Api.isImage"></span>
> ##### Api.isImage(value)校验是否为图片格式
>> 校验是否为图片格式，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 校验字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isImage("abc.png"));    //true
console.log(api.isImage("abc.jpg"));    //true
console.log(api.isImage("abc.gif"));    //true
console.log(api.isImage("abc.jpeg"));    //true
console.log(api.isImage("abc.text"));     //false;
````

----------

<span id="Api.isVideo"></span>
> ##### Api.isVideo(value)判断是否为视频格式
>> 判断是否为视频格式，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 校验字符串 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isVideo("abc.mp4"));    //true
console.log(api.isVideo("abc.mpg"));    //true
console.log(api.isVideo("abc.mpeg"));    //true
console.log(api.isVideo("abc.mov"));    //true
console.log(api.isVideo("abc.rmvb"));    //true
console.log(api.isVideo("abc.text"));     //false;
````

----------

<span id="Api.isRegExp"></span>
> ##### Api.isRegExp(value)是否为正则对象
>> 是否为正则对象，返回true或者false。

|  参数   |  说明   | 类型  | 必填  | 可选  |
|  ----  | ---- | ----  | ----  | ----  |
|  value  | 校验正则表达式 | string  | true  |  -  |

> ##### 示例：
````javascript
import { Api } from 'kl-util';
//new Api对象
var api = new Api();

console.log(api.isRegExp(/~/));    //true
console.log(api.isRegExp(new RegExp("")));    //true
console.log(api.isRegExp("//"));     //false;
````
