import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import userRouter from './routes/user.routes.js';
import urlRouter from './routes/url.routes.js';
import cookieParser from 'cookie-parser';
import { reDirectUrl } from './controllers/url.controller.js';
import { Clicks } from './utils/synclicks.js';
dotenv.config();
connectDB();
const app= express();


app.use(
  cors({
    origin: "https://url-shortner-frontend-iota-three.vercel.app", // EXACT frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/users',userRouter);
app.use('/api/url',urlRouter);
app.get('/:code',reDirectUrl);

setInterval(async() => {
  await Clicks();
}, 10 * 60 * 1000);

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});