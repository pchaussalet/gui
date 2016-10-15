module.exports = {
    'List entries': function(browser) {
        var section = browser.page.storage.volume();
        section
            .navigate(browser.launchUrl)
            .login()
            .waitForElementVisible('div.MainNavigationItem-storage', 10000)
            .pause(2000)
            .moveToElement('div.MainNavigationItem-storage', 0, 0)
            .press();
        section
            .waitForElementVisible('@root', 10000)
            .waitForElementVisible('@volumesList', 10000)
        ;
    },

    'Show volume': function(browser) {
        browser
            .moveToElement('div[data-montage-id=storage] div[data-montage-id=item].List-item', 0, 0)
            .press()
            .waitForElementVisible('div[data-montage-id=owner].Volume', 10000)
        ;
    },

    'Create SMB share': function(browser) {
        var section = browser.page.storage.volume();
        section
            .moveToElement('@sharesOption', 0, 0)
            .press()
            .waitForElementVisible('@sharesList', 10000)
            .moveToElement('@sharesCreate', 10, 10)
            .press()
            .waitForElementVisible('@shareCreator', 10000)
            .moveToElement('@shareCreatorSmb', 10, 10)
            .press()
            .waitForElementVisible('@shareInspector', 10000)
            .assert.visible('@shareOverview')
            .assert.attributeEquals('@shareOverview', 'title', 'smb')
            .assert.visible('@shareInspectorSmb')
        ;
    },

    'Finish': function(browser) {
        browser
            .pause(5000)
            .end();
    }
};
