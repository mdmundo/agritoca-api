const express = require('express');
const { errors } = require('celebrate');
const path = require('path');
const cors = require('cors');
const routers = require('./routers');
const { limiter } = require('./utils/rater');

const app = express();
app.set('trust proxy', 1);
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(limiter);

// routers
app.use(routers.userRouter);
app.use(routers.producerRouter);
app.use(routers.productRouter);
app.use(routers.producerProductRouter);
app.use(routers.basketRouter);
app.use(routers.producersHistoryRouter);
app.use(routers.productsHistoryRouter);
app.use(routers.producerProductsHistoryRouter);

app.use(errors());

module.exports = app;
