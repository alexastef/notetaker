// Dependencies
const router = require("express").Router();
const store = require("../db/store");

// GET "/api/notes" responds with all notes from the database
router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});


//router post /notes
// POST /api/notes receives new note to save on the req.body, adds note to db.json, then returns note to client
router.post("/notes", (req, res) => {
    let newNote = req.body;
    store
        .saveNote(newNote)
        .then((newNote) => res.json(newNote));
})

//router delete /notes/:id


module.exports = router;