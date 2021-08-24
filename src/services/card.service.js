//Service handle logic and then send to controller
import { CardModel } from '../models/card.model';
import { ColumnModel } from '../models/column.model';

//createNew
const createNew = async (data) => {
    try {
        const newCard = await CardModel.createNew(data);
        await ColumnModel.pushCardOrder(newCard.columnId.toString(), newCard._id.toString());

        return newCard;
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
        const updatedCard = await CardModel.update(id, updateData);

        return updatedCard;
    } catch (error) {
        throw new Error(error);//throw for controller to catch
    }
};

export const cardService = {
    createNew,
    update
};
