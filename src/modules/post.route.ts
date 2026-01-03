import express, { Router } from "express";
import { PostController } from "./post.controller";
import auth, { UserRole } from "../middlewares/auth";
const router = express.Router();

router.get("/", PostController.getPosts);

router.get("/:postId", PostController.getSinglePost);

router.post("/", auth(UserRole.USER), PostController.createPost);

export const postRouters: Router = router;
