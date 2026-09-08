import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { PostFilter } from "./PostFilter";

describe("PostFilter", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  const posts = [
    {
      id: 1,
      title: "Tech Post",
      content: "Technology content",
      date: "2025-04-13",
      tags: ["tech"],
    },
    {
      id: 2,
      title: "Lifestyle Post",
      content: "Lifestyle content",
      date: "2025-04-12",
      tags: ["lifestyle"],
    },
  ];

  it("shows available tags", () => {
    render(<PostFilter posts={posts} />);

    expect(screen.getByText("tech")).toBeInTheDocument();
    expect(screen.getByText("lifestyle")).toBeInTheDocument();
  });

  it("redirects when a tag is selected", () => {
    render(<PostFilter posts={posts} />);

    fireEvent.change(screen.getByLabelText("Tag:"), {
      target: { value: "tech" },
    });

    expect(window.location.search).toBe("?tag=tech");
  });

  it("redirects when sort order is selected", () => {
    render(<PostFilter posts={posts} />);

    fireEvent.change(screen.getByLabelText("Sort by date:"), {
      target: { value: "oldest" },
    });

    expect(window.location.search).toBe("?sort=oldest");
  });

  it("returns to home when all tags is selected", () => {
    window.history.pushState({}, "", "/?tag=tech");

    render(<PostFilter posts={posts} />);

    fireEvent.change(screen.getByLabelText("Tag:"), {
      target: { value: "" },
    });

    expect(window.location.pathname).toBe("/");
    expect(window.location.search).toBe("");
  });
});