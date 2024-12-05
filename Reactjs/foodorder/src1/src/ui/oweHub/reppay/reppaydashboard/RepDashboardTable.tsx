import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import CheckBox from '../../../components/chekbox/CheckBox';
import { toggleRowSelection } from '../../../components/chekbox/checkHelper';
import SortableHeader from '../../../components/tableHeader/SortableHeader';
import '../../configure/configure.css';
import HelpDashboard from '../../dashboard/HelpDashboard';
import PaginationComponent from '../../../components/pagination/PaginationComponent';
import { ICONS } from '../../../../resources/icons/Icons';
import { getRepPay } from '../../../../redux/apiActions/repPayAction';
import DataNotFound from '../../../components/loader/DataNotFound';
import { dateFormat } from '../../../../utiles/formatDate';
import { FilterModel } from '../../../../core/models/data_models/FilterSelectModel';
import MicroLoader from '../../../components/loader/MicroLoader';
import ProjectBreakdown from '../../dashboard/ProjectBreakdown';
import { CommissionModel } from '../../../../core/models/configuration/create/CommissionModel';
export const commissionList = [
  {
    record_id: 1,
    partner: 'FFS',
    installer: 'John Doe',
    state: 'NTP',
    sale_type: 'LOAN',
    sale_price: 25000,
    rep_type: 'Sales Rep',
    rl: 'Percentage',
    rate: '80/20',
    start_date: '2023-01-01',
    end_date: '2023-12-31',
    curr_status: 'Approved',
    status_date: '2023-02-15',
    owe_contractor: 5000,
    dba: 'Solar Solutions',
    comm_model: 'Percentage',
    percent: 0.1,
    type: 'Residential',
    today: '2023-05-04',
    amount: 2500,
    fin_type: 'Loan',
    sys_size: '5 kW',
    contract: 25000,
    loan_fee: 1000,
    epc: 20000,
    address: '123 Main St',
    rr: 500,
    comm_rate: 0.05,
    net_epc: 19500,
    credit: 1000,
    rep_2: 'Jane Smith',
    net_comm: 975,
    draw_amt: 2000,
    amt_paid: 1500,
    balance: 500,
    dealer_code: 'ABC123',
    contr_date: '2023-01-15',
    sub_total: 24000,
  },
  {
    record_id: 2,
    partner: 'OWE',
    installer: 'Mike Johnson',
    state: 'PTO',
    sale_type: 'CHECK',
    sale_price: 30000,
    rep_type: 'Sales Manager',
    rl: 'RL',
    rate: '-',
    start_date: '2023-02-01',
    end_date: '2024-01-31',
    curr_status: 'Pending',
    status_date: '2023-03-10',
    owe_contractor: 6000,
    dba: 'Sunny Energy',
    comm_model: 'RL',
    percent: null,
    type: 'Commercial',
    today: '2023-05-04',
    amount: 3000,
    fin_type: 'Check',
    sys_size: '8 kW',
    contract: 30000,
    loan_fee: null,
    epc: 27000,
    address: '456 Elm St',
    rr: 800,
    comm_rate: 0.06,
    net_epc: 26200,
    credit: 1500,
    rep_2: 'David Brown',
    net_comm: 1572,
    draw_amt: 2500,
    amt_paid: 2000,
    balance: 500,
    dealer_code: 'XYZ789',
    contr_date: '2023-02-20',
    sub_total: 28500,
  },
  {
    record_id: 3,
    partner: 'PALM',
    installer: 'Sarah Thompson',
    state: 'NTP',
    sale_type: 'LEASE',
    sale_price: 40000,
    rep_type: 'Sales Rep',
    rl: 'Percentage',
    rate: '70/30',
    start_date: '2023-03-15',
    end_date: '2024-03-14',
    curr_status: 'Approved',
    status_date: '2023-04-05',
    owe_contractor: 8000,
    dba: 'Lone Star Solar',
    comm_model: 'Percentage',
    percent: 0.12,
    type: 'Residential',
    today: '2023-05-04',
    amount: 4800,
    fin_type: 'Lease',
    sys_size: '10 kW',
    contract: 40000,
    loan_fee: null,
    epc: 36000,
    address: '789 Oak St',
    rr: 1000,
    comm_rate: 0.07,
    net_epc: 35000,
    credit: 2000,
    rep_2: 'Emily Davis',
    net_comm: 2450,
    draw_amt: 3500,
    amt_paid: 3000,
    balance: 500,
    dealer_code: 'DEF456',
    contr_date: '2023-03-25',
    sub_total: 38000,
  },
  {
    record_id: 4,
    partner: 'SP',
    installer: 'Robert Wilson',
    state: 'Install',
    sale_type: 'PPA',
    sale_price: 35000,
    rep_type: 'Sales Manager',
    rl: 'RL',
    rate: '-',
    start_date: '2023-04-01',
    end_date: '2024-03-31',
    curr_status: 'Pending',
    status_date: '2023-04-20',
    owe_contractor: 7000,
    dba: 'Sunshine Solar',
    comm_model: 'RL',
    percent: null,
    type: 'Commercial',
    today: '2023-05-04',
    amount: 3500,
    fin_type: 'PPA',
    sys_size: '12 kW',
    contract: 35000,
    loan_fee: null,
    epc: 31500,
    address: '321 Pine St',
    rr: 900,
    comm_rate: 0.06,
    net_epc: 30600,
    credit: 1800,
    rep_2: 'Daniel Taylor',
    net_comm: 1836,
    draw_amt: 3000,
    amt_paid: 2500,
    balance: 500,
    dealer_code: 'GHI789',
    contr_date: '2023-04-10',
    sub_total: 33200,
  },
  {
    record_id: 5,
    partner: 'TSP',
    installer: 'Jessica Anderson',
    state: 'PTO',
    sale_type: 'LOAN',
    sale_price: 45000,
    rep_type: 'Sales Rep',
    rl: 'Percentage',
    rate: '80/30',
    start_date: '2023-05-01',
    end_date: '2024-04-30',
    curr_status: 'Approved',
    status_date: '2023-05-15',
    owe_contractor: 9000,
    dba: 'Empire Solar',
    comm_model: 'Percentage',
    percent: 0.15,
    type: 'Residential',
    today: '2023-05-04',
    amount: 6750,
    fin_type: 'Loan',
    sys_size: '15 kW',
    contract: 45000,
    loan_fee: 1500,
    epc: 40500,
    address: '654 Maple Ave',
    rr: 1200,
    comm_rate: 0.08,
    net_epc: 39300,
    credit: 2500,
    rep_2: 'Olivia Martinez',
    net_comm: 3144,
    draw_amt: 4000,
    amt_paid: 3500,
    balance: 500,
    dealer_code: 'JKL012',
    contr_date: '2023-05-05',
    sub_total: 43500,
  },
  {
    record_id: 6,
    partner: 'FFS',
    installer: 'William Lee',
    state: 'PTO',
    sale_type: 'CHECK',
    sale_price: 28000,
    rep_type: 'Sales Manager',
    rl: 'RL',
    rate: '-',
    start_date: '2023-06-01',
    end_date: '2024-05-31',
    curr_status: 'Pending',
    status_date: '2023-06-10',
    owe_contractor: 5600,
    dba: 'Rocky Mountain Solar',
    comm_model: 'RL',
    percent: null,
    type: 'Residential',
    today: '2023-05-04',
    amount: 2800,
    fin_type: 'Check',
    sys_size: '7 kW',
    contract: 28000,
    loan_fee: null,
    epc: 25200,
    address: '987 Cedar Rd',
    rr: 700,
    comm_rate: 0.055,
    net_epc: 24500,
    credit: 1400,
    rep_2: 'Sophia Hernandez',
    net_comm: 1347.5,
    draw_amt: 2500,
    amt_paid: 2000,
    balance: 500,
    dealer_code: 'MNO345',
    contr_date: '2023-06-05',
    sub_total: 26600,
  },
  {
    record_id: 7,
    partner: 'OWE',
    installer: 'Emma Gonzalez',
    state: 'PTO',
    sale_type: 'LEASE',
    sale_price: 32000,
    rep_type: 'Sales Rep',
    rl: 'Percentage',
    rate: '50/20',
    start_date: '2023-07-01',
    end_date: '2024-06-30',
    curr_status: 'Approved',
    status_date: '2023-07-15',
    owe_contractor: 6400,
    dba: 'Evergreen Solar',
    comm_model: 'Percentage',
    percent: 0.11,
    type: 'Commercial',
    today: '2023-05-04',
    amount: 3520,
    fin_type: 'Lease',
    sys_size: '9 kW',
    contract: 32000,
    loan_fee: null,
    epc: 28800,
    address: '246 Spruce St',
    rr: 800,
    comm_rate: 0.065,
    net_epc: 28000,
    credit: 1600,
    rep_2: 'Liam Jackson',
    net_comm: 1820,
    draw_amt: 3000,
    amt_paid: 2500,
    balance: 500,
    dealer_code: 'PQR678',
    contr_date: '2023-07-10',
    sub_total: 30400,
  },
  {
    record_id: 8,
    partner: 'PALM',
    installer: 'Ava White',
    state: 'Install',
    sale_type: 'PPA',
    sale_price: 38000,
    rep_type: 'Sales Manager',
    rl: 'RL',
    rate: '-',
    start_date: '2023-08-01',
    end_date: '2024-07-31',
    curr_status: 'Pending',
    status_date: '2023-08-20',
    owe_contractor: 7600,
    dba: 'Pacific Solar',
    comm_model: 'RL',
    percent: null,
    type: 'Residential',
    today: '2023-05-04',
    amount: 3800,
    fin_type: 'PPA',
    sys_size: '11 kW',
    contract: 38000,
    loan_fee: null,
    epc: 34200,
    address: '753 Birch Ln',
    rr: 1100,
    comm_rate: 0.075,
    net_epc: 33100,
    credit: 2200,
    rep_2: 'Mia Perez',
    net_comm: 2482.5,
    draw_amt: 3500,
    amt_paid: 3000,
    balance: 500,
    dealer_code: 'STU901',
    contr_date: '2023-08-15',
    sub_total: 36200,
  },
  {
    record_id: 9,
    partner: 'SP',
    installer: 'Noah Brooks',
    state: 'PTO',
    sale_type: 'LOAN',
    sale_price: 42000,
    rep_type: 'Sales Rep',
    rl: 'Percentage',
    rate: '60/20',
    start_date: '2023-09-01',
    end_date: '2024-08-31',
    curr_status: 'Approved',
    status_date: '2023-09-10',
    owe_contractor: 8400,
    dba: 'Desert Solar',
    comm_model: 'Percentage',
    percent: 0.14,
    type: 'Commercial',
    today: '2023-05-04',
    amount: 5880,
    fin_type: 'Loan',
    sys_size: '14 kW',
    contract: 42000,
    loan_fee: 1200,
    epc: 37800,
    address: '159 Willow Rd',
    rr: 1000,
    comm_rate: 0.08,
    net_epc: 36800,
    credit: 2100,
    rep_2: 'Isabella Rodriguez',
    net_comm: 2944,
    draw_amt: 4000,
    amt_paid: 3500,
    balance: 500,
    dealer_code: 'VWX234',
    contr_date: '2023-09-05',
    sub_total: 40800,
  },
  {
    record_id: 10,
    partner: 'TSP',
    installer: 'Charlotte Green',
    state: 'NTP',
    sale_type: 'CHECK',
    sale_price: 30000,
    rep_type: 'Sales Manager',
    rl: 'RL',
    rate: '-',
    start_date: '2023-10-01',
    end_date: '2024-09-30',
    curr_status: 'Pending',
    status_date: '2023-10-15',
    owe_contractor: 6000,
    dba: 'Southwest Solar',
    comm_model: 'RL',
    percent: null,
    type: 'Residential',
    today: '2023-05-04',
    amount: 3000,
    fin_type: 'Check',
    sys_size: '8 kW',
    contract: 30000,
    loan_fee: null,
    epc: 27000,
    address: '753 Oak St',
    rr: 800,
    comm_rate: 0.06,
    net_epc: 26200,
    credit: 1500,
    rep_2: 'Benjamin Torres',
    net_comm: 1572,
    draw_amt: 2500,
    amt_paid: 2000,
    balance: 500,
    dealer_code: 'YZA567',
    contr_date: '2023-10-10',
    sub_total: 28500,
  },
];

