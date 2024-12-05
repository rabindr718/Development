import { Column } from '../../../core/models/data_models/FilterSelectModel';

export const FinanceTypesColumn: Column[] = [
  // { name: "record_id", displayName: "Record ID", type: "number" },
  {
    name: 'product_code',
    displayName: 'Product Code',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'relationship',
    displayName: 'Relationship',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'type',
    displayName: 'Type',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'term_years',
    displayName: 'Terms Years',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'sub_record',
    displayName: 'Sub Record',
    type: 'number',
    isCheckbox: false,
  },

  {
    name: 'finance_company',
    displayName: 'Finance Company',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'finance_type_name',
    displayName: 'Finance Type Name',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'finance_company_for_search',
    displayName: 'Finance Company For Search',
    type: 'string',
    isCheckbox: false,
  },
 
  {
    name: 'finance_type_slug_portion_h',
    displayName: 'Finance type Slug Portion',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'finance_fee',
    displayName: 'Finance Fee',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'finance_type_uid',
    displayName: 'Finance Type uid',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'finance_type_uid_for_import',
    displayName: 'Finance Type uid_for_import',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'installer',
    displayName: 'Installer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'payment_start_date_based_on',
    displayName: 'Payment Start Based',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'payment_start_date_days',
    displayName: 'Payment Start Date Days',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'ar_rate',
    displayName: 'Ar Rate',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'dealer_fee',
    displayName: 'Dealer Fee',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'f_type',
    displayName: 'F Type',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'status',
    displayName: 'Status',
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
