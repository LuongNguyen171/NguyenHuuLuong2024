import express from 'express';
import { editCommentContent, getAllComments, getAllCommentsByPost } from '../controllers/commentController';

const commentRouter = express.Router();

commentRouter.get('/', getAllComments);
commentRouter.get('/post/:postId', getAllCommentsByPost);
commentRouter.put('/editComment/:id', editCommentContent);

export default commentRouter;
