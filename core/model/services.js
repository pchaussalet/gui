var Montage = require("montage/core/core").Montage,
    servicesMJSON = require("./services.mjson");


//todo: need review with @benoit
var CRUD_MAP = {
        create: "create",
        read: "read",
        update: "update",
        delete: "delete"
    },

    CRUD_ARRAY = Object.keys(CRUD_MAP);


/**
 * @class Services
 * @extends Montage
 */
exports.Services = Montage.specialize(/* @lends Services# */null, {

    findServicesForType: {
        value: function (type) {
            return servicesMJSON[typeof type === "string" ? type : type.typeName].instance;
        }
    },

    findCreateServiceForType: {
        value: function (type) {
            return this._findCrudServiceForType(CRUD_MAP.create, type);
        }
    },

    findReadServiceForType: {
        value: function (type) {
            return this._findCrudServiceForType(CRUD_MAP.read, type);
        }
    },

    findUpdateServiceForType: {
        value: function (type) {
            return this._findCrudServiceForType(CRUD_MAP.update, type);
        }
    },

    findDeleteServiceForType: {
        value: function (type) {
            return this._findCrudServiceForType(CRUD_MAP.delete, type);
        }
    },


    findInstanceServicesForType: {
        value: function (type) {
            return this._findServicesForType(type, true);
        }
    },


    findClassServicesForType: {
        value: function (type) {
            return this._findServicesForType(type, false);
        }
    },


    _findServicesForType: {
        value: function (type, shouldGetInstanceServices) {
            var servicesForType = servicesMJSON[type.typeName],
                services = null;

            if (servicesForType) {
                var servicesForTypeKeys = Object.keys(shouldGetInstanceServices ? servicesForType.instance : servicesForType.class),
                    servicesForTypeKey;

                for (var i = 0, length = servicesForTypeKeys.length; i < length; i++) {
                    servicesForTypeKey = servicesForTypeKeys[i];

                    if (CRUD_ARRAY.indexOf(servicesForTypeKey) === -1) {
                        if (!services) {
                            services = Object.create(null);
                        }

                        services[servicesForTypeKey] = servicesForType[servicesForTypeKey];
                    }
                }
            }

            return services;
        }
    },

    _findCrudServiceForType: {
        value: function (crudAction, type) {
            var services = this.findServicesForType(type);

            if (services) {
                return services[crudAction] || null;
            }

            return null;
        }
    }

});

