// app/model/app.model.ts 

import { IBaseModel, BaseModel} from './_base.model';

export default class AppModel extends BaseModel implements IBaseModel {

    constructor(data: any) {
        super(data);
		if (typeof data === 'string') { data = JSON.parse(data); }
		this.description = data && data.description ? data.description : '';
    }
    
    public description?: string = '';
    
	public getJSONDoc(): any {
        // NOTE: This is the JSON oject structure to write to database
		let jsonDoc: any = super.getJSONDoc();
		jsonDoc.description = this.description;
		return jsonDoc;
	}
    
	public validate(): boolean {
        if (!super.validate()) { return false; }
		if (this.name && this.name.length === 0) { this.error = "name attrib cannot be blank"; return false;	}
		if (this.description && this.description.length === 0) { this.error = "description attrib cannot be blank";	return false; }
		return true;
	}
}
