const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./data/notes.json');
const { createNewNote, validateNote } = require('./lib/notes');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// make public files (front end code) readily available (static resources)
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// Route to the index.html (the landing page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// Route to the notes.html (list of notes and input to add a new note)
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// Catch Route to send back to index.html (landing page)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/notes', (req, res) => {
    // set the id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // validate data in the body, send 400 error back if any data is incorrect
    if (!validateNote(req.body)) {
        res.status(400).send('The note input is not properly formatted.');
    }
    else {
        // add note to json file and notes array
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// deletes notes
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let note;
 
    notes.map((element, index) => {
       if(element.id == id) {
          note = element
          notes.splice(index, 1)
          return res.json(note);
       }
    }) 
 });

//  // create a new note
// function createNewNote(body, notesArray) {
//     const note = body
//     notesArray.push(note);

//     fs.writeFileSync(
//         path.join(__dirname, '../data/notes.json'),
//         JSON.stringify({ notes: notesArray }, null, 2)
//     );
//     console.log(note);
//     return note;
// }

// // validates input syntax of new notes
// function validateNote(note) {
//     if (!note.title || typeof note.title !== 'string') {
//         return false;
//     }

//     if (!note.text || typeof note.text !== 'string') {
//         return false;
//     }

//     return true;
// }


app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}!`);
});