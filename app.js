import express from 'express'
import 'dotenv/config.js'
import './config/bd.js'
import cookieParser from 'cookie-parser';
import logger from 'morgan'

import indexRouter from './routes/index.js'

let app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

export default app;
