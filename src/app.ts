import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Routes from './routes';
import PassportConfig from './config/PassportConfig';
import MongoDBConfig from './config/MongoDBConfig';

class App {

    public app: express.Application;
    public routes = new Routes();
    public passportConfig = new PassportConfig();
    public mongoDBConfig = new MongoDBConfig();
    constructor() {
        this.app = express();
        this.config();
        this.mongoDBConfig.init();
        this.passportConfig.init();
    }

    private config() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(this.routes.init());
    }

}

export default new App().app;
