import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongoDB';

//define Card collection
const cardCollectionName = 'cards';
const cardCollectionShema = Joi.object({
    boardId: Joi.string().required(), //also ObjectId when create new
    columnId: Joi.string().required(), //also ObjectId when create new
    title: Joi.string().required().min(3).max(50).trim(),
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
        const validatedValue = await validateSchema(data);
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId),
            columnId: ObjectId(validatedValue.columnId)
        };
        const result = await getDB().collection(cardCollectionName).insertOne(insertValue);

        return await getDB().collection(cardCollectionName).findOne(result.insertedId);
    } catch (error) {
        throw new Error(error);
    }
};

//update
const update = async (id, data) => {
    try {
        //mongodb db.collection.prototype
        const updateData = { ...data };
        //transform  board string id into ObjectId(boardId)
        if (data.boardId) updateData.boardId = ObjectId(data.boardId);

        //transform  column string id into ObjectId(columnId)
        if (data.columnId) updateData.columnId = ObjectId(data.columnId);

        let result = await getDB().collection(cardCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updateData },
            {
                returnOriginal: false
            }//return collection after update, not origin collection
        );
        result = await getDB().collection(cardCollectionName).findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * @param {Array of card id} ids
 */
const deleteManyCard = async (ids) => {
    try {
        const transformIds = ids.map( item => ObjectId(item));
        const result = await getDB().collection(cardCollectionName).updateMany(
            { _id: { $in: transformIds } },
            { $set: { _destroy: true } }
        );

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const CardModel = {
    cardCollectionName,
    createNew,
    deleteManyCard,
    update
};
