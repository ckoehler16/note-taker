const fs = require('fs');
const path = require('path');

// create a new note
function createNewNote(body, notesArray) {
    const note = body
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
}

// validates input syntax of new notes
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }

    if (!note.text || typeof note.text !== 'string') {
        return false;
    }

    return true;
}

module.exports = {
    createNewNote,
    validateNote
};