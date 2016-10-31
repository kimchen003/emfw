define(function(require, exports, module){
	/* 页面控制器 */

	var model = Backbone.Model.extend({
		defaults:{
			datas : null,
		}
	});

	var collection = Backbone.Collection.extend({
		model : model,
		url : "http://localhost:3003/"
	});

	var _collection = new collection();

	Backbone.ajax = function() {
	  $.extend(arguments[0], {
	  	dataType : "jsonp"
	  });
	  
	  return Backbone.$.ajax.apply(Backbone.$, arguments);
	};

	module.exports = _collection;

})
	