/* 页面入口js文件 (router) */
define(function (require) {
    'use strict';
    require('underscore');
    require('backbone');

    var controller = require("./controllers/(!index)_controller")

    var TodoRouter = Backbone.Router.extend({
        routes: {
            "*action": "defaultRouter",
        },
        defaultRouter: function(){
            var (!Index)View = require('./view/(!index)_view');
            if(!this.Viewer){
                this.Viewer = new (!Index)View({
                    collection : controller
                });
                this.Viewer.render();
            }
        }
    });
    new TodoRouter();
    Backbone.history.start();
});