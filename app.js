const http = require('http');
//加载http核心模块
const fs = require('fs');
//加载fs文件管理模块
const template = require('art-template')

const url =require('url')


let comments = [
    {
        name:'张三',
        message:'今天天气真好',
        dataTime:'2019-7-9'
    },
    {
        name:'张三',
        message:'今天天气真好',
        dataTime:'2019-7-9'
    },
    {
        name:'张三',
        message:'今天天气真好',
        dataTime:'2019-7-9'
    },
    {
        name:'张三',
        message:'今天天气真好',
        dataTime:'2019-7-9'
    }
]

const server = http.createServer();
//创建服务器

server.on('request',function(request,respond){
    let parseObj = url.parse(request.url, true);
    let pathname = parseObj.pathname;
    if(pathname === '/'){
        // respond.setHeader('Content-Type', 'text/plain; charset=utf-8');
        // respond.end('hello 世界');
        //设置开头文件，设置浏览器读取文件的编码
        fs.readFile('./view/index.html',function(err,data){
            if(err){
                return respond.end('读取文件失败');
            }
            var htmlStr = template.render(data.toString(),{
                comments: comments
            })
            respond.end(htmlStr);
        })
    }else if(pathname === '/post'){
        fs.readFile('./view/post.html',function(err,data){
            if(err){
                return respond.end('读取文件失败');
            }
            respond.end(data);
        })
    }else if(pathname.indexOf('/public/') === 0){
        fs.readFile('.' + pathname, function(err, data){
            if(err){
                return respond.end('404 No Found');
            }
            respond.end(data);
        })
    }else if(pathname === '/pinglun'){
        let comment = parseObj.query;
        comment.dataTime = '2019-7-10';
        comments.unshift(comment);
        respond.statusCode = 302;
        respond.setHeader('Location','/');
        respond.end();
    }else{
        fs.readFile('./view/404.html', function(err, data){
            if(err){
                return respond.end('404 No Found');
            }
            respond.end(data);
        })
    }
    
});
//运行服务器

server.listen('3000',function(){
    console.log('running...');
});
//指定端口号
