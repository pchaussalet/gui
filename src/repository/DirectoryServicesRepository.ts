import {DirectoryServices} from '../model/DirectoryServices';
import {DirectoryServicesDao} from '../dao/directory-services-dao';
import {AbstractModelRepository} from './AbstractModelRepository';

export class DirectoryServicesRepository extends AbstractModelRepository<DirectoryServices> {
    private static instance: DirectoryServicesRepository;

    private constructor() {
        super(new DirectoryServicesDao());
    }

    public static getInstance() {
        if (!DirectoryServicesRepository.instance) {
            DirectoryServicesRepository.instance = new DirectoryServicesRepository();
        }
        return DirectoryServicesRepository.instance;
    }

    protected handleStateChange(name: string, state: Map<string, Map<string, any>>, overlay?: Map<string, Map<string, any>>) {}
    protected handleEvent(name: string, data: any) {}
}
