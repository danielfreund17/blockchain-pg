import * as express from 'express';

export class App {
    public express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes() : void {
        const router = express.Router();
        router.get('/', (req, res) => {});

        this.express.use('/', router);
    }
}
