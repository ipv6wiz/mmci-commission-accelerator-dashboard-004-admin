export interface AdvanceEscrowDto {
    escrowCompany: string;
    escrowOfficer: string;
    escrowPhone: string;
    escrowEmail: string;
    escrowTransactionNumber: string;
    estimatedClosingDate: string; // ISO format date
    actualClosingDate: string; // ISO format date
}
