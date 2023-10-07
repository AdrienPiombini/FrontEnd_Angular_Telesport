import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'd3';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ChartPie } from '../models/ChartPie';
import { Olympic } from '../models/Olympic';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics: Olympic[] = [];
  private olympic!: Olympic;
  private olympics$ = new BehaviorSubject<Olympic[]>(this.olympics);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        if (error) {
          return of(null);
        }
        return throwError(() => error);
      })
    );
  }

  getOlympicsAsObservable() {
    return this.olympics$.asObservable();
  }
}
