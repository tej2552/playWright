const locators = require("../Locators/login.locators.json");
const { constructXpathLocator } = require("../utils/util.js");

const functions = {
    getInterestLabelCheckBox(label) {
        let locatorString = constructXpathLocator("replace", locators.XPATH.INTEREST_LABELS, null, null, label);
        return constructXpathLocator("sibling", locatorString, "div", "preceding", null);
    },

    getGenderLabelRadioButton(label) {
        let locatorString = constructXpathLocator("replace", locators.XPATH.GENDER_LABELS, null, null, label);
        return constructXpathLocator("sibling", locatorString, "input", "preceding", null);
    },
};

module.exports = functions;
