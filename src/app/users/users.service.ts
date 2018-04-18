import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';

const url = '/api/v1/users';
@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {}

    public get(params = {}) {
        return this.http.get(url, params);
    }

    public update(data: User) {
        return this.http.put(url, data);
    }

    public save(data: User) {
        return this.http.post(url, data);
    }

    public remove(data: any) {
        return this.http.delete(`${url}/${data._id}`);
    }
}
