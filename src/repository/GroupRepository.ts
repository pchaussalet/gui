import {AbstractModelRepository} from './AbstractModelRepository';
import {Group} from '../model/Group';
import {GroupDao} from '../dao/group-dao';

export class GroupRepository extends AbstractModelRepository<Group> {
    private static instance: GroupRepository;

    private constructor(private groupDao: GroupDao) {
        super(groupDao);
    }

    public static getInstance() {
        if (!GroupRepository.instance) {
            GroupRepository.instance = new GroupRepository(
                new GroupDao()
            );
        }
        return GroupRepository.instance;
    }
}
