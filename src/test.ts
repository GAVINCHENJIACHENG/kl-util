// @ts-ignore
import {Stack,Utils,Queue,LinkedList,DoublyLinkedList,Api} from "./index";

// let doublyLinkedList = new DoublyLinkedList();
// //测试push方法
// function push(){
//     doublyLinkedList.push("aaa");
//     doublyLinkedList.push("bbb");
//     doublyLinkedList.push("ccc");
//     console.log(doublyLinkedList.toString());
// }
//
// function insert(){
//     doublyLinkedList.insert("ddd",0);
//     doublyLinkedList.insert("eee",3);
//     doublyLinkedList.insert("fff",4);
//     console.log(doublyLinkedList.toString());
// }
//
// setTimeout(()=>push(),10);//测试push方法
// setTimeout(()=>insert(),0);//测试insert方法



// doublyLinkedList.push("aaa");
// doublyLinkedList.push("bbb");
// // doublyLinkedList.push("ccc");
// doublyLinkedList.push("ddd");
// doublyLinkedList.push("eee");
// doublyLinkedList.push("fff");
// doublyLinkedList.push("ggg");
// doublyLinkedList.push("hhh");
// doublyLinkedList.push("jjj");
// console.log(doublyLinkedList.toString());
// doublyLinkedList.insert("ccc",2);
// doublyLinkedList.push("jjj");
// // console.log(doublyLinkedList.indexOf("ccc"))
// // console.log(doublyLinkedList.remove("kkk"))
// console.log(doublyLinkedList.getHead())
// console.log(doublyLinkedList.size())
// console.log(doublyLinkedList.isEmpty())
// console.log(doublyLinkedList.toString());
// console.log(doublyLinkedList)

// let linkedList = new LinkedList();
// linkedList.push("aaa");
// linkedList.push("bbb");
// linkedList.push("ccc");
// linkedList.push("ddd");
// linkedList.push("eee");
// linkedList.push("fff");
// linkedList.push("ggg");
// linkedList.push("hhh");
// linkedList.push("jjj");
// console.log(linkedList.toString());
// linkedList.insert("kkk",2);
// console.log(linkedList.indexOf("ccc"))
// console.log(linkedList.remove("kkk"))
// console.log(linkedList.getHead())
// console.log(linkedList.size())
// console.log(linkedList.isEmpty())
// console.log(linkedList.toString());
//
//
// const queue = new Queue();
// queue.enqueue('gavin');
// queue.enqueue('yami');
// queue.set("wahahah",1);
// queue.set("aaaaa",2);
// queue.set("bbbbb",3);
// queue.set("ccccc",4);
// queue.set("ddddd",5);
// queue.set("eeeee",6);
// queue.frontQueue("lllll");
// queue.frontQueue("llawdaw");
// console.log(queue.dequeue());
// console.log(queue.pop());
// console.log(queue.peekFront(true))
// console.log(queue.peekBack(true))
// console.log(queue.toString())
// console.log(queue.get())
//
// const stack = new Stack();
// stack.push("yami");
// stack.push("gavin");
// stack.push("lucky");
// console.log(stack.toString())
// console.log(stack.pop());
// console.log(stack.pop());
// stack.push("lala");
// console.log(stack.toString())
// console.log(stack)
// console.log(stack.peek())
// console.log(stack.size());
// stack.clear();
// console.log(stack.toString());
//
// const util = new Utils();
// console.log(util.baseConverter(100));

