/**
 * @module ui/notification.reel
 */
var Component = require("montage/ui/component").Component,
    Evaluate = require("frb/evaluate");

/**
 * @class TaskNotification
 * @extends Component
 */
exports.TaskNotification = Component.specialize(/** @lends TaskNotification# */ {

    _object: {
        value: null
    },

    object: {
        set: function (object) {
            if (this._object !== object) {
                this._object = object;
            }
        },
        get: function () {
            return this._object;
        }
    },

    UIDescriptor: {
        value: null
    },

    infoExpanded: {
        value: false
    }

    // handleInfoToggleAction: {
    //     value: function () {
    //         this.infoExpanded = !this.infoExpanded;
    //     }
    // }
});