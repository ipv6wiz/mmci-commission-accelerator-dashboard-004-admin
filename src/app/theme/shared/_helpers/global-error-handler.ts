import {ErrorHandler, Injectable} from "@angular/core";
import {ErrorObjInterface} from "../entities/error-obj.interface";
import {AlertService} from "../service/alert.service";
import {NGXLogger} from "ngx-logger";

//         {provide: ErrorHandler, useClass: GlobalErrorHandler},

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    constructor(private alertService: AlertService, private logger: NGXLogger) {
        super();
    }
    override handleError(error: Error) {
        const parts = error.message.split('::');
        let newMsg: string = '';
        let tmpMsg: string = '';
        let type: string = 'error';
        let group: string = '';
        let errObj: ErrorObjInterface = {} as ErrorObjInterface;
        if(parts.length > 1) {
            // For future use passing a JSON string as the Error Message
            if(parts[0] === 'json' && parts[1].indexOf('{') === 0) {
                errObj = JSON.parse(parts[1]);
                switch(errObj.code) {

                }
            }
        } else {
            let msg: string = error.message;
            // this.logger.log('Error handled - before - msg: ', msg);
            msg = msg.split('\n').shift() || msg;
            // this.logger.log('Error handled - msg: ', msg);

            newMsg = 'An error has occurred';
            const parts = msg.split(':');
            tmpMsg = parts.pop() || newMsg;
            // // this.logger.log('ErrorHandler - FirebaseError - tmpMsg: ', tmpMsg);
            const open = tmpMsg.indexOf('(');
            const close = tmpMsg.indexOf(')');
            if(open !== -1 && close !== -1){
                // // this.logger.log(`Open: ${open} close: ${close}`);

                const subMsg = tmpMsg.slice(open+1, close);
                // // this.logger.log('subMsg: ', subMsg);
                const msgParts = subMsg.split('/');
                // // this.logger.log('msgParts: ', msgParts);
                switch(msgParts[0]) {
                    case 'auth':
                        newMsg = this.processAuth(msgParts[1]);
                        break;
                    default:
                        newMsg = 'Unknown Error';
                        break;
                }

            } else if(!!msg) {
                newMsg = tmpMsg;
            }
            // // this.logger.log('Before Alert newMsg: ', newMsg);
            this.alertService.error(newMsg);
        }
    }

    processAuth(msg: string): string {
        // // this.logger.log('processAuth - msg: ', msg);
        let newMsg: string = '';
        switch (msg) {
            case 'user-not-found':
                newMsg = 'Contact the administrator to create an account'
                break;
            case 'wrong-password':
                newMsg = 'Password Invalid.';
                break;
            case 'too-many-requests':
                newMsg = 'Too many failed Login requests. Access to this account has been temporarily disabled';
                break;
            default:
                newMsg = msg;
                break;
        }
        // // this.logger.log('processAuth - newMsg: ', newMsg);
        return newMsg;
    }
}
