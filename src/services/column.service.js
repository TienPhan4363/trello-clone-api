//Service handle logic and then send to controller
import { ColumnModel } from '../models/column.model';
import { BoardModel } from '../models/board.model';

//createNew
const createNew = async (data) => {
    try {
        const newColumn = await ColumnModel.createNew(data);

        //update columnOrder array in board collection
        await BoardModel.pushColumnOrder(newColumn.boardID.toString(), newColumn._id.toString());

        return newColumn;
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
