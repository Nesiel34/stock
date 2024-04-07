import { Component, OnInit, inject } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DiffChange, IStock } from '../../shared/interface/IStock.interface';
import { ITableColumns } from '../../shared/interface/ITableColumns.interface';
import { DatePipe, PercentPipe } from '@angular/common';
import * as XLSX from 'xlsx';
import {MatIconButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ApiService } from '../api.service';




@Component({
  selector: 'app-stock-table',
  standalone: true,
  imports: [MatTableModule,PercentPipe,MatIconModule,MatIconButton,MatTooltipModule,DatePipe],
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.scss'
})
export class StockTableComponent implements OnInit{

  diffChange = DiffChange;//enum of the diff change
  dataSource = new MatTableDataSource<IStock>();
  apiService:ApiService = inject(ApiService);
  tableColumns: ITableColumns[]=[//the columns of the table
    {key: 'stockId', title: 'מספר נייר'},
    {key: 'stockName', title: 'שם נייר'},
    {key: 'basePrice', title: 'מחיר בסיס'},
    {key: 'bidQty', title: 'כמות היצע'},
    {key: 'bidPrice', title: 'מחיר היצע'},
    {key: 'bidTotal', title: 'סה"כ היצע'},
    {key: 'askQty', title: 'כמות ביקוש'},
    {key: 'askPrice', title: 'מחיר ביקוש'},
    {key: 'askTotal', title: 'סה"כ ביקוש'},
    {key: 'lastPrice', title: 'מחיר אחרון'},
    {key: 'diff', title: 'שינוי באחוזים'},
    {key: 'lastUpdateTime', title: 'שעת עדכון'}
  ];
  displayedColumns: string[] = this.tableColumns.map(column => column.key);//the columns that will be displayed
  ngOnInit(): void {
    this.getStock();
    setInterval(()=>{
      let stocksToUpdate =  this.selectStockToUpdate();
      this.updateStock(stocksToUpdate);
    }, 5000);//get the data every 5 seconds
  }

  getStock(){
    this.apiService.getStock().subscribe((data)=>{//get the data from the api
      this.dataSource.data = data.map((stock)=>{
        return this.CalcFields(stock);
      });
    });
  }

  checkDiffChange(stock:IStock){//check if the diff is up or down
    if(this.dataSource.data.length === 0){
      return DiffChange.none;
    }
    else{
      let stockPrev = this.dataSource.data.find((s)=>s.stockId === stock.stockId);//find the previous stock
      if(stockPrev){
        if(stock.lastPrice === stockPrev.lastPrice){//if the price is the same
          return DiffChange.none;
        }
        else if(stock.lastPrice > stockPrev.lastPrice){//if the price is up
          return DiffChange.up;
        }
        else{
          return DiffChange.down;//if the price is down
        }
      }
      else {
        return DiffChange.none;
      }
    }
  }

  selectStockToUpdate(){
    // Use the random number for further processing
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    let shuffle =  this.shuffle();
    console.log(shuffle.slice(0, randomNumber));
    return shuffle.slice(0, randomNumber);
  }

  shuffle(){//suffle the data
    return [...this.dataSource.data].sort(()=> Math.random() - 0.5);
  }

  updateStock(stocks:IStock[]){//update the stock
    this.apiService.updateStock(stocks).subscribe((data)=>{
      this.dataSource.data = [...this.dataSource.data.map((stock)=>{
        return {
          ...stock,
          diffChange :this.diffChange.none//change the diff change to none,only news stocks will have diff change
        }
        })];
      data.map((stock)=>{
        let indexToUpdate = this.dataSource.data.findIndex((s)=>{
          return s.stockId === stock.stockId;
      });
      this.dataSource.data[indexToUpdate] = this.CalcFields(stock);
    });
    this.dataSource.data = [...this.dataSource.data];
  });
}

  CalcFields(stock:IStock){//calculate the fields
    return {
      ...stock,
      bidTotal: stock.bidPrice * stock.bidQty,
      askTotal: stock.askPrice * stock.askQty,
      diff: ((stock.lastPrice - stock.basePrice) / stock.basePrice) * 100,
      diffChange: this.checkDiffChange(stock)
    }
  }


  exportToXls(){//export the data to excel
    let exportToExcel = [...this.dataSource.data].map((stock)=>{
      return {//change the key to the name of the column
        'מספר נייר': stock.stockId,
        'שם נייר': stock.stockName,
        'מחיר בסיס': stock.basePrice,
        'כמות היצע': stock.bidQty,
        'מחיר היצע': stock.bidPrice,
        'סה"כ היצע': stock.bidTotal,
        'כמות ביקוש': stock.askQty,
        'מחיר ביקוש': stock.askPrice,
        'סה"כ ביקוש': stock.askTotal,
        'מחיר אחרון': stock.lastPrice,
        'שינוי באחוזים': new PercentPipe('en').transform(stock.diff, '1.2-2'),
        'שעת עדכון':new DatePipe('en').transform(stock.lastUpdateTime, 'yyyy-MM-dd HH:mm:ss')
      };
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportToExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'output.xlsx');
  }

}
