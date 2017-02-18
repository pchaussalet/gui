import {AbstractModelRepository} from './AbstractModelRepository';
import {User} from '../model/User';
import {UserDao} from '../dao/user-dao';
export class UserRepository extends AbstractModelRepository<User> {
    private static instance: UserRepository;

    private constructor(private userDao: UserDao) {
        super(userDao);
    }

    public static getInstance() {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository(
                new UserDao()
            );
        }
        return UserRepository.instance;
    }
}
