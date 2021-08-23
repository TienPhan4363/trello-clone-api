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

export const cardService = {
    createNew
};
