const { test, expect } = require("@playwright/test");
const locators = require("../Locators/login.locators.json");
import { URLS } from "../utils/urls.json";
import { clickOnSocialMediaLink } from "../Common/common.advanced.actions";

test("Handling Iframes", async ({ page }) => {
    await page.goto(URLS.JAVA_DOC);
    let frame = await page.frameLocator(locators.XPATH.IFRAME);
    await frame.locator(locators.XPATH.APPLET_LINK_IN_IFRAME).click();
    await page.waitForTimeout(5000);
});

test.only("Switching between tabs", async ({ browser }) => {
    const mainContext = await browser.newContext();
    const mainPage = await mainContext.newPage();

    await mainPage.goto(URLS.VERCEL_LOGIN);

    const [socialMediaPage] = await Promise.all([
        mainContext.waitForEvent("page"),
        clickOnSocialMediaLink(mainPage, "facebook"),
    ]);

    await socialMediaPage.waitForLoadState("domcontentloaded");

    // await socialMediaPage.locator(locators.XPATH.EMAIL).fill("tejkarthik@gmail.com");
    // await socialMediaPage.waitForTimeout(5000);

    const [forgotPasswordPage] = await Promise.all([
        mainContext.waitForEvent("page"),
        socialMediaPage.locator("(//a[contains(@href, 'recover')])[2]").click(),
    ]);

    await forgotPasswordPage.waitForLoadState("domcontentloaded");

    await forgotPasswordPage.close();

    await socialMediaPage.close();

    await mainPage.waitForLoadState("domcontentloaded");
});
