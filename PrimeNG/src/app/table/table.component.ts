import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  products = [
    { asn_id: 122, asn_type: 'delivery', shipmentid: 342, asn_status: 'success', bussiness_unit: 1 },
    { asn_id: 12223, asn_type: 'delivery', shipmentid: 342, asn_status: 'success', bussiness_unit: 1 },
    { asn_id: 1242, asn_type: 'delivery', shipmentid: 342, asn_status: 'success', bussiness_unit: 1 },
    { asn_id: 1262, asn_type: 'delivery', shipmentid: 342, asn_status: 'success', bussiness_unit: 1 },
    { asn_id: 122, asn_type: 'delivery', shipmentid: 342, asn_status: 'success', bussiness_unit: 1 },
    { asn_id: 12223, asn_type: 'delivery', shipmentid: 342, asn_status: 'success', bussiness_unit: 1 },
    { asn_id: 1242, asn_type: 'delivery', shipmentid: 342, asn_status: 'success', bussiness_unit: 1 },
    { asn_id: 1262, asn_type: 'delivery', shipmentid: 342, asn_status: 'success', bussiness_unit: 1 },

  ]
  selectedProducts1:any=[]
}
