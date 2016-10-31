module.exports = function (grunt) {


     var transport = require('grunt-cmd-transport');

     var text = transport.text.init(grunt);
     var script = transport.script.init(grunt);
     var template = transport.template.init(grunt);

     var path = require("path");

     grunt.initConfig({

          /**
          * 将入口文件拷贝到 产出目录
          */
          copy: {
               //复制到dist文件夹
               toDist:{
                    files:[
                         {
                              expand: true,
                              cwd: 'project/',
                              src: ['iconfont/**/*','!iconfont/demo.*','images/**/*','!**/*.css','libs/**/*'],
                              dest: 'dist/'
                         }
                    ]
               },
               //复制到_build文件夹
               toBuild : {
                    files:[
                         {
                              expand: true,
                              cwd: 'project/',
                              src: ['*.html','css/**/*.css','iconfont/**/*.css'],
                              dest: '_build/'
                         }
                    ]
               }
          },

          /**
          * 创建一个临时目录
          * 将需要合并的js文件转为具名函数，并保持独立地保存在这个临时目录
          */
          transport: {

               options:{
                    parsers : {
                         '.js' : [script.jsParser],
                         '.html' : [text.html2jsParser],
                         '.tpl' : [template.tplParser]
                    },
                    debug : false,
                    alias:{
                         'underscore' : 'underscore',
                         'backbone' : 'backbone'
                    }
               },

               js:{

                    files: [
                         {
                              cwd: 'project/',
                              src : ['js/**/*','templates/**/*','*.js','util/**/*'],
                              dest: '_build/'
                         }
                    ]

               }

          },

          /**
          * 将临时目录下独立的具名函数文件 合并为 1个 js 文件
          * 将这个合并的 js 文件 拷贝到 我们的输出目录
          */
          concat: {

               js : {
                    options: {
                       include: 'relative'
                    },
                    files:[{
                         expand: true,
                         cwd: '_build/',
                         src: ['js/*.js'],
                         dest: '_build/release',
                    }]

               },

          },

          /**
          * 压缩js
          */
          uglify: {

               options:{
                    compress : {
                         drop_console: true,
                    }
               },

               js: {
                    files:[
                         {
                              expand: true,
                              cwd: '_build/release/',
                              src: ['**/*.js'],
                              dest: 'dist'
                         }
                    ]
               },

               // libs: {
               //      files: [
               //           {
               //                expand: true,
               //                cwd: '_build/libs/',
               //                src : ['**/*.js'],
               //                dest: 'dist/libs/'
               //           }
               //      ]
               // }

          },

          /**
          * 编译less
          */
          less: {
               dev : {
                    files: [{
                         expand: true,
                         cwd: 'project/less',
                         src: ['**/*.less'],
                         dest: 'project/css',
                         ext: '.css'
                    }]
               }
          },

          /**
          * 压缩css
          */
          cssmin:{

               css:{

                    files: [{
                         expand: true,
                         cwd: '_build/',
                         src: ['css/*.css','iconfont/iconfont.css'],
                         dest: 'dist/',
                         ext: '.css'
                    }]

               }

          },

          /**
           * 压缩html
           */
          htmlmin:{
               html : {
                    options: {
                        removeComments: true,
                        removeCommentsFromCDATA: true,
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true,
                        removeAttributeQuotes: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeOptionalTags: true
                     },
                    files: [{
                         expand: true,
                         cwd: '_build/',
                         src: ['**/*.html'],
                         dest: 'dist/',
                    }]

               }
          },

          /**
           * 删除临时文件
           */
          clean : {

               options: {
                   'force': true
               },

               build: ['_build']
          },

          /**
           * 监听文件变化
           */
          watch: {
               css: {
                    files: 'project/less/**/*.less',
                    tasks: ['newer:less'],
                    options: {
                         livereload: true
                    }
               }
          }
     });


     grunt.loadNpmTasks('grunt-cmd-concat');

     grunt.loadNpmTasks('grunt-cmd-transport');
     grunt.loadNpmTasks('grunt-contrib-clean');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-copy');
     grunt.loadNpmTasks('grunt-contrib-cssmin');
     grunt.loadNpmTasks('grunt-contrib-htmlmin');
     grunt.loadNpmTasks('grunt-newer');
     grunt.loadNpmTasks('grunt-contrib-less');
     grunt.loadNpmTasks('grunt-contrib-watch');

     grunt.task.registerTask('logFile',"动态配置项",function(){
          var fs = require("fs");
          var path = require("path");

          var logPath = path.join(__dirname,"dist/","libs","sea-config.js");

          grunt.file.write(
               logPath,
               grunt.file.read(logPath).replace('var random=(new Date).getTime();','var random = '+(new Date().getTime())+';')
          );

     });

     grunt.registerTask('default', [
          'less',
          'copy',
          'htmlmin',
          'cssmin',
          'transport',
          'concat',
          'uglify',
          'clean',
          'logFile'
     ]);

};