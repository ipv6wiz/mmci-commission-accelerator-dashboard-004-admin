import {WorkflowStep} from "./workflow-step.interface";

export interface RegistrantSteps {
    steps: [{step: WorkflowStep, nextStep: number, prevStep: number, status: {current: boolean; completed: boolean; pending: boolean; approved: boolean}}]
}
