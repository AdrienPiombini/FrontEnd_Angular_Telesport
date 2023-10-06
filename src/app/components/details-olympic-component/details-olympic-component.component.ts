import { Component, Input } from '@angular/core';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-details-olympic-component',
  templateUrl: './details-olympic-component.component.html',
  styleUrls: ['./details-olympic-component.component.scss']
})
export class DetailsOlympicComponentComponent {

  @Input()
  countryName!:string;

  @Input()
  participations!:Participation[];

  retrieveTotalNumberOfAthletes(participations: Participation[]): number {
    let totalNumberOfAthletes = 0;
    participations.map((participations: Participation) => {
      totalNumberOfAthletes += participations.athleteCount;
    });
    return totalNumberOfAthletes;
  }

  retrieveTotalNumberOfMedals(participations: Participation[]): number {
    let totalNumberOfMedals = 0;
    participations.map((participations: Participation) => {
      totalNumberOfMedals += participations.medalsCount;
    });
    return totalNumberOfMedals;
  }
  

}
