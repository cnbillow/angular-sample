import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
const url = 'http://localhost:4000/api/v1/users';
@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {}

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
