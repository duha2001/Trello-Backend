import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoute } from '~/routes/v1/boardRoute';
import { columnRoute } from '~/routes/v1/columnRoute';
import { cardRoute } from '~/routes/v1/cardRoute';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' });
});

// Board APIs
Router.use('/boards', boardRoute);

// Board APIs
Router.use('/columns', columnRoute);

// Board APIs
Router.use('/cards', cardRoute);

export const APIs_V1 = Router;
