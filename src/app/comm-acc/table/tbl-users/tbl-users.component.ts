import { Component } from '@angular/core';
import {UserService} from "../../../theme/shared/service";
import CustomStore from "devextreme/data/custom_store";
import {lastValueFrom} from "rxjs";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";

@Component({
  selector: 'app-tbl-users',
    standalone: true,
    imports: [CommonModule,SharedModule,],
  templateUrl: './tbl-users.component.html',
  styleUrls: ['./tbl-users.component.scss']
})
export class TblUsersComponent {
    dataSource: any = [];

    constructor(private userService: UserService) {
        this.dataSource = new CustomStore({
            key: 'uid',
            load: (): any => {
                return lastValueFrom(userService.getAll(), {defaultValue: []});
            },
            insert: values => {
                return userService.create(values);
            },
            update: (key, values) => {
                return this.userService.update(key, values);
            },
            remove: (key) => {
                return this.userService.delete(key);
            }
        });
    }

    imgErrorHandler(e:any) {
        console.log('imgErrorHandler - event: ', e);
    }
}
