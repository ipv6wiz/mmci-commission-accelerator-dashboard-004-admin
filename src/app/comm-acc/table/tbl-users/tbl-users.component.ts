import { Component, OnInit} from '@angular/core';
import {AuthenticationService, UserService} from "../../../theme/shared/service";
import CustomStore from "devextreme/data/custom_store";
import {lastValueFrom} from "rxjs";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {OptionsService} from "../../../theme/shared/service/options.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnimationEvent, trigger} from "@angular/animations";


@Component({
  selector: 'app-tbl-users',
    standalone: true,
    imports: [CommonModule, SharedModule,],
    animations: [    trigger('openClose', [
        // ...
    ]),],
  templateUrl: './tbl-users.component.html',
  styleUrls: ['./tbl-users.component.scss']
})
export class TblUsersComponent implements OnInit{
    dataSource: any;
    rolesDataSource: any;
    signupForm!: FormGroup;
    error = '';
    showForm: boolean = false;
    isOpen: boolean = false;
    formVisible: boolean = false;
    constructor(
        private authService: AuthenticationService,
        private optionsService: OptionsService,
        private formBuilder: FormBuilder,
    ) {
        this.dataSource = new CustomStore({
            key: 'uid',
            load: (): any => {
                return lastValueFrom(this.authService.userService.getAll(), {defaultValue: []});
            },
            insert: values => {
                return this.authService.signUp(values);
            },
            update: (key, values) => {
                return this.authService.userService.update(key, values);
            },
            remove: (key) => {
                return this.authService.userService.delete(key);
            }
        });

        this.rolesDataSource = new CustomStore({
            key: 'uid',
            load: (): any => {
                return this.optionsService.getOptionsByType('Role');
            }
        });
    }


    onAnimationEvent(event: AnimationEvent) {
        // console.log('onAnimationEvent: ', event);
        if(event.phaseName === 'start') {
            const togglePassword = document.querySelector('#toggleNewUserPassword');
            const password = document.querySelector('#password');
            // console.log('onAnimationEvent - togglePassword: ', togglePassword);
            // console.log('onAnimationEvent - password element: ', password);
            togglePassword?.addEventListener('click', () => {
                // console.log('togglePassword - clicked');
                // toggle the type attribute
                const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
                password?.setAttribute('type', type);
                // toggle the icon
                togglePassword.classList.toggle('fa-eye-slash');
            });
        }
    }

    ngOnInit(){
        this.signupForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],

        });

    }

    get f() {
        return this.signupForm.controls;
    }

    submitAddUser() {
        console.log('submitAddUser');
        if (this.signupForm.invalid) {
            console.log('submitAddUser - form Invalid');
            return;
        }
        console.log('submitAddUser - form valid');
        this.authService.signUp({
            email: this.f?.['email']?.value,
            password: this.f?.['password']?.value,
            firstName: this.f?.['firstName'].value,
            lastName: this.f?.['lastName'].value,
            roles: this.f?.['roles'].value,
            defaultPage: this.f?.['defaultPage'].value
        })
            .then(() => {})
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    toggleShowForm(e:any) {
        this.showForm = !this.showForm;
        // if(this.showForm) {
        //     const togglePassword = document.querySelector('#toggleNewUserPassword');
        //     const password = document.querySelector('#password');
        //     console.log('toggleShowForm - togglePassword: ', togglePassword);
        //     console.log('toggleShowForm - password element: ', password);
        // }
    }

    updateRoles(event: any, cellInfo: any) {
        console.log('updateRoles - event: ', event);
        console.log('updateRoles - cellInfo: ', cellInfo);
        cellInfo.setValue(event.value);
    }

    imgErrorHandler(e:any) {
        console.log('imgErrorHandler - event: ', e);
    }

    protected readonly decodeURI = decodeURI;
}
