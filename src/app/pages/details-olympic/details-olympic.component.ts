import { Component, OnDestroy, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

import { Olympic } from 'src/app/core/models/Olympic';
import { ChartLine } from 'src/app/core/models/ChartLine';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { FormatedParticipation } from 'src/app/core/models/FormatedParticipation';
import { ActivatedRoute, Router } from '@angular/router';
import { Participation } from 'src/app/core/models/Participation';
import { Subscription } from 'rxjs';
import { ChartGraphFactory } from 'src/app/core/services/chartGraphFactory';


@Component({
  selector: 'app-details-olympic',
  templateUrl: './details-olympic.component.html', 
  styleUrls: ['./details-olympic.component.scss']
})
export class DetailsOlympicComponent implements OnInit, OnDestroy{

  formatedOlympics: ChartLine[] = [];
  formatedParticipation!: FormatedParticipation[];
  olympicId: number = 0;
  totalParticipations: number = 0
  totalMedals: number = 0
  totalAthletes: number = 0
  olympic: Olympic | undefined;
  olympicSubscription!:Subscription;
  chartGraphFactory:ChartGraphFactory

  constructor(private olympicService: OlympicService, private route:ActivatedRoute, private router:Router){
    this.chartGraphFactory =  new ChartGraphFactory()
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe()
  }
  
  ngOnInit(): void {
    this.olympicId = +this.route.snapshot.params['id']
    this.olympicSubscription = this.olympicService.getOlympicsAsObservable().subscribe(
      olympics =>{
        this.olympic = olympics.find((olympic:Olympic) =>  {
           return  olympic.id == this.olympicId 
        })
        if(this.olympic){
          const participations: Participation[] = this.olympic.participations
          this.formatedParticipation = this.retrieveFormatedParticipation(participations)
          this.totalAthletes = this.retrieveTotalNumberOfAthletes(participations)
          this.totalMedals = this.retrieveTotalNumberOfMedals(participations)
          this.totalParticipations = participations.length
          this.formatedOlympics = [{name:this.olympic.country, series:this.formatedParticipation}]
        }
      }
    )
  }


  retrieveFormatedParticipation(participations:Participation[]): FormatedParticipation[]{
    const formatedParticipation = participations.map((participations:Participation) => {
      return {name:participations.year, value:participations.medalsCount};
    }) 
    return formatedParticipation;
  }

  retrieveTotalNumberOfAthletes(participations:Participation[]): number {
    let totalNumberOfAthletes = 0;
    participations.map((participations:Participation) => {
      totalNumberOfAthletes += participations.athleteCount
    }) 
    return totalNumberOfAthletes;
  }
  
  retrieveTotalNumberOfMedals(participations: Participation[]): number{
    let totalNumberOfMedals = 0;
    participations.map((participations:Participation) => {
      totalNumberOfMedals += participations.medalsCount
    }) 
    return totalNumberOfMedals ;
  }


  
}

