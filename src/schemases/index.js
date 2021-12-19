const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Note {
    id: ID
    title: String
    description: String
    isCheck: Boolean
}

input NoteInput {
    title: String!
    description: String
}

type Query {
    getAllNote: [Note]
    getNote(id: ID): Note
}

type Mutation {
    createNote(note: NoteInput): Note
    checkNote(id: ID): Note
}
`)

module.exports = schema