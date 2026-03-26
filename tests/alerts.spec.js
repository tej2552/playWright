const { test, expect } = require("@playwright/test");
const locators = require("../Locators/login.locators.json");
import { URLS } from "../utils/urls.json";
import { clickOnAlertButton, handleAlert } from "../Common/common.alert.actions";

test("Alerts", async ({ page }) => {
    await page.goto(URLS.JS_ALERTS);
    let alertType = "prompt";
    let responseType = "reject";
    let responseText = "Hello";

    //Event listener for alerts
    page.on("dialog", async (d) => {
        let responseObj = await handleAlert(page, d);
        switch (alertType) {
            case "alert":
                expect(responseObj.dialogType).toBe(alertType);
                expect(responseObj.dialogMessage).toContain(alertType);
                expect(responseObj.resultText).toContain(alertType);
                break;
            case "confirm":
                if (responseType === "accept") {
                    await d.accept();
                    expect(responseObj.resultText).toContain("OK");
                } else {
                    await d.dismiss();
                    expect(responseObj.resultText).toContain("Cancel");
                }
                expect(responseObj.dialogType).toBe(alertType);
                expect(responseObj.dialogMessage).toContain(alertType);
                break;
            case "prompt":
                if (responseType === "accept") {
                    await d.accept(responseText);
                    expect(responseObj.resultText).toContain(responseText);
                } else {
                    await d.dismiss();
                    expect(responseObj.resultText).toBeNull();
                }
                break;
        }
    });

    await clickOnAlertButton(page, alertType);
});
