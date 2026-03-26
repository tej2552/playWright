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

//Keyboard Actions
async function clearInputField(page, copy = false) {
    if (copy) {
        await page.keyboard.press("Meta+A");
        await page.keyboard.press("Meta+C");
        await page.keyboard.press("Backspace");
    }
    await page.keyboard.press("Meta+A");
    await page.keyboard.press("Backspace");
}

async function copy(page) {
    await page.keyboard.press("Meta+C");
}

async function cut(page) {
    await page.keyboard.press("Meta+X");
}

async function paste(page) {
    await page.keyboard.press("Meta+V");
}

async function back(page) {
    await page.keyboard.press("Backspace");
}

async function longPressSelect(page, word, inputLocator, direction) {
    await page.locator(inputLocator).focus();
    await page.keyboard.type(word);
    await page.keyboard.press(`Arrow${direction}`);
    await page.keyboard.down("Shift");
    for (let i = word.length - 2; i >= 0; i--) {
        if (word[i] === " ") {
            break;
        }
        await page.keyboard.press(`Arrow${direction}`);
    }
    await page.keyboard.up("Shift");
}

module.exports = {
    constructXpathLocator,
    createSiblingXpath,
    clearInputField,
    longPressSelect,
    paste,
    back,
    copy,
    cut,
};
