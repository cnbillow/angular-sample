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

// graphql
import { buildSchema, GraphQLSchema, GraphQLObjectType } from 'graphql';
import * as express_graphql from 'express-graphql';

import { readFileSync } from 'fs';

import { enableProdMode, Query } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import User from './models/user-model';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main.bundle');

import fromQueries from './graphql/queries';
/* import { UserRouter } from './router/user-router';
 */
class Server {
    public app: express.Application;
    public schema;
    public resolvers;
    public buildType: string = process.env.BUILD_TYPE;
    private DIST_FOLDER = join(process.cwd(), 'dist');
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        // set up mongoose
        mongoose.connect(`mongodb://${process.env.MONGO_URI || 'localhost'}`);

        // config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(cors());

        this.setUpGraphql();

    }

    public configMean() {
        this.app.use(express.static('dist/browser'));
    }

    public configUniversal() {

        const template = readFileSync(join(this.DIST_FOLDER, 'browser', 'index.html')).toString();

        this.app.engine('html', (_, options, callback) => {
            renderModuleFactory(AppServerModuleNgFactory, {
                document: template,
                url: options.req.url,
                extraProviders: [
                    provideModuleMap(LAZY_MODULE_MAP)
                ]
            }).then((html) => {
                callback(null, html);
            });
        });

        this.app.set('view engine', 'html');
        this.app.set('views', join(this.DIST_FOLDER, 'browser'));

        this.app.get('*.*', express.static(join(this.DIST_FOLDER, 'browser')));
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

    public buildGraphqlSchema() {
        this.schema = buildSchema(`

            type Query {
                user(_id: String): User
                users: [User]
            }
            type User {
                _id: String,
                name: String,
                url: String,
                active: Boolean,
                role: String,
                mail: String,
                phoneNumber: String,
                location: String,
                joinDate: String,
                description: String,
            }

            type Mutation {
                createUser(name: String, active: Boolean): User
            }
        `);
    }

    public generateResolvers() {
        this.resolvers = {
                users: async () => {
                    return await User.find({});
                },
                createUser: async (root) => {
                    return await User.create(root);
            }
        };
    }

    public setUpGraphql() {
        this.buildGraphqlSchema();
        this.generateResolvers();
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();
        //  this.app.use('/api/v1/users', userRouter);

        const Schema = new GraphQLSchema({
            query: fromQueries,
          });
        this.app.use('/api/graphql', express_graphql({
            schema: Schema,
            graphiql: true,
        }));

        this.app.use('/', router);

        switch (this.buildType) {
            case 'mean':
                this.configMean();
                break;

            case 'universal':
                this.configUniversal();
                break;
            default:
                console.log('default');
                break;
        }
    }
}

export interface GraphQLSchemaConfig {
    query: GraphQLObjectType;
}

export default new Server().app;
