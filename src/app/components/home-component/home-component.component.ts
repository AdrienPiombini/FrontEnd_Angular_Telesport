import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss'],
})
export class HomeComponentComponent {
  calculateNumberOfJOSince2012(): number {
    const date = new Date();
    return Math.floor((date.getFullYear() - 2012) / 4) + 1;
  }

  @Input()
  numberOfOlympic: number = 0;
}
