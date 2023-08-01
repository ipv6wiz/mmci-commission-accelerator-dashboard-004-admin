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
    private spec: string = `{
    "openapi": "3.0.0",
    "paths": {
        "/api/v1": {
            "get": {
                "operationId": "AppController_getHello",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/welcome": {
            "get": {
                "operationId": "AppController_getWelcome",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/bucket/list/raw/{bucket}": {
            "get": {
                "operationId": "BucketController_getRawItems",
                "parameters": [
                    {
                        "name": "bucket",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/bucket/list/small/{bucket}": {
            "get": {
                "operationId": "BucketController_getSmallItems",
                "parameters": [
                    {
                        "name": "bucket",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/bucket/download/file/{bucket}/{folder}/{file}": {
            "get": {
                "operationId": "BucketController_downloadFile",
                "parameters": [
                    {
                        "name": "bucket",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "file",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "folder",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/bucket/create/{bucket}": {
            "post": {
                "operationId": "BucketController_createBucket",
                "parameters": [
                    {
                        "name": "bucket",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/bucket/upload/file/{bucket}/{folder}": {
            "post": {
                "operationId": "BucketController_uploadFile",
                "parameters": [
                    {
                        "name": "folder",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "bucket",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/bucket/upload/files/{bucket}/{folder}": {
            "post": {
                "operationId": "BucketController_uploadFiles",
                "parameters": [
                    {
                        "name": "folder",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "bucket",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/users": {
            "post": {
                "operationId": "UsersController_createUser",
                "parameters": [],
                "responses": {
                    "201": {
                        "description": ""
                    }
                }
            },
            "get": {
                "operationId": "UsersController_getAllUsers",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/users/user/{uid}": {
            "get": {
                "operationId": "UsersController_getUser",
                "parameters": [
                    {
                        "name": "uid",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/clients/dg": {
            "get": {
                "operationId": "ClientsController_getAllClients",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/clients/verify/{clientId}": {
            "get": {
                "operationId": "ClientsController_getOne",
                "parameters": [
                    {
                        "name": "clientId",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/logit": {
            "post": {
                "operationId": "LogsController_logIt",
                "parameters": [],
                "responses": {
                    "201": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/addr-verify": {
            "post": {
                "operationId": "AddrVerifyController_verifyAddr",
                "parameters": [],
                "responses": {
                    "201": {
                        "description": ""
                    }
                }
            }
        },
        "/api/v1/dre/{dreNumber}": {
            "get": {
                "operationId": "DreController_verifyDreNumber",
                "parameters": [
                    {
                        "name": "dreNumber",
                        "required": true,
                        "in": "path",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "info": {
        "title": "Commission Accelerator API",
        "description": "API to handle features requiring admin guard",
        "version": "0.0.83",
        "contact": {}
    },
    "tags": [
        {
            "name": "general",
            "description": ""
        }
    ],
    "servers": [],
    "components": {
        "schemas": {}
    }
}`;
    constructor() {}

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.swaggerDom.nativeElement.innerText = 'Dummy data';


        const swagConfig: SwaggerUIOptions = {
            spec: JSON.parse(this.spec),
            urls: [
                {
                    name: 'Commission Accelerator API',
                    url: `${this.apiUrl}api-docs-json`
                }
            ],
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
