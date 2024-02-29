import { Request, Response } from 'express';
import { Pool } from 'pg';
import { getRepository } from 'typeorm';
import { Comments } from '../models/comment';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blog_database',
    password: '123456',
    port: 5432,

});

export const getAllComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = `
      SELECT comment.id,comment.owner,comment.post,comment.content,comment.created_at, "user".name 
      FROM comments comment
      LEFT JOIN users "user" ON "user".id = comment.owner
    `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const getAllCommentsByPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;

        const query = `
            SELECT comment.id, comment.owner, comment.post, comment.content, comment.created_at, "user".name 
            FROM comments comment
            LEFT JOIN users "user" ON "user".id = comment.owner
            WHERE comment.post = $1
        `;

        const result = await pool.query(query, [postId]);

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const editCommentContent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { newComment } = req.body;

    try {
        const commentRepository = getRepository(Comments);
        const comment = await commentRepository.findOne(id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        comment.content = newComment;
        await commentRepository.save(comment);
        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
        console.error('Error editing conntent comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

