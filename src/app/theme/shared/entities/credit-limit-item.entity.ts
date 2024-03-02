export class CreditLimitItemEntity {
    limit?: number; // dollar amount of limit
    activeDate?: number; // date limit becomes active
    setDate?: number; // date limit set
    setBy?: string; // userId
    active?: boolean; // Only one can be active at a time
}
