module.exports = {
    'Login to UI' : function (browser) {
        browser
            .url(browser.launchUrl)
            .waitForElementVisible('div[data-montage-id=owner].SignIn', 10000)
            .setValue('input[data-montage-id=userName]', 'root')
            .setValue('input[data-montage-id=password]', 'root')
            .moveToElement('button[data-montage-id=submit].SignIn-submit', 10, 10)
            .press()
            .waitForElementVisible('div.SystemInfo', 10000)
            .end();
    }
};