var api = new Api();
api.throttle(()=>{
    console.log(111)
},2000)();
setTimeout(()=>{
    api.throttle(()=>{
        console.log(222)
    },2500)();
},2500)
// api.throttle(()=>{
//     console.log(333)
// },2000)();
// api.throttle(()=>{
//     console.log(444)
// },2000)();
// //
// api.debounce((e:any)=>{
//     console.log(e)
// },0)(111);
// api.debounce((e:any)=>{
//     console.log(e)
// },0)(222);
// api.debounce((e:any)=>{
//     console.log(e)
// },0)(333);
//
//
//
//
// let obj = {
//     "code": "success",
//     "message": "success",
//     "date": new Date(),
//     "reg": /.png/,
//     // @ts-ignore
//     "nulls": null,
//     // @ts-ignore
//     "undefined": undefined,
//     "Object": new Object(),
//     "JSON": {
//         "id": 12134,
//         "uid": 490537,
//         "username": "🌝",
//         "source_type": "luck_draw",
//         "source_id": 57206,
//         "prize_name": "22.22元现金奖励",
//         "prize_type": "cash",
//         "handle_status": "information_complete",
//         "create_time": "2022-01-24 10:02:28",
//         "update_time": "2022-01-24 10:02:28",
//         "cash_info": {
//             "id": 12134,
//             "account": "18027215212",
//             "name": "黄文俊",
//             "cent": 22000,
//             "create_time": "2022-01-25 17:23:59",
//             "update_time": "2022-01-25 17:24:00"
//         }
//     },
//     "function": function(){console.log("aaaaa")},
//     "data": [
//         {
//             "id": 12134,
//             "uid": 490537,
//             "username": "🌝",
//             "source_type": "luck_draw",
//             "source_id": 57206,
//             "prize_name": "22.22元现金奖励",
//             "prize_type": "cash",
//             "handle_status": "information_complete",
//             "create_time": "2022-01-24 10:02:28",
//             "update_time": "2022-01-24 10:02:28",
//             "cash_info": {
//                 "id": 12134,
//                 "account": "18027215212",
//                 "name": "黄文俊",
//                 "cent": 22000,
//                 "create_time": "2022-01-25 17:23:59",
//                 "update_time": "2022-01-25 17:24:00"
//             }
//         },
//         {
//             "id": 12133,
//             "uid": 490538,
//             "username": "烟火里的尘埃",
//             "source_type": "luck_draw",
//             "source_id": 57206,
//             "prize_name": "22.22元现金奖励",
//             "prize_type": "cash",
//             "handle_status": "information_complete",
//             "create_time": "2022-01-24 10:02:28",
//             "update_time": "2022-01-24 10:02:28"
//         }
//     ]
// }
//
// let objs = {
//     "code": "success",
//     "message": "success",
//     "date": new Date(),
//     "reg": /.png/,
//     // @ts-ignore
//     "nulls": null,
//     // @ts-ignore
//     "undefined": undefined,
//     "Object": new Object(),
//     "JSON": {
//         "id": 12134,
//         "uid": 490537,
//         "username": "🌝",
//         "source_type": "luck_draw",
//         "source_id": 57206,
//         "prize_name": "22.22元现金奖励",
//         "prize_type": "cash",
//         "handle_status": "information_complete",
//         "create_time": "2022-01-24 10:02:28",
//         "update_time": "2022-01-24 10:02:28",
//         "gavin": 1,
//         "cash_info": {
//             "gavin": 2,
//             "id": 12134,
//             "account": "18027215212",
//             "name": "黄文俊",
//             "cent": 22000,
//             "create_time": "2022-01-25 17:23:59",
//             "update_time": "2022-01-25 17:24:00"
//         }
//     },
//     "function": function(){console.log("aaaaa")},
//     "data": [
//         {
//             "id": 12134,
//             "uid": 490537,
//             "username": "🌝",
//             "source_type": "luck_draw",
//             "source_id": 57206,
//             "prize_name": "22.22元现金奖励",
//             "prize_type": "cash",
//             "handle_status": "information_complete",
//             "create_time": "2022-01-24 10:02:28",
//             "update_time": "2022-01-24 10:02:28",
//             "gavin": 1,
//
//
//             "cash_info": {
//                 "gavin": 2,
//                 "id": 12134,
//                 "account": "18027215212",
//                 "name": "黄文俊",
//                 "cent": 22000,
//                 "create_time": "2022-01-25 17:23:59",
//                 "update_time": "2022-01-25 17:24:00",
//                 "arr": [
//                     {
//                         name: "gavin",
//                         "arr": [
//                             {
//                                 name: "gavin",
//                             },
//                             {
//                                 name: "yami"
//                             }
//                         ],
//                     },
//                     {
//                         name: "yami",
//                         "arr": [
//                             {
//                                 name: "gavin",
//                             },
//                             {
//                                 name: "yami"
//                             }
//                         ],
//                     }
//                 ],
//             },
//         },
//         {
//             "id": 12133,
//             "uid": 490538,
//             "username": "烟火里的尘埃",
//             "source_type": "luck_draw",
//             "source_id": 57206,
//             "prize_name": "22.22元现金奖励",
//             "prize_type": "cash",
//             "handle_status": "information_complete",
//             "create_time": "2022-01-24 10:02:28",
//             "update_time": "2022-01-24 10:02:28"
//         }
//     ]
// }
//
//
// console.log(api.setPrototype(objs,"data[0].cash_info.arr[0].name",["aawdwdaw","dwadawdwa"]));
// console.log(api.getPrototype(objs,"data[0].cash_info.arr[0].name"));
// console.log(objs)
// console.log(api.getPrototype(objs,"data[0].cash_info.arr[1].name"));
// console.log(api.setPrototype(objs,"JSON.cash_info","hahha"));
// console.log(api.getPrototype(objs,"JSON.cash_info"));
// console.log(api.getPrototype(objs,"JSON"));
//
// console.log(api.setPrototype(objs,"data[0].cash_infos.arr[0].names",["aawdwdaw","dwadawdwa"]))
// console.log(api.getPrototype(objs,"data[0].cash_infos.arr[0]"))
//
// console.time("----------------------")
// console.log(api.setPrototype(objs,"data[0].cash_info.arr[0].sname",["aawdwdaw","dwadawdwa"]))
// console.timeEnd("----------------------")
// console.time("----------------------")
// console.log(api.getPrototype(objs,"data[[[[[0]]]]]].cash_info.arr[[[[[[[0]]]]]]].name"))
// console.timeLog("----------------------")
//
// console.log(api.timeFormat(new Date()))
// console.log(api.timeFormat(new Date(), 'yyyy-mm-dd'))
// console.log(api.timeFormat(new Date().getTime(), 'yyyy-mm-dd'))
//
//
// console.log(api.randomArray([1,2,3,4,5,6,7,8,9]))
//
// console.log(api.deepMerge(obj,objs));
//
//
// let obj2 = api.deepClone(obj);
//
// console.log(obj2)
// obj2.data[0].id = 21343;
// console.log(obj.function());
// console.log(obj2)
//
// console.log(api.guid());
//
// console.log(api.colorGradient('rgb(250,250,250)', 'rgb(252,252,252)', 3));
//
// console.log(api.hexToRgb("#000"));
//
// console.log(api.rgbToHex("rgb(0,0,0)"));
//
// //返回 rgba(0,0,0,0.35)
// console.log(api.colorToRgba('#000000', 0.35));
// //返回 rgba(109,180,0,0.4)
// console.log(api.colorToRgba('rgb(109, 180, 0)', 0.4));
//
// let data = {
//     name: "gavin",
//     age: 20,
//     fruits: ['apple', 'banana', 'orange']
// }
//
// //返回结果 ?name=gavin&age=20&fruits[]=apple&fruits[]=banana&fruits[]=orange
// console.log(api.objToParams(data));
// //返回结果 name=gavin&age=20&fruits[]=apple&fruits[]=banana&fruits[]=orange
// console.log(api.objToParams(data,false));
// //返回结果 name=gavin&age=20&fruits[0]=apple&fruits[1]=banana&fruits[2]=orange
// console.log(api.objToParams(data, false, "indices"));
// //返回结果 name=gavin&age=20&fruits[]=apple&fruits[]=banana&fruits[]=orange
// console.log(api.objToParams(data, false, "brackets"));
// //返回结果 name=gavin&age=20&fruits=apple&fruits=banana&fruits=orange
// console.log(api.objToParams(data, false, "repeat"));
// //返回结果 name=gavin&age=20&fruits=apple,banana,orange
// console.log(api.objToParams(data, false, "comma"));
//
// // 不传key的情况下 返回8072f1be03f75681ef28a1b16b481a43
// console.log(api.md5("123456"));
// // key的情况下 返回2fa5a2a2d2e9d68a2cfb9821e2415464
// console.log(api.md5("123456", "123456789"));
//
// // 返回结果 "a b c"
// console.log(api.trim(" a b c "));
// // 返回结果 "a b c "
// console.log(api.trim(" a b c ", "left"));
// // 返回结果 " a b c"
// console.log(api.trim(" a b c", "right"));
// // 返回结果 "abc"
// console.log(api.trim(" a b c ", "all"));

