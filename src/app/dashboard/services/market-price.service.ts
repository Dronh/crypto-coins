import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { marketPrice } from '../types/market-price.type';

@Injectable()
export class MarketPriceService {

  private readonly url = `${environment.api}markets`;

  constructor(private http: HttpClient) { }

  getMarkets = (coinId: string): Observable<marketPrice[]> => {
    return this.http.get<marketPrice[]>(`${this.url}?coinId=${coinId}`)
  }
}
