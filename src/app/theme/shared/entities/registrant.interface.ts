import {Address} from "./address.interface";
import {Brokerage} from "./brokerage.interface";
import {AgentPerformance} from "./agent-performance.interface";
import {RegistrantSteps} from "./registrant-steps.interface";


export interface Registrant {
    uid: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dreNumber: string;
    dreState: string;
    cellPhone: string;
    homeAddress: Address;
    brokerage: Brokerage;
    performance: AgentPerformance;
    regSteps: RegistrantSteps;
}
