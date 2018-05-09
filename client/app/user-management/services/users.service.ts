import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
const url = '/api/v1/users';

const USERS_KEY = makeStateKey('users');

@Injectable()
export class UsersService {
    constructor(private http: HttpClient, private transferState: TransferState) {}

    public getFromTransferState() {
        return Observable.of(this.transferState.get(USERS_KEY, null));
    }

    public setToTransferState(users) {
        const found = this.transferState.hasKey(USERS_KEY);
        if (!found) {
            this.transferState.set(USERS_KEY, users as any);
        }
    }

    public get(params = {}): Observable<any> {
        return this.http.get(url, params);
    }

    public update(data: User) {
       return this.http.put(url, data);
    }

    public save(data: User) {
        return this.http.post(url, data);
    }

    public delete(_id: string) {
        return this.http.delete(`${url}/${_id}`);
    }
}