// console.log(api.isCode(123456));    // 不传验证码长度，不填默认为6位数 返回true
// console.log(api.isCode(123456, 6));    // true
// console.log(api.isCode("123456", 6));    // true
// console.log(api.isCode("123456", 4));    // false
// console.log(api.isCode("1234567", 6));   // false
// console.log(api.isCode("12345a", 6));   // false
//
// console.log(api.isArray([]));   // true
// console.log(api.isArray([1,2,3]));  // true
// console.log(api.isArray("[1,2,3]"));    //false
// console.log(api.isArray({}));   //false
//
// console.log(api.isJsonString({}));      // false
// console.log(api.isJsonString({"name": "gavin"}));   //false
// console.log(api.isJsonString({"name": "gavin"}));   //false
// console.log(api.isJsonString("{'name': 'gavin'}"));   //false
// console.log(api.isJsonString("{name: 'gavin'}"));   //false
// console.log(api.isJsonString('{"name": "gavin"}'));   //true
//
// console.log(api.isJson('{"name": "gavin"}'));   //false
// console.log(api.isJsonString({name: "gavin"}));   //false
// console.log(api.isJson({"name": "gavin"}));   //true
//
// console.log(api.isObject("123"));   //false
// console.log(api.isObject([]));      //false
// console.log(api.isObject(new RegExp('')));  //false
// console.log(api.isObject(new Object()));    //true
// console.log(api.isObject({}));      //true
//
//
// console.log(api.isEmail("gavin@163.com"));  //true
// console.log(api.isEmail("gavin@qq.com"));  //true
// console.log(api.isEmail("gavin@253.com"));  //true
// console.log(api.isEmail("gavin.com"));  //false
//
// console.log(api.isPhone("1370000000"));     //false
// console.log(api.isPhone("10000000000"));    //false
// console.log(api.isPhone("13700000000"));    //true
// console.log(api.isPhone(13727224048));      //true
//
// console.log(api.isUrl("www.baidu.com"));    //false
// console.log(api.isUrl("baidu.com"));    //false
// console.log(api.isUrl("http://www.baidu.com"));    //true
// console.log(api.isUrl("https://www.baidu.com"));    //true
// console.log(api.isUrl("https://baidu.com"));    //true
//
// console.log(api.isEmpty(""));    //true
// console.log(api.isEmpty({}));    //true
// console.log(api.isEmpty([]));    //true
// console.log(api.isEmpty(null));    //true
// console.log(api.isEmpty(undefined));    //true
// console.log(api.isEmpty(NaN));    //true
// console.log(api.isEmpty(123));    //false
// console.log(api.isEmpty({name: "gavin"}));    //false
// console.log(api.isEmpty([1,2,3]));    //false
//
// console.log(api.isDate("2022-02-10"));    //true
// console.log(api.isDate("2022-02-10 08:32:10"));    //true
// console.log(api.isDate("2022/02/10 3:10"));    //true
// console.log(api.isDate("2022/02/10 03:10"));    //true
// console.log(api.isDate("2022/02-10 3:10"));    //true
// console.log(api.isDate(new Date()));    //true
// console.log(api.isDate(1644393909689));    //true
// console.log(api.isDate("2022年02月10日"));    //false
// console.log(api.isDate("2022-02-10 25:32"));    //false
//
// console.log(api.isNumber("abc"));   //false
// console.log(api.isNumber([]));   //false
// console.log(api.isNumber({}));   //false
// console.log(api.isNumber(null));   //false
// console.log(api.isNumber(NaN));   //false
// console.log(api.isNumber(123));   //true
// console.log(api.isNumber(123.12));   //true
// console.log(api.isNumber("2359.08"));   //true
// console.log(api.isNumber("1000"));   //true
// console.log(api.isNumber(-1000));   //true
//
// console.log(api.isIdCard("441283199910310775"));    //true
//
// console.log(api.isCarNo("粤A57034"));    //true
// console.log(api.isCarNo("粤57034"));     //false
//
// console.log(api.isAmount("3,233.08"));    //true
// console.log(api.isAmount("233.08"));    //true
// console.log(api.isAmount(233.08));   //true
// console.log(api.isAmount("-3,233.08"));     //false
// console.log(api.isAmount("$3,233.08"));     //false
// console.log(api.isAmount("￥3,233.08"));     //false
//
// console.log(api.isChinese("中国人不骗中国人"));    //true
// console.log(api.isChinese("中国人不骗中国人1"));    //false
//
// console.log(api.isLetter("123"));     //false
// console.log(api.isLetter("abc1"));     //false
// console.log(api.isLetter("ABC1"));     //false
// console.log(api.isLetter("abc"));    //true
// console.log(api.isLetter("ABC"));    //true
//
// console.log(api.isEnOrNum("123abc"));     //false
// console.log(api.isEnOrNum("~)"));     //false
// console.log(api.isEnOrNum("123)"));     //false
// console.log(api.isEnOrNum("abc)"));     //false
// console.log(api.isEnOrNum("abc"));    //true
// console.log(api.isEnOrNum(123));    //true
// console.log(api.isEnOrNum("123"));    //true

