import { Component } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details-olympic',
  templateUrl: './details-olympic.component.html',
  styleUrls: ['./details-olympic.component.scss']
})
export class DetailsOlympicComponent {
  public country!:Olympic
  constructor(private olympicService: OlympicService){}
}
