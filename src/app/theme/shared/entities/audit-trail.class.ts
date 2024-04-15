export class AuditTrail {
    private created!: number; // date created
    private createdBy!: string; // UUID of User or System
    private updated?: number; // Date updated
    private updatedBy?: string;
    private deleted?: number; // Date deleted
    private deletedBy?: string;
    private overridden?: number; // Date overridden
    private overriddenBy?: string;
    private approved?: number; // date approved
    private approvedBy?: string; // UUID of user who approved
    private rejected?: number; // date rejected
    private rejectedBy?: string; // UUID of user that rejected
    private archived?: number;
    private archivedBy?: string;

    constructor() {}

    setAuditTrailCreated(userId: string){
        this.created = Date.now();
        this.createdBy = userId; // actual userId or "SYSTEM"
    }

    loadAuditTrail(atObj: AuditTrail){
        Object.assign(this, atObj);
    }

    setAuditTrail(what: string, userId: string) {
        what = what.toLowerCase();
        const today = Date.now();
        userId = !!userId ? userId : 'SYSTEM';
        switch(what) {
            case 'create':
            case 'created':
                this.created = today;
                this.createdBy = userId; // actual userId or "SYSTEM"
                break;
            case 'update':
            case 'updated':
                this.updated = today;
                this.updatedBy = userId;
                break;
            case 'delete':
            case 'deleted':
                this.deleted = today;
                this.deletedBy = userId;
                break;
            case 'override':
            case 'overridden':
                this.overridden = today;
                this.overriddenBy = userId
                break;
            case 'approve':
            case 'approved':
                this.approved = today;
                this.approvedBy = userId;
                break;
            case 'reject':
            case 'rejected':
                this.rejected = today;
                this.rejectedBy = userId;
                break;
            case 'archive':
            case 'archived':
                this.archivedBy = userId;
                this.archived = today;
                break;
        }
    }
}
