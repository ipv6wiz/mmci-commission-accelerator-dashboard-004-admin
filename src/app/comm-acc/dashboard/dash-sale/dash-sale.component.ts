// Angular Import
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexGrid,
  ApexPlotOptions,
  ApexTooltip,
  ApexTheme,
  ApexResponsive
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
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
  theme: ApexTheme;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-dash-sale',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './dash-sale.component.html',
  styleUrls: ['./dash-sale.component.scss']
})
export default class DashSaleComponent {
  // public props
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;
  chartOptions_1!: Partial<ChartOptions>;

  // constructor
  constructor() {
    this.chartOptions = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      stroke: {
        width: [0, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      colors: ['#4099ff', '#2ed8b6'],
      series: [
        {
          name: 'Facebook',
          type: 'column',
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
          name: 'Dribbble',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }
      ],
      fill: {
        opacity: [0.85, 1]
      },
      labels: [
        '01/01/2003',
        '02/01/2003',
        '03/01/2003',
        '04/01/2003',
        '05/01/2003',
        '06/01/2003',
        '07/01/2003',
        '08/01/2003',
        '09/01/2003',
        '10/01/2003',
        '11/01/2003'
      ],
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y) => {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + ' views';
            }
            return y;
          }
        }
      },
      legend: {
        labels: {
          useSeriesColors: true
        },
        markers: {
          // customHTML: [() => '', () => '']
        }
      }
    };
    this.chartOptions_1 = {
      chart: {
        height: 260,
        type: 'pie'
      },
      series: [66, 50, 40, 30],
      labels: ['extremely Satisfied', 'Satisfied', 'Poor', 'Very Poor'],
      legend: {
        show: true,
        offsetY: 50
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false
        }
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#4099ff'
        }
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 320
            },
            legend: {
              position: 'bottom',
              offsetY: 0
            }
          }
        }
      ]
    };
  }

  // public method
  cards = [
    {
      background: 'bg-c-red',
      title: 'Total Profit',
      amount: '$1,783',
      icon: 'fas fa-money-bill-alt'
    },
    {
      background: 'bg-c-blue',
      title: 'Total Orders',
      amount: '15,830',
      icon: 'fas fa-database'
    },
    {
      background: 'bg-c-green',
      title: 'Average Price',
      amount: '$6,780',
      icon: 'fas fa-dollar-sign'
    },
    {
      background: 'bg-c-yellow',
      title: 'Product Sold',
      amount: '6,784',
      icon: 'fas fa-tags'
    }
  ];

  feeds = [
    {
      icon: 'icon-bell badge-light-primary',
      title: 'You have 3 pending tasks.',
      time: 'Just Now'
    },
    {
      icon: ' icon-shopping-cart badge-light-danger',
      title: 'New order received',
      time: '30 min ago'
    },
    {
      icon: 'icon-file-text badge-light-success',
      title: 'You have 3 pending tasks.',
      time: 'Just Now'
    },
    {
      icon: 'icon-bell badge-light-primary',
      title: 'You have 4 tasks Done.',
      time: '1 hours ago'
    },
    {
      icon: 'icon-file-text badge-light-success',
      title: 'You have 2 pending tasks.',
      time: 'Just Now'
    },
    {
      icon: 'icon-shopping-cart badge-light-danger',
      title: 'New order received.',
      time: '1 hours ago'
    },
    {
      icon: ' icon-shopping-cart badge-light-danger',
      title: 'New order Done',
      time: 'Just Now'
    },
    {
      icon: 'icon-file-text badge-light-success',
      title: 'You have 5 pending tasks.',
      time: '5 hours ago'
    },
    {
      icon: 'icon-bell badge-light-primary',
      title: 'You have 4 tasks Done.',
      time: '2 hours ago'
    }
  ];

  new_product = [
    {
      src: 'assets/images/widget/p1.jpg',
      name: 'HeadPhone',
      status: 'Pending',
      background: 'badge-light-warning',
      price: '$10'
    },
    {
      src: 'assets/images/widget/p2.jpg',
      name: 'Iphone 6',
      status: 'Cancel',
      background: 'badge-light-danger',
      price: '$20'
    },
    {
      src: 'assets/images/widget/p3.jpg',
      name: 'Jacket',
      status: 'Success',
      background: 'badge-light-success',
      price: '$35'
    },
    {
      src: 'assets/images/widget/p4.jpg',
      name: 'Sofa',
      status: 'Cancel',
      background: 'badge-light-danger',
      price: '$85'
    },
    {
      src: 'assets/images/widget/p2.jpg',
      name: 'Iphone 6',
      status: 'Success',
      background: 'badge-light-success',
      price: '$20'
    },
    {
      src: 'assets/images/widget/p3.jpg',
      name: 'HeadPhone',
      status: 'Pending',
      background: 'badge-light-warning',
      price: '$50'
    },
    {
      src: 'assets/images/widget/p1.jpg',
      name: 'Jacket',
      status: 'Success',
      background: 'badge-light-success',
      price: '$35'
    }
  ];
}
