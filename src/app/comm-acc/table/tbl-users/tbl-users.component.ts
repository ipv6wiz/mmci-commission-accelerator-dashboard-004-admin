import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService, UserService} from "../../../theme/shared/service";
import CustomStore from "devextreme/data/custom_store";
import {lastValueFrom} from "rxjs";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";
import {OptionsService} from "../../../theme/shared/service/options.service";
import {AnimationEvent, trigger} from "@angular/animations";
import {DxFormComponent} from "devextreme-angular";
import Validator from 'devextreme/ui/validator';
import notify from 'devextreme/ui/notify';
import {User} from "../../../theme/shared/entities/user.interface";
import DevExpress from "devextreme";
import ValueChangedEvent = DevExpress.ui.dxTagBox.ValueChangedEvent;


@Component({
  selector: 'app-tbl-users',
    standalone: true,
    imports: [CommonModule, SharedModule],
    animations: [    trigger('openClose', [
        // ...
    ]),],
  templateUrl: './tbl-users.component.html',
  styleUrls: ['./tbl-users.component.scss']
})
export default class TblUsersComponent implements OnInit{
    // @ts-ignore
    @ViewChild(DxFormComponent, { static: false }) newUserForm:DxFormComponent;
    dataSource: any;
    rolesDataSource: any;
    public newUser: User = {} as User;
    namePattern: any = /^[^0-9]+$/;
    passwordOptions: any = {
        mode: 'password',
        onValueChanged: () => {
            let editor = this.newUserForm.instance.getEditor('ConfirmPassword');
            if(editor) {
                const optionValue = editor.option('value');
                const editorElement = editor.element();
                if(optionValue) {
                    let instance = Validator.getInstance(editorElement) as Validator;
                    let valid = instance.validate();
                }
            }
        },
        buttons: [
            {
                name: 'password',
                location: 'after',
                options: {
                    icon: 'assets/images/icons/eye.png',
                    type: 'default',
                    onClick: () => this.changePasswordMode('Password'),
                },
            },
        ],
    };

    confirmOptions: any = {
        mode: 'password',
        buttons: [
            {
                name: 'password',
                location: 'after',
                options: {
                    icon: 'assets/images/icons/eye.png',
                    type: 'default',
                    onClick: () => this.changePasswordMode('ConfirmPassword'),
                },
            },
        ],
    };

    buttonOptions: any = {
        text: 'Register',
        type: 'success',
        useSubmitBehavior: true,
    };


    tagBoxOptions: any = {
        // @ts-ignore
        dataSource: this.rolesDataSource,
        displayExpr: 'key',
        valueExpr: 'value',
        hideSelectedItems: true,
        onValueChanged: (e: any) => {
            console.log('updateNewUserRoles - e: ', e);
        }

    };

    error = '';
    showForm: boolean = false;
    isOpen: boolean = false;
    formVisible: boolean = false;


    constructor(
        private authService: AuthenticationService,
        private optionsService: OptionsService,

    ) {
        this.dataSource = new CustomStore({
            key: 'uid',
            load: (): any => {

                return lastValueFrom(this.authService.userService.getAll(), {defaultValue: []});
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
        this.tagBoxOptions.dataSource = this.rolesDataSource;
    }

    onFormSubmit (e: any) {
        notify({
            message: 'You have submitted the form',
            position: {
                my: 'center top',
                at: 'center top',
            },
        }, 'success', 3000);

        e.preventDefault();

        console.log('onFormSubmit - newUser: ', this.newUser);
        return this.authService.signUpNewUser(this.newUser);
    };

    changePasswordMode(name: string) {
        let editor = this.newUserForm.instance.getEditor(name);
        if(editor) {
            editor.option(
                'mode',
                editor.option('mode') === 'text' ? 'password' : 'text',
            );
        }
    };

    passwordComparison = () => this.newUserForm.instance.option('formData').Password;

    /**
     * Used by terms & conditions checkbox
     */
    checkComparison() {
        return true;
    }

    updateNewUserRoles(e: any) {
        console.log('updateNewUserRoles - e: ', e);
    }


    onAnimationEvent(event: AnimationEvent) {
        // console.log('onAnimationEvent: ', event);
        if(event.phaseName === 'start') {

        }
    }

    ngOnInit(){


    }


    submitAddUser() {
        console.log('submitAddUser');

    }

    toggleShowForm(e:any) {
        this.showForm = !this.showForm;
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
