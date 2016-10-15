module.exports = {
    'Login': function(browser) {
        var section = browser.page.accounts();
        section
            .navigate(browser.launchUrl)
            .login();
    },

    'Enter section': function(browser) {
        var section = browser.page.accounts();
        section
            .waitForElementVisible('div.MainNavigationItem-accounts', 10000)
            .press('div.MainNavigationItem-accounts')
            .waitForElementVisible('@root', 10000)
            .waitForElementVisible('@entriesList', 10000);
    },

    'List users': function(browser) {
        var section = browser.page.accounts();
        section
            .waitForElementVisible('@userCategory', 10000)
            .press('@userCategory')
            .waitForElementVisible('@usersViewer', 10000)
            .api.elements('css selector', 'div.CascadingListItem:nth-child(2) div.List-item', function(response) {
                this.assert.equal(response.value.length, 0);
            });
    },

    'Create user': function(browser) {
        var section = browser.page.accounts();
        section
            .waitForElementVisible('@userCategory', 10000)
            .press('@userCategory')
            .waitForElementVisible('@usersViewer', 10000)
            .press('@userCreateButton')
            .waitForElementVisible('@userInspector', 10000)
        ;
        
    },

    'Finish': function(browser) {
        //browser.end();
    }
}

