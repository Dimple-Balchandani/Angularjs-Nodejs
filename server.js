var express = require('express');
var app = express(); 
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
  
app.get('/contactlist',function(req,res){
	db.contactlist.find(function(err,data){
		res.json(data);
	});
});

app.post('/contactlist',function(req,res){
	db.contactlist.insert(req.body, function(err,data){
		res.json(data);
	});
});

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,data){
		res.json(data);
	});
});

app.get('/contactlist/:id',function(req,res){
	var id = req.params.id;
	db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,data){
		res.json(data);
	});
});

app.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
	update:{$set:{name: req.body.name, email:req.body.email, number:req.body.number}},
	new:true},function(err,data){
		res.json(data);
	});
});

app.listen(8081);
console.log("App listening on port 8081");
