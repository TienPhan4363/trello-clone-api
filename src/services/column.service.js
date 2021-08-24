//Service handle logic and then send to controller
import { ColumnModel } from '../models/column.model';
import { BoardModel } from '../models/board.model';
import { CardModel } from '../models/card.model';

//createNew
const createNew = async (data) => {
    try {
        const newColumn = await ColumnModel.createNew(data);
        newColumn.cards = [];

        //update columnOrder array in board collection
        await BoardModel.pushColumnOrder(newColumn.boardId.toString(), newColumn._id.toString());

        return newColumn;
    } catch (error) {
        throw new Error(error);//throw for controller to catch
    }
};

//update
const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: Date.now()
        };
        if (updateData._id) delete updateData._id;
        if (updateData.cards) delete updateData.cards;

        const updatedColumn = await ColumnModel.update(id, updateData);

        if (updatedColumn._destroy) {
            //delete many cards in this column
            CardModel.deleteManyCard(updatedColumn.cardOrder);
        }

        return updatedColumn;
    } catch (error) {
        throw new Error(error);//throw for controller to catch
    }
};

export const columnService = {
    createNew,
    update
};
