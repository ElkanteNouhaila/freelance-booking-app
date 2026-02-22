import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';

import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import connectdb from './db/conn.js';


dotenv.config();
console.log(process.env.MONGO_URI); 


const app = express();

app.use(express.json());
// app.use(cors());

app.use('/users', userRouter);
app.use('/posts', postRouter);

const PORT = process.env.PORT || 3003;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
