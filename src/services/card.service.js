//Service handle logic and then send to controller
import { CardModel } from '../models/card.model';

//createNew
const createNew = async (data) => {
    try {
        const result = await CardModel.createNew(data);
        //push notification
        //do something...
        //transform data..
        return result;
    } catch (error) {
        throw new Error(error);//throw for controller to catch
    }
};

export const cardService = {
    createNew
};
