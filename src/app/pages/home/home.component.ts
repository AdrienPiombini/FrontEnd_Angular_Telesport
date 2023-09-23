import { Component, OnInit } from '@angular/core';
import { Observable, Subject, filter, interval, map, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { ChartOptions } from 'chart.js';
import { ChartPie } from 'src/app/core/models/ChartPie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public olympics$: Observable<Olympic[]> = of([]);
  public olympics: Olympic[] = []
  public formatedOlympics: ChartPie[] = []
  public country!: Olympic;
  public participation!: Participation[]
  
  view: [number, number] = [800, 500];
  colorScheme: Color = { 
    domain: ['#647c8a',
      '#3f51b5',
      '#2196f3',
      '#00b862',
      '#afdf0a',
      '#a7b61a',
      '#f3e562',
    ], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
};

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics()
    this.olympics$.pipe(
      filter(value => Array.isArray(value))
    ).subscribe(value =>{      
      this.formatedOlympics = value.map((olympic) => {
        this.olympics.push(olympic)
        return {name:olympic.country, value: olympic.participations.length}
      })
    })
  }


  select(country:Olympic){
    this.country = country
    this.participation = country.participations    
  }


  onSelect(data:ChartPie): void {
    for( let i in this.olympics){
      if(this.olympics[i].country == data.name){
        this.country = this.olympics[i]
      }
      this.router.navigateByUrl('details')
    }
    
  }

  onActivate(data:any): void {
   // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
