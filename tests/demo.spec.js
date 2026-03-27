const { test, expect } = require("playwright/test");
import { URLS } from "../utils/urls.json";

test("My First Test", async ({ page }) => {
    await page.goto(URLS.GOOGLE);
    let currUrl = await page.url();
    expect(currUrl).toBe(URLS.GOOGLE);
    expect(await page.title()).toContain("Google");
});
