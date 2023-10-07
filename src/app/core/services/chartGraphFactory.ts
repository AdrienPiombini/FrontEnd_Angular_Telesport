import { Color, LegendPosition, ScaleType } from "@swimlane/ngx-charts";


export class ChartGraphFactory {
    constructor(){}
    
  view: [number, number] = [700, 400];
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
  gradient: boolean = true;
  showLegend: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

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

onResize(event:any){
  this.view = [event.target.innerWidth / 1.35, 400]
}

}