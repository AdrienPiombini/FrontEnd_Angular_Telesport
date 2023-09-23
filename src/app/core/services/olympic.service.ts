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
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympicsAsObservable() {
    return this.olympics$.asObservable()
  }

  getOlympics(){
    return this.olympics
  }

  setOlympics(olympics:Olympic[]){
    this.olympics = olympics
  }

  retrieveOlympicByName(olympicName:string):void{
    for( let i in this.olympics){
      if(this.olympics[i].country == olympicName){
        //console.log(this.olympics[i])
        this.olympic = this.olympics[i]
      }
    }
  }

  getOlympic(){
    return this.olympic
  }

  setOlympic(country:Olympic){
    this.olympic =  country
  }


}
