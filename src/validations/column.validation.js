import Joi from 'joi';
import { HttpStatusCode } from '../utilities/constants';

//createNew
const createNew = async (req, res, next) => {
    const condition = Joi.object({
        boardId: Joi.string().required(),
        title: Joi.string().required().min(3).max(20).trim()
    });
    try {
        await condition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message
        });
    }
};

//update
const update = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().min(3).max(20).trim()
    });
    try {
        await condition.validateAsync(req.body,
            {
                abortEarly: false,
                //if not update title but update cardOrder for example, this properties allow you to do so, as cardOrder was not defined in condition
                allowUnknown: true
            });
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message
        });
    }
};

export const columnValidation = {
    createNew,
    update
};
