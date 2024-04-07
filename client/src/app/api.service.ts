import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { IStock } from '../shared/interface/IStock.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpClient:HttpClient = inject(HttpClient);

  getStock(){
    return this.httpClient.get<IStock[]>(`${environment.baseUrl}/Stock`);
  }

  updateStock(stocks:IStock[]){
    return this.httpClient.put<IStock[]>(`${environment.baseUrl}/Stock`, stocks);
  }
}
