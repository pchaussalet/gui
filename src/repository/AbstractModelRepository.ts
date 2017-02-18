import {Map} from 'immutable';
import {AbstractRepository} from './abstract-repository';
import {ModelEventName} from '../model-event-name';
import {AbstractDao} from '../dao/abstract-dao';
import {AbstractDataObject} from '../model/AbstractDataObject';
import {SubmittedTask} from '../model/SubmittedTask';
import * as _ from 'lodash';
import {DatastoreService} from '../service/datastore-service';

export abstract class AbstractModelRepository<T extends AbstractDataObject> extends AbstractRepository<T> {
    private modelEventName: ModelEventName;
    private datastoreService: DatastoreService;
    private streamId: string;
    protected localState: Map<string, Map<string, any>>;

    protected constructor(protected dao: AbstractDao<T>) {
        super([dao.objectType]);
        this.modelEventName = ModelEventName[dao.objectType];
        this.datastoreService = DatastoreService.getInstance();
    }

    public list(): Promise<Array<T>> {
        return this.localState ?
            Promise.resolve((_.assign((this.localState.valueSeq().toJS() as any), {_objectType: this.dao.objectType}) as Array<T>)) :
            this.dao.list();
    }

    public stream(): Promise<Array<Object>> {
        let promise;

        if (this.streamId) {
            promise = Promise.resolve(
                this.datastoreService.getState().get('streams').get(this.streamId)
            );
        } else {
            promise = this.dao.stream(true);
        }

        return promise.then((stream) => {
            let dataArray = stream.get('data').toJS();

            this.dao.register();
            this.streamId = stream.get('streamId');
            dataArray._objectType = this.dao.objectType;

            // FIXME!!
            // DTM montage
            dataArray._stream = stream;

            return dataArray;
        });
    }



    public getById(id: string) {
        return (this.localState && this.localState.has(id)) ?
            Promise.resolve(this.localState.get(id).toJS()) :
            this.dao.findSingleEntry({id: id});
    }

    public save(object: T, args?: Array<any>): Promise<SubmittedTask> {
        return this.dao.save(object, args);
    }

    public getNewInstance(): Promise<T> {
        return this.dao.getNewInstance();
    }

    public getEmptyList(): Promise<Array<T>> {
        return this.dao.getEmptyList();
    }

    protected handleStateChange(name: string, state: any) {
        this.localState = this.dispatchModelEvents(this.localState, this.modelEventName, state);
    }

    protected handleEvent(name: string, data: any) {
    }
}
