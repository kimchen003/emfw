define(function(require, exports, module){
	$.extend($, {
		_popup : function(type, param){
			var passwordParam = this.passwordParam;

			if (param.txt && param.txt.indexOf("密码错误") >= 0 && type === "alert" && passwordParam) {

			    type = "prompt";
			    param = {
			        txt: "密码错误",
			        yesbtnTxt: "重新输入",
			        yescallback: function() {

			            setTimeout(function() {
			                this._popup("password", passwordParam)
			            }, 0);
			        }
			    }
			}

			if (type === "password") {
			    this.passwordParam = param;
			} else {
			    this.passwordParam = undefined;
			}



			var yesbtnTxt = param["yesbtnTxt"] || "确定",
			    nobtnTxt = param["nobtnTxt"] || "取消",
			    yescallback = param["yescallback"] || function() {},
			    nocallback = param["nocallback"] || function() {},

			    html = "",

			    target = $("#UC_popup"),

			    backdrop = !param.backdrop ? "show" : "",
			    txt = param.txt,
			    title = param.title,
			    addhtml = param.addhtml || "";


			switch (type) {
			    case "alert":
			        html = '<div class="popupBackdrop ' + backdrop + '"></div>';
			        html += '<div class="popupInner">';
			        if(title) html += '<div class="popupHeader"><h4>'+title+'</h4></div>';
			        html += '<div class="popupContent">' + txt + '</div>';
			        html += '<div class="popupButton"><a href="javascript:;" target="_self" data-btn="yes">' + yesbtnTxt + '</a></div>';
			        html += '</div>';
			        break;
			    case "prompt":
			        html = '<div class="popupBackdrop ' + backdrop + '"></div>';
			        html += '<div class="popupInner">';
			        if(title) html += '<div class="popupHeader"><h4>'+title+'</h4></div>';
			        html += '<div class="popupContent">' + txt + '</div>';
			        html += '<div class="popupButton"><a href="javascript:;" target="_self" data-btn="no">' + nobtnTxt + '</a><a href="javascript:;" target="_self" data-btn="yes">' + yesbtnTxt + '</a></div>';
			        html += '</div>';
			        break;
			    case "password":

			        html = '<div class="popupBackdrop ' + backdrop + '"></div>';
			        html += '<div class="popupInner"><div class="popupHeader"><h4>'+(title || '请输入交易密码')+'</h4></div><div class="popupContent">' + addhtml + '<div class="popupInput"><input type="password" placeholder=" 交易密码（非银行卡密码）"/></div></div>';
			        html += '<div class="popupButton"><a href="javascript:;" target="_self" data-btn="no">' + nobtnTxt + '</a><a href="javascript:;" target="_self" data-btn="yes" class="nonactivated">' + yesbtnTxt + '</a></div>';
			        html += '</div>';
			}

			// 初始化alert弹框
			if (!target[0]) {


			    target = $('<div id="UC_popup" class="UC-popupWrap"  style="z-index:99999999;">');

			    $("body").append(target);

			    // 阻止默认滑动
			    target.on("touchmove mousewheel", function(e) {
			        e.stopPropagation();
			        e.preventDefault();
			    })
			}

			target.html(html).addClass("show");

			var $yesbtn = target.find('[data-btn="yes"]'),
			    $nobtn = target.find('[data-btn="no"]');



			$yesbtn.off('click').on('click', function() {
			    var val = '';


			    if (type === "password") {
			        val = target.find("input[type='password']").val();
			        if (!val) return;

			        $._popupClose();
			        yescallback(val);


			    } else {

			        $._popupClose();
			        yescallback();
			    }

			});

			$nobtn.off('click').on('click', function() {
			    $._popupClose();
			    nocallback();
			});

			if (type === "password") {
			    target.find('input[type="password"]').off('input').on('input', function() {
			        var val = $(this).val();
			        if (!!val) $yesbtn.removeClass('nonactivated');
			        else $yesbtn.addClass('nonactivated');
			    });
			}
		},
		_popupClose: function() {
		    var target = $("#UC_popup");

		    if(target.length) target.removeClass("show");

		},
		alert: function(txt, param) {
		    var objParam = {};

		    //如果文字为空
		    // if (!txt) return;

		    objParam["txt"] = txt;

		    if (!!param) {
		        //如果param是一个回调函数
		        if (typeof param === "function") {
		            objParam["yescallback"] = param;

		        }
		        //如果param是一个对象
		        else if (typeof param === "object") {
		            if (param.yesbtnTxt) objParam["yesbtnTxt"] = param.yesbtnTxt;
		            if (param.title) objParam["title"] = param.title;
		            if (param.backdrop) objParam["backdrop"] = param.backdrop;
		            if (param.yescallback && typeof param.yescallback === "function") objParam["yescallback"] = param.yescallback;
		        }
		    }

		    this._popup("alert", objParam);

		},
		prompt: function(txt, param) {

		    var objParam = {};

		    if (!txt) return;

		    objParam["txt"] = txt;

		    if (!!param) {
		        //如果param是一个回调函数
		        if (typeof param === "function") {
		            objParam["yescallback"] = param;

		        } else if (typeof param === "object") {
		            if (param.yesbtnTxt) objParam["yesbtnTxt"] = param.yesbtnTxt;
		            if (param.title) objParam["title"] = param.title;
		            if (param.nobtnTxt) objParam["nobtnTxt"] = param.nobtnTxt;
		            if (param.backdrop) objParam["backdrop"] = param.backdrop;
		            if (param.yescallback && typeof param.yescallback === "function") objParam["yescallback"] = param.yescallback;
		            if (param.nocallback && typeof param.nocallback === "function") objParam["nocallback"] = param.nocallback;
		        }
		    }


		    this._popup("prompt", objParam);

		},
		password: function(param) {

		    var objParam = {};


		    if (!!param) {
		        //如果param是一个回调函数
		        if (typeof param === "function") {
		            objParam["yescallback"] = param;

		        }
		        if (typeof param === "object") {
		            if (param.yesbtnTxt) objParam["yesbtnTxt"] = param.yesbtnTxt;
		            if (param.title) objParam["title"] = param.title;
		            if (param.nobtnTxt) objParam["nobtnTxt"] = param.nobtnTxt;
		            if (param.backdrop) objParam["backdrop"] = param.backdrop;
		            if (param.addhtml) objParam["addhtml"] = param.addhtml;
		            if (param.yescallback && typeof param.yescallback === "function") objParam["yescallback"] = param.yescallback;
		            if (param.nocallback && typeof param.nocallback === "function") objParam["nocallback"] = param.nocallback;
		        }
		    }
		    this._popup("password", objParam);
		}
	})
})