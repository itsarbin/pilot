const express = require('express');
const noteModel = require('./model/note.model');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./public'))
const path = require('path');


app.post('/notes', async (req, res)=>{
    const {title, description} = req.body;

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        Message: "Note Created Successfully",
        note
    });
})

app.get('/notes', async (req, res)=>{
    const notes = await noteModel.find();

    res.status(200).json({
        Message: "Notes Fetched Successfully",
        notes
    })
})

app.delete('/notes/:id', async (req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        Message: `Note deleted successfully with id ${id}`
    })
})

app.patch('/notes/:id', async (req,res)=>{
    const {id} = req.params;
    const {description} = req.body;

    await noteModel.findByIdAndUpdate(id,{description});

    res.status(200).json({
        Message: `Note updated successfully with id ${id}`
    })
})




app.use('*name', (req, res)=>{
   
    res.sendFile(path.join(__dirname,"..",'public', 'index.html'))
})

module.exports = app;