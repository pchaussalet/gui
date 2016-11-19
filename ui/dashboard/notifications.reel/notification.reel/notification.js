/**
 * @module ui/notification.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Notification
 * @extends Component
 */
exports.Notification = Component.specialize(/** @lends Notification# */ {

    object: {
        value: null
    },

    infoExpanded: {
        value: false
    },

    enterDocument: {
        value: function() {
            if (this._objectClassName) {
                this.classList.remove(this._objectClassName);
            }

            this._objectClassName = this._getTypeName(this.object);
            this.classList.add(this._objectClassName);
        }
    },

    _getTypeName: {
        value: function(object) {
            if (object) {
                return (object.type === 'TASK' ? object.taskName : object.data && object.data.class).replace('.', '_');
            }
        }
    }
});
