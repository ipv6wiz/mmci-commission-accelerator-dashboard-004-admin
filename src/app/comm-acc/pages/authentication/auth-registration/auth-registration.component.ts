import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
// third party
import { ArchwizardModule } from '@achimha/angular-archwizard';
import {AuthenticationService} from "../../../../theme/shared/service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedModule} from "../../../../theme/shared/shared.module";
import {ConfirmedValidator} from "../../../../theme/shared/_helpers/confirmed.validator";



@Component({
  selector: 'app-auth-registration',
    standalone: true,
    imports: [CommonModule, RouterModule, ArchwizardModule, SharedModule],
  templateUrl: './auth-registration.component.html',
  styleUrls: ['./auth-registration.component.scss']
})
export default class AuthRegistrationComponent implements OnInit{
    regForm!: FormGroup;
    contactInfo!: FormGroup;
    submitted = false;
    loading = false;
    error = '';
    alertMsg = '';

    constructor(private formBuilder: FormBuilder, public authService: AuthenticationService) {}

    ngOnInit(){
        this.regForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            dreNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
            dreState: ['CA', Validators.required],
            cellPhone: ['', [Validators.required, Validators.pattern('(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}')]],
            addrLine1: ['', Validators.required],
            addrLine2: [''],
            addrLine3: [''],
            addrCity: ['', Validators.required],
            addrState: ['CA', [Validators.required, Validators.pattern('CA')]],
            addrZip: ['', Validators.required],
            brokerageName: ['', Validators.required],
            brokerName: ['', Validators.required],
            brokerEmail: ['', [Validators.required, Validators.email]],
            brokerPhone: ['', [Validators.required, Validators.pattern('(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}')]],
            brokerDreNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
            perfProdVol: ['', [Validators.required, Validators.pattern('[0-9, \\,]*')]],
            perfProdQty: ['', [Validators.required, Validators.pattern('[0-9]*')]],
            activePurchEscrowsQty: ['', [Validators.required, Validators.pattern('[0-9]*')]],
            activeListingsQty: ['', [Validators.required, Validators.pattern('[0-9]*')]],
            pendingListingsQty: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        },
{
            validators: [ConfirmedValidator('password', 'confirmPassword')]
        });
        const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#password');

        togglePassword?.addEventListener('click', () => {
            // toggle the type attribute
            const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
            password?.setAttribute('type', type);


            // toggle the icon
            togglePassword.classList.toggle('icon-eye-slash');
        });
    }



    onSubmit() {

    }

    get f() {
        return this.regForm.controls;
    }
}
