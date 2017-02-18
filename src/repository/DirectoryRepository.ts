import {AbstractModelRepository} from './AbstractModelRepository';
import {Directory} from '../model/Directory';
import {DirectoryDao} from '../dao/directory-dao';

export class DirectoryRepository extends AbstractModelRepository<Directory> {
    private static instance: DirectoryRepository;

    public static readonly DIRECTORY_TYPES_LABELS = {
        winbind: 'Active Directory',
        freeipa: 'FreeIPA',
        ldap: 'LDAP',
        nis: 'NIS'
    };



    private constructor(private directoryDao: DirectoryDao) {
        super(directoryDao);
    }

    public static getInstance() {
        if (!DirectoryRepository.instance) {
            DirectoryRepository.instance = new DirectoryRepository(
                new DirectoryDao()
            );
        }
        return DirectoryRepository.instance;
    }

    public getNewInstanceWithType(type: string) {
        return this.getNewInstance().then(function (directory) {
            directory.type = type;
            directory._tmpId = type;
            directory.parameters = {'%type': type + '-directory-params'};
            directory.label = DirectoryRepository.DIRECTORY_TYPES_LABELS[type];

            return directory;
        });

    }
}
