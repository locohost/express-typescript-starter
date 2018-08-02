// app/model/user.model.ts 

import { IBaseModel, BaseModel } from './_base.model';
import Global from '../util/globals';
import RoleModel from './role.model';

export default class UserModel extends BaseModel {
	constructor(data: any) {
		super(data);
		// Set model property default values
		if (typeof data === 'string') { data = JSON.parse(data); }
		this.app = data && data.app ? data.app : Global.nullRef;
		this.handle = data && data.handle ? data.handle : '';
		this.name = data && data.name ? data.name : '';
		this.description = data && data.description ? data.description : '';
		this.roles = data && data.roles ? data.roles : null;
    }
    
    public app: any;
    public handle: string;
    public description: string;
    public roles: RoleModel[];

	public addRole(role: RoleModel): boolean {
        this.roles.push(role);
        return true;
	}

	public getJSONDoc(): any {
		// NOTE: This is the JSON oject structure to write to database
		let jsonDoc: any = super.getJSONDoc();
		jsonDoc.app = this.app;
		jsonDoc.handle = this.handle;
		jsonDoc.name = this.name;
		jsonDoc.description = this.description;
		jsonDoc.roles = this.roles;
		return jsonDoc;
	}

	public validate(): boolean {
		if (!super.validate()) { return false; }
		if (typeof this.app !== 'object'|| this.app === Global.nullRef) { this.error = 'app attrib is not set'; return false; }
		if (this.handle.length === 0) { this.error = 'handle attrib cannot be blank'; return false; }
		if (this.name && this.name.length === 0) { this.error = 'name attrib cannot be blank'; return false; }
		return true;
	}
}

