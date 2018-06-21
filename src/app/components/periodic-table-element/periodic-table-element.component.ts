import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PeriodicTableCell } from '../../services/periodic-table-element/periodic-table.model';

@Component({
  selector: 'app-periodic-table-element',
  templateUrl: './periodic-table-element.component.html',
  styleUrls: ['./periodic-table-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodicTableElementComponent implements OnInit {

  @Input() cell: PeriodicTableCell;

  @Input() displayHeader: boolean;

  constructor() { }

  ngOnInit() {
  }

  get groupBlock(): string {
    if (this.cell.ele) {
      return this.cell.ele.groupBlock.toString();
    }
    return 'none';
  }

}