//案例1
// let str = "123"
// console.log(api.isContains(str,12));       //true
// console.log(api.isContains(str,23));       //true
// console.log(api.isContains(str,"23"));       //true
// console.log(api.isContains(str,"234"));       //false


//案列2
// let arr = [1,2,3,4,5,6,"gavin","yami","7","8","9"];
// console.log(api.isContains(arr,1));       //true
// console.log(api.isContains(arr,"yami"));       //true
// console.log(api.isContains(arr,"kl"));       //false
// console.log(api.isContains(arr,9));       //false

//案列3
// let obj = {
//     "code": "success",
//     "message": "success",
//
// }
// console.log(api.isContains(obj,"message"));    //true
// console.log(api.isContains(obj,"code"));    //true
// console.log(api.isContains(obj,"data"));    //false
// console.log(api.isContains(obj,"success"));    //false

//案例4
// let obj = {
//     "code": "success",
//     "message": "success",
//     "date": new Date(),
//     "reg": /.png/,
//     // @ts-ignore
//     "nulls": null,
//     // @ts-ignore
//     "undefined": undefined,
//
// }
// console.log(api.isContains(obj,"success",true));     //true;
// console.log(api.isContains(obj,null,true));     //true;
// console.log(api.isContains(obj,undefined,true));     //true;
// console.log(api.isContains(obj,/.png/,true));     //false;
// console.log(api.isContains(obj,new Date(),true));     //false;
// console.log(api.isContains(obj,"message",true));     //false;

