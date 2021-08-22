import Joi from 'joi';
import { getDB } from '../config/mongoDB';

//define Board collection
const boardCollectionName = 'boards';
const boardCollectionShema = Joi.object({
    title: Joi.string().required().min(3).max(20),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
    //abortEarly: show full error, not stopping when meet the first error
    return await boardCollectionShema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(boardCollectionName).insertOne(value);
        return await getDB().collection(boardCollectionName).findOne(result.insertedId);
    } catch (error) {
        console.log(error);
    }
};

export const BoardModel = { createNew };
