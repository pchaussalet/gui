module.exports = {
    'Login': function(browser) {
        var section = browser.page.containers();
        section
            .navigate(browser.launchUrl)
            .login();
    },

    'Enter section': function(browser) {
        var section = browser.page.containers();
        section
            .waitForElementVisible('div.MainNavigationItem-containers', 10000)
            .press('div.MainNavigationItem-containers')
            .waitForElementVisible('@root', 10000)
            .waitForElementVisible('@entriesList', 10000)
            .expect.element('@entriesList').to.have.attribute('class').which.contains('has-items')
        ;
    },

    'Enter images': function(browser) {
        var section = browser.page.containers();
        section
            .waitForElementVisible('@imagesCategoryEntry', 10000)
            .press('@imagesCategoryEntry')
            .waitForElementVisible('@imagesViewer', 10000)
            .expect.element('@imagesViewer').to.have.attribute('class').which.not.contains('has-items')
        ;
    },

    'Pull image': function(browser) {
        var section = browser.page.containers();
        section
            .waitForElementVisible('@imagePullButton', 10000)
            .press('@imagePullButton')
            .waitForElementVisible('@imagePullInspector', 10000);

        section.expect.element('@saveButton').to.be.visible;
        section.expect.element('@saveButton').to.not.be.enabled;

        section.expect.element('@imageSelect').to.be.visible
        section.expect.element('@imageSelect').to.have.attribute('class').which.not.contains('is-disabled');
        section.expect.element('@imageSelectCurrentSelection').text.to.equal('---');
        
        section.expect.element('@hostSelect').to.be.visible;
        section.expect.element('@hostSelect').to.have.attribute('class').which.contains('is-disabled');

        section
            .press('@imageSelectControl')
            .sendKeys('@imageSelectControl', browser.Keys.DOWN_ARROW)
            .sendKeys('@imageSelectControl', browser.Keys.DOWN_ARROW)
            .sendKeys('@imageSelectControl', browser.Keys.ENTER)
            .pause(100);

        section.expect.element('@saveButton').to.not.be.enabled;

        section.expect.element('@imageSelectCurrentSelection').text.to.not.equal('---');

        section.expect.element('@hostSelect').to.have.attribute('class').which.not.contains('is-disabled');
        section.expect.element('@hostSelectCurrentSelection').text.to.equal('---');

        section
            .press('@hostSelectControl')
            .sendKeys('@hostSelectControl', browser.Keys.DOWN_ARROW)
            .sendKeys('@hostSelectControl', browser.Keys.DOWN_ARROW)
            .sendKeys('@hostSelectControl', browser.Keys.ENTER)
            .pause(100);

        section.expect.element('@saveButton').to.be.enabled;

        section.expect.element('@imageSelectCurrentSelection').text.to.not.equal('---');

        section.expect.element('@hostSelectCurrentSelection').text.to.not.equal('---');

    },

    'Finish': function(browser) {
        browser.end();
    }
}


