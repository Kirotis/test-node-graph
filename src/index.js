const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { connect } = require("mongoose");
const graphql = require("./graphql/index");

const serverPort = process.env.PORT || 4000;
const serverHost = process.env.HOSTNAME || "localhost";
const dbConnect = process.env.DB_CONNECT || "mongodb://localhost:27017/";

const app = express();
app.use(cors());
app.use(express.json());
app.use(graphql);

const server = createServer(app);

const start = () => {

    server.listen(serverPort, serverHost, () => {
        console.info(
            `Server is listening on http://${serverHost}:${serverPort}`
            );
        });
        
    connect(dbConnect, (err) => {
        if (err) {
            return console.error(err.message || err)
        }
        console.info(`Database was connected with url: ${dbConnect}`);
    });
};

start();
