import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import mongoose, { ConnectOptions } from "mongoose";

import indexRouter from './routes/indexRouter';
import searchRouter from './routes/searchRouter';
import { QueryListDb } from './models/cronJobs';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    
    config(){
        const MONGO_URI = 'mongodb://127.0.0.1/typescript';
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
        }as ConnectOptions)
        .then(db => console.log("server ready :D"));
        // Settings
        this.app.set('port', process.env.PORT || 3000);
        // Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());

        const foo = new QueryListDb('* * * * *');

    }

    routes(){
        this.app.use(indexRouter);
        this.app.use('/api', searchRouter);
    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();

//npm run ts
//npm run dev