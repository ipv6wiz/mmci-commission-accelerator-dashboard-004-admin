// Angular Import
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

//third party
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-crt-chart-js',
  standalone: true,
  imports: [CommonModule, SharedModule, NgChartsModule],
  templateUrl: './crt-chart-js.component.html',
  styleUrls: ['./crt-chart-js.component.scss']
})
export default class CrtChartJsComponent {
  //  props
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // line chart
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: '#4099ff',
        backgroundColor: '#4099ff'
      }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  lineChartLegend = true;

  // pie chart
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true
  };
  pieChartLabels = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  pieChartDatasets = [
    {
      data: [300, 500, 100],
      backgroundColor: ['#4caf50', '#FF9800', '#f44336'],
      hoverBackgroundColor: ['#4caf50', '#FF9800', '#f44336']
    }
  ];
  pieChartLegend = true;
  pieChartPlugins = [];

  // bar chart
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: '#4680ff' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', backgroundColor: '#0e9e4a' }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true
  };

  // Doughnut chart
  doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [350, 450, 100], label: 'Series A', backgroundColor: '#4caf50' },
    { data: [50, 150, 120], label: 'Series B', backgroundColor: '#FF9800' },
    { data: [250, 130, 70], label: 'Series C', backgroundColor: '#f44336' }
  ];

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true
  };

  // Radar Chart

  radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true
  };
  radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A', backgroundColor: '#72a5f2' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B', backgroundColor: '#8ef5b9' }
  ];

  // PolarArea
  polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  polarAreaChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] = [
    {
      data: [300, 500, 100, 40, 120],
      backgroundColor: ['#54e2b7', '#6e7ff3', '#f48fb1', '#7c4dff', '#2d0102'],
      borderColor: ['#beeddf', '#d3d6ed', '#f48fb1', '#7c4dff', '#2d0102']
    }
  ];
  polarAreaLegend = true;

  polarAreaOptions: ChartConfiguration<'polarArea'>['options'] = {
    responsive: true
  };

  // bubble chart
  bubbleChartOptions: ChartConfiguration<'bubble'>['options'] = {
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 30
      },
      y: {
        min: 0,
        max: 30
      }
    }
  };
  bubbleChartLegend = true;

  bubbleChartDatasets: ChartConfiguration<'bubble'>['data']['datasets'] = [
    {
      data: [
        { x: 10, y: 10, r: 10 },
        { x: 15, y: 5, r: 15 },
        { x: 26, y: 12, r: 23 },
        { x: 7, y: 8, r: 8 }
      ],
      label: 'Series A',
      backgroundColor: ['#54e2b7', '#6e7ff3', '#f48fb1', '#7c4dff']
    }
  ];

  // Scatter Chart

  scatterChartDatasets: ChartConfiguration<'scatter'>['data']['datasets'] = [
    {
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: -2 },
        { x: 4, y: 4 },
        { x: 5, y: -3 }
      ],
      label: 'Series A',
      pointRadius: 10,
      backgroundColor: ['#54e2b7', '#6e7ff3', '#f48fb1', '#7c4dff', '#2d0102']
    }
  ];

  scatterChartOptions: ChartConfiguration<'scatter'>['options'] = {
    responsive: true
  };

  // dynamic chart

  barChartOptions1: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: { display: true }
    }
  };
  barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType: ChartType = 'bar';

  barChartData1: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: '#4680ff' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', backgroundColor: '#0e9e4a' }
    ]
  };

  // events
  randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
