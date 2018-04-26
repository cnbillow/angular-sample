import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getUsers(req: Request, res: Response): void {
        const options = (req.query && req.query.search) ?
        { name: new RegExp(req.query.search, 'i')} :
        {};

        User.find(options, null, (err, users) => {
            res.send(users);
        });
    }

    public createUser(req: Request, res: Response): void {
        req.body.joinDate = new Date().toString();
        console.log("here")
        User.create(req.body, (err, user) => {
            res.send(user);
        });
    }

    public updateUser(req: Request, res: Response): void {
        User.findByIdAndUpdate(req.body._id, req.body, (err, user) => {
            res.send(user);
        });
    }

    public deleteUser(req: Request, res: Response): void {
        User.findByIdAndRemove(req.params._id, (err, resp) => {
            res.send(resp);
        });
    }

    public routes() {
        this.router.get('/', this.getUsers);
        this.router.post('/', this.createUser);
        this.router.put('/', this.updateUser);
        this.router.delete('/:_id', this.deleteUser);
        return this.router;
    }

}

export default new UserRouter().routes();
