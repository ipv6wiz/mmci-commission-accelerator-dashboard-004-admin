// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sale-report',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.scss']
})
export class SaleReportComponent {
  // public method
  product_sale = [
    {
      title: 'Campaign date'
    },
    {
      title: 'Click',
      icon: 'icon-help-circle'
    },
    {
      title: 'Cost',
      icon: 'icon-help-circle'
    },
    {
      title: 'CTR',
      icon: 'icon-help-circle'
    },
    {
      title: 'ARPU',
      icon: 'icon-help-circle'
    },
    {
      title: 'ECPI',
      icon: 'icon-help-circle'
    },
    {
      title: 'ROI',
      icon: 'icon-help-circle'
    },
    {
      title: 'REVENUE',
      icon: 'icon-help-circle'
    }
  ];

  progressBar = [
    {
      value: '125',
      percentage: '60'
    },
    {
      value: '140',
      percentage: '50'
    },
    {
      value: '856',
      percentage: '70'
    },
    {
      value: '45,3%',
      percentage: '60'
    },
    {
      value: '9,7%',
      percentage: '30'
    },
    {
      value: '7,25',
      percentage: '40'
    },
    {
      value: '5:26',
      percentage: '70'
    }
  ];

  progressBar1 = [
    {
      value: '352',
      percentage: '50'
    },
    {
      value: '150',
      percentage: '40'
    },
    {
      value: '769',
      percentage: '30'
    },
    {
      value: '35,3%',
      percentage: '60'
    },
    {
      value: '6,7%',
      percentage: '70'
    },
    {
      value: '3,57',
      percentage: '40'
    },
    {
      value: '3:30',
      percentage: '80'
    }
  ];

  progressBar2 = [
    {
      value: '145',
      percentage: '50'
    },
    {
      value: '869',
      percentage: '30'
    },
    {
      value: '453',
      percentage: '40'
    },
    {
      value: '76,3%',
      percentage: '60'
    },
    {
      value: '6,4%',
      percentage: '30'
    },
    {
      value: '7,56',
      percentage: '40'
    },
    {
      value: '1:30',
      percentage: '60'
    }
  ];

  progressBar3 = [
    {
      value: '458',
      percentage: '30'
    },
    {
      value: '769',
      percentage: '50'
    },
    {
      value: '456',
      percentage: '70'
    },
    {
      value: '56,3%',
      percentage: '60'
    },
    {
      value: '9,4%',
      percentage: '40'
    },
    {
      value: '7,32',
      percentage: '30'
    },
    {
      value: '6:30',
      percentage: '70'
    }
  ];

  progressBar4 = [
    {
      value: '789',
      percentage: '70'
    },
    {
      value: '756',
      percentage: '50'
    },
    {
      value: '432',
      percentage: '60'
    },
    {
      value: '39,3%',
      percentage: '30'
    },
    {
      value: '6,7%',
      percentage: '40'
    },
    {
      value: '3,79',
      percentage: '20'
    },
    {
      value: '4:30',
      percentage: '30'
    }
  ];

  progressBar5 = [
    {
      value: '352',
      percentage: '35'
    },
    {
      value: '150',
      percentage: '50'
    },
    {
      value: '769',
      percentage: '70'
    },
    {
      value: '35,3%',
      percentage: '60'
    },
    {
      value: '6,7%',
      percentage: '30'
    },
    {
      value: '3,57',
      percentage: '80'
    },
    {
      value: '3:30',
      percentage: '40'
    }
  ];

  progressBar6 = [
    {
      value: '145',
      percentage: '50'
    },
    {
      value: '869',
      percentage: '35'
    },
    {
      value: '453',
      percentage: '65'
    },
    {
      value: '76,3%',
      percentage: '60'
    },
    {
      value: '6,4%',
      percentage: '30'
    },
    {
      value: '7,56',
      percentage: '45'
    },
    {
      value: '1:30',
      percentage: '75'
    }
  ];

  progressBar7 = [
    {
      value: '458',
      percentage: '60'
    },
    {
      value: '769',
      percentage: '45'
    },
    {
      value: '456',
      percentage: '70'
    },
    {
      value: '56,3%',
      percentage: '35'
    },
    {
      value: '9,4%',
      percentage: '60'
    },
    {
      value: '7,32',
      percentage: '40'
    },
    {
      value: '6:30',
      percentage: '55'
    }
  ];

  progressBar8 = [
    {
      value: '789',
      percentage: '60'
    },
    {
      value: '756',
      percentage: '55'
    },
    {
      value: '432',
      percentage: '70'
    },
    {
      value: '39,3%',
      percentage: '38'
    },
    {
      value: '6,7%',
      percentage: '30'
    },
    {
      value: '3,79',
      percentage: '42'
    },
    {
      value: '4:30',
      percentage: '38'
    }
  ];
}
