import {AbstractModelRepository} from './AbstractModelRepository';
import {KerberosRealm} from '../model/KerberosRealm';
import {KerberosRealmDao} from '../dao/kerberos-realm-dao';

export class KerberosRealmRepository extends AbstractModelRepository<KerberosRealm> {
    private static instance: KerberosRealmRepository;

    private constructor(private kerberosRealmDao: KerberosRealmDao) {
        super(kerberosRealmDao);
    }

    public static getInstance() {
        if (!KerberosRealmRepository.instance) {
            KerberosRealmRepository.instance = new KerberosRealmRepository(
                new KerberosRealmDao()
            );
        }
        return KerberosRealmRepository.instance;
    }
}
