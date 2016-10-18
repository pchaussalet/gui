module.exports = {
    elements: {
        tasksList: 'div.Sideboard div.Tasks div.Notifications-items',
        root: 'div.CascadingList-repetition',

        entriesList: 'div.CascadingListItem:nth-child(1) div.SectionRoot-entries',

        imagesCategoryEntry: 'div.CascadingListItem:nth-child(1) div.SectionRoot-entries div.List-item:nth-child(2)',
        imagesViewer: 'div.CascadingListItem:nth-child(2) div.Viewer',
        imagesEntries: 'div.CascadingListItem:nth-child(2) div.Viewer div.List-item',

        imagePullButton: 'div.CascadingListItem:nth-child(2) div.Viewer div.Viewer-createButton',
        imagePullInspector: 'div.CascadingListItem:nth-child(3) div.DockerImagePull',
        imageSelect: 'div.CascadingListItem:nth-child(3) div.DockerImagePull div.FieldSelect[data-montage-id=image] div.Field',
        imageSelectControl: 'div.CascadingListItem:nth-child(3) div.DockerImagePull div.FieldSelect[data-montage-id=image] div.Select',
        imageSelectCurrentSelection: 'div.CascadingListItem:nth-child(3) div.DockerImagePull div.FieldSelect[data-montage-id=image] span.Select-currentOption',
        hostSelect: 'div.CascadingListItem:nth-child(3) div.DockerImagePull div.FieldSelect[data-montage-id=dockerHost] div.Field',
        hostSelectControl: 'div.CascadingListItem:nth-child(3) div.DockerImagePull div.FieldSelect[data-montage-id=dockerHost] div.Field-control',
        hostSelectCurrentSelection: 'div.CascadingListItem:nth-child(3) div.DockerImagePull div.FieldSelect[data-montage-id=dockerHost] span.Select-currentOption',
        saveButton: 'div.CascadingListItem:nth-child(3) div.DockerImagePull button.InspectorFooter-save',
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



