// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("./helpers/uuid")
const app = express();
const db = require("./db/db.json")
const PORT = process.env.PORT || 3001;
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//Setup the /api/notes get route
app.get("/api/notes", (req, res) => {
    console.log(`${req.method} request received NOTES routes`);
    res.json(db);
});
//Setup the / api / notes post route
app.post("/api/notes", (req, res) => {
    console.log(`${req.method} request received NOTES routes`);

    let newNotes = req.body;
    newNotes.id = uuid();
    db.push(newNotes);
    createdJsonFile();
    req.send(db);
});
// Deletes a note with specific id
app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    db.splice(noteId, 1);
    createdJsonFile();
    res.send("DELETE NOTES ID" + noteId);

});
// Displaying second page when all routes accessed
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// Displaying main page when all routes accessed
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// Setup listener
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
// Created  db file each time a new note is added
createdJsonFile = () => {
    fs.writeFile("./db/db.json", JSON.stringify(db), (writeErr) =>
        writeErr ? console.error(writeErr) : console.log("Successfully updated  new notes id!")
    );
}