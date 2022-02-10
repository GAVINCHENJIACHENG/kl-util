module.exports = function Trim (){
    /**
     * @description 去除空格
     * @param  str 需要去除空格的字符串
     * @param  pos both(左右)|left|right|all 默认both
     */
    Trim.prototype.trim = function (str: string, pos = 'both') {
        str = String(str)
        if (pos == 'both') {
            return str.replace(/^\s+|\s+$/g, '')
        }
        if (pos == 'left') {
            return str.replace(/^\s*/, '')
        }
        if (pos == 'right') {
            return str.replace(/(\s*$)/g, '')
        }
        if (pos == 'all') {
            return str.replace(/\s+/g, '')
        }
        return str
    }

}
