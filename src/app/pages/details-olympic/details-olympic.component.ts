import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Observable, filter, of, partition } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { ChartLine } from 'src/app/core/models/ChartLine';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicsMedals } from 'src/app/core/models/OlympicsMedals';
import { ActivatedRoute } from '@angular/router';
import { ChartPie } from 'src/app/core/models/ChartPie';

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
  xAxisLabel: string = 'Dates';
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



  public formatedOlympics: ChartLine[] = [];
  public olympicsMedals!: OlympicsMedals[];
  public olympicId!:number;
  public totalParticipation!:number;
  public totalMedals!:number;
  public totalAthletes!: number;

 
  constructor(private olympicService: OlympicService, private route:ActivatedRoute){}
  
  ngOnInit(): void {
    this.olympicId = +this.route.snapshot.params['id']
    this.olympicService.getOlympicsAsObservable().subscribe(
      olympics =>{
        const olympic = olympics.find((olympic:any) =>  {
          return olympic.id == this.olympicId
        })

        this.olympicsMedals = olympic.participations.map((participations:any) => {
          this.totalMedals += participations.medalsCount
          this.totalAthletes += participations.athleteCount
          return {name:participations.year, value:participations.medalsCount}
        })
        this.totalParticipation = olympic.participations.length
        this.formatedOlympics = [{name:olympic.country, series:this.olympicsMedals}]
      }
    )
  }
  

}
