import { ColumnsModel } from '@syncfusion/ej2-angular-kanban';
import { AdvanceWorkflowDialogConfigEntity } from '../entities/advance-workflow-dialog-config.entity';

export interface AdvanceStatusConfigDto {
  columnsList: ColumnsModel[];
  advanceOptionsItems: Map<string, AdvanceWorkflowDialogConfigEntity>;
  colMatIcons: string[];
}
