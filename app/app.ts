import * as express from 'express';
import * as bodyParser from 'body-parser';

export class App {
    public express;

    constructor() {
        this.express = express();
        this.express.use(express.json());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended : true}));
        this.mountRoutes();
    }

    private mountRoutes() : void {
        const router = express.Router();
        router.get('/', (req, res) => {});

        this.express.use('/', router);
    }
}
