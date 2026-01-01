import { Post } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  return result;
};

// get all post
const getPosts = async (payload: { searchTerm: string }) => {
  const result = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: payload.searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: payload.searchTerm,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: payload.searchTerm,
          },
        },
      ],
    },
  });
  return result;
};

export const postService = {
  createPost,
  getPosts,
};
