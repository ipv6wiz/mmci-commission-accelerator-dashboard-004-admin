import { Component } from '@angular/core';
import {OptionValues} from "../../../theme/shared/entities/option-values.interface";
import {OptionsService} from "../../../theme/shared/service/options.service";
import CustomStore from "devextreme/data/custom_store";
import {lastValueFrom} from "rxjs";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {DxDataGridModule} from "devextreme-angular";

@Component({
  selector: 'app-tbl-options',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './tbl-options.component.html',
  styleUrls: ['./tbl-options.component.scss']
})
export default class TblOptionsComponent {
    dataSource: any = {};
    constructor(private optionsService: OptionsService) {
        this.dataSource = new CustomStore({
            key: 'id',
            load(): any {
                return lastValueFrom(optionsService.getAll(), {defaultValue: []});
            },
            insert: values => {
                return optionsService.create(values);
            },

            update: (key, values) =>  {
                return this.optionsService.update(key, values);
            },
            remove: (key) => {
                return this.optionsService.delete(key);
            }
        });
    }

    valueCreate(e: any, id: any): any {
        console.log("valueCreate :" + id + " " + JSON.stringify(e.data));
        let values: OptionValues = {
            typeId: id,
            key: e.data.key,
            value:e.data.value,
            sortOrder: e.data.sortOrder,
            displayValue: e.data.displayValue
        };
        //console.log("values :" + JSON.stringify(values));
        return this.optionsService.createValue(id, values);
    };

    valueUpdate(e: any, id: any) {
        // console.log("valueUpdate - id: " + id + " newData: " + JSON.stringify(e.newData) + " Key:" + JSON.stringify(e.key));
        // console.log('valueData - oldData: ', JSON.stringify(e.oldData));
        let key = e.key;
        let values = {...e.oldData, ...e.newData};
        return this.optionsService.valueUpdate(id, key, values);
    };

    contentReady(e: any) {
        if (!e.component.getSelectedRowKeys().length) { e.component.selectRowsByIndexes(0); }
    }

    selectionChanged(e: any) {
        e.component.collapseAll(-1);
        e.component.expandRow(e.currentSelectedRowKeys[0]);
    }
    logEvent(eventName: string) {
        console.log(`Grid event: ${eventName}`);
    };
}
