import React from "react";
import { Post } from "../types";

interface PostFilterProps {
  posts: Post[];
}

export function PostFilter({ posts }: PostFilterProps) {
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  function handleTagChange(tag: string) {
    const url = tag ? `/?tag=${encodeURIComponent(tag)}` : "/";
    window.history.pushState({}, "", url);
  }

  function handleSortChange(sort: string) {
    window.history.pushState({}, "", `/?sort=${sort}`);
  }

  return (
    <div>
      <h2>Filter Posts</h2>

      <label htmlFor="tag">Tag:</label>
      <select
        id="tag"
        onChange={(event) => handleTagChange(event.target.value)}
      >
        <option value="">All Tags</option>

        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <label htmlFor="sort">Sort by date:</label>
      <select
        id="sort"
        onChange={(event) => handleSortChange(event.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}