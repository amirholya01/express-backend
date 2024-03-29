const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const createError = require("http-errors");
const {AllRoutes} = require("./routes/router");
module.exports = class Application{
    #express = require('express');
    #app = this.#express();

    constructor(PORT, DB_HOST) {
        this.configApplication();
        this.createServer(PORT);
        this.connectToMongoDB(DB_HOST);
        this.createRoute();
        this.errorHandler();
    }

    configApplication(){
        const path = require("path");

        this.#app.use(morgan("dev"));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended : true}));
        this.#app.use(cookieParser());
    }

    createServer(PORT){
        const http = require("http");

        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        });
    }

    connectToMongoDB(DB_HOST){
        const mongoose = require("mongoose");
        mongoose.connect(DB_HOST)
            .then(() => console.log("Connecting to MongoDB was successfully"))
            .catch(err => console.log(`Connecting to MongoDB was failed ---- ${err}`));

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        })
    }

    createRoute(){
        this.#app.use(AllRoutes);
    }

    errorHandler(){
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status : 404,
                success : false,
                message : "The page or address  was not found"
            })
        })

        this.#app.use((err, req, res, next)=>{

            const statusCode = err?.status || 500;
            const message = err?.message || "Internal Server Error";
            return res.status(statusCode).json({
                statusCode: statusCode,
                message: message
            })
        })
    }
}