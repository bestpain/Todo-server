const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const app=express();
const bodyParser=require('body-parser')
const port=process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(cors());


const connection=mysql.createConnection(
	'mysql://efkzlgyen51af7qf:dqy377oflplxypp6@tviw6wn55xwxejwj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ms09fazp4ehbywq3'
	);
//console.log(connection)

connection.connect(err=>{
	if(err) {
		console.log("error while connecting to db", err);
	}
});



//todos query handler
//add todo
app.post('/todos/add',(req,res)=>{
	const {name,id}=req.body;
	const INSERT_TASK=`insert into tasks(task,isComplete,bucketid) VALUE('${name}',0,'${id}')`;
	connection.query(INSERT_TASK,(err,results)=>{
		if(err){
			return res.send(err)
		}else{
			return res.json(results)
		}
	})
});

//view all todo
app.get('/todos/:id',(req,res)=>{
	const {id}=req.params;
	const SELECT_TASKS=`select * from tasks where bucketid='${id}'`;
	connection.query(SELECT_TASKS,(err,results)=>{
		if(err){
			return res.send(err)
		}else{
			return res.json(results)
		}
	})
});

//update a todo
app.put('/todos/toggle/:id',(req,res)=>{
	const {id}=req.params;
	const TOGGLE_TODO=`update tasks set isComplete= not isComplete where id='${id}'`;
	connection.query(TOGGLE_TODO,(err,results)=>{
		if(err){
			return res.send(err)
		}else{
			return res.json(results)
		}
	})
});

//edit a todo
app.put('/todos/edit/:id',(req,res)=>{
	const {id}=req.params;
	const {name}=req.body;
	const UPDATE_TODO=`update tasks set task= '${name}' where id='${id}'`;
	connection.query(UPDATE_TODO,(err,results)=>{
		if(err){
			return res.send(err)
		}else{
			return res.json(results)
		}
	})
});

//delete a todo
app.delete('/todos/delete/:id',(req,res)=>{
	const {id}=req.params;
	const DELETE_TODO=`delete from tasks where id='${id}'`;
	connection.query(DELETE_TODO,(err,results)=>{
		if(err){
			return res.send(err)
		}else{
			return res.json(results)
		}
	})
});

//buckets query handler
app.post('/bucket/add',(req,res)=>{
	const {Value}=req.body;
	const INSERT_BUCKET=`insert into buckets(category) VALUE('${Value}')`;

	connection.query(INSERT_BUCKET,(err,results)=>{
		if(err){
			return res.send(err)
		}else{
			return res.json(results)
		}
	})
});

app.get('/',(req,res)=>{
	const SELECT_BUCKETS="select * from buckets";
	connection.query(SELECT_BUCKETS,(err,results)=>{
		if(err){
			return res.send(err)
		}else{
			return res.json(results)
		}
	})
});

app.get('/bucket/:id',(req,res)=>{
	const {id}=req.params;
	const SELECT_BUCKET=`select * from buckets where id='${id}'`;
	connection.query(SELECT_BUCKET,(err,results)=>{
		if(err){
			return res.send(err)
		}else{
			return res.json(results)
		}
	})
});

app.listen(port,()=>{
	console.log(`server listening on port ${port}`)
})
