import {AbstractDataObject} from './AbstractDataObject';

export class Directory extends AbstractDataObject {
    public type: string;
    public parameters: {'%type': string};
    public label: string;
}
