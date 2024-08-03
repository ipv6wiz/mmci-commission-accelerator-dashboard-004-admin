import {ClientContactDto} from "../dtos/client-contact.dto";
import {ClientDreInfoDto} from "../dtos/client-dre-info.dto";
import {AddressDto} from "../dtos/address.dto";
import {Brokerage} from "./brokerage.interface";
import {AgentPerformanceDto} from "../dtos/agent-performance.dto";
import { DocUploadInfoDto } from '../dtos/doc-upload-info.dto';

export class Registrant {
    uid: string = '';
    contactInfo!: ClientContactDto;
    dreInfo!: ClientDreInfoDto;
    homeAddress!: AddressDto;
    brokerageInfo!: Brokerage;
    performanceInfo!: AgentPerformanceDto;
    docUploadInfo!: DocUploadInfoDto;
    agentDreData: any;

    constructor() {}
}
