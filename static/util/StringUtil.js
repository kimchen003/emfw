define(function(require, exports, module){
    /* 字符串处理 */
    var StringUtil = {
        /*
        * 对传值做长度过滤，超过定长则显示...
        * v 要做处理的字符串
        * l 显示长度
        */
        formatLen: function(v, l) {
            if (!l) {
                return v;
            }
            if (v.length > l) {
                return v.substring(0, l) + "...";
            }
            return v;
        }
    }

    module.exports = StringUtil
})

    