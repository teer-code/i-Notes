const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { query, body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes using GET "/api/notes/fetchnotes". login required.  doesn't require auth
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred: " + error.message);
  }
});

//ROUTE 2: Add all new notes using POST "/api/notes/addnote". login required.  doesn't require auth
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors, return bad req and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred: " + error.message);
    }
  }
);

//ROUTE 3: Update an existing note using PUT "/api/notes/updatenote". login required.  doesn't require auth
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    
  
  //CREATE newNote Object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  //Find the note to be updated and update it

  let note = await Note.findById(req.params.id);
  if (!note) {res.status(404).send("Not Found"); return;}

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred: " + error.message);
}
});

//ROUTE 4: Delete an existing note using DELETE "/api/notes/deletenote". login required.  doesn't require auth
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
  //Find the note to be deleted and update it

  let note = await Note.findById(req.params.id);
  if (!note) {res.status(404).send("Not Found the Note"); return;}

  //Allow deletion only if user owns this note
  if (!note || note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndDelete(req.params.id);
  res.json({ "Success":"Note as been deleted", note:note });
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred: " + error.message);
}
});
module.exports = router;
