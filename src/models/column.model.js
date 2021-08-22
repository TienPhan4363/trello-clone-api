import Joi from 'joi';
import { getDB } from '../config/mongoDB';

//define Column collection
const columnCollectionName = 'columns';
const columnCollectionShema = Joi.object({
    boardID: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
    //abortEarly: show full error, not stopping when meet the first error
    return await columnCollectionShema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(columnCollectionName).insertOne(value);
        return await getDB().collection(columnCollectionName).findOne(result.insertedId);
    } catch (error) {
        console.log(error);
    }
};

export const ColumnModel = { createNew };
