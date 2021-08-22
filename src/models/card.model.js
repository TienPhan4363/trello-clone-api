import Joi from 'joi';
import { getDB } from '../config/mongoDB';

//define Card collection
const cardCollectionName = 'cards';
const cardCollectionShema = Joi.object({
    boardID: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
});

const validateSchema = async (data) => {
    //abortEarly: show full error, not stopping when meet the first error
    return await cardCollectionShema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(cardCollectionName).insertOne(value);
        return await getDB().collection(cardCollectionName).findOne(result.insertedId);
    } catch (error) {
        console.log(error);
    }
};

export const CardModel = { createNew };