// console.log(api.isRange(35, [30, 34]));     //false;
// console.log(api.isRange(31, [30, 34]));     //true;

// console.log(api.isRangeLength("abc",[3,20]));     //true;
// console.log(api.isRangeLength("ab",[3,20]));     //false;
// console.log(api.isRangeLength("a0",[3,20]));     //false;

// console.log(api.isFunc(()=>{}));     //true;
// console.log(api.isFunc(function(){}));     //false;
// console.log(api.isFunc("function(){}"));     //false;


// console.log(api.isPromise(new Promise(()=>{})));    //true

// console.log(api.isImage("abc.png"));    //true
// console.log(api.isImage("abc.jpg"));    //true
// console.log(api.isImage("abc.gif"));    //true
// console.log(api.isImage("abc.jpeg"));    //true
// console.log(api.isImage("abc.text"));     //false;

// console.log(api.isVideo("abc.mp4"));    //true
// console.log(api.isVideo("abc.mpg"));    //true
// console.log(api.isVideo("abc.mpeg"));    //true
// console.log(api.isVideo("abc.mov"));    //true
// console.log(api.isVideo("abc.rmvb"));    //true
// console.log(api.isVideo("abc.text"));     //false;

// console.log(api.isRegExp(/~/));    //true
// console.log(api.isRegExp(new RegExp("")));    //true
// console.log(api.isRegExp("//"));     //false;

