import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Coffee } from '../Models/coffee';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://random-data-api.com/api/coffee/random_coffee';
  constructor(private http: HttpClient) {}

  getCoffees(): Observable<ReadonlyArray<Coffee>> {
    return this.http
      .get<ReadonlyArray<Coffee>>(this.url, {
        params: new HttpParams().set('size', 50),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
