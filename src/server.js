import express from 'express';
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb';
import exitHook from 'async-exit-hook';
import { env } from '~/config/environment';
import { APIs_V1 } from '~/routes/v1';
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware';

const START_SERVER = () => {
  const app = express();

  // Enable req.body json data
  app.use(express.json());

  // Use APIs V1
  app.use('/v1', APIs_V1);

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware);

  app.get('/', async (req, res) => {
    // console.log(await GET_DB().listCollections().toArray());
    res.end('<h1>Hello World!</h1><hr>');
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`
    );
  });

  // Thực hiện các tác vụ cleanip trước khi dừng server
  exitHook(() => {
    console.log('4. Disconnecting from MongoDB Cloud Atlas');
    CLOSE_DB();
    console.log('5. Disconnected from MongoDB Cloud Atlas');
  });
};

// Chỉ khi kết nối với Database thành công thì mới Start Server Back-end lên
// IIFE
(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...');
    await CONNECT_DB();
    console.log('2. Connected to MongoDB Cloud Atlas!');

    // Khởi động Server Back-end sau khi Connect Database thành công
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();

// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error);
//     process.exit(0);
//   });
