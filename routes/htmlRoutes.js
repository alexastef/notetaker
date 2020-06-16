// Dependencies
const path = require("path");
const router = require("express").Router();


  // GET notes and return notes.html
  router.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  // GET * returns index.html
  router.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"))
  });



module.exports = router;


