import { Component, OnInit } from '@angular/core';
import { ElementGroupBlock } from '../../services/periodic-table-element/periodic-table.model';

const GROUPBLOCK_INFO_LIST = Object.keys(ElementGroupBlock).reduce((accu, key: string) => {
  let temp = key;
  const matches = key.match(/[A-Z]/g);
  if (matches) {
    matches.forEach(k => {
      temp = temp.replace(k, ` ${k}`);
    });
  }
  accu.push({
    name: temp.trim(),
    key,
    value: ElementGroupBlock[key]
  });
  return accu;
}, []);

@Component({
  selector: 'app-periodic-table-legend',
  templateUrl: './periodic-table-legend.component.html',
  styleUrls: ['./periodic-table-legend.component.scss']
})
export class PeriodicTableLegendComponent implements OnInit {



  constructor() { }

  ngOnInit() {
    console.log(GROUPBLOCK_INFO_LIST);
  }

  get legends() {
    return GROUPBLOCK_INFO_LIST;
  }


}
