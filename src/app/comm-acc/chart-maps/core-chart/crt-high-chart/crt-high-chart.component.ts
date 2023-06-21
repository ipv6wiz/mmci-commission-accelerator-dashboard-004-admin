// Angular Import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { HighchartsChartModule } from 'highcharts-angular';

// third Import
import * as Highcharts from 'highcharts';
import HC_drilldown from 'highcharts/modules/drilldown';
HC_drilldown(Highcharts);
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

@Component({
  selector: 'app-crt-high-chart',
  standalone: true,
  imports: [CommonModule, SharedModule, HighchartsChartModule, HttpClientModule],
  templateUrl: './crt-high-chart.component.html',
  styleUrls: ['./crt-high-chart.component.scss']
})
export default class CrtHighChartComponent {
  // public props
  Highcharts: typeof Highcharts = Highcharts;

  // private Method
  lineBasicChartOptions: Highcharts.Options = {
    colors: ['#673ab7', '#2196f3', '#20c997'],
    title: {
      text: 'Solar Employment Growth by Sector, 2010-2017'
    },
    subtitle: {
      text: 'Source: thesolarfoundation.com'
    },
    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    series: [
      {
        type: 'spline',
        name: 'Installation',
        data: [5, 25, 15, 35, 25, 35, 45, 75]
      },
      {
        type: 'spline',
        name: 'Manufacturing',
        data: [25, 35, 45, 75, 5, 25, 15, 35]
      },
      {
        type: 'spline',
        name: 'Sales & Distribution',
        data: [45, 75, 25, 5, 15, 55, 5, 25]
      }
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }
      ]
    }
  };

  barBasicChartOptions: Highcharts.Options = {
    colors: ['#2196f3', '#673ab7', '#f44336', '#00c853'],
    title: {
      text: 'Monthly Average Rainfall'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        type: 'column',
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      },
      {
        type: 'column',
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
      },
      {
        type: 'column',
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
      },
      {
        type: 'column',
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
      }
    ]
  };

  areaZoomChartOptions: Highcharts.Options = {
    chart: {
      // zoomType: 'x'
    },
    title: {
      text: 'US and USSR nuclear stockpiles'
    },
    subtitle: {
      text: document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Exchange rate'
      }
    },
    legend: {
      enabled: true
    },

    plotOptions: {
      area: {
        pointStart: 1940,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },
    series: [
      {
        type: 'area',
        name: 'USA',
        data: [
          null,
          null,
          null,
          null,
          null,
          6,
          11,
          32,
          110,
          235,
          369,
          640,
          1005,
          1436,
          2063,
          3057,
          4618,
          6444,
          9822,
          15468,
          20434,
          24126,
          27387,
          29459,
          31056,
          31982,
          32040,
          31233,
          29224,
          27342,
          26662,
          26956,
          27912,
          28999,
          28965,
          27826,
          25579,
          25722,
          24826,
          24605,
          24304,
          23464,
          23708,
          24099,
          24357,
          24237,
          24401,
          24344,
          23586,
          22380,
          21004,
          17287,
          14747,
          13076,
          12555,
          12144,
          11009,
          10950,
          10871,
          10824,
          10577,
          10527,
          10475,
          10421,
          10358,
          10295,
          10104,
          9914,
          9620,
          9326,
          5113,
          5113,
          4954,
          4804,
          4761,
          4717,
          4368,
          4018
        ]
      },
      {
        type: 'area',
        name: 'USSR/Russia',
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          5,
          25,
          50,
          120,
          150,
          200,
          426,
          660,
          869,
          1060,
          1605,
          2471,
          3322,
          4238,
          5221,
          6129,
          7089,
          8339,
          9399,
          10538,
          11643,
          13092,
          14478,
          15915,
          17385,
          19055,
          21205,
          23044,
          25393,
          27935,
          30062,
          32049,
          33952,
          35804,
          37431,
          39197,
          45000,
          43000,
          41000,
          39000,
          37000,
          35000,
          33000,
          31000,
          29000,
          27000,
          25000,
          24000,
          23000,
          22000,
          21000,
          20000,
          19000,
          18000,
          18000,
          17000,
          16000,
          15537,
          14162,
          12787,
          12600,
          11400,
          5500,
          4512,
          4502,
          4502,
          4500,
          4500
        ]
      }
    ]
  };

  pieBasicChartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: undefined,
      plotBorderWidth: undefined,
      plotShadow: false
    },
    colors: ['#673ab7', '#2196f3', '#A389D4', '#899FD4', '#f44336', '#ffc107'],
    title: {
      text: 'Browser market shares in January, 2018'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [
      {
        type: 'pie',
        name: 'Brands',
        colorByPoint: true,
        data: [
          {
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
          },
          {
            name: 'Internet Explorer',
            y: 11.84
          },
          {
            name: 'Firefox',
            y: 10.85
          },
          {
            name: 'Edge',
            y: 4.67
          },
          {
            name: 'Safari',
            y: 4.18
          },
          {
            name: 'Other',
            y: 7.05
          }
        ]
      }
    ]
  };

  pieDonutChartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: undefined,
      plotBorderWidth: undefined,
      plotShadow: false,
      type: 'pie'
    },
    colors: ['#673ab7', '#2196f3', '#A389D4', '#899FD4', '#f44336', '#ffc107'],
    title: {
      text: 'Browser market shares in January, 2018'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [
      {
        type: 'pie',
        name: 'Brands',
        colorByPoint: true,
        size: '90%',
        innerSize: '60%',
        data: [
          {
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
          },
          {
            name: 'Internet Explorer',
            y: 11.84
          },
          {
            name: 'Firefox',
            y: 10.85
          },
          {
            name: 'Edge',
            y: 4.67
          },
          {
            name: 'Safari',
            y: 4.18
          },
          {
            name: 'Other',
            y: 7.05
          }
        ]
      }
    ]
  };

  pie3DChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
    },
    colors: ['#673ab7', '#2196f3', '#A389D4', '#899FD4', '#f44336', '#ffc107'],
    title: {
      text: 'Contents of Highsoft weekly fruit delivery'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    subtitle: {
      text: '3D donut in Highcharts'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }
    },
    series: [
      {
        type: 'pie',
        name: 'Delivered amount',
        data: [
          ['Bananas', 8],
          ['Kiwi', 3],
          ['Mixed nuts', 2],
          ['Oranges', 6],
          ['Apples', 3],
          ['Pears', 4]
        ]
      }
    ]
  };

  pieDonut3DChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    colors: ['#673ab7', '#2196f3', '#A389D4', '#899FD4', '#f44336', '#ffc107'],
    title: {
      text: 'Contents of Highsoft weekly fruit delivery'
    },
    subtitle: {
      text: '3D donut in Highcharts'
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    series: [
      {
        type: 'pie',
        name: 'Delivered amount',
        data: [
          ['Bananas', 8],
          ['Kiwi', 3],
          ['MIxed nuts', 2],
          ['Oranges', 6],
          ['Apples', 3],
          ['Pears', 4]
        ]
      }
    ]
  };

  combinationsChartOptions: Highcharts.Options = {
    title: {
      text: 'Combination chart'
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Kiwi']
    },
    colors: ['#2196f3', '#673ab7', '#20c997'],
    annotations: [
      {
        labelOptions: {
          text: 'Total fruit consumption'
        },
        labels: [
          {
            style: {
              left: '50px',
              top: '18px'
            }
          }
        ]
      }
    ],
    series: [
      {
        type: 'column',
        name: 'Jane',
        data: [3, 2, 1, 3, 4]
      },
      {
        type: 'column',
        name: 'John',
        data: [2, 3, 5, 7, 6]
      },
      {
        type: 'column',
        name: 'Joe',
        data: [4, 3, 3, 9, 0]
      },
      {
        type: 'spline',
        name: 'Average',
        data: [3, 2.67, 3, 6.33, 3.33],
        color: '#f44336',
        // lineColor: '#f44236',
        marker: {
          lineWidth: 2,
          lineColor: '#f44336',
          fillColor: '#fff'
        }
      },
      {
        type: 'pie',
        name: 'Total consumption',
        data: [
          {
            name: 'Jane',
            y: 13,
            color: '#2196f3'
          },
          {
            name: 'John',
            y: 23,
            color: '#673ab7'
          },
          {
            name: 'Joe',
            y: 19,
            color: '#20c997'
          }
        ],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
          enabled: false
        }
      }
    ]
  };
}
