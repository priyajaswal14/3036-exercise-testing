import React from "react";
import { Post } from "../types";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div>
      <h2>Posts</h2>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{post.date}</p>
            <p>{post.tags.join(", ")}</p>
          </article>
        ))
      )}
    </div>
  );
}