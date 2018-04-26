import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { TransferState, makeStateKey } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './users.service';

import { User } from './models/user.model';
import { UsersComponent } from './users.component';

import { MockUserService } from './../../karma/mocks/services/user.service.mock';

describe('UsersComponent', () => {
    let fixture: ComponentFixture<UsersComponent>;
    let component: UsersComponent;
    const mockUserService = MockUserService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
            ],
            declarations: [ UsersComponent ],
            providers: [
            ],
            schemas: [ NO_ERRORS_SCHEMA ],
        })
        .overrideComponent(UsersComponent, {
            set: {
                providers: [
                    {
                        provide: UsersService,
                        useValue: mockUserService,
                    },
                    {
                        provide: TransferState,
                        useValue: TransferState,
                    },
                    {
                        provide: MatDialog,
                        useValue: {
                            open: (comp, options) => {
                                return {
                                    afterClosed: () => Observable.of([{bar: 'bar'}]),
                                };
                            },
                        },
                    },
                ],
            },
        })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(UsersComponent);
            component = fixture.componentInstance;
        });
    }));

    describe('#UsersComponent', () => {
        it('search', () => {
            spyOn(component.userService, 'get').and.callThrough();
            const term = Observable.of('word');
            let expectedValue;
            component.search(term).subscribe((result) => {
                expectedValue = result;
            });
            expect(expectedValue[0].foo).toEqual('foo');
            expect(component.userService.get).toHaveBeenCalledWith({params: {search: 'word'}});
        });

        it('should open dialog', () => {
            spyOn(component.dialog, 'open').and.callThrough();
            component.users = [];
            component.createUser();
            expect(component.dialog.open).toHaveBeenCalledWith(UsersComponent,
            {
                width: '450px',
                data: {
                    user: { isNewUser: true },
                }
            });
        });

        /* it('should removed user', () => {
            const newUser = new User();
            newUser._id = 'foo';
            component.users = [newUser];
            component.userRemoved({_id : 'foo'});
            expect(component.users.length).toEqual(0);
        }); */
    });
});
