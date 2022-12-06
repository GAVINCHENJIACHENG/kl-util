module.exports = function Color (){
    /**
     * 颜色渐变
     *
     * 该函数实现两个颜色值之间等分取值，返回一个数组，元素为十六进制形式的颜色值，数组长度为step值。
     * 例如：colorGradient('rgb(250, 250, 250)', 'rgb(252, 252, 252)', 3)，得到的结果为["#fafafa", "#fafafa", "#fbfbfb"]
     * @param startColor<String> 开始颜色值，可以是HEX或者RGB颜色值，如#0afdce或者rgb(120, 130, 150)
     * @param endColor <String> 结束颜色值，可以是HEX或者RGB颜色值，如#0afdce或者rgb(120, 130, 150)
     * @param step <Number> 均分值，把开始值和结束值平均分成多少份
     */
    Color.prototype.colorGradient = function (startColor: string, endColor: string, step = 10): Array<any> {
        startColor = startColor||'rgb(0, 0, 0)';
        endColor = endColor||'rgb(255, 255, 255)';
        const startRGB: number[] = this.hexToRgb(startColor, false); // 转换为rgb数组模式
        const startR: number = startRGB[0];
        const startG: number = startRGB[1];
        const startB: number = startRGB[2];

        const endRGB: number[] = this.hexToRgb(endColor, false)
        const endR: number = endRGB[0];
        const endG: number = endRGB[1];
        const endB: number = endRGB[2];

        const sR: number = (endR - startR) / step; // 总差值
        const sG: number = (endG - startG) / step;
        const sB: number = (endB - startB) / step;
        const colorArr: string[] = [];
        for (let i = 0; i < step; i++) {
            // 计算每一步的hex值
            let hex: string = this.rgbToHex(`rgb(${Math.round((sR * i + startR))},${Math.round((sG * i + startG))},${Math.round((sB
                * i + startB))})`);
            // 确保第一个颜色值为startColor的值
            if (i === 0) hex = this.rgbToHex(startColor);
            // 确保最后一个颜色值为endColor的值
            if (i === step - 1) hex = this.rgbToHex(endColor);
            colorArr.push(hex)
        }
        return colorArr
    }

    /**
     * 十六进制Hex转RGB
     *
     * 该函数可以将一个Hex的十六进制颜色值转换成一个RGB颜色值
     * @param sColor <String> HEx颜色值，如#0afdce
     * @param str
     */
    Color.prototype.hexToRgb =  function (sColor: string, str = true): string | number | number[] {
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        sColor = String(sColor).toLowerCase()
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = '#'
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
                }
                sColor = sColorNew
            }
            // 处理六位的颜色值
            const sColorChange = []
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
            }
            if (!str) {
                return sColorChange
            }
            return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`
        } if (/^(rgb|RGB)/.test(sColor)) {
            const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
            return arr.map((val) => Number(val))
        }
        return sColor
    }

    /**
     * RGB转十六进制Hex
     * 该函数可以将一个RGB颜色值转换成一个Hex的十六进制颜色值
     * @param rgb <String> RGB颜色值，如rgb(230, 231, 233)
     */
    Color.prototype.rgbToHex = function (rgb: string): string {
        const _this: string = rgb
        const reg: RegExp = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        if (/^(rgb|RGB)/.test(_this)) {
            const aColor: string[] = _this.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
            let strHex: string = '#'
            for (let i = 0; i < aColor.length; i++) {
                let hex: string = Number(aColor[i]).toString(16)
                hex = String(hex).length == 1 ? `${0}${hex}` : hex // 保证每个rgb的值为2位
                if (hex === '0') {
                    hex += hex
                }
                strHex += hex
            }
            if (strHex.length !== 7) {
                strHex = _this
            }
            return strHex
        } else if (reg.test(_this)) {
            const aNum: string[] = _this.replace(/#/, '').split('')
            if (aNum.length === 6) {
                return _this
            } if (aNum.length === 3) {
                let numHex: string = '#'
                for (let i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i])
                }
                return numHex
            }
        }
        return _this
    }

    /**
     * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
     * @param color <String> 颜色值，只能hex或者rgba格式
     * @param opacity <Number> 不透明度值，取值为0-1之间
     */
    Color.prototype.colorToRgba = function (color: string, opacity: number): string {
        color = this.rgbToHex(color);
        // 十六进制颜色值的正则表达式
        const reg: RegExp = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        /* 16进制颜色转为RGB格式 */
        let sColor: string = String(color).toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew: string = '#';
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            // 处理六位的颜色值
            const sColorChange: number[] = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
            }
            return `rgba(${sColorChange.join(',')},${opacity||1})`;
        }

        return sColor;
    }
}
