// Angular import
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// bootstrap import
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { ColorPickerService, Rgba, ColorPickerModule } from 'ngx-color-picker';

export class Cmyk {
  // Constructor
  constructor(public c: number, public m: number, public y: number, public k: number) {}
}

interface MyColors {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  [index: string]: string;
}

@Component({
  selector: 'app-form-picker',
  standalone: true,
  imports: [CommonModule, SharedModule, ColorPickerModule],
  templateUrl: './form-picker.component.html',
  styleUrls: ['./form-picker.component.scss']
})
export default class FormPickerComponent {
  // private props
  equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

  before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two
      ? false
      : one.year === two.year
      ? one.month === two.month
        ? one.day === two.day
          ? false
          : one.day < two.day
        : one.month < two.month
      : one.year < two.year;

  after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two
      ? false
      : one.year === two.year
      ? one.month === two.month
        ? one.day === two.day
          ? false
          : one.day > two.day
        : one.month > two.month
      : one.year > two.year;

  now = new Date();
  @Input() testRangeDate!: Date;
  model!: NgbDateStruct;
  modelCustomDay!: NgbDateStruct;
  displayMonths = 3;
  navigation = 'select';
  showWeekNumbers = false;
  hoveredDate!: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate | null;
  disabled = true;
  toggle = false;
  lastColor!: string;
  rgbaText!: string;
  color = '#2889e9';
  color2 = 'hsla(300,82%,52%)';
  color3 = '#fff500';
  color4 = 'rgb(236,64,64)';
  color5 = 'rgba(45,208,45,1)';
  color13 = 'rgba(0, 255, 0, 0.5)';
  color14 = 'rgb(0, 255, 255)';
  color15 = '#a51ad633';
  basicColor = '#4099ff';
  showColorCode = '#db968d';
  showColorCodeHSAL = 'hsl(149,27%,65%)';
  showColorCodeRGBA = 'rgb(221,14,190)';
  changeMeColor = '#523698';
  selectedColor = 'color';
  modelPopup!: NgbDateStruct;
  modelDisabled: NgbDateStruct = {
    year: this.now.getFullYear(),
    month: this.now.getMonth() + 1,
    day: this.now.getDate()
  };

  // Constructor
  constructor(public parserFormatter: NgbDateParserFormatter, public calendar: NgbCalendar, public cpService: ColorPickerService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    const windowWidth = window.innerWidth;
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.displayMonths = 2;
      this.navigation = 'select';
    } else if (windowWidth < 768) {
      this.displayMonths = 1;
      this.navigation = 'select';
    } else {
      this.displayMonths = 3;
      this.navigation = 'none';
    }
  }

  arrayColors: MyColors = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };

  // public method
  public cmyk: Cmyk = new Cmyk(0, 0, 0, 0);
  public date!: { year: number; month: number };

  // private Method
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  selectToday() {
    this.modelPopup = {
      year: this.now.getFullYear(),
      month: this.now.getMonth() + 1,
      day: this.now.getDate()
    };
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  rgbaToCmyk(rgba: Rgba): Cmyk {
    const cmyk: Cmyk = new Cmyk(0, 0, 0, 0);
    const k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
    if (k === 1) {
      return new Cmyk(0, 0, 0, 1);
    }
    cmyk.c = (1 - rgba.r - k) / (1 - k);
    cmyk.m = (1 - rgba.g - k) / (1 - k);
    cmyk.y = (1 - rgba.b - k) / (1 - k);
    cmyk.k = k;
    return cmyk;
  }

  onChangeColorHex8(color: string): string {
    // eslint-disable-next-line
    return this.cpService.outputFormat(this.cpService.stringToHsva(color, true)!, 'rgba', null);
  }
}
