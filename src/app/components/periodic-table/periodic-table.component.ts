import { Component, OnInit } from '@angular/core';
import { PeriodicTableElementService } from '../../services/periodic-table-element/periodic-table-element.service';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit {

  constructor(
    private servie: PeriodicTableElementService
  ) { }

  ngOnInit() {
  }

}
