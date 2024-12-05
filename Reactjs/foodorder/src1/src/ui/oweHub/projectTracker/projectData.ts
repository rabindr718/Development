import { ICONS } from '../../../resources/icons/Icons';

export const cardData = [
  {
    name: 'Total Sales',
    bgColor: `var(--teritary-color)`,
    iconBgColor: `#fff`,
    color: '#fff',
    icon: ICONS.sales_per,
    type: 'contract_date',
    key: '',
  },
  {
    name: 'NTP',
    bgColor: `var(--orange-color)`,
    iconBgColor: `var(--white-color)`,
    icon: ICONS.ntp_per,
    color: `var(--white-color)`,
    type: 'ntp_date',
  },
  {
    name: 'Installed',
    bgColor: `var(--secondary-color)`,
    iconBgColor: `var(--white-color)`,
    icon: ICONS.installed_per,
    color: `var(--white-color)`,
    type: 'pv_install_completed_date',
  },
  {
    name: 'Cancelled',
    bgColor: `var(--purpink-color)`,
    iconBgColor: `var(--white-color)`,
    icon: ICONS.cancelled_per,
    color: `var(--white-color)`,
    type: 'cancelled_date',
  },
];

export const projectDashData = [
  {
    ruppes: '$620,450.05',
    para: 'All Sales',
    percentColor: '#8E81E0',
    key: 'SalesPeriod',
    percent: 80,
  },
  {
    ruppes: '$620,450.05',
    para: 'Total Cancellation',
    iconBgColor: '#FFE6E6',
    percentColor: '#C470C7',
    key: 'cancellation_period',
    percent: 30,
  },
  {
    ruppes: '$620,450.05',
    para: 'Total Installation',
    percentColor: '#63ACA3',
    key: 'installation_period',
    percent: 50,
  },
];
export const projectStatusHeadData = [
  {
    name: 'State',
    para: 'Arizona',
    viewButton: false,
    bgColor: '#DCF1FF',
    hoverColor: `rgb(87, 179, 241)`,
    key: 'state',
  },
  {
    name: 'Adder',
    para: '$65,000',
    bgColor: '#FFE1E8',
    hoverColor: `rgb(224, 114, 140)`,
    viewButton: true,
    key: 'adders_total',
  },
  {
    name: 'AHJ',
    para: 'NA',
    viewButton: false,
    bgColor: '#FFE4CB',
    hoverColor: '#F4AA54',
    key: 'ajh',
  },
  {
    name: 'EPC',
    para: 'NA',
    viewButton: false,
    bgColor: '#DEDCFF',
    hoverColor: 'rgb(103, 97, 218)',
    key: 'epc',
  },
  {
    name: 'Sys Size',
    para: 'NA',
    viewButton: false,
    bgColor: '#FEE0FF',
    hoverColor: `rgb(196, 112, 199)`,
    key: 'system_size',
  },
  {
    name: 'Contract Amount',
    para: 'NA',
    viewButton: false,
    bgColor: '#C3E7E3',
    hoverColor: `rgb(99, 172, 163)`,
    key: 'contract_amount',
  },
  {
    name: 'Finance Partner',
    para: 'NA',
    viewButton: false,
    bgColor: '#E5D1FF',
    hoverColor: '#A07FFF',
    key: 'finance_partner',
  },
  {
    name: 'Net EPC',
    para: 'NA',
    viewButton: false,
    bgColor: '#FFC9C9',
    hoverColor: '#EE6363',
    key: 'net_epc',
  },
];
export const projects = [
  {
    projectName: 'Owe Project Installation',
    salesDate: '20 Feb,',
    salesYear: '2024',
    notchStrips: [
      { name: 'Site Survey', date: null },
      { name: 'Permit Submitted', date: null },
      { name: 'Install Ready', date: null },
      { name: 'Install Completed', date: null },
      
      { name: 'PTO', date: null },
    ],
    overallProgress: 20,
  },
  {
    projectName: 'Owe Project Installation',
    salesDate: 'Completed',
    notchStrips: [
      { name: 'Site Survey', date: null },
      { name: 'Permit Submitted', date: null },
      { name: 'Install Ready', date: null },
      { name: 'Install Completed', date: null },
      { name: 'PTO', date: null },
    ],
    overallProgress: 28,
  },
];
