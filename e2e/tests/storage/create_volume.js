module.exports = {
    'Enter section': function(browser) {
        var section = browser.page.storage();
        section
            .navigate(browser.launchUrl)
            .login()
            .waitForElementVisible('div.MainNavigationItem-storage', 10000)
            .moveToElement('div.MainNavigationItem-storage', 0, 0)
            .press()
            .waitForElementVisible('@root', 10000)
            .waitForElementVisible('@volumesList', 10000)
        ;
    },

    'Create volume': function(browser) {
        var section = browser.page.storage();
        section.expect.element('@firstVolume').to.not.be.present;

        section
            .waitForElementVisible('@volumeCreateButton', 10000)
            .moveToElement('@volumeCreateButton', 0, 0)
            .press()
            .waitForElementVisible('@volumeCreator', 10000)
            .pause(2000);

        section.expect.element('@volumeCreatorSave').to.not.be.enabled;

        section
            .setValue('@newVolumeId', 'tank');

        section.expect.element('@volumeCreatorSave').to.not.be.enabled;

        section
            .assert.cssClassPresent('@volumeCreatorSave', 'montage--disabled')
            .moveToElement('@topologizerProfile', 10, 10)
            .press()

        section.expect.element('@dataVdev').to.not.be.present;

        section
            .sendKeys('@topologizerProfile', browser.Keys.DOWN_ARROW)
            .sendKeys('@topologizerProfile', browser.Keys.DOWN_ARROW)
            .sendKeys('@topologizerProfile', browser.Keys.ENTER);

        section.expect.element('@dataVdev').to.be.present.after(250);
        section.expect.element('@dataVdev').to.be.visible;
        section.expect.element('@volumeCreatorSave').to.be.enabled;

        section
            .moveToElement('@volumeCreatorSave', 10, 10)
            .press()
            .waitForElementVisible('@volumeCreationTask', 20000)
            .waitForElementVisible('@firstVolume', 20000);

        section.expect.element('@firstVolumeLabel').text.to.equal('tank');
    },

    'Detach volume': function(browser) {
        var section = browser.page.storage();
        section
            .moveToElement('@firstVolume', 10, 10)
            .press()
            .waitForElementVisible('@volumeInspector', 10000);
   
        section.expect.element('@volumeInspectorCascadingListItemTitle').text.to.equal('tank');

        section
            .moveToElement('@volumeDetachButton', 10, 10)
            .press();

        section
            .waitForElementNotPresent('@firstVolume', 20000)
            .waitForElementVisible('@firstVolume', 20000);

        section.expect.element('@firstVolumeLabel').text.to.equal('tank (detached)');
    },

    'Import volume': function(browser) {
        var section = browser.page.storage();
        section
            .moveToElement('@firstVolume', 10, 10)
            .press()
            .waitForElementVisible('@detachedVolumeInspector', 10000);
   
        section.expect.element('@volumeInspectorCascadingListItemTitle').text.to.equal('tank (detached)');

        section
            .moveToElement('@volumeImportButton', 10, 10)
            .press();

        section
            .waitForElementNotPresent('@firstVolume', 20000)
            .waitForElementVisible('@firstVolume', 20000);

        section.expect.element('@firstVolumeLabel').text.to.equal('tank (detached)');
    },

    'Delete volume': function(browser) {
        var section = browser.page.storage();
        section
            .moveToElement('@firstVolume', 10, 10)
            .press()
            .waitForElementVisible('@volumeInspector', 10000);
   
        section.expect.element('@volumeInspectorCascadingListItemTitle').text.to.equal('tank');

        section
            .moveToElement('@volumeDeleteButton', 10, 10)
            .press()
            .waitForElementVisible('@confirmationMessage', 10000);

        section.expect.element('@confirmationMessage').text.to.equal('Are you sure you want to delete tank');

        section
            .moveToElement('@confirmActionButton', 10, 10)
            .press()
            .waitForElementNotPresent('@firstVolume', 20000);
    },

    'Finish': function(browser) {
        browser
            .end();
    }
};

