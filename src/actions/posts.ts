"use server";

import { posts } from "../lib/data";
import type { Post } from "../types";

export async function savePost(formData: FormData) {
  const id = formData.get("id");
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const tagsValue = String(formData.get("tags") || "").trim();

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const tags = tagsValue
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (id) {
    const existingPost = posts.find(
      (post) => post.id === Number(id)
    );

    if (existingPost) {
      existingPost.title = title;
      existingPost.content = content;
      existingPost.tags = tags;

      return existingPost;
    }
  }

  const newPost: Post = {
    id:
      posts.length === 0
        ? 1
        : Math.max(...posts.map((post) => post.id)) + 1,
    title,
    content,
    date: new Date().toISOString().split("T")[0],
    tags,
  };

  posts.push(newPost);

  return newPost;
}