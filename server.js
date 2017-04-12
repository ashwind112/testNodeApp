

//----------set up
var express=require('express');
var app=express()
var mongoose=require('mongoose');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');

//----------configuration

app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({"extended":"true"}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());





var ToDo=[{id:1,task:"run"}
,{id:2,task:"bath"}
,{id:3,task:"go to office"}
,{id:4,task:"lunch"}
,{id:5,task:"breakfast"}
,{id:6,task:"sleep"}]


//-----------rest API

app.get('/get/tasks',function(req,res){
    res.json(ToDo);
});

app.post('/create/task',function(req,res){
    var count=0;
    for (i in ToDo){
        count++;
    }
    ToDo.append({
        id:count,
        name:req.body.text
    });
    res.json(ToDo);
});

app.delete('/delete/task/:taskid',function(req,res){
    ToDo.remove(req.param.taskid-1);
    res.json(ToDo)
});

app.get('*',function(req,res){
    res.sendFile(__dirname+'/public/index.html');
});


//----------listen and start sever
app.listen(8080);
console.log("App is listining on port 8080");