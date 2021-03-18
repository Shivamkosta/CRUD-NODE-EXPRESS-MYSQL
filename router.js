const express = require('express');
const connection = require('./connection');

const router = express.Router();

//get api
router.get('/',(req,res)=>{
    let sql = 'SELECT * FROM students';
    let query = connection.query(sql,(err,rows)=>{
        console.log("query :",query);
        if(err){
            res.status(401).json({
                status:false
            });
            console.log("error :",err);
        }
        res.status(200).json({
            user : rows
        })
        // res.render('user_index',{
        //     title:'CRUD Operation Using NodeJs/ExpressJs/MySql',
        //     users:rows
        // })
    })
});

//insert student
router.post('/create',(req,res)=>{
    // const name = req.body.name;
    console.log("body :",req.body)
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const mobileno = req.body.mobileno;
   
  
    connection.query("INSERT INTO students(email,password,name,mobileno) values(?,?,?,?)",
    [
        email,password,name,mobileno
        
    ],
    
    (err,user)=>{
       
        
        // console.log("mobileno :",req.body.mobileno)
        if(err){
            res.status(400).json({
                status:false
            });
            console.log("error :",err);
        }
        res.status(200).json({
            status:true
        });
        console.log("user :",user);
    })
   
});

// update student
router.put('/update/:id',(req,res)=>{
    id = req.params.id;
    console.log("id :",id);
    connection.query(`UPDATE students SET name=?,email=?,password=?,mobileno=? WHERE id=${req.params.id}`,
    [req.body.name,req.body.email,req.body.password,req.body.mobileno],(err,result)=>{
        if(err){
            res.status(401).json({
                status:false
            });
            console.log("error :",err);
        }
        res.status(200).json({
            status:true,
            message:'Student update successfully',
            id:req.params.id
        });
        console.log("result :",result)
    })
});

//delete student
router.delete('/delete/:id',(req,res)=>{
    id = req.params.id;
    console.log("id :",id);
    connection.query(`DELETE  FROM students WHERE id=${req.params.id} `,(err,result)=>{
        if(err){
            res.status(404).json({
                status:false
            });
            console.log("error :",err);
        }
        res.status(200).json({
            status:true,
            message:'delete successfully'
        });
        console.log("result :",result);
    })
});

module.exports = router