export const Commissioncolumns = [
  { name: 'unique_id', displayName: 'UID', type: 'string', isCheckbox: true },
  {
    name: 'home_owner',
    displayName: 'Home Owner',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'current_status',
    displayName: 'Current Status',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'owe_contractor',
    displayName: 'Owe Contractor',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'DBA',
    displayName: 'DBA',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'type', displayName: 'Type', type: 'string', isCheckbox: false },

  {
    name: 'finance_type',
    displayName: 'Finance Type',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'sys_size',
    displayName: 'Sys Size',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'contract_total',
    displayName: 'Contract Total',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'loan_fee',
    displayName: 'Loan Fee',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'epc',
    displayName: 'epc',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'adders',
    displayName: 'Adders',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'r_r',
    displayName: 'r_r',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'comm_rate',
    displayName: 'Comm Rate',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'net_epc',
    displayName: 'Net Epc',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'credit',
    displayName: 'Credit',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'rep_2',
    displayName: 'Rep 2',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'net_comm',
    displayName: 'Net Comm',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'draw_amt',
    displayName: 'Draw Amount',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'amt_paid',
    displayName: 'Amount Paid',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'balance',
    displayName: 'Balance',
    type: 'number',
    isCheckbox: false,
  },

  {
    name: 'dealer_code',
    displayName: 'Dealer Code',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'sub_total',
    displayName: 'Sub Total',
    type: 'number',
    isCheckbox: false,
  },

  {
    name: 'max_per_rep',
    displayName: 'Max Per Rep',
    type: 'number',
    isCheckbox: false,
  },

  {
    name: 'total_per_rep',
    displayName: 'Total Per Rep',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'status_date',
    displayName: 'Status Date',
    type: 'date',
    isCheckbox: false,
  },
];
const RepDashBoardTable = ({
  dropdownFilter,
  addtionalFIlter,
  setCurrentPage,
  currentPage,
}: {
  dropdownFilter: Array<string>;
  addtionalFIlter: FilterModel[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  const [pageSize1, setPageSize1] = useState(10);
  const [openIcon, setOpenIcon] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data, count, filters, isLoading } = useAppSelector(
    (state) => state.repPaySlice
  );
  const error = useAppSelector((state) => state.comm.error);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const itemsPerPage = 10;
  const [viewArchived, setViewArchived] = useState<boolean>(false);

  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // [
  //   { value: 'All', label: 'All', key: 'all' },
  //   { value: 'AP-OTH', label: 'AP-OTH', key: 'ap_oth' },
  //   { value: 'AP-PDA', label: 'AP-PDA', key: 'ap_pda' },
  //   { value: 'AP-ADV', label: 'AP-ADV', key: 'ap_adv' },
  //   { value: 'AP-DED', label: 'AP-DED', key: 'ap_ded' },
  //   { value: 'REP-COMM', label: 'REP-COMM', key: 'rep_comm' },
  //   { value: 'REP BONUS', label: 'REP BONUS', key: 'rep_bonus' },
  //   { value: 'LEADER-OVERRIDE', label: 'LEADER-OVRD', key: 'leader_ovrd' },
  // ]
  useEffect(() => {
    const pageNumber = {
      page_number: currentPage,
      page_size: pageSize1,
      archived: viewArchived ? true : undefined,
      pay_roll_start_date: '2022-06-01',
      pay_roll_end_date: '2022-06-01',
      use_cutoff: filters.use_cutoff,
      report_type: filters.report_type.toUpperCase(),
      sort_by: ['home_owner', 'unique_id'],
      ap_oth: dropdownFilter.includes('AP-OTH'),
      ap_pda: dropdownFilter.includes('AP-PDA'),
      ap_ded: dropdownFilter.includes('AP-DED'),
      ap_adv: dropdownFilter.includes('AP-ADV'),
      rep_comm: dropdownFilter.includes('REP-COMM'),
      rep_bonus: dropdownFilter.includes('REP BONUS'),
      leader_ovrd: dropdownFilter.includes('LEADER-OVERRIDE'),
      commission_model: filters.commission_model,
      filters: addtionalFIlter,
    };
    dispatch(getRepPay(pageNumber));
  }, [
    dispatch,
    currentPage,
    pageSize1,
    viewArchived,
    filters.commission_model,
    filters.commission_model,
    filters.use_cutoff,
    dropdownFilter,
    addtionalFIlter,
  ]);

  const handleItemsPerPageChange = (e: any) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setPageSize1(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [editMode, setEditMode] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = currentPage * itemsPerPage;
  const currentPageData = data?.slice();
  const isAnyRowSelected = selectedRows?.size > 0;
  const isAllRowsSelected = selectedRows?.size === currentPageData?.length;
  const totalPages1 = Math.ceil(count / pageSize1);
  const [editedCommission] = useState<CommissionModel | null>(null);

  const handleSort = (key: any) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  if (sortKey) {
    currentPageData.sort((a: any, b: any) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        // Ensure numeric values for arithmetic operations
        const numericAValue =
          typeof aValue === 'number' ? aValue : parseFloat(aValue);
        const numericBValue =
          typeof bValue === 'number' ? bValue : parseFloat(bValue);
        return sortDirection === 'asc'
          ? numericAValue - numericBValue
          : numericBValue - numericAValue;
      }
    });
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handleIconOpen = () => setOpenIcon(true);
  const handleIconClose = () => setOpenIcon(false);

  return (
    <div className="comm">
      <div className="commissionContainer">
        <div
          className="TableContainer pb3"
          style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
        >
          <table>
            {!!currentPageData.length && (
              <thead>
                <tr>
                  {Commissioncolumns?.map((item, key) => (
                    <SortableHeader
                      key={key}
                      isCheckbox={item.isCheckbox}
                      titleName={item.displayName}
                      data={currentPageData}
                      isAllRowsSelected={isAllRowsSelected}
                      isAnyRowSelected={isAnyRowSelected}
                      selectAllChecked={selectAllChecked}
                      setSelectAllChecked={setSelectAllChecked}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      sortKey={item.name}
                      sortDirection={
                        sortKey === item.name ? sortDirection : undefined
                      }
                      onClick={() => handleSort(item.name)}
                    />
                  ))}
                  {viewArchived === true ? null : (
                    <th>
                      <div className="action-header">
                        <p>Help</p>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
            )}

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <MicroLoader />
                    </div>
                  </td>
                </tr>
              ) : currentPageData?.length > 0 ? (
                currentPageData?.map((el: any, i: any) => (
                  <tr key={i} className={selectedRows.has(i) ? 'selected' : ''}>
                    <td
                      style={{ fontWeight: '500' }}
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <div className="flex-check">
                        <CheckBox
                          checked={selectedRows.has(i)}
                          onChange={() => {
                            // If there's only one row of data and the user clicks its checkbox, select all rows
                            if (currentPageData?.length === 1) {
                              setSelectAllChecked(true);
                              setSelectedRows(new Set([0]));
                            } else {
                              toggleRowSelection(
                                i,
                                selectedRows,
                                setSelectedRows,
                                setSelectAllChecked
                              );
                            }
                          }}
                        />
                        <span className="zoom-out-td">
                          {el.unique_id || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td>{el.home_owner || 'N/A'}</td>
                    <td>{el.current_status || 'N/A'}</td>
                    <td>{el.owe_contractor || 'N/A'}</td>
                    <td>{el.DBA || 'N/A'}</td>
                    <td>{el.type || 'N/A'}</td>

                    <td>{el.finance_type || 'N/A'}</td>
                    <td>{el.sys_size ?? 'N/A'}</td>
                    <td>{el.contract_total ?? 'N/A'}</td>
                    <td>{el.loan_fee ?? 'N/A'}</td>
                    <td>{el.epc ?? 'N/A'}</td>
                    <td>{el.adders ?? 'N/A'}</td>
                    <td>{el.r_r || 'N/A'}</td>
                    <td>{el.comm_rate ?? 'N/A'}</td>
                    <td>{el.net_epc ?? 'N/A'}</td>
                    <td>{el.credit ?? 'N/A'}</td>
                    <td>{el.rep_2 || 'N/A'}</td>
                    <td>{el.net_comm ?? 'N/A'}</td>
                    <td>{el.draw_amt ?? 'N/A'}</td>
                    <td>{el.amt_paid ?? 'N/A'}</td>
                    <td>{el.balance ?? 'N/A'}</td>
                    <td>{el.dealer_code || 'N/A'}</td>
                    <td>{el.subtotal ?? 'N/A'}</td>
                    <td>{el.max_per_rep ?? 'N/A'}</td>
                    <td>{el.total_per_rep ?? 'N/A'}</td>
                    <td>{el.status_date && dateFormat(el.status_date)}</td>

                    <td className="zoom-out-help">
                      <img
                        src={ICONS.online}
                        style={{
                          height: '18px',
                          width: '18px',
                          stroke: '0.2',
                        }}
                        alt=""
                        onClick={() => handleIconOpen()}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr style={{ border: 0 }}>
                  <td colSpan={12}>
                    <DataNotFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!!currentPageData.length && (
          <div className="page-heading-container">
            <p className="page-heading">
              {startIndex} - {endIndex > count ? count : endIndex} of {count}{' '}
              item
            </p>

            <PaginationComponent
              currentPage={currentPage}
              itemsPerPage={pageSize1}
              totalPages={totalPages1}
              onPageChange={handlePageChange}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />

            {open && (
              <ProjectBreakdown
                commission={editedCommission}
                editMode={editMode}
                handleClose={() => {
                  setOpen(false);
                }}
              />
            )}

            {openIcon && (
              <HelpDashboard data={{}} handleClose={handleIconClose} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepDashBoardTable;
