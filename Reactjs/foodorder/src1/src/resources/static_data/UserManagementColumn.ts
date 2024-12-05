import { Column } from '../../core/models/data_models/FilterSelectModel';

export const UserManagementTableColumn: Column[] = [
  { name: 'user_code', displayName: 'Code', type: 'string', isCheckbox: true },
  { name: 'name', displayName: 'Name', type: 'string', isCheckbox: false },
  // { name: 'role_name', displayName: 'Role', type: 'string', isCheckbox: false },
  {
    name: 'reporting_manager',
    displayName: 'Reporting To',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'email_id',
    displayName: 'Email',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'mobile_number',
    displayName: 'Phone Number',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
];

export const UserAppointmentTableColumn: Column[] = [
  { name: 'user_code', displayName: 'Code', type: 'string', isCheckbox: true },
  { name: 'name', displayName: 'Name', type: 'string', isCheckbox: false },
  {
    name: 'designation',
    displayName: 'Designation',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'reporting_manager',
    displayName: 'Reporting To',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'email_id',
    displayName: 'Email ID',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'mobile_number',
    displayName: 'Phone Number',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'dealer', displayName: 'Dealer', type: 'string', isCheckbox: false },
  // {
  //   name: "start_date",
  //   displayName: "Start Date",
  //   type: "string",
  //   isCheckbox: false,
  // },
  // {
  //   name: "end_date",
  //   displayName: "End Date",
  //   type: "string",
  //   isCheckbox: false,
  // },

  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
];

export const UserPatternTableColumn: Column[] = [
  {
    name: 'dealer_code',
    displayName: 'Code',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'dealer_name',
    displayName: 'Name',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'preferred_name',
    displayName: 'Preferred Name',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'details',
    displayName: 'Details',
    type: 'string',
    isCheckbox: false,
  },
];

export const UserDealerTableColumn: Column[] = [
  { name: 'user_code', displayName: 'Code', type: 'string', isCheckbox: true },
  { name: 'name', displayName: 'Name', type: 'string', isCheckbox: false },
  {
    name: 'email_id',
    displayName: 'Email ID',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'mobile_number',
    displayName: 'Phone Number',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'dealer',
    displayName: 'Dealer',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
];

export const UserRegionalTableColumn: Column[] = [
  { name: 'user_code', displayName: 'Code', type: 'string', isCheckbox: true },
  { name: 'name', displayName: 'Name', type: 'string', isCheckbox: false },
  // { name: 'role_name', displayName: 'Role', type: 'string', isCheckbox: false },
  {
    name: 'dealer_owner',
    displayName: 'Dealer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'reporting_manager',
    displayName: 'Reporting Manager',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'Region',
    displayName: 'Region',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'email_id',
    displayName: 'Email ID',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'mobile_number',
    displayName: 'Phone Number',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'team_name',
    displayName: 'Designation',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
];

export const UserSaleMangerTableColumn: Column[] = [
  { name: 'user_code', displayName: 'Code', type: 'string', isCheckbox: true },
  { name: 'name', displayName: 'Name', type: 'string', isCheckbox: false },
  // { name: 'role_name', displayName: 'Role', type: 'string', isCheckbox: false },
  {
    name: 'dealer_owner',
    displayName: 'Dealer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'reporting_manager',
    displayName: 'Repoting To',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'email_id',
    displayName: 'Email ID',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'mobile_number',
    displayName: 'Phone Number',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
];

export const UserSaleRepresentTableColumn: Column[] = [
  { name: 'user_code', displayName: 'Code', type: 'string', isCheckbox: true },
  { name: 'name', displayName: 'Name', type: 'string', isCheckbox: false },
  // { name: 'role_name', displayName: 'Role', type: 'string', isCheckbox: false },
  {
    name: 'dealer_owner',
    displayName: 'Dealer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'team_name',
    displayName: 'Designation',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'reporting_manager',
    displayName: 'Reporting To',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'email_id',
    displayName: 'Email ID',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'mobile_number',
    displayName: 'Phone Number',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
];

export const AccountManagerTableColumn: Column[] = [
  { name: 'user_code', displayName: 'Code', type: 'string', isCheckbox: true },
  { name: 'name', displayName: 'Name', type: 'string', isCheckbox: false },
  // { name: 'role_name', displayName: 'Role', type: 'string', isCheckbox: false },
  {
    name: 'reporting_manager',
    displayName: 'Reporting To',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'email_id',
    displayName: 'Email',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'mobile_number',
    displayName: 'Phone Number',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'description',
    displayName: 'Description',
    type: 'string',
    isCheckbox: false,
  },
];
