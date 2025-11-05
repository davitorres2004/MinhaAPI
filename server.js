import express from 'express';
    // or if you have a custom file exporting it, e.g., './src/db.js'


    // import { prisma } from './src/db.js';
import { PrismaClient } from '@prisma/client'
import cors from 'cors';


const prisma = new PrismaClient()


const app = express()
app.use(cors());
app.use(express.json())
const users = []
app.post('/usuarios',async(req,res) => {
    await prisma.user.create({
        data :{
            email:req.body.email,
            age:req.body.age,
            name:req.body.name
        }
    })
    users.push(req.body)
    res.status(201).json(req.body)
})

app.put('/usuarios/:id',async(req,res) => {
    await prisma.user.update({
        where:{
            id:req.params.id
        },
        data :{
            email:req.body.email,
            age:req.body.age,
            name:req.body.name
        }
    })
    
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id',async(req,res) => {
    await prisma.user.delete({
        where:{
            id:req.params.id,
        },
            })
    res.status(200).json({message:'Usuario deletado com sucesso'})
    
})


app.get('/usuarios',(req,res) => {
    res.status(200).json(users)
})
    


app.listen(3000)