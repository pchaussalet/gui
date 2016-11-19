var CSS = 'css selector';
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
            .api.elements(CSS, 'div.CascadingListItem:nth-child(2) div.List-item', function(response) {
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

        section.expect.element('@usernameField').to.have.attribute('class').which.contains('is-mandatory');
        section.expect.element('@userSave').to.be.not.enabled;

        section
            .setValue('@usernameControl', 'Foo')
        ;

        section.expect.element('@userSave').to.be.enabled;

        section
            .press('@userSave')
            .waitForElementVisible('@userCreationNotification', 10000)
        ;

        section.expect.element('@userInspector').to.be.not.present;
        section.expect.element('@userCreationTask').to.have.attribute('class').which.not.contains('has-success');

        section
            .waitForElementNotPresent('@userCreationTaskActive', 30000)
            .pause(500)
        ;

        section.expect.element('@userCreationTask').to.have.attribute('class').which.contains('has-success');
    },

    'Edit user': function(browser) {
        var section = browser.page.accounts();
        section
            .waitForElementVisible('@userFoo', 10000)
        ;

        section.expect.element('@userFooLabel').text.to.equal('Foo');
        section.expect.element('@userFooSubLabel').to.be.not.visible;
        section.expect.element('@usersDomainToggle').to.be.visible;

        section
            .press('@usersDomainToggle')
            .waitForElementVisible('@userFooSubLabel', 10000)
        ;

        section.expect.element('@userFooSubLabel').text.to.equal('local');

        section
            .press('@usersDomainToggle')
            .waitForElementNotVisible('@userFooSubLabel', 10000)
        ;

        section
            .press('@userFoo')
            .waitForElementVisible('@userInspector', 10000)
        ;

        section
            .setValue('@fullNameControl', 'My full name')
            .press('@userSave')
            .waitForElementVisible('@userUpdateNotification', 10000)
        ;

        section.expect.element('@userInspector').to.be.present;
        section.expect.element('@userUpdateTask').to.have.attribute('class').which.not.contains('has-success');

        section
            .waitForElementNotPresent('@userUpdateTaskActive', 30000)
            .pause(500)
        ;

        section.expect.element('@userUpdateTask').to.have.attribute('class').which.contains('has-success');
    },

    'Delete user': function(browser) {
        var section = browser.page.accounts();

        section.expect.element('@userDeleteConfirmation').to.be.not.visible;

        section
            .press('@userDelete')
        ;

        section.expect.element('@userDeleteConfirmation').to.be.visible;

        section
            .press('@userDeleteHome')
            .press('@userDeleteGroup')
            .press('@userCancelDelete')
            .waitForElementNotVisible('@userDeleteConfirmation', 10000)
        ;

        section
            .press('@userDelete')
        ;

        section.expect.element('@userDeleteConfirmation').to.be.visible;

        section
            .press('@userConfirmDelete')
            .waitForElementVisible('@userDeleteNotification', 10000)
        ;

        section.expect.element('@userDeleteTask').to.have.attribute('class').which.not.contains('has-success');

        section
            .waitForElementNotPresent('@userInspector', 10000)
            .waitForElementNotPresent('@userDeleteTaskActive', 30000)
            .pause(500)
        ;

        section.expect.element('@userDeleteTask').to.have.attribute('class').which.contains('has-success');
    },

    'Finish': function(browser) {
        browser.end();
    }
}

