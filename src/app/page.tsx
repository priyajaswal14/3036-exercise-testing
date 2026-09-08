import React from "react";
import { PostFilter } from "../components/PostFilter";
import { PostList } from "../components/PostList";
import { posts } from "../lib/data";

export default function HomePage() {
  const params = new URLSearchParams(window.location.search);

  const selectedTag = params.get("tag");
  const sortOrder = params.get("sort") ?? "newest";

  let filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : [...posts];

  filteredPosts = filteredPosts.sort((a, b) => {
    const firstDate = new Date(a.date).getTime();
    const secondDate = new Date(b.date).getTime();

    if (sortOrder === "oldest") {
      return firstDate - secondDate;
    }

    return secondDate - firstDate;
  });

  return (
    <div>
      <PostFilter posts={posts} />
      <PostList posts={filteredPosts} />
    </div>
  );
}