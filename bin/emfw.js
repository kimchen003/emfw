#!/usr/bin/env node

var emFramework = require('../lib/emFramework.js');
var fs = require("fs");
var path = require("path");

//读取package.json
function readPKG(callback){
    fs.readFile(path.resolve(__dirname,"../package.json"),function(err,data){

        if(err){
            console.log(err);
        }else{
            callback&&callback(data)
        }

    });
}
switch(process.argv[2]){

    case "create":
        //创建新项目
        readPKG(function(data){
            var  version = JSON.parse(data.toString()).version;
            emFramework.create([
                "index", //首页
            ],version);
        })

        break;
    case "add":
        //添加页面
        emFramework.add( process.argv.slice(3) );
        break;
    case "del":
        //删除页面
        emFramework.del( process.argv.slice(3) );
        break;
    case "run":
        //执行编译
        emFramework.run();
        break;
    case "dist":
        //压缩
        emFramework.dist();
        break;
    case "--help":
    case "-h":
        console.log('使用命令行:');
        console.log('  -v --version [显示版本号]');
        console.log('  -h --help    [帮助]');
        console.log()
        console.log('  create       [创建新项目]');
        console.log('  add [name]   [添加页面]');
        console.log('  del [name]   [删除页面]');
        break;
    case "--version":
    case "-v":
    default :
        readPKG(function(data){
            var  version = JSON.parse(data.toString()).version;
            console.log('欢迎使用emfw '+ version);
        })
        break;

};

