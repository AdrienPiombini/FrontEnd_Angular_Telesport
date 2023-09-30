import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'd3';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ChartPie } from '../models/ChartPie';
import { Olympic } from '../models/Olympic';


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics: Olympic[] = []
  private olympic!: Olympic;
  private olympics$ = new BehaviorSubject<Olympic[]>(this.olympics);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
       // this.olympics$.next();
        return caught;
      })
    );
  }

  getOlympicsAsObservable() {
    return this.olympics$.asObservable()
  }


}
