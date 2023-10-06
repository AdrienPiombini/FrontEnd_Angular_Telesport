import { Component, OnDestroy, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { ChartLine } from 'src/app/core/models/ChartLine';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { FormatedParticipation } from 'src/app/core/models/FormatedParticipation';
import { ActivatedRoute } from '@angular/router';
import { Participation } from 'src/app/core/models/Participation';
import { Subscription } from 'rxjs';
import { ChartGraphFactory } from 'src/app/core/services/chartGraphFactory';

@Component({
  selector: 'app-details-olympic',
  templateUrl: './details-olympic.component.html',
  styleUrls: ['./details-olympic.component.scss'],
})
export class DetailsOlympicComponent implements OnInit, OnDestroy {
  formatedOlympics: ChartLine[] = [];
  olympicId: number = 0;
  olympic: Olympic | undefined;
  olympicSubscription!: Subscription;
  chartGraphFactory: ChartGraphFactory;
  participations!: Participation[];

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {
    this.chartGraphFactory = new ChartGraphFactory();
  }

  ngOnDestroy(): void {
    this.olympicSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.olympicId = +this.route.snapshot.params['id'];
    this.olympicSubscription = this.olympicService
      .getOlympicsAsObservable()
      .subscribe((olympics) => {
        this.olympic = olympics.find((olympic: Olympic) => {
          return olympic.id == this.olympicId;
        });

        if (this.olympic) {
          this.participations = this.olympic.participations;
          this.formatedOlympics = [
            {
              name: this.olympic.country,
              series: this.retrieveFormatedParticipations(this.participations),
            },
          ];
        }
      });
  }

  retrieveFormatedParticipations(
    participations: Participation[]
  ): FormatedParticipation[] {
    const formatedParticipation = participations.map(
      (participations: Participation) => {
        return { name: participations.year, value: participations.medalsCount };
      }
    );
    return formatedParticipation;
  }
}
