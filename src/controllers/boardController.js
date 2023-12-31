import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { boardService } from '~/services/boardService';

const createNew = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);

    // Điều hướng dữ liệu sang tầng Service
    const createdBoard = await boardService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    // Điều hướng dữ liệu sang tầng Service
    const board = await boardService.getDetails(boardId);
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
  getDetails,
};
