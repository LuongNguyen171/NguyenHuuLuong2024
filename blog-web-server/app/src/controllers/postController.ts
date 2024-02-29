import { Request, Response } from 'express';
import { Pool } from 'pg';
import { getRepository } from 'typeorm';
import { Posts } from '../models/post';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blog_database',
    password: '123456',
    port: 5432,

});

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = `
      SELECT post.id, post.owner,post.tags, post.title, post.content, post.created_at, "user".name 
      FROM posts post
      LEFT JOIN users "user" ON "user".id = post.owner
    `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const deletePostById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const postRepository = getRepository(Posts);
        const post = await postRepository.findOne(id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        await postRepository.remove(post);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};