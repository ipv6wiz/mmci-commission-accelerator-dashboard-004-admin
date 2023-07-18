// angular import
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {AuthenticationService} from "../../../../theme/shared/service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SharedModule} from "../../../../theme/shared/shared.module";
import {DreLookupService} from "../../../../theme/shared/service/dre-lookup.service";
import {parse} from 'angular-html-parser';
import {DOMParser} from '@xmldom/xmldom'
import {forEach} from "lodash";

@Component({
  selector: 'app-auth-signup-v2',
  standalone: true,
    imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './auth-signup-v2.component.html',
  styleUrls: ['./auth-signup-v2.component.scss']
})
export default class AuthSignupV2Component implements OnInit{
    signupForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    alertType = '';
    alertMsg = '';
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService,
        private dre: DreLookupService
    ) {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['dashboard/analytics']);
        }
    }

    ngOnInit(){
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            dreNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        });
        const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#password');

        togglePassword?.addEventListener('click', () => {
            // toggle the type attribute
            const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
            password?.setAttribute('type', type);


            // toggle the icon
            togglePassword.classList.toggle('icon-eye-off');
        });
    }

    get f() {
        return this.signupForm.controls;
    }

    submit() {
        const createAccount = true;
        let agentData: any = [];
        this.submitted = true;
        if (this.signupForm.invalid) {
            return;
        }
        this.error = '';
        this.alertMsg = '';
        this.loading = true;
        this.dre.checkLicense(this.f?.['dreNumber']?.value).subscribe((result: any) => {
            const {statusCode, data} = result;
            console.log ('statusCode: ', statusCode);
            if (statusCode === 200) {
                agentData = this.extractLicenseData(data);
                console.log('agentData: ', agentData);
                if(createAccount) {
                    this.authService.signUpNewUser({email: this.f?.['email']?.value, password: this.f?.['password']?.value})
                        .then(() => {})
                        .catch((err) => {
                            throw new Error(err.message);
                        })
                }
            } else {
                throw new Error('No matching DRE record found');
            }
        });


    }

    extractLicenseData(data: string) {
        const parser = new DOMParser();
        const tableData = data.substring(data.indexOf('<table'), data.indexOf('</table>')+8);
        const fixedData = tableData
            .replaceAll('<A HREF = "/static/licstatus.htm">', '')
            .replaceAll('<A HREF = "/static/xplndate.htm">', '')
            .replaceAll('<A HREF = "/static/lic_comment.htm">', '')
            .replaceAll('</A>', '')
            .replaceAll('<FONT FACE="Arial,Helvetica" size=2>', '')
            .replaceAll('<strong>', '')
            .replaceAll('</strong>', '')
            .replaceAll('<font>', '')
            .replaceAll('</font>', '')
            .replaceAll('>>>>', '')
            .replaceAll('<<<<', '')
            .replaceAll('<br/>', ' ');
        // console.log('fixedData: ', fixedData);
        const agentData = [];
        const licDoc = parser.parseFromString(fixedData);
        const tableCollection = licDoc.getElementsByTagName('table');
        const table = tableCollection[0];
        const rows = table.getElementsByTagName('tr');
        // console.log('Rows: ', rows);
        let prevKey = '';
        for (let rowsKey in rows) {
            const row = rows[rowsKey];
            // console.log('Row: ', row);
            // console.log('Row nodeName: ', row.nodeName);

            if(row.nodeName === 'tr') {
                const cols = row.getElementsByTagName('td');
                let dataArray = [];
                for(let colsKey in cols) {
                    let col = cols[colsKey]
                    if(col.nodeName === 'td') {
                        // console.log('Col: ', col.textContent);
                        let textContent = col.textContent?.trim();
                        if(textContent === 'Former Responsible Broker:' || textContent === 'Comment:') {
                            prevKey = textContent;
                            // console.log('prevKey: ', prevKey);
                        }
                        if (textContent === '' || textContent === null || textContent?.length === 0) {
                            // console.log('prevKey (after check): ', prevKey);
                            dataArray.push(prevKey)
                        } else {
                            dataArray.push( textContent);
                        }
                    }
                }
                agentData.push({key: dataArray[0], value: dataArray[1]});
                dataArray = [];
            }
        }
        return agentData;
    }
}
