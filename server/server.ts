// These are important and needed before anything else for angular universal
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

import * as express from 'express';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { join } from 'path';

//
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// import

import userRoutes from './router/user';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main.bundle');

class Server {
    public app: express.Application;
    private DIST_FOLDER = join(process.cwd(), 'dist');
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        // set up mongoose
        this.configUniversal();

        const MONGO_URI = 'mongodb://127.0.0.1:27017/management';
        mongoose.connect(MONGO_URI || process.env.MONGO_URI);

        // config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(cors());

        // static content
        this.app.set('views', join(this.DIST_FOLDER, 'browser'));
    }

    public configUniversal() {
        this.app.engine('html', ngExpressEngine({
            bootstrap: AppServerModuleNgFactory,
            providers: [
              provideModuleMap(LAZY_MODULE_MAP)
            ]
        }));
        this.app.set('view engine', 'html');
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();

        this.app.use('/', router);
        this.app.use('/api/v1/users', userRoutes);

        this.app.get('*.*', express.static(join(this.DIST_FOLDER, 'browser')));

        // angular universal pass serverurl to client
        this.app.get('*', (req: Request, res: Response) => {
            res.render('./', {
                req,
                res,
                providers: [
                    {
                        provide: 'serverUrl',
                        useValue: `${req.protocol}://${req.get('host')}`
                    }
                ]
            });
        });
    }
}

export default new Server().app;
