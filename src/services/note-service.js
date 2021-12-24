const { noteModel } = require("../models/note-model");
const { v4 } = require("uuid");

class NoteService {
    constructor() {}

    getAllNote() {
        return new Promise((resolve) => {
            noteModel.find((notes) => resolve(notes));
        });
    }
    getNote(query) {
        return new Promise((resolve) =>
            noteModel.findOne(query, "", {}, (notes) => resolve(notes))
        );
    }

    createNote(noteInput) {
        const newNote = {
            ...noteInput,
            id: v4(),
            isCheck: false,
        };
        return new Promise((resolve) => {
            noteModel.create(newNote, (notes) => resolve(notes));
        });
    }
    checkNote(query) {
        return new Promise((resolve) => {
            this.getNote(query).then((note) => {
                const newNote = { ...note, isCheck: !note.isCheck };
                noteModel.updateOne(query, newNote, {}, () => resolve(newNote));
            });
        });
    }
}

module.exports = NoteService;
