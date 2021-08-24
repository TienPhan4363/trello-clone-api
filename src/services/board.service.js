//Service handle logic and then send to controller
import { BoardModel } from '../models/board.model';
import { cloneDeep } from 'lodash';

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
const getFullBoard = async (boardId) => {
    try {
        const board = await BoardModel.getFullBoard(boardId);

        if (!board || !board.columns) {
            throw new Error('Board not found!');
        }

        const transformBoard = cloneDeep(board);
        //filter _destroy columns
        transformBoard.columns = transformBoard.columns.filter( column => !column._destroy );

        //add card to each column
        transformBoard.columns.forEach( column => {
            column.cards = transformBoard.cards.filter( card => card.columnId.toString() === column._id.toString());
        });

        //sort card by cardOrder, sort column by columnOrder, this step will be passed to
        //front-end

        //remove cards data from board
        delete transformBoard.cards;
        return transformBoard;
    } catch (error) {
        throw new Error(error);//throw for controller to catch
    }
};

export const boardService = {
    createNew,
    getFullBoard
};
