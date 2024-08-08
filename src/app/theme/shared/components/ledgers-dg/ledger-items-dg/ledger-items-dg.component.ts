import { Component, Input } from '@angular/core';
import { LedgerItemEntity } from '../../../entities/ledger-item.entity';
import { LedgerEntity } from '../../../entities/ledger.entity';
import { User } from '../../../entities/user.interface';

@Component({
  selector: 'app-ledger-items-dg',
  standalone: true,
  imports: [],
  templateUrl: './ledger-items-dg.component.html',
  styleUrl: './ledger-items-dg.component.scss'
})
export class LedgerItemsDgComponent {
@Input() ledgerItems!: LedgerItemEntity[];
@Input() ledger!: LedgerEntity;
@Input() user!: User;
}
