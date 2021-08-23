//Service handle logic and then send to controller
import { BoardModel } from '../models/board.model';

//createNew
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

//getFullBoard
const getFullBoard = async (boardID) => {
    try {
        const board = await BoardModel.getFullBoard(boardID);

        //add card to each column
        board.columns.forEach( column => {
            column.cards =
            board.cards.filter( card => card.columnID.toString() === column._id.toString());
        });

        //sort card by cardOrder, sort column by columnOrder, this step will be passed to
        //front-end

        //remove cards data from board
        delete board.cards;
        return board;
    } catch (error) {
        throw new Error(error);//throw for controller to catch
    }
};

export const boardService = {
    createNew,
    getFullBoard
};
