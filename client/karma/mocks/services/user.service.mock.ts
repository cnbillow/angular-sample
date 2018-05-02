import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User } from '../../../app/models/user.model';
export const MockUserService = {
    get: (params = {}) => {
        return Observable.of([{foo: 'foo'}]);
    },
    update: (data: User) => {
        return Observable.of({});
    },
    save: (data: User) => {
        return Observable.of({});
    },
    delete: (data: any) => {
        return Observable.of({});
    },
};
