// app/model/_base.model.ts 

import Global from '../util/globals';

export interface IBaseModel {
    id?: string;
    name?: string;
    createdByUser: any;
    modifiedByUser: any;
    modifiedOn?: Date;
    deletedByUser?: any;
    deletedOn?: Date;
    deletedReason?: string;
    error?: string;
    getJSONDoc(): any;
    validate(): boolean;
}

export class BaseModel implements IBaseModel {

	constructor(data: any) {
		if (typeof data === 'string') { data = JSON.parse(data); }
        this.id = data && data._id ? data._id : null;
        this.name = data && data.name ? data.name : null;
        this.error = '';
		if (data && data.meta) {
			this.createdByUser = data.meta.createdByUser || Global.nullRef;
			this.modifiedByUser = data.meta.modifiedByUser || Global.nullRef;
			this.modifiedOn = data.meta.modifiedOn || Global.nullDate;
			this.deletedByUser = data.meta.deletedByUser || null;
			this.deletedOn = data.meta.deletedOn || null;
			this.deletedReason = data.meta.deletedReason || null;
		}
	}

    public id?: string;
    public name?: string;
    public createdByUser: any;
    public modifiedByUser: any;
    public modifiedOn?: Date;
    public deletedByUser?: any;
    public deletedOn?: Date;
    public deletedReason?: string;
    public error?: string;

	public getJSONDoc() {
		let jsonDoc: any = {};
		if (this.id) { jsonDoc._id = this.id; }
		jsonDoc.meta = {};
		jsonDoc.meta.createdByUser = this.createdByUser;
		jsonDoc.meta.modifiedByUser = this.modifiedByUser;
		jsonDoc.meta.modifiedOn = this.modifiedOn;
		if (this.deletedByUser) { jsonDoc.meta.deletedByUser = this.deletedByUser; }
		if (this.deletedOn) { jsonDoc.meta.deletedOn = this.deletedOn; }
		if (this.deletedReason) { jsonDoc.meta.deletedReason = this.deletedReason; }
		return jsonDoc;
	}

	public validate() {
		return true;
	}

} // end class

