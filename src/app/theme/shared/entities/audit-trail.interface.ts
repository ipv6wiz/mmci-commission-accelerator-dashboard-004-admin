export interface AuditTrail {
  created: number; //date
  createdBy: string;
  updated?: number;
  updatedBy?: string;
  deleted?: number;
  deletedBy?: string;
}
