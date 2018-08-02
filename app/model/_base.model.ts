// app/model/_base.model.ts 

class BaseModel  {
    
    constructor(params: any) {

    }

    id: string = '';
    name: string = '';
    createdByUser: any = null;
    modifiedByUser: any = null;
    modifiedOn?: Date = new Date('1900-1-1T00:00.000Z');
    deletedByUser?: any = null;
    deletedOn?: Date = new Date('1900-1-1T00:00.000Z');
    error?: string = '';

    public getJSONDoc(): any {
        return {};
    }

    public validate(): boolean {
        return true;
    }
}

export default BaseModel;
