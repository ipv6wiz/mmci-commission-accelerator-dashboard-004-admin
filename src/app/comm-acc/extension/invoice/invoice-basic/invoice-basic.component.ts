// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice-basic',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './invoice-basic.component.html',
  styleUrls: ['./invoice-basic.component.scss']
})
export default class InvoiceBasicComponent {
  // public method
  printPage() {
    const link2 = document.createElement('link');
    link2.innerHTML =
      '<style>@media print{*,::after,::before{text-shadow:none!important;box-shadow:none!important}a:not(.btn){text-decoration:none}abbr[title]::after{content:" ("attr(title) ")"}pre{white-space:pre-wrap!important}blockquote,pre{border:1px solid #adb5bd;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}@page{size:a3}body{min-width:992px!important}.container{min-width:992px!important}.page-header,.pcoded-navbar,.pcoded-mob-header,.pcoded-header,.menu-styler,.modal,.navbar{display:none}.pcoded-main-container{top:0;margin-left:0;}.invoice-contact{padding-top:0;}@page,.card-body,.card-header,body,.pcoded-content{padding:0;margin:0}.badge{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #dee2e6!important}.table-dark{color:inherit}.table-dark tbody+tbody,.table-dark td,.table-dark th,.table-dark thead th{border-color:#dee2e6}.table .thead-dark th{color:inherit;border-color:#dee2e6}}</style>';

    document.getElementsByTagName('head')[0].appendChild(link2);
    window.print();
  }

  order_details = [
    {
      title: 'Date',
      description: 'November 14'
    },
    {
      title: 'Status',
      description: 'Pending'
    },
    {
      title: 'Id',
      description: '#146859'
    }
  ];

  order = [
    {
      quantity: '6',
      amount: '$200.00',
      total: '$1200.00'
    },
    {
      quantity: '7',
      amount: '$100.00',
      total: '$700.00'
    },
    {
      quantity: '5',
      amount: '$150.00',
      total: '$750.00'
    }
  ];

  final_total = [
    {
      title: 'Sub Total',
      amount: '$4725.00'
    },
    {
      title: 'Taxes (10%)',
      amount: '$57.00'
    },
    {
      title: 'Discount (5%)',
      amount: '$45.00'
    }
  ];
}
