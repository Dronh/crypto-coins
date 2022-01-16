import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { coin } from '../types/coins.types';

@Injectable()
export class CoinsService {
  private readonly url = `${environment.api}coins`;

  constructor(private http: HttpClient) { }

  getAvgPrices = (skip: number, limit: number, fiatName: string): Observable<{ coins: coin[] }> => {
    return this.http.get<{ coins: coin[] }>(`${this.url}?skip=${skip}&limit=${limit}&currency=${fiatName}`)
  }
}
