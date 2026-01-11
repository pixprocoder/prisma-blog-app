import express, { Router } from "express";
import { PostController } from "./post.controller";
import auth, { UserRole } from "../../middlewares/auth";
const router = express.Router();

router.get("/", PostController.getPosts);

router.get("/stats", auth(UserRole.ADMIN), PostController.getStats);

router.get(
  "/my-posts",
  auth(UserRole.USER, UserRole.ADMIN),
  PostController.getMyPosts
);

router.get("/:postId", PostController.getSinglePost);

router.post("/", auth(UserRole.USER), PostController.createPost);

router.patch(
  "/:postId",
  auth(UserRole.USER, UserRole.ADMIN),
  PostController.updatePost
);

export const postRouters: Router = router;
