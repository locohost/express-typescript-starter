// app/model/message.model.ts 

import { IBaseModel, BaseModel } from './_base.model';
import Global from '../util/globals';

export default class MessageModel extends BaseModel {

    constructor(data: any) {
		super(data);
		// Set model property default values
		if (typeof data === 'string') { data = JSON.parse(data); }
		this.name = data && data.name ? data.name : '';
		this.status = data && data.status ? data.status : '';
		this.app = data && data.app ? data.app : Global.nullRef;
		this.process = data && data.process ? data.process : Global.nullRef;
		this.data = data && data.data ? data.data : '';
		this.expireOn = data && data.expire ? data.expire : Global.nullDate;
		this.retried = data && data.retried ? data.retried : 0;
		this.retryMax = data && data.retryMax ? data.retryMax : 10;
		this.retryWait = data && data.retryWait ? data.retryWait : 1;
        this.type = data && data.type ? data.type : 'any';
        this.subscribers = data && data.subscribers ? data.subscribers : [];
    }
    
    public status: string;
    public app: any;
    public process: any;
    public data: string;
    public expireOn: Date;
    public retried: number;
    public retryMax: number;
    public retryWait: number;
    public type: string;
    public subscribers: any[];

	public getJSONDoc(): any {
		// NOTE: This is the JSON oject structure to write to database
		let jsonDoc: any = super.getJSONDoc();
		jsonDoc.name = this.name;
		jsonDoc.status = this.status;
		jsonDoc.app = this.app; // docRef
		jsonDoc.process = this.process;
		jsonDoc.data = this.data;
		jsonDoc.expireOn = this.expireOn;
		jsonDoc.retried = this.retried;
		jsonDoc.retryMax = this.retryMax;
		jsonDoc.retryWait = this.retryWait;
		jsonDoc.type = this.type;
		if (this.subscribers.length > 0) { jsonDoc.subscribers = this.subscribers; }
		return jsonDoc;
	}

	public validate(): boolean {
		if (!super.validate()) { return false; }
		if (typeof this.app !== 'object' || this.app === Global.nullRef) { this.error = 'app attrib is not set'; return false; }
		if (typeof this.process !== 'object' || this.process === Global.nullRef) { this.error = 'process attrib is not set'; return false; }
		if (this.name && this.name.length === 0) { this.error = "name attrib cannot be blank"; return false;	}
		if (this.type.length === 0) { this.error = "type attrib cannot be blank"; return false;	}
		if (this.data.length === 0) { this.error = "data attrib cannot be blank"; return false;	}
		return true;
	}
}
