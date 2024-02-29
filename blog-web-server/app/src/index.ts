
import express from 'express';
import cors from 'cors';
import './typeorm';
import postRouter from './routes/postRouter';
import commentRouter from './routes/commentRouter';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.static('public'));


app.use(cors());

app.listen(3001, () => {
    console.log('Node server running @ http://localhost:3001');
});

app.use(express.json());

app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/users', userRouter);

