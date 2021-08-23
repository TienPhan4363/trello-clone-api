import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongoDB';

//define Column collection
const columnCollectionName = 'columns';
const columnCollectionShema = Joi.object({
    boardID: Joi.string().required(),
    title: Joi.string().required().min(3).max(20).trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
    //abortEarly: show full error, not stopping when meet the first error
    return await columnCollectionShema.validateAsync(data, { abortEarly: false });
};

//createNew
const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(columnCollectionName).insertOne(value);
        return await getDB().collection(columnCollectionName).findOne(result.insertedId);
    } catch (error) {
        throw new Error(error);
    }
};

//update
const update = async (id, data) => {
    try {
        //mongodb db.collection.prototype
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            { returnOriginal: false }//return collection after update, not origin collection
        );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const ColumnModel = {
    createNew,
    update
};
