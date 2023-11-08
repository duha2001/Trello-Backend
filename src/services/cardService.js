/* eslint-disable no-useless-catch */
import { cardModel } from '~/models/cardModel';
import { columnModel } from '~/models/columnModel';

// Cần truyền vào một reqBody để hứng dữ liệu từ tầng Controller
const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newCard = {
      ...reqBody,
    };

    // Gọi tới tầng Model để xử lý lưu bản ghi newCard vào trong Database
    const createdCard = await cardModel.createNew(newCard);

    // Lấy bảng ghi card sau khi gọi
    const getNewCard = await cardModel.findOneById(createdCard.insertedId);

    if (getNewCard) {
      //   Cập nhập mảng columnOrderIds trong collection boards
      await columnModel.pushCardOrderIds(getNewCard);
    }
    return getNewCard;
  } catch (error) {
    throw error;
  }
};
export const cardService = {
  createNew,
};
