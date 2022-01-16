import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { fiat } from '../types/fiat.types';


@Injectable()
export class FiatService {
  private readonly url = `${environment.api}fiats`;

  constructor(private http: HttpClient) { }

  getFiats = (): Observable<fiat[]> => {
    return this.http.get<fiat[]>(`${this.url}`)
  }
}
