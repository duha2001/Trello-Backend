/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError';
import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';
import { StatusCodes } from 'http-status-codes';

// Cần truyền vào một reqBody để hứng dữ liệu từ tầng Controller
const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
    const createdBoard = await boardModel.createNew(newBoard);
    console.log(createdBoard);

    // Lấy bảng ghi board sau khi gọi
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    console.log(getNewBoard);

    // Làm thêm các xử lý logic khác với các Collection khác tùy vào dự án,...
    // Bắn email, notification về cho admin khi có 1 cái board mới được tạo,...
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!');
    }
    // Trả về kết quả, trong Service luôn phải có return
    return board;
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails,
};
