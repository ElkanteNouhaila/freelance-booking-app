import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';

import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";


dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());

app.use('/users', userRouter);
app.use('/posts', postRouter);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
