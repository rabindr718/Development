import React, { useEffect, useState } from 'react';
import { ICONS } from '../../../../resources/icons/Icons';
import CheckBox from '../../../components/chekbox/CheckBox';
import '../../configure/configure.css';
import { UserRoleBasedListModel } from '../../../../core/models/api_models/UserManagementModel';
import { UserAppointmentTableColumn } from '../../../../resources/static_data/UserManagementColumn';
import SortableHeader from '../../../components/tableHeader/SortableHeader';
import { toggleRowSelection } from '../../../components/chekbox/checkHelper';
import DataNotFound from '../../../components/loader/DataNotFound';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { shuffleArray } from '../../../../redux/apiSlice/userManagementSlice/userManagementSlice';
import { MdOutlineLockReset } from "react-icons/md";
import { TYPE_OF_USER } from '../../../../resources/static_data/Constant';
interface AppointmentSetterProps {
  data: UserRoleBasedListModel[];
  onClickEdit: (item: UserRoleBasedListModel) => void;
  onClickDelete: (item: UserRoleBasedListModel) => void;
  selectAllChecked: boolean;
  selectedRows: Set<number>;
  handlePasswordReset:(id?:string)=>void;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
  setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppointmentSetterTable: React.FC<AppointmentSetterProps> = ({
  data,
  onClickDelete,
  onClickEdit,
  selectAllChecked,
  selectedRows,
  setSelectedRows,
  setSelectAllChecked,
  handlePasswordReset
}) => {
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  let sortedData = [...data];
  const isAnyRowSelected = selectedRows?.size > 0;
  const isAllRowsSelected = selectedRows?.size === data?.length;
  const dispatch = useAppDispatch();
  const {role_name} = useAppSelector(state=>state.auth)
  const handleSort = (key: string) => {
    const direction =
      sortKey === key ? (sortDirection === 'desc' ? 'asc' : 'desc') : 'asc';
    if (sortKey === key) {
      setSortDirection(direction);
    } else {
      setSortKey(key);
      setSortDirection(direction);
    }
    sortArray(key, direction);
  };

  const sortArray = (sortKey: string, direction: string) => {
    let sortedData = [...data];
    if (sortKey) {
      sortedData.sort((a: any, b: any) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction === 'asc'
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
    dispatch(shuffleArray(sortedData));
  };
  return (
    <>
      {/* <UserHeaderSection  name="Appointment Setter"/> */}
      <div
        className="UserManageTable"
        style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
      >
        <table>
          <thead>
            <tr style={{ backgroundColor: 'var(--primary-light-color)' }}>
              {UserAppointmentTableColumn.map((item, key) => (
                <SortableHeader
                  key={key}
                  isCheckbox={item.isCheckbox}
                  titleName={item.displayName}
                  data={data}
                  isAllRowsSelected={isAllRowsSelected}
                  isAnyRowSelected={isAnyRowSelected}
                  selectAllChecked={selectAllChecked}
                  setSelectAllChecked={setSelectAllChecked}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  sortKey={item.name}
                  sortDirection={sortKey === item.name ? sortDirection : 'asc'}
                  onClick={() => handleSort(item.name)}
                />
              ))}
              <th>
                <div className="action-header">
                  <p>Action</p>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedData?.length > 0 ? (
              sortedData.map((el: UserRoleBasedListModel, i: number) => (
                <tr key={el.email_id}>
                  <td>
                    <div className="flex-check">
                      <CheckBox
                        checked={selectedRows.has(i)}
                        onChange={() => {
                          // If there's only one row of data and the user clicks its checkbox, select all rows
                          if (data?.length === 1) {
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
                      {el.user_code}
                    </div>
                  </td>
                  <td>{el.name}</td>
                  <td>{el.role_name ? el.role_name : 'NA'}</td>
                  <td>{el.reporting_manager ? el.reporting_manager : 'NA'}</td>
                  <td>{el.email_id ? el.email_id : 'NA'}</td>
                  <td>{el.mobile_number ? el.mobile_number : 'NA'}</td>
                  <td>{el.dealer ? el.dealer : 'NA'}</td>

                  {/* <td>
                      {el.startDate ? el.startDate: 'NA'} 
                    </td>
                    <td >
                      {el.endDate ? el.endDate : 'NA'}
                    </td> */}

                  <td
                    style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                  >
                    {el.description ? el.description : 'NA'}
                  </td>
                  <td>
                    <div className="action-icon" style={{gap:4}}>
                      <div
                        className=""
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          onClickDelete(el);
                        }}
                      >
                        <img
                          src={ICONS.deleteIcon}
                          alt=""
                       
                        />
                      </div>
                      {(role_name === TYPE_OF_USER.ADMIN || role_name===TYPE_OF_USER.DEALER_OWNER) && <div className='reset_hover_btn' style={{cursor:"pointer"}} onClick={()=>handlePasswordReset(el.email_id)}>
                      <MdOutlineLockReset color='#667085' size={24} />
                    </div>}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr style={{ border: 0 }}>
                <td colSpan={10}>
                  <DataNotFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AppointmentSetterTable;
