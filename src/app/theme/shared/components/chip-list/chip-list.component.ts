import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import { MatChipGrid, MatChipInput, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, of, startWith } from 'rxjs';
import { HelpersService } from '../../service/helpers.service';
import { map } from 'rxjs/operators';
import { FormFieldDto } from '../../dtos/form-field.dto';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chip-list',
  standalone: true,
  imports: [
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatChipGrid,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
    MatIcon,
    MatOption,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './chip-list.component.html',
  styleUrl: './chip-list.component.scss'
})
export class ChipListComponent implements OnInit{
  @ViewChild('chipInput') chipInput!: ElementRef<HTMLInputElement>;
  @Input() formGroup!: FormGroup;
  @Input() currChips!: string[];
  @Input() field!: FormFieldDto;
  @Input() validChips!: string[];
  @Output() chipListChange = new EventEmitter();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipCtrl = new FormControl('');
  filteredChips: Observable<string[]>
  chipsAvailable: string[] = [];

  constructor(private helpers: HelpersService,) {
    this.filteredChips = this.chipCtrl.valueChanges.pipe(
      startWith(null),
      map((chip: string | null) =>
        (chip ? this._filter( chip) : this.chipsAvailable.slice()) )
    ) ;
  }

  ngOnInit() {
    console.log('ChipListComponent - validChips: ', this.validChips);
    this.chipsAvailable = this.validChips.filter(x => !this.currChips.includes(x));
  }

  addChip(event: any) {
    console.log('addChip - event: ', event);
    event.chipInput!.clear();
  }

  selectChip(event: MatAutocompleteSelectedEvent){
    const value: string = event.option.viewValue;
    this.currChips = this.currChips.concat(value);
    this.currChips.sort();
    // console.log('selectChip - currChips: ', this.currChips);
    this.emitListChange();
    const index  = this.chipsAvailable.indexOf(value);
    this.chipsAvailable.splice(index, 1);
    this.chipsAvailable.sort();
    // Clear the input value
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);
  }

  removeChip(chip: string) {
    const index = this.currChips.indexOf(chip);
    this.currChips.splice(index, 1);
    // console.log('removeChip - currChips: ', this.currChips);
    this.emitListChange();
    this.chipsAvailable.push(chip);
    this.chipsAvailable.sort();
    this.chipCtrl.setValue(null);
  }

  emitListChange() {
    this.chipListChange.emit({key: this.field.fcn, value: this.currChips});
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const availValues = this.chipsAvailable;
    if(availValues) {
      return availValues.filter(chip => chip.toLowerCase().includes(filterValue))
    } else {
      return this.chipsAvailable || [];
    }
  }
}
