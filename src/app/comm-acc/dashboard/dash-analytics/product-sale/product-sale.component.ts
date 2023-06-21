// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-product-sale',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.scss']
})
export class ProductSaleComponent {
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
      title: 'Revenue',
      icon: 'icon-help-circle'
    },
    {
      title: 'Conversions',
      icon: 'icon-help-circle'
    }
  ];

  progressBar = [
    {
      value: '786',
      color: 'danger',
      percentage: '60'
    },
    {
      value: '485',
      color: 'primary',
      percentage: '50'
    },
    {
      value: '769',
      color: 'warning',
      percentage: '70'
    },
    {
      value: '45,3%',
      color: 'success',
      percentage: '60'
    },
    {
      value: '6,7%',
      color: 'info',
      percentage: '30'
    },
    {
      value: '8,56',
      color: 'danger',
      percentage: '40'
    },
    {
      value: '10:55',
      color: 'warning',
      percentage: '70'
    },
    {
      value: '33.8%',
      color: 'success',
      percentage: '40'
    }
  ];

  progressBar2 = [
    {
      value: '786',
      color: 'danger',
      percentage: '65'
    },
    {
      value: '523',
      color: 'primary',
      percentage: '80'
    },
    {
      value: '736',
      color: 'warning',
      percentage: '80'
    },
    {
      value: '78,3%',
      color: 'success',
      percentage: '70'
    },
    {
      value: '6,6%',
      color: 'info',
      percentage: '70'
    },
    {
      value: '7,56',
      color: 'danger',
      percentage: '44'
    },
    {
      value: '4:30',
      color: 'warning',
      percentage: '68'
    },
    {
      value: '76.8%',
      color: 'success',
      percentage: '90'
    }
  ];

  progressBar3 = [
    {
      value: '624',
      color: 'danger',
      percentage: '45'
    },
    {
      value: '436',
      color: 'primary',
      percentage: '55'
    },
    {
      value: '756',
      color: 'warning',
      percentage: '95'
    },
    {
      value: '78,3%',
      color: 'success',
      percentage: '38'
    },
    {
      value: '6,4%',
      color: 'info',
      percentage: '30'
    },
    {
      value: '9,45',
      color: 'danger',
      percentage: '41'
    },
    {
      value: '9:05',
      color: 'warning',
      percentage: '67'
    },
    {
      value: '8.63%',
      color: 'success',
      percentage: '41'
    }
  ];

  progressBar4 = [
    {
      value: '423',
      color: 'danger',
      percentage: '54'
    },
    {
      value: '123',
      color: 'primary',
      percentage: '70'
    },
    {
      value: '756',
      color: 'warning',
      percentage: '75'
    },
    {
      value: '78,6%',
      color: 'success',
      percentage: '60'
    },
    {
      value: '45,6%',
      color: 'info',
      percentage: '90'
    },
    {
      value: '6,85',
      color: 'danger',
      percentage: '30'
    },
    {
      value: '7:45',
      color: 'warning',
      percentage: '40'
    },
    {
      value: '33.8%',
      color: 'success',
      percentage: '80'
    }
  ];

  progressBar5 = [
    {
      value: '465',
      color: 'danger',
      percentage: '66'
    },
    {
      value: '463',
      color: 'primary',
      percentage: '50'
    },
    {
      value: '456',
      color: 'warning',
      percentage: '30'
    },
    {
      value: '68,6%',
      color: 'success',
      percentage: '30'
    },
    {
      value: '76,6%',
      color: 'info',
      percentage: '32'
    },
    {
      value: '7,56',
      color: 'danger',
      percentage: '70'
    },
    {
      value: '8:45',
      color: 'warning',
      percentage: '71'
    },
    {
      value: '39.8%',
      color: 'success',
      percentage: '38'
    }
  ];

  progressBar6 = [
    {
      value: '786',
      color: 'danger',
      percentage: '43'
    },
    {
      value: '485',
      color: 'primary',
      percentage: '70'
    },
    {
      value: '769',
      color: 'warning',
      percentage: '69'
    },
    {
      value: '45,3%',
      color: 'success',
      percentage: '90'
    },
    {
      value: '6,7%',
      color: 'info',
      percentage: '80'
    },
    {
      value: '8,56',
      color: 'danger',
      percentage: '41'
    },
    {
      value: '10:55',
      color: 'warning',
      percentage: '55'
    },
    {
      value: '33.8%',
      color: 'success',
      percentage: '70'
    }
  ];

  progressBar7 = [
    {
      value: '786',
      color: 'danger',
      percentage: '61'
    },
    {
      value: '523',
      color: 'primary',
      percentage: '45'
    },
    {
      value: '736',
      color: 'warning',
      percentage: '70'
    },
    {
      value: '78,3%',
      color: 'success',
      percentage: '60'
    },
    {
      value: '6,6%',
      color: 'info',
      percentage: '30'
    },
    {
      value: '7,56',
      color: 'danger',
      percentage: '40'
    },
    {
      value: '4:30',
      color: 'warning',
      percentage: '70'
    },
    {
      value: '76.8%',
      color: 'success',
      percentage: '40'
    }
  ];
}
