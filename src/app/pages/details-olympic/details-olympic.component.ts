import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Observable, filter, of, partition } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { ChartLine } from 'src/app/core/models/ChartLine';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicsMedals } from 'src/app/core/models/OlympicsMedals';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-olympic',
  templateUrl: './details-olympic.component.html',
  styleUrls: ['./details-olympic.component.scss']
})
export class DetailsOlympicComponent {
  public country!:Olympic

  view: [number, number] = [700, 300];



  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;

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

  public olympics$: Observable<Olympic[]> = of([]);
  public formatedOlympics: ChartLine[] = [];
  public olympicsMedals!: OlympicsMedals[];
  public result: ChartLine[] = [];
  public olympicName!:string;
  public unOlympic!:Olympic ;
  public tableauOlympic:Olympic[]  = [];
  public totalParticipation!:number;
  public totalMedals:number = 0
  public totalAthletes: number = 0

 
  constructor(private olympicService: OlympicService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.olympicName = this.route.snapshot.params['olympic']
    //this.olympicService.retrieveOlympicByName(this.olympicName)
   this.tableauOlympic.push(this.olympicService.getOlympic())
   this.formatedOlympics = this.tableauOlympic.map((olympic) => {
    this.olympicsMedals = olympic.participations.map((participations) => {
      this.totalMedals += participations.medalsCount
      this.totalAthletes += participations.athleteCount
      return {name:participations.year, value:participations.medalsCount}
    })
    this.totalParticipation = this.tableauOlympic[0].participations.length
    return {name:olympic.country, series:this.olympicsMedals}
  })
  }


}