// // 检测到 ”男装“ 广告敏感词，返回true
// console.log(api.isSensitive("这男装很便宜"));
//
// // 返回 ['男装'] 广告敏感词
// console.log(api.sensitiveSearch("这男装很便宜"));
//
// // 返回 ”这**很便宜“
// console.log(api.sensitiveReplace("这男装很便宜"));
// // 返回 ”这男装很便宜“
// console.log(api.sensitiveReplace("这男装很便宜", ["男装"]));
//
// console.log(api.sensitiveAdd(["成功","中华民族伟"]));      // 返回 true
// console.log(api.sensitiveAdd({"阳光":"阳光","yyds": "yyds"}));      // 返回 true
// console.log(api.sensitiveAdd(1314));      // 返回 true
// console.log(api.sensitiveAdd("中国"));      // 返回 true
// console.log(api.sensitiveAdd("国家|不仅|利于"));      // 返回 true
// // 返回 ['开放', '成功', '中华民族伟', '阳光', 'yyds', '中国', '国家', '不仅', '利于']
// console.log(api.sensitiveSearch("成功举办北京冬奥会、冬残奥会，不仅可以增强我们实现中华民族伟大复兴的信心，而且有利于展示我们国家和民族致力于推动构建人类命运共同体，阳光、富强、开放的良好形象，增进各国人民对中国的了解和认识。yyds"));
// // 返回 **举办北京冬奥会、冬残奥会，**可以增强我们实现*****大复兴的信心，而且有**展示我们**和民族致力于推动构建人类命运共同体，**、富强、**的良好形象，增进各国人民对**的了解和认识。****
// console.log(api.sensitiveReplace("成功举办北京冬奥会、冬残奥会，不仅可以增强我们实现中华民族伟大复兴的信心，而且有利于展示我们国家和民族致力于推动构建人类命运共同体，阳光、富强、开放的良好形象，增进各国人民对中国的了解和认识。yyds"));
//
//
// console.log(api.sensitiveFilter(["成功","中华民族伟"]));     // 返回 true
// console.log(api.sensitiveFilter({"阳光":"阳光","yyds": "yyds"}));     // 返回 true
// console.log(api.sensitiveFilter(1314));     // 返回 true
// console.log(api.sensitiveFilter("中国"));     // 返回 true
// console.log(api.sensitiveFilter("国家|不仅|利于"));     // 返回 true
// // 返回 ['开放']
// console.log(api.sensitiveSearch("成功举办北京冬奥会、冬残奥会，不仅可以增强我们实现中华民族伟大复兴的信心，而且有利于展示我们国家和民族致力于推动构建人类命运共同体，阳光、富强、开放的良好形象，增进各国人民对中国的了解和认识。yyds"));
// // 成功举办北京冬奥会、冬残奥会，不仅可以增强我们实现中华民族伟大复兴的信心，而且有利于展示我们国家和民族致力于推动构建人类命运共同体，阳光、富强、**的良好形象，增进各国人民对中国的了解和认识。yyds
// console.log(api.sensitiveReplace("成功举办北京冬奥会、冬残奥会，不仅可以增强我们实现中华民族伟大复兴的信心，而且有利于展示我们国家和民族致力于推动构建人类命运共同体，阳光、富强、开放的良好形象，增进各国人民对中国的了解和认识。yyds"));
