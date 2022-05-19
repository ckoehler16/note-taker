const path = require('path');
const router = require('express').Router();

// Route to the index.html (the landing page)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Route to the notes.html (list of notes and input to add a new note)
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// Catch Route to send back to index.html (landing page)
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = router;