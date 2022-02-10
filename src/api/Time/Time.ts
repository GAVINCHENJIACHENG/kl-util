module.exports = function Time(){

    /**
     * 该函数必须传入第一个参数，格式为任何合法的时间格式、秒或毫秒的时间戳，第二个参数是可选的，返回的值类似刚刚，25分钟前，3小时前，7天前的结果。 如果第二个参数是时间的格式，当前和传入时间戳相差大于一个月时，返回格式化好的时间；如果第二个参数为false，则不会返回格式化好的时间，而是诸如"xxx年前"的结果。
     * timestamp <String> 时间戳
     * format <String / false> 时间格式，默认为yyyy-mm-dd，年为"yyyy"，月为"mm"，日为"dd"，时为"hh"，分为"MM"，秒为"ss"，格式可以自由搭配，如： yyyy:mm:dd，yyyy-mm-dd，yyyy年mm月dd日，yyyy年mm月dd日 hh时MM分ss秒，yyyy/mm/dd/，MM:ss等组合。 如果时间戳距离此时的时间，大于一个月，则返回一个格式化好的时间，如果此参数为false，返回均为"多久之前"的结果。
     * @param dateTime
     * @param fmt
     */
    Time.prototype.timeFormat = function (dateTime: any, fmt: string): string {
        dateTime = dateTime||null;
        fmt = fmt||'yyyy-mm-dd hh:MM:ss';
        // 如果为null,则格式化当前时间
        if (!dateTime) dateTime = Number(new Date())
        // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
        if (dateTime.toString().length == 10) dateTime *= 1000
        var date = new Date(dateTime)
        var ret
        var opt = {
            'y+': date.getFullYear().toString(), // 年
            'm+': (date.getMonth() + 1).toString(), // 月
            'd+': date.getDate().toString(), // 日
            'h+': date.getHours().toString(), // 时
            'M+': date.getMinutes().toString(), // 分
            's+': date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (var k in opt) {
            ret = new RegExp(`(${k})`).exec(fmt)
            if (ret) {
                // @ts-ignore
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
            }
        }
        return fmt
    }
}
