const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    const { text, title} = req.body

    if (text && title) {
        const newNote {
            text,
            title,
        }

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        }

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
})