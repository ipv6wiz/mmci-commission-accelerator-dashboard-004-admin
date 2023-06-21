import {AuditTrail} from "./audit-trail.interface";
import {PubSchedule} from "./pub-schedule.interface";
export class Articles {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  content?: string;
  tags?: string[];
  status?: number;
  pubSchedule?: PubSchedule;
  auditTrail?: AuditTrail;
}
