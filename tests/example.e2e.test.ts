import { test, expect } from "@playwright/test";

test("shows the blog posts page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Filter Posts", exact: true })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Posts", exact: true })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Welcome", exact: true })
  ).toBeVisible();

  await expect(page.getByText("First post!")).toBeVisible();
});

test("filters posts by tag", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Tag:").selectOption("intro");

  await expect(page).toHaveURL(/tag=intro/);
});

test("changes the sort order", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Sort by date:").selectOption("oldest");

  await expect(page).toHaveURL(/sort=oldest/);
});