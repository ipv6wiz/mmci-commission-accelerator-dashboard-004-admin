import { MailOutTemplateMessageEntity } from './mail-out-template-message.entity';

export interface MailOutWithTemplateEntity {
  to: string | string[];
  from?: string; // Defaults to Default From Address
  replyTo?: string; // Defaults to Default ReplyTo Address
  cc?: string[];
  bcc?: string[];
  headers?: any; // Object of Header: value
  messageId?: string;
  delivery?: any;
  template: MailOutTemplateMessageEntity
}
