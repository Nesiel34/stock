import { Component } from '@angular/core';
import { StockTableComponent } from './stock-table/stock-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StockTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

}
