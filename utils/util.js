const { COMMON_ADDITION } = require("../Locators/login.locators.json");

function createSiblingXpath(siblingType, tagType, originalXpath) {
    if (siblingType.toLowerCase() === "following") {
        return originalXpath + COMMON_ADDITION.FOLLOWING_SIBLING + tagType;
    } else if (siblingType.toLowerCase() === "preceding") {
        return originalXpath + COMMON_ADDITION.PRECEDING_SIBLING + tagType;
    }
    return null;
}

function constructXpathLocator(
    constructionType,
    originalXpath,
    tagType = null,
    siblingType = null,
    replaceText = null,
) {
    if (constructionType === "sibling" && (siblingType === null || tagType === null)) {
        throw new Error("Type of constructor is not mentioned / Tag type not mentioned");
    } else if (constructionType === "sibling" && siblingType !== null && tagType !== null) {
        return createSiblingXpath(siblingType, tagType, originalXpath);
    } else if (constructionType === "replace" && replaceText !== null) {
        return originalXpath.replace("$$$", replaceText);
    }
    return null;
}


module.exports = {
    constructXpathLocator,
    createSiblingXpath,
};
