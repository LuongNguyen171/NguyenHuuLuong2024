import express from 'express';
import { deletePostById, getAllPosts } from '../controllers/postController';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.delete('/deletePost/:id', deletePostById);

export default postRouter;
