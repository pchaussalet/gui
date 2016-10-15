module.exports = {
    elements: {
        tasksList: 'div.Sideboard div.Tasks div.Notifications-items',
        root: 'div.CascadingList-repetition',

        entriesList: 'div.CascadingListItem:nth-child(1) div.AccountCategory',

        userCategory: 'div.CascadingListItem:nth-child(1) div.AccountCategory-user',
        usersViewer: 'div.CascadingListItem:nth-child(2) div.Viewer',
        usersEntries: 'div.CascadingListItem:nth-child(2) div.List-item',
        userCreateButton: 'div.CascadingListItem:nth-child(2) div.Viewer-createButton',
        userInspector: 'div.CascadingListItem:nth-child(3) div.User'
    },
    commands: [
        {
            pause: function(ms) {
                this.api.pause(ms);
                return this;
            }
        }
    ]
}


