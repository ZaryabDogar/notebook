const express=require('express')
const router=express.Router()
const Notes = require("../models/Notes")
const fetchuser = require('../middleware/fetchuser');

//get all the notes using :get  /api/notes/fetchallnotes ..login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
   const notes=await Notes.find({user:req.user})
    res.json(notes)
} catch (error) {
        console.log(error)
    }
})
module.exports=router