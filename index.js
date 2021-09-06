require("dotenv").config();
const compression = require("compression");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

app.use(cors());
app.use(helmet());
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Successfully connected to database ✨✨"));
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(
    express.json({
        limit: "10kb",
    })
); // Body limit is 10
app.use(compression());
app.use(logger("combined"));

const limiter = rateLimit({
    max: process.env.REQUEST_LIMIT || 10000, // max requests
    windowMs: 60 * 60 * 1000, // Wait 1 Hour Till Next Request
    message: "Suspected Request Activity , You have been temporarily blocked, Please Try Again in 60-90 minutes",
});
app.use(limiter);
app.use(mongoSanitize());

// NEW - Add CORS headers - see https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

require("./routes/index")(app);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started Successfully 🚀🚀");
    console.log(
        "Attempting to connect to database, please wait before testing Application 📵.."
    );
});