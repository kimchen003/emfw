/** 版本号发布时会自动改掉，请勿修改！(start) **/
var random=(new Date).getTime();
/** 版本号发布时会自动改掉，请勿修改！(end) **/


seajs.config({
    base: './',

    alias: {
        'jquery': 'libs/jquery.js', //
        'underscore': 'libs/underscore.js', //
        'backbone': 'libs/backbone.js', //
        'echarts': 'libs/echarts.min.js', //图表
        'iscroll': 'libs/iscroll.js', //图表

        'md5': 'libs/md5.js',
        'base64': 'libs/base64.js', //

        'components': 'libs/components.js', //组件
        'tradeExtend': 'libs/tradeExtend.js', //交易扩展JS
        'common': 'js/common.js', //公共操作
        'param': 'js/param.js', //参数列表



    },
    preload: ['jquery', 'underscore'],
    // 路径配置
    paths: {
        'tpl': 'js/tpl'
    },

    map: [
        [/^((?!.*jquery|.*underscore|.*backbone|.*iscroll|.*echarts).*\.js)(.*)$/i, '$1?ver=' + random]
    ],

});