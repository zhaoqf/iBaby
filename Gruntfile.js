module.exports=function(grunt){
  

    // 项目配置(任务配置)
    grunt.initConfig({
       
        watch: {
            jade:{
                files:['views/**'],
                options:{
                    livereload:true
                }
            },
            js:{
                files:['public/js/**','models/**/*.js','schemas/**/*.js'],
                // tasks:['jshint']
                options:{
                    livereload:true
                }
            }
        },
        nodemon:{
            dev:{
                script:'app.js',
                options:{
                        // file:'app.js',
                        args:[],
                        ignoredFiles:['node_modules/**'],
                        watchedExtensions:['js'],
                        watchedFolders:['app','config'],
                        debug:true,
                        delayTime:1,
                        env:{
                            PORT:3000
                        },
                        cwd:__dirname
                }
            }
        },
        concurrent:{
            tasks:['nodemon','watch'],
            options:{
                logConcurrentOutput:true
            }
        }
    }); // grunt.initConfig配置完毕
 
    // 加载插件
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.option('force',true);
    // 自定义任务
    grunt.registerTask('default', ['concurrent']);

};