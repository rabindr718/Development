import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const PartnerPayScheduleColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  {
    name: 'sales_partner',
    displayName: 'Sales Partner',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'finance_partner',
    displayName: 'Finance Partner',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'spps_ref',
    displayName: 'Spps Ref',
    type: 'string',
    isCheckbox: false,
  },
 
  {
    name: 'state',
    displayName: 'State',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'sug',
    displayName: 'Sug',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'rep_pay',
    displayName: 'Rep Pay',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'redline',
    displayName: 'Red Line',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'm1_sales_partner_draw_percentage',
    displayName: 'Sales Partner Draw %',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'm1_sales_partner_not_to_exceed',
    displayName: 'Sales Partner Not_to_exceed',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'm1_sales_rep_draw_percentage',
    displayName: 'Sales Rep Draw %',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'm1_sales_rep_not_to_exceed',
    displayName: 'Sales Rep Not_to_exceed',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'active_date_start',
    displayName: 'Active Start Date',
    type: 'date',
    isCheckbox: false,
  },
  {
    name: 'active_date_end',
    displayName: 'Active End Date',
    type: 'date',
    isCheckbox: false,
  },
  

];
