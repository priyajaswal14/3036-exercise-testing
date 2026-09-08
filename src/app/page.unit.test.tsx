import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import HomePage from "./page";
import { posts } from "../lib/data";

describe("HomePage", () => {
  beforeEach(() => {
    posts.splice(
      0,
      posts.length,
      {
        id: 1,
        title: "Tech New",
        content: "New tech post",
        date: "2025-04-15",
        tags: ["tech"],
      },
      {
        id: 2,
        title: "Lifestyle Old",
        content: "Old lifestyle post",
        date: "2025-04-10",
        tags: ["lifestyle"],
      }
    );

    window.history.pushState({}, "", "/");
  });

  it("filters posts by tag", () => {
    window.history.pushState({}, "", "/?tag=tech");

    render(<HomePage />);

    expect(screen.getByText("Tech New")).toBeInTheDocument();
    expect(screen.queryByText("Lifestyle Old")).not.toBeInTheDocument();
  });

  it("sorts posts from oldest to newest", () => {
    window.history.pushState({}, "", "/?sort=oldest");

    render(<HomePage />);

    const headings = screen.getAllByRole("heading", { level: 3 });

    expect(headings[0]).toHaveTextContent("Lifestyle Old");
    expect(headings[1]).toHaveTextContent("Tech New");
  });

  it("sorts posts from newest to oldest by default", () => {
    window.history.pushState({}, "", "/");

    render(<HomePage />);

    const headings = screen.getAllByRole("heading", { level: 3 });

    expect(headings[0]).toHaveTextContent("Tech New");
    expect(headings[1]).toHaveTextContent("Lifestyle Old");
  });
});