import * as _ from 'lodash';
import {ModelEventName} from '../model-event-name';
import {AccountRepository} from '../repository/account-repository';
import {AbstractRoute, Route} from './abstract-route';
import {KerberosRepository} from '../repository/kerberos-repository';
import {Model} from '../model';
import {UserRepository} from '../repository/UserRepository';
import {GroupRepository} from '../repository/GroupRepository';
import {DirectoryServicesRepository} from '../repository/DirectoryServicesRepository';
import {DirectoryRepository} from '../repository/DirectoryRepository';
import {KerberosRealmRepository} from '../repository/KerberosRealmRepository';

export class AccountsRoute extends AbstractRoute {
    private static instance: AccountsRoute;
    private userModel = Model.User;
    private groupModel = Model.Group;

    public constructor(private userRepository: UserRepository,
                       private groupRepository: GroupRepository,
                       private directoryServicesRepository: DirectoryServicesRepository,
                       private directoryRepository: DirectoryRepository,
                       private kerberosRealmRepository: KerberosRealmRepository) {
        super();
    }

    public static getInstance() {
        if (!AccountsRoute.instance) {
            AccountsRoute.instance = new AccountsRoute(
                UserRepository.getInstance(),
                GroupRepository.getInstance(),
                DirectoryServicesRepository.getInstance(),
                DirectoryRepository.getInstance(),
                KerberosRealmRepository.getInstance()
            );
        }
        return AccountsRoute.instance;
    }

    @Route('/accounts')
    public loadSection() {
        this.enterSection('accounts');
    }

    @Route('/accounts/user')
    public listUsers() {
        return this.loadStreamInColumn(
            this.stack,
            1,
            0,
            '/user',
            this.userModel,
            this.userRepository.stream(),
            {
                filter: {builtin: false},
                sort:   'username'
            }
        );
    }

    @Route('/accounts/user/_/{userId}')
    @Route('/accounts/account-system/user/_/{userId}')
    public getUser(userId: string) {
        let columnIndex = 2;
        return this.loadObjectInColumn(
            this.stack,
            columnIndex,
            columnIndex - 1,
            AbstractRoute.getObjectPathSuffix(this.userModel, userId),
            this.userModel,
            this.userRepository.getById(userId)
        );
    }

    @Route('/accounts/user/create')
    public createUser() {
        let columnIndex = 2;
        return this.loadObjectInColumn(
            this.stack,
            columnIndex,
            columnIndex - 1,
            '/create',
            this.userModel,
            this.userRepository.getNewInstance()
        );
    }

    @Route('/accounts/group')
    public listGroups() {
        return this.loadStreamInColumn(
            this.stack,
            1,
            0,
            '/group',
            this.groupModel,
            this.groupRepository.stream(),
            {
                filter: {builtin: false},
                sort: 'name'
            }
        );
    }

    @Route('/accounts/group/_/{groupId}')
    @Route('/accounts/account-system/group/_/{groupId}')
    public getGroup(groupId: string) {
        let columnIndex = 2;
        return this.loadObjectInColumn(
            this.stack,
            columnIndex,
            columnIndex - 1,
            AbstractRoute.getObjectPathSuffix(this.groupModel, groupId),
            this.groupModel,
            this.groupRepository.getById(groupId)
        );
    }

    @Route('/accounts/group/create')
    public createGroup() {
        let columnIndex = 2;
        return this.loadObjectInColumn(
            this.stack,
            columnIndex,
            columnIndex - 1,
            '/create',
            this.groupModel,
            this.groupRepository.getNewInstance()
        );
    }

    @Route('/accounts/account-system')
    public listAccountSystems() {
        return this.loadListInColumn(
            this.stack,
            1,
            0,
            '/account-system',
            Model.AccountSystem,
            this.listSystemUsersAndGroups(),
            {
                filter: {builtin: true},
                sort: ['username', 'name']
            }
        );
    }

    @Route('/accounts/directory-services')
    public getDirectoryServices() {
        return this.loadObjectInColumn(
            this.stack,
            1,
            0,
            '/directory-services',
            Model.DirectoryServices,
            this.directoryServicesRepository.getNewInstance()
        );
    }

    @Route('/accounts/directory-services/directory/_/{directoryId}')
    public getDirectory(directoryId: string) {
        let columnIndex = 2,
            objectType = Model.Directory;
        return this.loadObjectInColumn(
            this.stack,
            columnIndex,
            columnIndex - 1,
            AbstractRoute.getObjectPathSuffix(objectType, directoryId),
            objectType,
            this.directoryRepository.getById(directoryId).then(directory => directory || this.directoryRepository.getNewInstanceWithType(directoryId))
        );
    }

    @Route('/accounts/directory-services/kerberos-realm')
    public listKerberosRealms() {
        let columnIndex = 2;
        return this.loadListInColumn(
            this.stack,
            columnIndex,
            columnIndex - 1,
            '/kerberos-realm',
            Model.KerberosRealm,
            this.kerberosRealmRepository.list()
        );
    }

    @Route('/accounts/directory-services/kerberos-realm/_/{kerberosRealmId}')
    public getKerberosRealm(kerberosRealmId: string) {
        let columnIndex = 3,
            objectType = Model.KerberosRealm;
        return this.loadObjectInColumn(
            this.stack,
            columnIndex,
            columnIndex - 1,
            AbstractRoute.getObjectPathSuffix(objectType, kerberosRealmId),
            objectType,
            this.kerberosRealmRepository.getById(kerberosRealmId)
        );
    }

    @Route('/accounts/directory-services/kerberos-realm/create')
    public createKerberosRealm() {
        let columnIndex = 3;
        return this.loadObjectInColumn(
            this.stack,
            columnIndex,
            columnIndex - 1,
            '/create',
            Model.KerberosRealm,
            this.kerberosRealmRepository.getNewInstance()
        );
    }

    private listSystemUsersAndGroups() {
        return Promise.all([
            this.userRepository.list(),
            this.groupRepository.list()
        ]).spread((users: Array<any>, groups: Array<any>) => _.concat(users, groups));
    }
}
