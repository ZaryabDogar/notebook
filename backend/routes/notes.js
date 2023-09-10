const express = require('express')
const router = express.Router()
const Notes = require("../models/Notes")
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//get all the notes using :get  /api/notes/fetchallnotes ..login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
    }
})

//add new note :post /api/notes/addnote ..login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter valid description').isLength({ min: 5 })
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        // if there are errors return bad request and errors
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user
        })
        const savednotes = await note.save()
        res.json(savednotes)

    } catch (error) {
        console.log(error.message)
    }
})

//Route 3 update an exsisting notes using POST://  /api/notes/updatenote   .login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        // create new note  
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user._id) { return res.status(401).send("Not Allowed") }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.log(error.message)

    }

})


module.exports = router