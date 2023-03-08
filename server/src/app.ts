import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from './routes/auth.route';
import { userRouter } from './routes/user.route';
import { galleryRouter } from './routes/gallery.route';

import path from "path"; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/imagePress');

app.use(cors());

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/gallery', galleryRouter);

app.use("/images", express.static(path.join(__dirname, "../images")));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
})