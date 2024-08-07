export interface AdvanceWorkflowDialogConfigEntity {
  key: string; // key
  kanbanColumnLabel: string; // value
  kanbanColumnIcon: string; // DisplayValue
  dialogAcceptButtonText: string; // description
  data?: any; // data - should be JSON but could be plain text
}
