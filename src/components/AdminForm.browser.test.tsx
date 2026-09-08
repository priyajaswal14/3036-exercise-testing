import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { AdminForm } from "./AdminForm";

describe("AdminForm", () => {
  it("renders fields for creating a post", async () => {
    const component = render(<AdminForm />);

    await expect
      .element(component.getByLabelText("Title"))
      .toBeInTheDocument();

    await expect
      .element(component.getByLabelText("Content"))
      .toBeInTheDocument();

    await expect
      .element(component.getByLabelText("Tags"))
      .toBeInTheDocument();

    await expect
      .element(component.getByText("Save"))
      .toBeInTheDocument();
  });

  it("fills the form with an existing post when editing", async () => {
    const post = {
      id: 1,
      title: "Existing Post",
      content: "Existing content",
      date: "2025-04-13",
      tags: ["tech", "react"],
    };

    const component = render(<AdminForm post={post} />);

    await expect
      .element(component.getByLabelText("Title"))
      .toHaveValue("Existing Post");

    await expect
      .element(component.getByLabelText("Content"))
      .toHaveValue("Existing content");

    await expect
      .element(component.getByLabelText("Tags"))
      .toHaveValue("tech, react");
  });
});