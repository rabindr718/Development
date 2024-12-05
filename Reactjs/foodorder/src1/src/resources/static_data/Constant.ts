export const TYPE_OF_USER = {
  ALL: 'All',
  ADMIN: 'Admin',
  FINANCE_ADMIN: 'Finance Admin',
  DB_USER: 'DB User',
  SUB_DEALER_OWNER: 'SubDealer Owner',
  PARTNER: 'Partner',
  APPOINTMENT_SETTER: 'Appointment Setter',
  DEALER_OWNER: 'Dealer Owner',
  REGIONAL_MANGER: 'Regional Manager',
  SALE_MANAGER: 'Sales Manager',
  SALES_REPRESENTATIVE: 'Sale Representative',
  ACCOUNT_MANAGER: 'Account Manager',
  ACCOUNT_EXCUTIVE: 'Account Executive',
};

export const ALL_USER_ROLE_LIST = [
  { value: '', label: 'All' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Finance Admin', label: 'Finance Admin' },
  { value: 'DB User', label: 'DB User' },
  { value: 'SubDealer Owner', label: 'SubDealer Owner' },
  // { value: 'Partner', label: 'Partner' },
  { value: 'Appointment Setter', label: 'Appointment Setter' },
  { value: 'Dealer Owner', label: 'Dealer Owner' },
  { value: 'Regional Manager', label: 'Regional Manager' },
  { value: 'Sales Manager', label: 'Sales Manager' },
  { value: 'Sale Representative', label: 'Sale Representative' },
  { value: 'Account Manager', label: 'Account Manager' },
  { value: 'Account Executive', label: 'Account Executive' },
];

export const MANAGER_ASSIGN_TO_USER = [
  { value: 'Dealer Owner', label: 'Dealer Owner' },
  { value: 'Regional Manager', label: 'Regional Manager' },
  { value: 'Sales Manager', label: 'Sales Manager' },
  { value: 'Sale Representative', label: 'Sale Representative' },
];

export const getObjectsBeforeMatch = (arr: any, matchLabel: string) => {
  const index = arr.findIndex((obj: any) => obj.label === matchLabel);

  console.log(index);
  if (index === 0) {
    return [{ value: 'Dealer Owner', label: 'Dealer Owner' }]; // No match found
  }

  return arr.slice(0, index);
};

export const timeSlots = [
  '06:00 AM',
  '07:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];
