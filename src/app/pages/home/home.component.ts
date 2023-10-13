import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartPie } from 'src/app/core/models/ChartPie';
import { Router } from '@angular/router';
import { ChartGraphFactory } from 'src/app/core/services/chartGraphFactory';
import { __values } from 'tslib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  olympics$: Observable<Olympic[]> = of([]);
  olympics: Olympic[] = [];
  formatedOlympics: ChartPie[] = [];
  olympicSubscription!: Subscription;
  chartGraphFactory: ChartGraphFactory;

  constructor(private olympicService: OlympicService, private router: Router) {
    this.chartGraphFactory = new ChartGraphFactory();
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympicsAsObservable();
    this.olympicSubscription = this.olympics$
      .pipe(filter((value) => Array.isArray(value)))
      .subscribe((value) => {
        this.formatedOlympics = value.map((olympic) => {
          this.olympics.push(olympic);
          return {
            name: olympic.country,
            value: olympic.participations.length,
          };
        });
      });
  }

  onSelect(data: ChartPie): void {
    const olympic = this.olympics.find((olympic: Olympic) => olympic.country === data.name);
    if (olympic) {
      this.router.navigateByUrl(`details/${olympic.id}`);
    }
  }
}
