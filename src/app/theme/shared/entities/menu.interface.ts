import {AuditTrail} from "./audit-trail.interface";
import {PubSchedule} from "./articles.interface";

export interface Menu {
  id?: string;
  title?: string;
  type?: string; // flat, modal, dropdown
  target?: string;
  label?: string;
  url?: string;
  children?: Menu[];
  status: number;
  pubSchedule?: PubSchedule;
  auditTrail?: AuditTrail;
}
