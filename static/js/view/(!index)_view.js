/* 页面渲染文件 */
define( function(require, exports, module){

	var initial = require("../extend/initial")
	var StringUtil = require("../../util/StringUtil")
	var tableTpl = require("../extend/table.tpl")


	require("../plugins/popup")


	var (!Index)View = Backbone.View.extend({
		el : "body",
		events : {
			"click .uc-switch>li" : "handleClick",
			"click [data-click]" : "handleClickbutton",
			"click [data-click2]" : "handleClickbutton2"
		},

		initialize : function(){

			this.$("#string").html(StringUtil.formatLen("我很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长", 10))
			this.$("#controller").html()
			initial.init(this.$el);

		},

		handleClick : function(e){
			var index = $(e.currentTarget).index() + 1;
			$(e.currentTarget).parent().find("li.on").removeClass('on');
			$(e.currentTarget).addClass('on')
			this.$(".switch-item").addClass('hide');
			this.$("#item"+index).removeClass('hide');

		},
		handleClickbutton : function(e){
			var $dom = $("#" + $(e.currentTarget).data("click"));

			$dom.html($(e.currentTarget).data("click"))

			this.collection.url = "http://one-pieces-html5.com:10000/data";



			this.collection.fetch({
				data : {
					"FCODE" : "000001",
					"version" : "4.3.0",
					"product" : "EFund",
					"plat" : "Wap",
					"deviceid" : "H5"
				},
				success : function(collection,response){
					$dom.html(_.template(tableTpl)({data : response, StringUtil : StringUtil}))
				}
			});
		},
		handleClickbutton2 : function(e){
			var method = $(e.currentTarget).data("click2");

			if(method === "alert") $.alert("弹框")
			if(method === "prompt") $.prompt("弹框")
			if(method === "password") $.password("弹框")


		},
		render  : function(){

		}

	})


	module.exports = (!Index)View;

})