var AbstractRepository = require("core/repository/abstract-repository").AbstractRepository,
    DockerContainerSectionDao = require("core/dao/docker-container-section-dao").DockerContainerSectionDao,
    DockerImageDao = require("core/dao/docker-image-dao").DockerImageDao,
    DockerHostDao = require("core/dao/docker-host-dao").DockerHostDao,
    DockerConfigDao = require("core/dao/docker-config-dao").DockerConfigDao,
    DockerCollectionDao = require("core/dao/docker-collection-dao").DockerCollectionDao,
    DockerContainerCreatorDao = require("core/dao/docker-container-creator-dao").DockerContainerCreatorDao,
    DockerContainerLogsDao = require("core/dao/docker-container-logs-dao").DockerContainerLogsDao,
    DockerImagePullDao = require("core/dao/docker-image-pull-dao").DockerImagePullDao,
    DockerContainerDao = require("core/dao/docker-container-dao").DockerContainerDao,
    DockerContainerBridgeDao = require("core/dao/docker-container-bridge-dao").DockerContainerBridgeDao,
    ModelDescriptorService = require("core/service/model-descriptor-service").ModelDescriptorService,
    _ = require("lodash");

exports.ContainerRepository = AbstractRepository.specialize({

    init: {
        value: function () {
            this._dockerContainerSectionDao = DockerContainerSectionDao.instance;
            this._dockerContainerDao = new DockerContainerDao();
            this._dockerImageDao = new DockerImageDao();
            this._dockerHostDao = new DockerHostDao();
            this._dockerConfigDao = new DockerConfigDao();
            this._dockerCollectionDao = new DockerCollectionDao();
            this._dockerContainerCreatorDao = DockerContainerCreatorDao.instance;
            this._dockerImagePullDao = DockerImagePullDao.instance;
            this._dockerContainerLogsRepository = DockerContainerLogsDao.instance;
            this._dockerContainerBridgeDao = DockerContainerBridgeDao.instance;
            this._modelDescriptorService = ModelDescriptorService.getInstance();
        }
    },

    getNewDockerImage: {
        value: function () {
            return this._dockerImageDao.getNewInstance();
        }
    },

    getNewDockerContainer: {
        value: function () {
            return this._dockerImageDao.getNewInstance();
        }
    },

    getNewDockerCollection: {
        value: function () {
            return this._dockerCollectionDao.getNewInstance();
        }
    },

    getNewDockerContainerBridge: {
        value: function () {
            return this._dockerContainerBridgeDao.getNewInstance();
        }
    },

    getNewInstanceFromObjectType: {
        value: function(objectType) {
            if (objectType === 'DockerImage') {
                objectType = 'DockerImagePull';
            }
            return this._modelDescriptorService.getDaoForType(objectType).then(function(dao) {
                return dao.getNewInstance();
            });
        }
    },

    getNewInstanceRelatedToObjectModel: {
        value: function (object) {
            var modelType = object.constructor.Type;

            if (modelType === this._dockerContainerDao._model) {
                return this.getNewDockerContainerCreator();
            } else if (modelType === this._dockerImageDao._model) {
                return this.getNewImagePull();
            } else {
                return Promise.reject("Model object not supported")
            }
        }
    },

    getNewDockerContainerLogs: {
        value: function () {
            return this._dockerContainerLogsRepository.getNewInstance();
        }
    },

    getNewImagePull: {
        value: function () {
            return this._dockerImagePullDao.getNewInstance();
        }
    },

    getNewDockerContainerCreator: {
        value: function () {
            return this._dockerContainerCreatorDao.getNewInstance();
        }
    },

    getNewEmptyDockerContainerSectionList: {
        value: function() {
            return this._dockerContainerSectionDao.getEmptyList();
        }
    },

    getNewEmptyDockerContainerList: {
        value: function() {
            return this._dockerContainerDao.getEmptyList();
        }
    },

    getNewEmptyDockerCollectionList: {
        value: function() {
            return this._dockerCollectionDao.getEmptyList();
        }
    },

    getNewEmptyDockerImageList: {
        value: function() {
            return this._dockerImageDao.getEmptyList();
        }
    },

    getNewEmptyDockerHostList: {
        value: function() {
            return this._dockerHostDao.getEmptyList();
        }
    },

    getDockerContainerSettings: {
        value: function () {
            return this._dockerConfigDao.get();
        }
    },

    listDockerHosts: {
        value: function () {
            return this._dockerHostDao.list();
        }
    },

    listDockerContainers: {
        value: function () {
            return this._dockerContainerDao.list();
        }
    },

    listContainerSections: {
        value: function () {
            var self = this;

            return Promise.all([
                self.getNewEmptyDockerContainerSectionList(),
                self.listDockerContainers(),
                self.listDockerHosts(),
                self.listDockerImages(),
                self.listDockerCollections()
            ]).spread(function(sections, containers, hosts, images, collections) {
                var containerSections = _.concat(sections, [hosts, images, collections, containers]);
                containerSections._objectType = 'ContainerSection';
                return containerSections;
            });
        }
    },

    listDockerImages: {
        value: function () {
            return this._dockerImageDao.list();
        }
    },

    listDockerCollections: {
        value: function () {
            return this._dockerCollectionDao.list();
        }
    },

    saveSettings: {
        value: function (settings) {
            return this._dockerConfigDao.save(settings);
        }
    },

    saveContainer: {
        value: function (container) {
            return this._dockerContainerDao.save(container);
        }
    },

    getInteractiveConsoleToken: {
        value: function(containerId) {
            return this._dockerContainerDao.requestInteractiveConsole(containerId);
        }
    },

    getSerialConsoleToken: {
        value: function(containerId) {
            return this._dockerContainerDao.requestSerialConsole(containerId);
        }
    }

});
