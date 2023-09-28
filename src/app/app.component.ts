import { Component, OnInit } from '@angular/core';
import { Observable, Subject, filter, interval, map, of, take } from 'rxjs';

import { OlympicService } from './core/services/olympic.service';
import { __values } from 'tslib';
import { Olympic } from './core/models/Olympic';
import { ChartPie } from './core/models/ChartPie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public olympics: Olympic[] = []
  public formatedOlympics: ChartPie[] = []
  
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
   this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }

}
