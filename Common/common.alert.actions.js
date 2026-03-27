const { expect } = require("@playwright/test");
const locators = require("../Locators/login.locators.json");

async function clickOnAlertButton(page, alertType) {
    let alertTextsLocators = await page.$$(locators.XPATH.ALERT_BUTTONS);
    for (let alert of alertTextsLocators) {
        let alertText = await alert.textContent();
        let finalAlertText = alertText.toLowerCase();
        if (finalAlertText.includes(alertType)) {
            await alert.click();
            break;
        }
    }
}

async function handleAlert(page, dialog) {
    return {
        dialogType: dialog.type(),
        dialogMessage: dialog.message(),
    };
}

module.exports = {
    clickOnAlertButton,
    handleAlert,
};
