import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, filter, interval, map, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { ChartOptions } from 'chart.js';
import { ChartPie } from 'src/app/core/models/ChartPie';
import { Router } from '@angular/router';
import { ChartGraphFactory } from 'src/app/core/services/chartGraphFactory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})


export class HomeComponent implements OnInit, OnDestroy {

  olympics$: Observable<Olympic[]> = of([]);
  olympics: Olympic[] = []
  formatedOlympics: ChartPie[] = []
  numberOfJoSince2012: number = 3
  olympicSubscription!:Subscription;
  chartGraphFactory: ChartGraphFactory;
  
  constructor(private olympicService: OlympicService, private router: Router) {
    this.chartGraphFactory = new ChartGraphFactory();
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympicsAsObservable()
    this.olympicSubscription = this.olympics$.pipe(
      filter(value => Array.isArray(value))
    ).subscribe(value =>{      
      this.formatedOlympics = value.map((olympic) => {
        this.olympics.push(olympic)
        return {name:olympic.country, value: olympic.participations.length}
      })
    })
   
    this.numberOfJoSince2012 = this.calculateNumberOfJOSince2012()
  }

  calculateNumberOfJOSince2012():number{
    const date = new Date();
    return Math.floor((date.getFullYear() - 2012)/4) + 1
  }

  onSelect(data:ChartPie): void {
    this.olympics.find((olympic:Olympic) => {
      olympic.country == data.name
      this.router.navigateByUrl(`details/${olympic.id}`)
    })
  }
 
}
