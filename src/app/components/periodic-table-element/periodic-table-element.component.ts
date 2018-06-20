import { Component, OnInit, Input } from '@angular/core';
import { PeriodicTableCell } from '../../services/periodic-table-element/periodic-table.model';

@Component({
  selector: 'app-periodic-table-element',
  templateUrl: './periodic-table-element.component.html',
  styleUrls: ['./periodic-table-element.component.scss']
})
export class PeriodicTableElementComponent implements OnInit {

  @Input() cell: PeriodicTableCell;

  @Input() displayHeader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
