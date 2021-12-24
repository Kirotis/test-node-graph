const NoteService = require("../services/note-service");
const noteService = new NoteService();

const root = {
    async getAllNote() {
        return await noteService.getAllNote();
    },
    async getNote(query) {
        return await noteService.getNote(query);
    },

    async createNote({ noteInput }) {
        return await noteService.createNote(noteInput);
    },
    async checkNote(query) {
        return await noteService.checkNote(query);
    },
};

module.exports = root;
