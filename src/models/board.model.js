import Joi from 'joi';
import { getDB } from '../config/mongoDB';
import { ObjectId } from 'mongodb';
import { ColumnModel } from './column.model';
import { CardModel } from './card.model';

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

//createNew
const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(boardCollectionName).insertOne(value);
        return await getDB().collection(boardCollectionName).findOne(result.insertedId);
    } catch (error) {
        throw new Error(error);//throw for service to catch
    }
};

//pushColumnOrder
/**
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
            { _id: ObjectId(boardId) },
            { $push: { columnOrder: columnId } },
            { returnOriginal: false }//return collection after update, not origin collection
        );
        return result.value;
    } catch (error) {
        throw new Error(error);//throw for service to catch
    }
};

//getFullBoard
const getFullBoard = async (boardId) => {
    try {
        const result = await getDB().collection(boardCollectionName).aggregate([
            {
                $match: {
                    _id: ObjectId(boardId),
                    _destroy: false
                }
            },
            // {
            //     $addFields: {
            //         _id: { $toString: '$_id' }//override _id from string to ObjectId
            //     }
            // },
            { $lookup: {
                from: ColumnModel.columnCollectionName,
                localField: '_id',
                foreignField: 'boardId',
                as: 'columns' }
            },
            { $lookup: {
                from: CardModel.cardCollectionName,
                localField: '_id',
                foreignField: 'boardId',
                as: 'cards' }
            }
        ]).toArray();

        return result[0] || {};
    } catch (error) {
        throw new Error(error);//throw for service to catch
    }
};

export const BoardModel = {
    createNew,
    pushColumnOrder,
    getFullBoard
};
