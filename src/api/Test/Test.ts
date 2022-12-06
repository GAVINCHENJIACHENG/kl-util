module.exports = function Test () {

    /**
     * 校验是否为验证码
     * @param value 验证码字符串
     * @param len 验证码长度，不填默认为6位数
     * @return Boolean
     */
    Test.prototype.code = function (value: string, len: number): boolean{
        return new RegExp(`^\\d{${len||6}}$`).test(value);
    }

    /**
     * 校验是否为数组
     * @param array 数组
     * @return Boolean
     */
    Test.prototype.array = function (array: Array<any>):boolean {
        return Object.is(Object.prototype.toString.call(array), '[object Array]');
    }

    /**
     * 校验是否为json字符串
     * @param json
     * @return Boolean
     */
    Test.prototype.jsonString = function (json: string): boolean {
        if(!Object.is(typeof json, 'string'))return false;
        try {
            let obj: object = JSON.parse(json);
            if(Object.is(typeof obj , 'object') && obj){
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    /**
     * 校验是否为有效值的json
     * @param json
     * @return Boolean
     */
    Test.prototype.json = function (json: object): boolean{
        if(Object.is(typeof json, 'object')){
            return this.jsonString(JSON.stringify(json));
        } else {
            return false;
        }
    }


    /**
     * 是否为对象
     * @param object
     * @return Boolean
     */
    Test.prototype.object = function (object: object): boolean {
        return Object.is(Object.prototype.toString.call(object), '[object Object]');
    }

    /**
     * 是否为邮箱号
     * @param value
     * @return Boolean
     */
    Test.prototype.email = function (value: string): boolean {
        return new RegExp('^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$').test(value);
    }

    /**
     * 是否为手机号
     * @param value
     * @return Boolean
     */
    Test.prototype.phone = function (value: string): boolean{
        return new RegExp('^1[23456789]\\d{9}$').test(value);
    }

    /**
     * 是否为URL
     * @param value
     * @return Boolean
     */
    Test.prototype.url = function (value: string): boolean{
        return new RegExp('^((https|http|ftp|rtsp|mms):\\/\\/)(([0-9a-zA-Z_!~*\'().&=+$%-]+: )?[0-9a-zA-Z_!~*\'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*\'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\\/?)|(\\/[0-9a-zA-Z_!~*\'().;?:@&=+$,%#-]+)+\\/?)$').test(value);
    }

    /**
     * 是否为空
     * @param value
     * @return Boolean
     */
    Test.prototype.empty = function (value: any): boolean{
        switch (typeof value) {
            case 'undefined':
                return true
            case 'string':
                if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
                break
            case 'boolean':
                if (!value) return true;
                break
            case 'number':
                if (value === 0 || isNaN(value)) return true
                break
            case 'object':
                if (value === null || value.length === 0) return true
                for (const i in value) {
                    return false
                }
                return true
        }
        return false
    }

    /**
     * 判断是否为普通日期
     * @param value
     * @return Boolean
     */
    Test.prototype.date = function (value: string | number | Date): boolean{
        if (!value) return false
        // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
        if (this.number(value)) value = +value;
        return !/Invalid|NaN/.test(new Date(value).toString())
    }

    /**
     * 判断是否为十进制数值
     * @param value
     * @return Boolean
     */
    Test.prototype.number = function (value: any): boolean{
       return new RegExp('^[\\+-]?(\\d+\\.?\\d*|\\.\\d+|\\d\\.\\d+e\\+\\d+)$').test(value);
    }

    /**
     * 判断是否为身份证号
     * @param value
     * @return Boolean
     */
    Test.prototype.idCard = function (value: string): boolean{
       return new RegExp('^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$').test(value);
    }

    /**
     * 判断是否为车牌号
     * @param value
     * @return Boolean
     */
    Test.prototype.carNo = function (value: string): boolean{
        // 新能源车牌
        const xreg: RegExp = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
        // 旧车牌
        const creg: RegExp = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
        if (value.length === 7) {
            return creg.test(value)
        } if (value.length === 8) {
            return xreg.test(value)
        }
        return false
    }

    /**
     * 判断是否为金额
     * @param value
     * @return Boolean
     */
    Test.prototype.amount = function (value: string): boolean{
        return new RegExp('^[1-9]\\d*(,\\d{3})*(\\.\\d{1,2})?$|^0\\.\\d{1,2}$').test(value);
    }

    /**
     * 判断是否为中文（汉字）
     * @param value
     * @return Boolean
     */
    Test.prototype.chinese = function (value: string): boolean{
        const reg:RegExp = /^[\u4e00-\u9fa5]+$/gi;
        return reg.test(value)
    }

    /**
     * 判断是否为英文字母
     * @param value
     * @return Boolean
     */
    Test.prototype.letter = function (value: string): boolean{
        return new RegExp('^[a-zA-Z]*$').test(value);
    }

    /**
     * 判断是否为字母或者数字
     * @param value
     * @return Boolean
     */
    Test.prototype.enOrNum = function (value: any): boolean{
        return this.number(value) || this.letter(value);
    }

    /**
     * 判断是否包含某个值（如果为object，默认判断某个key是否存在，如果需要判断值，isValue = true 即可）
     * @param value
     * @param param
     * @param isValue
     * @return Boolean
     */
    Test.prototype.contains = function (value: any, param: any, isValue: boolean): boolean{
        //判断是否为数组
        if(this.array(value)){
            for (let i=0;i<value.length;i++){
                if(Object.is(value[i], param)){
                    return true;
                }
            }
            return false;
        } else if (this.object(value)){
            for (let key in value) {
                if(isValue){
                    //判断值
                    if(Object.is(value[key], param))return true;
                } else {
                    //判断key
                    if(Object.is(key, param))return true;
                }
            }
            return false;
        } else {
            return value.indexOf(param) >= 0;
        }
    }

    /**
     * 验证一个值范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Test.prototype.range = function (value: number, param: Array<any>): boolean {
        return value >= param[0] && value <= param[1];
    }

    /**
     * 验证一个长度范围[min, max]
     * @param value
     * @param param
     * @return Boolean
     */
    Test.prototype.rangeLength = function (value: string, param: Array<any>): boolean {
        return value.length >= param[0] && value.length <= param[1];
    }

    /**
     * 判断是否为函数方法
     * @param value
     * @return Boolean
     */
    Test.prototype.func = function (value: string): boolean{
        return typeof value === 'function'
    }

    /**
     * 判断是否为promise对象
     * @param value
     * @return Boolean
     */
    Test.prototype.promise = function (value: any): boolean{
        return Object.is(typeof value,"object") && this.func(value.then) && this.func(value.catch);
    }

    /**
     * 判断是否为图片格式
     * @param value
     * @return Boolean
     */
    Test.prototype.image = function (value: string): boolean{
        const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
        return IMAGE_REGEXP.test(value);
    }

    /**
     * 判断是否为视频格式
     * @param value
     * @return Boolean
     */
    Test.prototype.video = function (value: string): boolean{
        const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;
        return VIDEO_REGEXP.test(value);
    }

    /**
     * 是否为正则对象
     * @param value
     * @return Boolean
     */
    Test.prototype.regExp = function (value: any): boolean{
        return value && Object.prototype.toString.call(value) === '[object RegExp]'
    }


}
