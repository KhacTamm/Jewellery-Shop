const express = require('express')
const cors = require("cors")
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const session  = require('express-session');
const MongoStore = require('connect-mongo');
const expressValidator = require('express-validator');

const route = require('./routes')
const app = express()
const port = process.env.PORT || 3000;
const maxAge = 3 * 60 * 60;
const db = require('./config/db')
db.connect()

app.use(
    express.urlencoded({
        extended: false,
    }),
)
app.use(express.json())
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/Velastro"
    }),
    cookie: {
        maxAge: maxAge * 1000
    }
}));

app.use(flash());
app.use(cors());
app.use(expressValidator())


route(app)


app.listen(port, () => {
    console.log(`App app listening http://localhost:${port}`)
})
