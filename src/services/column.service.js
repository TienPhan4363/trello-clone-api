//Service handle logic and then send to controller
import { ColumnModel } from '../models/column.model';

//createNew
const createNew = async (data) => {
    try {
        const result = await ColumnModel.createNew(data);
        //push notification
        //do something...
        //transform data..
        return result;
    } catch (error) {
        throw new Error(error);//throw for controller to catch
    }
};

//update
const update = async (id, data) => {
    try {
        const updateDate = {
            ...data,
            updatedAt: Date.now()
        };
        const result = await ColumnModel.update(id, updateDate);
        //push notification
        //do something...
        //transform data..
        return result;
    } catch (error) {
        throw new Error(error);//throw for controller to catch
    }
};

export const columnService = {
    createNew,
    update
};
