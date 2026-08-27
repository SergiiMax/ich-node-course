import type {Request, Response} from "express";
import { Post } from '../db/models/index.js';

interface PostBody {
    title: string;
    subtitle: string;
    body: string;
    subject: string;
}

// [key:string]:string

export const createPost = async (
    req: Request<unknown, unknown, PostBody>,
    res: Response
) => {
    try {
        const {title, subtitle, body, subject} = req.body;

        if (!title?.trim() || !body?.trim()) {
            return res.status(400).json({error: 'title and content are required'});
        }

        const post = await Post.create({title, subtitle, body,  subject, userId: req.user!.id});

        return res.status(201).json({post});
    } catch (e) {
        return res.status(500).json({
            error: 'Something went wrong',
            message: (e as Error).message
        });
    }
}

export const getPostById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const {id} = req.params;

        const post = await Post.findByPk(id)

        if (!post) {
            return res.status(404).json({error: 'post not found'});
        }
        return res.status(200).json({post});
    } catch (e) {
        return res.status(500).json({
            error: 'Something went wrong',
            message: (e as Error).message
        });
    }
}

export const getAllPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    association: 'user',
                    attributes: ['username'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({posts});
    } catch (e) {
        return res.status(500).json({
            error: 'Something went wrong',
            message: (e as Error).message,
        });
    }
}

export const getPostsByUserId = async (req: Request, res: Response) => {
    try {
        const posts = await Post.findAll({
            where: {
                userId: req.user!.id,
            },
        });

        return res.status(200).json({posts});
    } catch (e) {
        return res.status(500).json({
            error: 'Something went wrong',
            message: (e as Error).message,
        });
    }
}

export const deletePostById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const {id} = req.params;
        const post = await Post.findByPk(id)

        if (!post) {
            return res.status(404).json({error: 'post not found'});
        }

        if (post.userId !== req.user!.id) {
            return res.status(403).json({
                error: 'Forbidden'
            })
        }

        await Post.destroy({
            where: {
                id: id
            }
        })
        return res.status(204).json();

    } catch (e) {
        return res.status(500).json({
            error: 'Something went wrong',
            message: (e as Error).message,
        });
    }
}