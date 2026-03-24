const { test, expect } = require("@playwright/test");
const locators = require("../Locators/login.locators.json");
import { uploadFile } from "../Common/common.file.upload.actions";
import { constructXpathLocator } from "../utils/util";

test("Mouse Hover", async ({ page }) => {
    await page.goto("https://www.ebay.com/");

    let allItemsInNavBar = await page.locator(locators.XPATH.NAV_BAR_MENU).allTextContents();
    await page.locator(`//span[text()="${allItemsInNavBar[4]}"]`).hover();
    await page.waitForTimeout(5000);
});

test("File Upload", async ({ page }) => {
    let fileUploadBase = "./Files/";
    let filename = "pic1.png";

    await page.goto("https://the-internet.herokuapp.com/upload");
    let fileUploaded = await uploadFile(page, fileUploadBase, filename);
    expect(fileUploaded.trim()).toBe(filename.trim());

    //lets use one of our own utility function to assert another element in the file uploaded page
    expect(
        page.locator(constructXpathLocator("sibling", locators.XPATH.UPLOADED_FILES, "h3", "preceding", null)),
    ).toBeInViewport();
});
