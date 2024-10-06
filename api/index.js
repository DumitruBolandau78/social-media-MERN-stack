import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRoutes from './Routes/User.route.js';
import postRoutes from './Routes/Post.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

env.config();
const PORT = 1000 || process.env.PORT;

const app = express();

app.use((req, res, next) => {
    const allowedOrigins = [
        'http://localhost:5173',
        'https://social-media-mern-stack-client.vercel.app'
    ];

    // Check if the request's origin is in the allowedOrigins array
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));
app.use('/images', express.static(path.join(__dirname, 'dist', 'images')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(cors({
    origin: ['https://social-media-mern-stack-client.vercel.app', 'http://localhost:5173'],
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
        saveUninitialized: true,
        store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30, // Session expiry time (optional)
        }
    })
);

app.get('/', (req, res) => {
    res.send('Hi');
});

app.use('/api', userRoutes);
app.use('/api', postRoutes);

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