// angular import
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartDB } from 'src/app/fack-db/chartData';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexFill,
  ApexPlotOptions,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  fill: ApexFill;
};

@Component({
  selector: 'app-invoice-summary',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.scss']
})
export default class InvoiceSummaryComponent {
  // public props
  // eslint-disable-next-line
  chartDB: any;
  @ViewChild('chart') chart!: ChartComponent;
  bar1CAC!: Partial<ChartOptions>;

  constructor() {
    this.chartDB = ChartDB;
    this.bar1CAC = this.chartDB.bar1CAC;
  }
  // public method
  sales = [
    {
      duration: 'Today',
      amount: '$250.00',
      receipt: 'Otto',
      dues: '@mdo'
    },
    {
      duration: 'This Week',
      amount: '$380.00',
      receipt: 'Thornton',
      dues: '@fat'
    },
    {
      duration: 'This Month',
      amount: '$450.00',
      receipt: 'the Bird',
      dues: '@twitter'
    },
    {
      duration: 'This Year',
      amount: '$600.00',
      receipt: 'Thornton',
      dues: '@facebook'
    },
    {
      duration: 'Total',
      amount: '$600.00',
      receipt: 'the Bird',
      dues: '@google'
    }
  ];

  recent_orders = [
    {
      id: '1',
      no: '54822',
      name: 'Product 1',
      quantity: '2',
      price: '$99.00'
    },
    {
      id: '2',
      no: '54823',
      name: 'Product 2',
      quantity: '1',
      price: '$29.00'
    },
    {
      id: '3',
      no: '54824',
      name: 'Product 3',
      quantity: '3',
      price: '$109.00'
    }
  ];
}
