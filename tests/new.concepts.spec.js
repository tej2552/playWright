const { test, expect } = require("@playwright/test");
const locators = require("../Locators/login.locators.json");
import { uploadFile } from "../Common/common.file.upload.actions";
import { constructXpathLocator, clearInputField, longPressSelect, paste, back } from "../utils/util";
import { URLS } from "../utils/urls.json";

test("Mouse Hover", async ({ page }) => {
    await page.goto(URLS.EBAY);

    let allItemsInNavBar = await page.locator(locators.XPATH.NAV_BAR_MENU).allTextContents();
    await page
        .locator(constructXpathLocator("replace", locators.XPATH.NAV_BAR_MENU_ELEMENT, null, null, allItemsInNavBar[4]))
        .hover();
    await page.waitForTimeout(5000);
});

test("File Upload", async ({ page }) => {
    let fileUploadBase = "./Files/";
    let filename = "pic1.png";

    await page.goto(URLS.FILE_UPLOAD);
    let fileUploaded = await uploadFile(page, fileUploadBase, filename);
    expect(fileUploaded.trim()).toBe(filename.trim());

    //lets use one of our own utility function to assert another element in the file uploaded page
    expect(
        page.locator(constructXpathLocator("sibling", locators.XPATH.UPLOADED_FILES, "h3", "preceding", null)),
    ).toBeInViewport();
});

test("Keyboard Actions", async ({ page }) => {
    await page.goto(URLS.GOOGLE);

    //Basic action
    await page.locator(locators.XPATH.GOOGLE_SEARCH_BAR).fill("Type");
    await clearInputField(page, true);
    await paste(page);

    //Clear
    await clearInputField(page);

    //Long press Action
    await longPressSelect(page, "Type Script!", locators.XPATH.GOOGLE_SEARCH_BAR, "Left");
    await back(page);

    //wait for visibility
    await page.waitForTimeout(5000);
});
