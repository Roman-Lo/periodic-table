import { Component, OnInit, Input } from '@angular/core';
import { PeriodicTableElementService } from '../../services/periodic-table-element/periodic-table-element.service';
import {
  PeriodicTable,
  PeriodicTableRow,
  PeriodicTableCell,
  PeriodicTableElement,
  PeriodicTableColumnNames,
  ColHeadAtomNumbers,
  ElementGroupBlock
} from '../../services/periodic-table-element/periodic-table.model';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit {

  @Input() showColumnHeader = false;

  table: PeriodicTable;

  constructor(
    private elementService: PeriodicTableElementService
  ) { }

  ngOnInit() {
    this.buildPeriodicTable();
  }

  private buildPeriodicTable() {
    const eles = this.elementService.getElements();
    const laEles = eles.splice(eles.findIndex(x => x.atomicNumber === 57), 15);
    const acEles = eles.splice(eles.findIndex(x => x.atomicNumber === 89), 15);
    const mainRows = new Array<PeriodicTableRow>(0);
    const lanthanoidSeries = this.buildRow(0, 'Lanthanoid Series');
    const actinoidSeries = this.buildRow(0, 'Actinoid Series');

    let rowNum = 1;
    let curRow = this.buildRow(rowNum);
    eles.forEach(e => {
      const atomicNum = e.atomicNumber;
      let cell: PeriodicTableCell;
      cell = this.buildCell(curRow.cols.length + 1, null, e);
      if (ColHeadAtomNumbers.indexOf(atomicNum) >= 0) {
        cell.header = PeriodicTableColumnNames[curRow.cols.length];
      }
      if (atomicNum === 1) { // row1
        curRow.cols.push(cell);
        this.fillEmptyElement(curRow, 16);
      } else if (atomicNum === 4 || atomicNum === 12) { // row 2, row 3
        curRow.cols.push(cell);
        this.fillEmptyElement(curRow, 10);
      } else if (atomicNum === 56 || atomicNum === 88) { // la, ac
        curRow.cols.push(cell);
        // build blank element
        const el = new PeriodicTableElement();
        el.symbol = `${atomicNum + 1}-${atomicNum + 15}`;
        el.groupBlock = atomicNum === 56 ? ElementGroupBlock.Lanthanoid : ElementGroupBlock.Actinoid;
        el.blankElement = true;
        const cell2 = this.buildCell(curRow.cols.length + 1, null, el);
        curRow.cols.push(cell2);
      } else {
        curRow.cols.push(cell);
      }
      if (curRow.cols.length === 18) {
        mainRows.push(curRow);
        rowNum++;
        curRow = this.buildRow(rowNum); // next row
      }
    });

    laEles.forEach(e => {
      const cell = this.buildCell(curRow.cols.length + 1, null, e);
      lanthanoidSeries.cols.push(cell);
    });

    acEles.forEach(e => {
      const cell = this.buildCell(curRow.cols.length + 1, null, e);
      actinoidSeries.cols.push(cell);
    });

    if (curRow.cols.length > 0) {
      mainRows.push(curRow);
    }

    this.table = new PeriodicTable();
    this.table.mainRows = mainRows;
    this.table.lanthanoidSeries = lanthanoidSeries;
    this.table.actinoidSeries = actinoidSeries;
    console.log(this.table);
  }

  private buildCell(
    colnum: number,
    header: string,
    ele: PeriodicTableElement
  ): PeriodicTableCell {
    const cell = new PeriodicTableCell();
    cell.colnum = colnum;
    cell.header = header;
    cell.ele = ele;
    return cell;
  }

  private buildRow(rownum: number, header: string = null): PeriodicTableRow {
    const row = new PeriodicTableRow();
    row.rownum = rownum;
    row.header = header;
    row.cols = new Array<PeriodicTableCell>();
    return row;
  }

  private fillEmptyElement(row: PeriodicTableRow, cnt: number) {
    const len = row.cols.length;
    for (let i = 0; i < cnt; i++) {
      row.cols.push({
        colnum: len + i,
        header: null,
        ele: null,
      });
    }
  }

}
