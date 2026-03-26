const { test, expect } = require("@playwright/test");
const locators = require("../Locators/login.locators.json");
import { URLS } from "../utils/urls.json";

test("Login/Logout in the Dashboard", async ({ page }) => {
    // LOGIN
    await page.goto(URLS.ORANGE_HRM_LOGIN);

    await page.getByPlaceholder(locators.PLACE_HOLDERS.USERNAME).fill("Admin");
    //Suppose u want to type letter by letter slowly, then we can pass delay in the fill method.
    // await page.getByPlaceholder("Username").fill("Admin", { delay: 200 });
    await page.getByPlaceholder(locators.PLACE_HOLDERS.PASSWORD).fill("admin123");
    await page.locator(locators.CSS.SUBMIT_BUTTON).click();
    await page.waitForTimeout(10000);

    // Wait for dashboard
    await expect(await page).toHaveURL(/dashboard/);

    // LOGOUT
    await page.locator(locators.CSS.PROFILE_DROPDOWN).click();
    await page.getByText(locators.TEXT.LOGOUT_BUTTON).click();

    await expect(page).toHaveURL(/login/);
});

test("Invalid Login in the Dashboard", async ({ page }) => {
    // LOGIN
    await page.goto(URLS.ORANGE_HRM_LOGIN);

    await page.getByPlaceholder(locators.PLACE_HOLDERS.USERNAME).fill("Admin");
    await page.getByPlaceholder(locators.PLACE_HOLDERS.PASSWORD).fill("Admin123");
    await page.locator(locators.CSS.SUBMIT_BUTTON).click();
    await page.waitForTimeout(10000);
    let invalidText = await page.locator(locators.XPATH.INVALID_CREDS).textContent();

    // Wait for error message
    await expect(invalidText).toBe("Invalid credentials");
});
