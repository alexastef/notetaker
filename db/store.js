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
      // create array with all notes + new note
      let allNotes = [...JSON.parse(notes), newNote];
      // write all note to db and return new note
      return this.write(allNotes).then(() => newNote);
    });
  }
}

module.exports = new Store();
