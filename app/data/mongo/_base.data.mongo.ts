// app/data/mongo/_base.data.mongo.ts 

import { MongoClient, ObjectId } from 'mongodb';
import BaseModel from '../../model/_base.model';
import Global from '../../util/globals';

class BaseData {

    constructor(params: any) {
        this.collectionName = params.collectionName;
        if (this.db) {
            this.collection = this.db.getCollection(this.collectionName);
        } else {
            BaseData.userId = params.user.id;
            BaseData.userHandle = params.user.handle;
            this.dbServer = params.dbServer;
            this.dbPort = params.dbPort || '27017';
            this.dbName = params.dbName;
            (async () => {
                // NOTE: Do I have to include user:pass here?...
                const url = `mongodb://${this.dbServer}:${this.dbPort}`;
                this.db = await MongoClient.connect(url, { "useNewUrlParser": true });
                this.collection = this.db.collection(this.collectionName);
                if (Global.infoLogLevel > 0) { console.log(`MongoDb connection (${url}) success!`); }
            })();
        }
    }

    static userId: string = '';
    static userHandle: string = '';

    protected collectionName: string = '';
    protected client: any = null;
    protected collection: any = null;
    protected db: any = null;
    protected dbServer: string = '';
    protected dbPort: string = '';
    protected dbName: string = '';

    public async add(model: BaseModel) {
        if (model.validate()) {
            model.createdByUser = (BaseData.userId);
            model.modifiedByUser = new ObjectId(BaseData.userId);
            model.modifiedOn = new Date();
            let doc = model.getJSONDoc();
            const result = await this.collection.insert(doc);
            if (Global.infoLogLevel > 1) { console.log(`${this.collectionName} add result: `, result); }
            model.id = doc._id;
            return model;
        } else {
            return this.validationError(model);
        }
    }

    public async update(model: BaseModel) {
        if (model.validate()) {
            model.modifiedByUser = new ObjectId(BaseData.userId);
            model.modifiedOn = new Date();
            const result = await this.collection
                .updateOne({
                    _id: new ObjectId(model.id)
                }, model.getJSONDoc());
            if (Global.infoLogLevel > 1) { console.log(`${this.collectionName} update result: `, result); }
            return model;
        } else {
            return this.validationError(model);
        }
    }

    public async delete(id: string, deleteReason: string) {
        return await this.collection.updateOne({
            _id: new ObjectId(id)
        }, {
                "meta": {
                    "deletedByUser": new ObjectId(BaseData.userId),
                    "deletedOn": new Date(),
                    "deletedReason": deleteReason
                }
            });
    }

    public async getByApp(Model: any, appId: string) {
        let models = [];
        const results = await this.collection.find({
            "meta.deletedOn": { "$exists": false },
            "app": new ObjectId(appId)
        }).toArray();
        if (Global.infoLogLevel > 1) { console.log(`${this.collectionName} getByApp results: `, results); }
        for (let result of results) {
            models.push(new Model(result));
        }
        return models;
    }

    public async getAll(Model: any) {
        let models = [];
        const results = await this.collection.find({
            "meta.deletedOn": { "$exists": false }
        }).toArray();
        if (Global.infoLogLevel > 1) { console.log(`${this.collectionName} getAll results: `, results); }
        for (let result of results) {
            models.push(new Model(result));
        }
        return models;
    }

    public async getById(id: string, Model: any) {
        const result = await this.collection.findOne(id);
        if (Global.infoLogLevel > 1) { console.log(`${this.collectionName} getById result: `, result); }
        return new Model(result);
    }

    protected objectId(id: string): ObjectId {
        return new ObjectId(id);
    }

    protected validationError(model: BaseModel): Promise<void> {
        const error = `${this.collectionName} cannot add/update document: validation error: ${model.error}`;
        console.error(error);
        return Promise.reject(new Error(error));
    }

} // end class

export default BaseData;

// const Raven = require('raven');
// Raven.config('https://94b696f987fb4448b7b4ab4a65155a66@sentry.io/1247818').install();

// process.on('unhandledRejection', (reason, promise) => {
// 	// Recommended: send the information to sentry.io
// 	// or whatever crash reporting service you use
// 	console.log('Unhandled Rejection at:', reason.stack || reason)
// 	// Raven.captureMessage('Broken!', (err, eventId) => {
// 	// 	// The message has now been sent to Sentry
// 	// 	return console.log('Unhandled Rejection at:', reason.stack || reason)
// 	// });
// });
