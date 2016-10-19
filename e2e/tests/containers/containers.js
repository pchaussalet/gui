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

    'Enter containers': function(browser) {
        var section = browser.page.containers();
        section
            .waitForElementVisible('@containersCategoryEntry', 10000)
            .press('@containersCategoryEntry')
            .waitForElementVisible('@containersViewer', 10000)
            .expect.element('@containersViewer').to.have.attribute('class').which.not.contains('has-items')
        ;
    },

    'Create container': function(browser) {
        var section = browser.page.containers();
        section
            .press('@containerCreateButton')
            .waitForElementVisible('@containerCreator', 10000)
            .waitForElementVisible('@containerAdvancedSectionHeader', 10000)
            .pause(200)
        ;

        section.expect.element('@containerAdvancedSection').to.not.be.visible;

        section
            .press('@containerAdvancedSectionHeader');

        section.expect.element('@containerAdvancedSection').to.be.visible;

        section.assert.fail("NEED TO FINISH IMPLEMENTING TEST");
    },

    'Finish': function(browser) {
        browser.end();
    }
}


