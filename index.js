import express from "express";
import mysql from "mysql2";
import { PrismaClient } from "@prisma/client";

const app=express();
const port=3000;
const prisma=new PrismaClient();


app.use(express.json());

const connection=mysql.createConnection({
    host:"127.0.0.1",
    user:'user',
    password:"password",
    database:"myapp",
    port:3307,
});

connection.connect((err)=>{

    if (err) {
        console.error('Error connecting to Mysql:',err.stack);
        return;
    }else{
        console.log('Connected to Mysql as Id:',connection.threadId);
    }
});


app.get("/",(req,res)=>{
    res.send("Hi, am running");
})

app.post("/register",(req,res)=>{
    const {name,email,age}=req.body;
    const query=`INSERT INTO users(name, email, age) VALUES (?, ?, ?)`;
    connection.query(query,[name,email,age],(err,results)=>{
        if (err) {
            console.log('Error while insrting user',err);
            return res.status(500).send("Internal server Error");
        }
        res.status(201).send(`User added with Id:${results.insertId}`)
    });
})

app.get("/users",(req,res)=>{
    const query='SELECT * FROM users';
    connection.query(query,(err,results)=>{
            if (err) {
              console.error('Error fetching users:', err);
              return res.status(500).send('Internal Server Error');
            }
            res.status(200).json(results);
    })
})
app.post("/users-prisma", async (req, res) => {
    const { name, email, age } = req.body;
    try {
      const user = await prisma.user.create({
        data: { name, email, age },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get("/users-prisma",async(req,res)=>{
    const users=await prisma.user.findMany();
    res.status(200).json(users)
    
})
app.put("/users/:id",(req,res)=>{
    const {id}=req.params;
    const {name,email,age}=req.body
    const query='UPDATE users SET name = ?, email = ?, age= ? WHERE id = ?';
    connection.query(query,[name,email,age,id],(err,results)=>{
            if (err) {
              console.error('Error fetching user with id :', err);
              return res.status(500).send('Internal Server Error');
            }
            res.status(200).json(results);
    })
})


app.listen(port,()=>{
    console.log("Server is listening on port 3000");
})