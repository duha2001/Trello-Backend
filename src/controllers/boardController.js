import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const createNew = async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);

    // Điều hướng dữ liệu sang tầng Service
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'Error!!!');
    // res
    //   .status(StatusCodes.CREATED)
    //   .json({ message: 'POST from Controller: API create new boards' });
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
