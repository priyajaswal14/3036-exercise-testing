import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PostList } from "./PostList";

describe("PostList", () => {
  it("renders posts correctly", () => {
    const posts = [
      {
        id: 1,
        title: "First Post",
        content: "This is my first post",
        date: "2025-04-13",
        tags: ["tech"],
      },
    ];

    render(<PostList posts={posts} />);

    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("This is my first post")).toBeInTheDocument();
    expect(screen.getByText("2025-04-13")).toBeInTheDocument();
    expect(screen.getByText("tech")).toBeInTheDocument();
  });

  it("shows a message when there are no posts", () => {
    render(<PostList posts={[]} />);

    expect(screen.getByText("No posts found.")).toBeInTheDocument();
  });
});