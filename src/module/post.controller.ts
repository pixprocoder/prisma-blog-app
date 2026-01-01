import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }
    const result = await postService.createPost(req.body, user.id as string);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e,
    });
  }
};

// all post
const getPosts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await postService.getPosts({ searchTerm });
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      details: e,
    });
  }
};

export const PostController = {
  createPost,
  getPosts,
};
