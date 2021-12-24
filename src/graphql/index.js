const { Router } = require("express");
const { graphqlHTTP } = require("express-graphql");
const { readFileSync } = require("fs");
const { buildSchema } = require("graphql");

const noteMethods = require("./note");

const router = new Router();
const graphqlStr = readFileSync("./src/graphql/note.graphql", "utf-8");
const schema = buildSchema(graphqlStr);

const rootValue = {
    ...noteMethods,
};

router.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: true,
    })
);

module.exports = router;
