import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../theme/shared/shared.module";
import SwaggerUI,  {SwaggerUIOptions } from 'swagger-ui';
import SwaggerUIStandalonePreset from 'swagger-ui';
// import {SwaggerConfigs, SwaggerUIBundle, SwaggerUIStandalonePreset} from 'swagger-ui-dist';
import {environment} from "../../../environments/environment";
@Component({
  selector: 'app-api-docs',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.scss']
})
export default class ApiDocsComponent implements OnInit, AfterViewInit {
    // @ts-ignore
    @ViewChild('swagger') swaggerDom: ElementRef<HTMLDivElement>
    private  apiUrl = environment.gcpCommAccApiUrl;
    title: string = 'Hello';
    constructor() {}

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.swaggerDom.nativeElement.innerText = 'Dummy data';


        const swagConfig: SwaggerUIOptions = {
            url: `${this.apiUrl}api-docs-json`,
            requestInterceptor: (request: any) => {
                console.log('request:'+JSON.stringify(request));
                let addAuth = (request['url'].indexOf('/login') == -1);
                const user = localStorage.getItem('user');
                console.log('requestInterceptor - user: ', user);
                if(user) {
                    let currentUser = JSON.parse(user);
                    if (currentUser && currentUser.idToken && addAuth) {
                        request['headers']['Authorization'] = 'Bearer ' + currentUser.idToken;
                    } else {
                        console.log("No localstorage");
                    }
                    console.log('request-modified:'+JSON.stringify(request));
                    request['headers']['Cache-Control'] = 'no-store no-cache';
                }
                return request;
            },
            responseInterceptor: (response: any) => {
                console.log('responseInterceptor - response: ', response);
                return response;
            },
            dom_id: 'swagger',
            domNode: this.swaggerDom.nativeElement,
            deepLinking: true,

            // presets: [
            //     // @ts-ignore
            //     SwaggerUI.presets.apis,
            //     SwaggerUIStandalonePreset
            // ],
            // plugins: [
            //     // @ts-ignore
            //     SwaggerUI.plugins.DownloadUrl
            // ],

        };
        console.log('ApiDocsComponent - ngAfterViewInit - swagConfig: ', JSON.stringify(swagConfig));
        SwaggerUI(swagConfig);
    }
}
