module.exports = function Array (){
    Array.prototype.randomArray = function (array: Array<any>): Array<any> {
        return array.sort(function() {
            return Math.random() - 0.5;
        })
    }
}
