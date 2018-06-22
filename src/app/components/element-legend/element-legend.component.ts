import { Component, OnInit, Input } from '@angular/core';
import { PeriodicTableElement, PeriodicTableCell } from '../../services/periodic-table-element/periodic-table.model';
import { PeriodicTableElementService } from '../../services/periodic-table-element/periodic-table-element.service';

@Component({
  selector: 'app-element-legend',
  templateUrl: './element-legend.component.html',
  styleUrls: ['./element-legend.component.scss']
})
export class ElementLegendComponent implements OnInit {

  @Input() elementCell: PeriodicTableCell;


  constructor(
    private elementService: PeriodicTableElementService
  ) { }

  ngOnInit() {
    if (!this.elementCell) {
      const ele = this.elementService.getElements().find(x => x.symbol === 'Cu');
      this.elementCell = new PeriodicTableCell();
      this.elementCell.colnum = 0;
      this.elementCell.ele = ele;
    }
  }

}
