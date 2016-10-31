define(function(require, exports, module){
    var global = require("../../global")
    var tpl_header = require("../../templates/_head.tpl")
    var tpl_footer = require("../../templates/_foot.tpl")
    /* 初始化方法 */
    var initMethod = {

        init: function($dom) {
            $dom.prepend(_.template(tpl_header)({title : global["Project.Title"]}))
            $dom.append(_.template(tpl_footer)())
        }
    }

    module.exports = initMethod
})

    