/**
 * @desc 模块依赖
 */
var fs = require("fs");
var path = require("path");
var colors = require('colors');
var copyDir = require("./copy");
var exec = require('child_process').exec;
var chokidar = require('chokidar');

/**
 * @desc eastmoney前端框架
 */
var emFramework = {};
module['exports'] = emFramework;


/**
 * @desc 公共变量
 */
var from = path.resolve(__dirname,"../","static");

//var to = path.resolve(__dirname,"../","../","../","../","project");
var to = path.resolve(process.cwd(),"project");

var pageView = [
    path.resolve(from,"js","controllers","(!index)_controller.js"),
    path.resolve(from,"less","(!index).less"),
    path.resolve(from,"js","(!index).js"),
    path.resolve(from,"js","view","(!index)_view.js"),
    path.resolve(from,"(!index).html"),
];

var _pageView_ = [
    path.resolve(to,"js","controllers","(!index)_controller.js"),
    path.resolve(to,"less","(!index).less"),
    path.resolve(to,"js","(!index).js"),
    path.resolve(to,"js","view","(!index)_view.js"),
    path.resolve(to,"(!index).html"),
];

var logFile = path.resolve(__dirname,"../data","fileCreated.json");

/**
 * @desc 创建根目录
 *
 * @param  {array}      arr         [页面集合]
 * @param  {array}      version     [脚手架版本]
 *
 * @return {文件生成}               [生成新项目]
 */
emFramework.create = function(arr,version){

    console.log("你正在使用的脚手架版本为 "+version);
    var self = this;
    var start = new Date().getTime();
    console.log("扫描项目列表");
    console.log("正在创建新项目文件夹...");
    fs.exists(to, function(exists) {
      if (exists) {
        console.log("该项目已存在")
      } else {
        copyDir(
            path.resolve(__dirname,"../","demo","package.json"),
            path.resolve(process.cwd(),"package.json")
        );
        copyDir(
            path.resolve(__dirname,"../","demo","Gruntfile.js"),
            path.resolve(process.cwd(),"Gruntfile.js")
        );
        copyDir(
            path.resolve(__dirname,"../","README.md"),
            path.resolve(process.cwd(),"README.md")
        );

        copyDir(from, to, function (err) {

            if (err) {
                console.log("error ocur");
                console.dir(err);
            } else {

                fs.readFile(logFile,function(err,data){

                    if(err){
                        console.log(err);
                    }else{

                        fs.writeFile(logFile,"{}",function(err2){
                            if(err2){
                                console.log(err2);
                            }else{
                                console.log("项目共计创建耗时："+(new Date().getTime() - start) + "毫秒");
                                self.add(arr);
                            }
                        });

                    }

                });

            }
        });
      }
    });

};

/**
 * @desc 创建新页面
 *
 * @param  {array}      arr     [页面集合]
 *
 * @return {文件生成}           [生成新页面]
 */
emFramework.add = function(arr){

    (function run(p){
        if(!p)return;

        page = p;

        fs.readFile(logFile,function(err,data){

            if(err){
                console.log(err);
            }else{

                var Data = JSON.parse(data);

                if(!Data[page]){
                    Data[page] = true;
                    console.log( ("创建新页面："+page)  );
                    fs.writeFile(logFile,JSON.stringify(Data),function(err2){
                        if(err){
                            console.log(err2);
                        }else{
                            var i = 0;
                            pageView.map(function(src){
                                copyDir(src, _pageView_[i].replace(/\(\!index\)/ig,page),function(err){

                                },page);
                                i++;
                            });

                            run(arr.shift());
                        }
                    });

                }else{
                    console.log( ("页面 "+page+" 已存在") );
                }

            }
        });

    }(arr.shift()));

};

/**
 * @desc 删除页面
 *
 * @param  {array}      arr     [页面集合]
 *
 * @return {文件删除}           [删除页面]
 */
emFramework.del = function(arr){

    (function run(p){
        if(!p)return;

        page = p;

        fs.readFile(logFile,function(err,data){

            if(err){
                console.log(err);
            }else{
                var Data = JSON.parse(data);

                if(Data[page]){
                    Data[page] = false;
                    console.log( ("删除页面："+page)  );
                    fs.writeFile(logFile,JSON.stringify(Data),function(err2){
                        if(err){
                            console.log(err2);
                        }else{

                            var i = 0;
                            pageView.map(function(src){

                                var target = _pageView_[i].replace(/\(\!index\)/ig,page);

                                if( fs.lstatSync(target).isDirectory() ){
                                    deleteFolderRecursive( target );
                                }else{
                                    fs.unlink(target)
                                }

                                i++;
                            });

                            run(arr.shift());

                        }
                    });

                }else{
                    console.log( "页面 "+page+" 不存在" );
                }

            }
        });

    }(arr.shift()));

}

/**
 * @desc 编译文件
 *
 * @return {编译文件}           [执行编译]
 */
emFramework.run = function(){

}

/**
 * @desc 删除页面
 *
 * @param  {array}      arr     [页面集合]
 *
 * @return {项目压缩}           [压缩到dist目录]
 */
emFramework.dist = function(){
    console.log("开始压缩");
    var grunt = require("grunt");
    require("../Gruntfile")(grunt);
}

deleteFolderRecursive = function(path) {

    var files = [];

    if( fs.existsSync(path) ) {

        files = fs.readdirSync(path);

        files.forEach(function(file,index){

            var curPath = path + "/" + file;

            if(fs.statSync(curPath).isDirectory()) { // recurse

                deleteFolderRecursive(curPath);

            } else { // delete file

                fs.unlinkSync(curPath);

            }

        });

        fs.rmdirSync(path);

    }

};


/**
 * @desc 模块输出
 */
module['exports'] = emFramework;


