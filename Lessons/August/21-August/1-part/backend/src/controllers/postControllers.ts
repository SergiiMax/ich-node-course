import type { Document } from "mongoose";
import type { Post } from "../types.js";
import { PostModel } from "../model/Post.js";
import type { Request, Response } from "express";

function toPost(doc: Document & {_id: any, title: string, body: string, createdAt: Date}): Post {
  return {
    id: doc._id.toString(),
    title: doc.title,
    body: doc.body,
    createdAt: doc.createdAt.toISOString(),
  };
}

function validatePostData(title: unknown, body: unknown): { error?: string } {
    if (typeof title !== "string" || typeof body !== "string") {
        return { error: "Title and body must be strings" };
    }

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
        return { error: "Title and body cannot be empty" };
    }

    if (trimmedTitle.length > 100) {
        return { error: "Title must be 100 characters or less" };
    }

    return {};
}

export async function getAllPosts(req: Request, res: Response) {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 })
        const result = posts.map(toPost)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Ошибка сервера' })
    }
} 

export async function getPostById(req: Request, res: Response) {
    try {
        const id = req.params.id
        const post = await PostModel.findById(id)

        if(!post) {
            return res.status(404).json({error: "Post not found"})
        }

        const result = toPost(post)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Ошибка сервера' })

    }
}

export async function createPost(req: Request, res: Response) {
    try {
        const { title, body } = req.body
        const { error } = validatePostData( title, body)

        if(error) {
           return res.status(400).json({ error })
        }

        const post = await PostModel.create({ title: title.trim(), body: body.trim() })
        const result = toPost(post)
        return res.status(201).json(result);

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Ошибка сервера" });
    }
}

export async function updatePost(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { title, body } = req.body
        const { error } = validatePostData(title, body)

        if(error) {
            return res.status(400).json({ error })
        }

        const post = await PostModel.findById(id)
        if(!post) {
            return res.status(404).json({error: "Post not found"})
        }
        post.title = title.trim()
        post.body = body.trim()

        await post.save()

        const result = toPost(post)
        res.status(200).json(result)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error"})
    }
}

export async function deletePost(req: Request, res: Response) {
    try {
        const { id } = req.params
        const post = await PostModel.findByIdAndDelete(id)

        if(!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        return res.status(200).json({ success: true })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }
}