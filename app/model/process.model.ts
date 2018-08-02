// app/model/process.model.ts 

import { IBaseModel, BaseModel } from './_base.model';
import Global from '../util/globals';

export default class ProcessModel extends BaseModel {
    
    constructor(data: any) {
		super(data);
		// Set model property default values
		if (typeof data === 'string') { data = JSON.parse(data); }
		this.description = data && data.description ? data.description : '';
		this.secret = data && data.secret ? data.secret : '';
		this.app = data && data.app ? data.app : Global.nullRef;
		this.expireOn = data && data.expire ? data.expire : Global.nullDate;
		this.messageMaxRetries = data && data.messageMaxRetries ? data.messageMaxRetries : -1;
		this.messageRetryWait = data && data.messageRetryWait ? data.messageRetryWait : -1;
	}

    public description?: string;
    public secret: string;
    public app: any;
    public expireOn: Date;
    public messageMaxRetries: number;
    public messageRetryWait: number;

	public getJSONDoc(): any {
		// NOTE: This is the JSON oject structure to write to database
		var jsonDoc = super.getJSONDoc();
		jsonDoc.name = this.name;
		jsonDoc.description = this.description;
		jsonDoc.secret = this.secret;
		jsonDoc.app = this.app;
		jsonDoc.expireOn = (typeof this.expireOn === 'string' ? new Date(this.expireOn) : this.expireOn);
		jsonDoc.messageMaxRetries = this.messageMaxRetries;
		jsonDoc.messageRetryWait = this.messageRetryWait;
		return jsonDoc;
	}

	public validate(): boolean {
		if (!super.validate()) { return false; }
		if (typeof this.app !== 'object' || this.app === Global.nullRef) { this.error = 'appId attrib is not set'; return false; }
		if (this.name && this.name.length === 0) { this.error = "name attrib cannot be blank"; return false;	}
		if (this.description && this.description.length === 0) { this.error = "description attrib cannot be blank";	return false; }
		if (this.messageMaxRetries < 0) { this.error = "messageMaxRetries attrib is not set";	return false; }
		if (this.messageRetryWait < 0) { this.error = "messageRetryWait attrib is not set";	return false; }
		return true;
	}
}
