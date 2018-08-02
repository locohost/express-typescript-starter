// app/model/subscriber.model.ts 

import { IBaseModel, BaseModel } from './_base.model';
import Global from '../util/globals';

export default class SubscriberModel extends BaseModel {
    
    constructor(data: any) {
		super(data);
		if (typeof data === 'string') { data = JSON.parse(data); }
		this.description = data && data.description ? data.description : '';
		this.app = data && data.app ? data.app : Global.nullRef;
		this.process = data && data.process ? data.process : Global.nullRef;
		this.expireOn = data && data.expireOn ? data.expireOn : Global.nullDate;
		this.url = data && data.url ? data.url : '';
		this.type = data && data.type ? data.type : 'ALL';
		this.deliveryDays = ['Mon','Tue','Wed','Thr','Fri'];
		this.deliveryTimeStart = Global.nullDate;
		this.deliveryTimeEnd = Global.nullDate;
    }
    
    public description: string;
    public app: any;
    public process: any;
    public expireOn: Date;
    public url: string;
    public type: string;
    public deliveryDays: string[];
    public deliveryTimeStart: Date;
    public deliveryTimeEnd: Date;

	public getJSONDoc(): any {
		// NOTE: This is the JSON oject structure to write to database
		let jsonDoc: any = super.getJSONDoc();
		jsonDoc.name = this.name;
		jsonDoc.description = this.description;
		jsonDoc.app = this.app
		jsonDoc.process = this.process;
		jsonDoc.expireOn = (typeof this.expireOn === 'string' ? new Date(this.expireOn) : this.expireOn);
		jsonDoc.url = this.url;
		jsonDoc.type = this.type;
		jsonDoc.deliveryDays = this.deliveryDays;
		jsonDoc.deliveryTimeStart = this.deliveryTimeStart;
		jsonDoc.deliveryTimeEnd = this.deliveryTimeEnd;
		return jsonDoc;
	}

	public validate(): boolean {
		if (!super.validate()) { return false; }
		if (typeof this.app !== 'object' || this.app === Global.nullRef) { this.error = 'app attrib is not set'; return false; }
		if (typeof this.process !== 'object' || this.process === Global.nullRef) { this.error = 'process attrib is not set'; return false; }
		if (this.name && this.name.length === 0) { this.error = "name attrib cannot be blank"; return false; }
		if (this.description.length === 0) { this.error = "description attrib cannot be blank"; return false; }
		if (this.url.length === 0) { this.error = "url attrib cannot be blank"; return false; }
		return true;
	}

} // end class
