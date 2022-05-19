const router = require('express').Router();
const { validateNote, createNewNote } = require('../../lib/notes');
const { notes } = require('../../data/notes.json');


router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
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

module.exports = router;