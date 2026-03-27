const locators = require("../Locators/login.locators.json");

async function clickOnSocialMediaLink(page, socialMediaName) {
    const socialLinks = page.locator(locators.XPATH.SOCIAL_MEDIA_LINKS);
    const count = await socialLinks.count();

    for (let i = 0; i < count; i++) {
        const link = socialLinks.nth(i);
        const href = await link.getAttribute("href");

        if (href && href.includes(socialMediaName)) {
            await link.click();
            break;
        }
    }
}

module.exports = {
    clickOnSocialMediaLink,
};
