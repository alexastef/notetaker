const util = require("util");
const fs = require("fs");

// Generate unique ID's
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note, null, 2));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  saveNote(newNote) {
    console.log("post success. new note: ", newNote);

    // read all notes in db
    return this.read().then((notes) => {
      // assign a unique ID to the new note only
        // all other notes should have ID if app starts with 0 notes
        // if starting with test note, hard code ID into JSON
      newNote.id = uuidv1();

      // create array with all notes + new note
      let allNotes = [...JSON.parse(notes), newNote];
      
      // write all note to db and return new note
      return this.write(allNotes).then(() => newNote);
    });
  }

  deleteNote(noteId) {
    // read all notes in db
    return this.read().then((notes) => {
      let allNotes = JSON.parse(notes);
      
      // filter all notes to create new array of notes where the id does not match
      // the id of the clicked/deleted note
      let updatedNotes = allNotes.filter(note => note.id != noteId);

      // write the updated notes array to the file and return them
      return this.write(updatedNotes).then(() => updatedNotes);
    })

  }
}

module.exports = new Store();
