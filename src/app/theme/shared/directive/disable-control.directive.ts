import { NgControl } from '@angular/forms';
import {Directive, Input} from "@angular/core";

@Directive({
    selector: '[disableControl]'
})
export class DisableControlDirective {

    @Input() set disableControl( condition : boolean ) {
        const action = condition ? 'disable' : 'enable';
        console.log('DisableControlDirective - action: ', action);
        // @ts-ignore
        this.ngControl.valueAccessor?.setDisabledState(condition)
        // this.ngControl.control![action]();
        // this.ngControl.valueAccessor?.writeValue({disabled: action === 'disable'});
        // this.ngControl.valueAccessor?.writeValue({enabled: action === 'enable'});
        // if(!!this.ngControl.valueAccessor?.setDisabledState) {
        //     this.ngControl.valueAccessor.setDisabledState(condition);
        // }
        // this.ngControl.valueAccessor!.setDisabledState = (condition) => {
        //     this.ngControl._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
        // }
    }

    constructor( private ngControl : NgControl ) {
        console.log('DisableControlDirective - ngControl: ', ngControl);
    }

}
