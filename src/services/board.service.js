//Service handle logic and then send to controller
import { BoardModel } from '../models/board.model';

const createNew = async (data) => {
    try {
        const result = await BoardModel.createNew(data);
        //push notification
        //do something...
        //transform data..
        return result;
    } catch (error) {
        throw new Error(error);//throw for controller to catch
    }
};

export const boardService = { createNew };
