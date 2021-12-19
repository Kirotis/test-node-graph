const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { v4 } = require("uuid");
const { createServer } = require("http");
const cors = require("cors");

const schema = require("./schemases/index");
const notes = [
    {
        id: v4(),
        title: "test",
        description: "testr description",
        isCheck: false,
    },
];
const root = {
    getAllNote: () => {
        return notes;
    },
    getNote: ({ id }) => {
        return notes.find((note) => note.id == id);
    },
    createNote: ({ noteInput }) => {
        const newNote = {
            ...noteInput,
            id: v4(),
            isCheck: false,
        };
        notes.push(newNote);
        return newNote;
    },
    checkNote: ({ id }) => {
        const note = notes.find((note) => note.id === id);
        if (note) {
            note.isCheck = !note.isCheck;
        }
        return note;
    },
};

const serverPort = process.env.PORT || 4000;
const serverHost = process.env.HOSTNAME || 'localhost';
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
);
server.listen(serverPort, serverHost, () =>
  console.info(`Server is listening on http://${serverHost}:${serverPort}`)
);