const locators = require("../Locators/login.locators.json");

async function uploadFile(page, basePath, fileName) {
    await page.locator(locators.CSS.CHOOSE_FILES).setInputFiles(basePath + fileName);
    await page.waitForTimeout(5000);
    await page.locator(locators.CSS.FILE_SUBMIT).click();

    await page.waitForTimeout(7000);

    let uploadedFileContent = await page.locator(locators.XPATH.UPLOADED_FILES).textContent();

    return uploadedFileContent;
}

module.exports = {
    uploadFile,
};
