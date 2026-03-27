const { test, expect } = require("@playwright/test");
const locators = require("../Locators/login.locators.json");
const functions = require("../Common/common.sign.up.actions.js");
import { URLS } from "../utils/urls.json";

test("Sign UP", async ({ page }) => {
    await page.goto(URLS.VERCEL_SIGN_UP);
    await page.getByPlaceholder(locators.PLACE_HOLDERS.NAME).fill("Tejas");
    await page.getByPlaceholder(locators.PLACE_HOLDERS.EMAIL).fill("example@gmail.com");
    await page.getByPlaceholder(locators.PLACE_HOLDERS.PASSWORD).fill("Example123@Tejas");

    //Get the label text and construct a locator based on it and then click it

    //This is just a workaround if you don't have an option to select the drop down or multiselect
    //by role or any other modern playwright methods and just a demonstration of how to wrap the
    //functionality of creating custom xpath
    const checkBoxLabel = functions.getInterestLabelCheckBox("JavaScript");
    await page.locator(checkBoxLabel).click();

    //But if you have the role set for the element, then you can avoid all the above steps and use
    //it as below
    await page.getByRole("checkbox", { name: "AWS" }).click();

    //Get the label text and construct a locator based on it and then click it
    const genderLabel = functions.getGenderLabelRadioButton("Female");
    await page.locator(genderLabel).click();

    //Selecting values from dropdown

    //1. using value attribute
    await page.locator(locators.XPATH.SELECT_STATE).selectOption({ value: "Delhi" });
    await page.waitForTimeout(3000);

    //2. using label (the visible text)
    await page.locator(locators.XPATH.SELECT_STATE).selectOption({ label: "Goa" });
    await page.waitForTimeout(3000);

    //3. using index
    await page.locator(locators.XPATH.SELECT_STATE).selectOption({ index: 7 });
    await page.waitForTimeout(3000);

    //Selecting values from multiselect
    await page.locator(locators.CSS.SELECT_HOBBIES).selectOption(["Playing", "Dancing"]);
    await page.waitForTimeout(3000);

    //Clicking on Submit button
    await page.locator(locators.CSS.SUBMIT_BUTTON).click();
});
