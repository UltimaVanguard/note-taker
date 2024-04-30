const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    const { text, title} = req.body

    if (text && title) {
        const newNote = {
            text,
            title,
            id: uuidv4()
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

notes.delete('/:id', (req, res) => {
        readFromFile('./db/db.json')
            .then((data) => {
                let newData = JSON.parse(data);
                let notes = newData.filter((note) => note.id !== req.params.id)
                writeToFile('./db/db.json', notes);
                res.json(notes);
        })
})

module.exports = notes;