import { Directive } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import dayjs, { Dayjs } from 'dayjs';

@Directive()
export abstract class DateComponent {
  ready = true;
  control: FormControl | undefined;

  // eslint-disable-next-line
  abstract config: any;
  date = dayjs();
  material = true;
  required = false;
  disabled = false;
  validationMinDate: Dayjs | undefined;
  validationMaxDate: Dayjs | undefined;
  validationMinTime: Dayjs | undefined;
  validationMaxTime: Dayjs | undefined;
  placeholder = 'Choose a date...';
  displayDate: Dayjs | string | undefined;
  locale: string = dayjs.locale();

  displayDateChanged(displayDate: Dayjs | string): void {
    this.displayDate = displayDate;
  }

  DisplayDateChange(displayDate: Dayjs | string): void {
    this.displayDate = displayDate;
  }

  MaterialThemeChange(material: boolean): void {
    this.material = material;
  }

  DisabledChange(disabled: boolean): void {
    this.disabled = disabled;
    disabled ? this.control?.disable() : this.control?.enable();
  }

  RequireValidationChange(required: boolean): void {
    this.required = required;
    this.control?.setValidators(this.getValidations());
    this.control?.updateValueAndValidity();
  }

  MinValidationChange($event: Dayjs): void {
    this.validationMinDate = $event;
    this.control?.setValidators(this.getValidations());
    this.control?.updateValueAndValidity();
  }

  MaxValidationChange($event: Dayjs): void {
    this.validationMaxDate = $event;
    this.control?.setValidators(this.getValidations());
    this.control?.updateValueAndValidity();
  }

  ConfigChange($event: { format: dayjs.OptionType | undefined }): void {
    this.config = {
      ...this.config,
      ...$event
    };
  }

  LocaleChange(locale: string): void {
    this.ready = false;
    import(`dayjs/locale/${locale}`).then(() => {
      this.locale = locale;
      dayjs.locale(locale);
      this.ready = true;
    });
  }

  protected buildForm(): FormControl {
    return new FormControl({ value: this.date, disabled: this.disabled }, this.getValidations());
  }

  private getValidations(): ValidatorFn[] {
    return [
      this.required
        ? Validators.required
        : (control: AbstractControl) => {
            return this.validationMinDate && this.config && dayjs(control.value, this.config.format).isBefore(this.validationMinDate)
              ? { minDate: 'minDate Invalid' }
              : null;
          },
      (control: AbstractControl) => {
        return this.validationMaxDate && this.config && dayjs(control.value, this.config.format).isAfter(this.validationMaxDate)
          ? { maxDate: 'maxDate Invalid' }
          : null;
      }
    ].filter(Boolean);
  }
}
