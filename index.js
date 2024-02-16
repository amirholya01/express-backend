require("dotenv").config();

const Application = require("./app/server");

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;

new Application(PORT, DB_HOST);