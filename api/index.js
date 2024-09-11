import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import userController from './controllers/user.controller.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

env.config();
const PORT = 1000 || process.env.PORT;

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('images'));
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['get', 'post', 'put', 'delete'],
    allowedHeaders: ['Content-type'],
    credentials: true
}));

const MongoDBStoreSession = MongoDBStore(session);
const store = new MongoDBStoreSession({
    uri: process.env.MONGO_URL,
    collection: 'sessions' // MongoDB collection to store sessions
});

app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // Session expiry time (optional)
        }
    })
);

app.get('/', (req, res) => {
    res.send('Hi');
});

app.use('/api', userController);

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL).then(() => {
            app.listen(PORT);
        });
    } catch (error) {
        console.log(error);
    }
}

start();