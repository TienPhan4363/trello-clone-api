import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongoDB';

//define Column collection
const columnCollectionName = 'columns';
const columnCollectionShema = Joi.object({
    boardId: Joi.string().required(), //also ObjectId when create new
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
        const validatedValue = await validateSchema(data);
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId)
        };
        const result = await getDB().collection(columnCollectionName).insertOne(insertValue);

        return await getDB().collection(columnCollectionName).findOne(result.insertedId);
    } catch (error) {
        throw new Error(error);
    }
};

//pushColumnOrder
/**
 * @param {string} columnId
 * @param {string} cardId
 */
const pushCardOrder = async (columnId, cardId) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(columnId) },
            { $push: { cardOrder: cardId } },
            { returnOriginal: false }//return collection after update, not origin collection
        );
        return result.value;
    } catch (error) {
        throw new Error(error);//throw for service to catch
    }
};

//update
const update = async (id, data) => {
    try {
        //mongodb db.collection.prototype
        const updateData = { ...data };

        if (data.boardId) {
            updateData.boardId = ObjectId(data.boardId);
        }

        let result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updateData },
            {
                returnOriginal: false
            }//return collection after update, not origin collection
        );
        result = await getDB().collection(columnCollectionName).findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const ColumnModel = {
    columnCollectionName,
    createNew,
    pushCardOrder,
    update
};
