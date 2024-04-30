// creating a router
const router = require('express').Router();

// naming and defining the location of the router
const notesRouter = require('./notes.js');

// defining the path
router.use('/notes', notesRouter);

// exporting the router
module.exports = router;