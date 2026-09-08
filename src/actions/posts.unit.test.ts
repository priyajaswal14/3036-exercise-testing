import { beforeEach, describe, expect, it } from "vitest";
import { savePost } from "./posts";
import { posts } from "../lib/data";

describe("savePost", () => {
  beforeEach(() => {
    posts.splice(
      0,
      posts.length,
      {
        id: 1,
        title: "Existing Post",
        content: "Existing content",
        date: "2025-04-13",
        tags: ["intro"],
      }
    );
  });

  it("creates a new post", async () => {
    const formData = new FormData();

    formData.set("title", "New Post");
    formData.set("content", "New content");
    formData.set("tags", "tech, react");

    const result = await savePost(formData);

    expect(result.title).toBe("New Post");
    expect(result.content).toBe("New content");
    expect(result.tags).toEqual(["tech", "react"]);
    expect(posts).toHaveLength(2);
  });

  it("updates an existing post", async () => {
    const formData = new FormData();

    formData.set("id", "1");
    formData.set("title", "Updated Post");
    formData.set("content", "Updated content");
    formData.set("tags", "updated");

    const result = await savePost(formData);

    expect(result.title).toBe("Updated Post");
    expect(result.content).toBe("Updated content");
    expect(result.tags).toEqual(["updated"]);
    expect(posts).toHaveLength(1);
  });

  it("throws an error when title is missing", async () => {
    const formData = new FormData();

    formData.set("content", "Some content");

    await expect(savePost(formData)).rejects.toThrow(
      "Title and content are required"
    );
  });

  it("throws an error when content is missing", async () => {
    const formData = new FormData();

    formData.set("title", "Some title");

    await expect(savePost(formData)).rejects.toThrow(
      "Title and content are required"
    );
  });

  it("creates the first post when the posts array is empty", async () => {
    posts.splice(0, posts.length);

    const formData = new FormData();

    formData.set("title", "First Post");
    formData.set("content", "First content");
    formData.set("tags", "intro");

    const result = await savePost(formData);

    expect(result.id).toBe(1);
    expect(result.title).toBe("First Post");
    expect(result.content).toBe("First content");
    expect(result.tags).toEqual(["intro"]);
    expect(posts).toHaveLength(1);
  });
});