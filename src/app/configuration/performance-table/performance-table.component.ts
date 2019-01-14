import { Component, Input } from '@angular/core';

@Component({
  selector: 'performance-table',
  templateUrl: './performance-table.component.html',
  styleUrls: ['./performance-table.component.css']
})

export class PerformanceTableComponent {
  @Input() tableData: object;
  columnsToDisplay = ['RPM', 'Speed', 'Torque', 'Wattage'];
}
