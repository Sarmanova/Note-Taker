const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("./helpers/uuid")
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
    console.log(`${req.method} request received to get reviews`);
    res.json(db);
});
app.post("/api/notes", (req, res) => {
    let newNotes = req.body;
    newNotes.id = uuid();
    db.push(newNotes);

    fs.writeFile("./db/db.json", JSON.stringify(writeErr), (writeErr) =>
        writeErr ?
        console.error(writeErr) :
        console.info("Successfully updated  new notes id!")
    );
    req.send(db);
});
app.delete("/api/notes/:id", (req, res) => {
    db.splice(req.params.id)
    res.send("DELETE NOTES ID" + req.params.id);

});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);