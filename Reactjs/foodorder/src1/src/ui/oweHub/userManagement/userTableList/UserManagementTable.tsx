import React, {
  SetStateAction,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import '../user.css';
import '../../configure/configure.css';
import UserTable from '../userManagerAllTable/UserTable';
import AppointmentSetterTable from '../userManagerAllTable/AppointmentSetterTable';
import PartnerTable from '../userManagerAllTable/PartnerTable';
import SalesManagerTable from '../userManagerAllTable/SalesManagerTable';
import AccountManagerTable from '../userManagerAllTable/AccountManagerTable';
import AccountExecutiveTable from '../userManagerAllTable/AccountExecutiveTable';
import SalesRepresentativeTable from '../userManagerAllTable/SalesRepresentativeTable';
import DealerOwnerTable from '../userManagerAllTable/DealerOwnerTable';
import RegionalManagerTable from '../userManagerAllTable/RegionalManagerTable';
import './UserHeader.css';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import SelectOption from '../../../components/selectOption/SelectOption';
import {
  UserDropdownModel,
  UserRoleBasedListModel,
} from '../../../../core/models/api_models/UserManagementModel';
import { TYPE_OF_USER } from '../../../../resources/static_data/Constant';
import PaginationComponent from '../../../components/pagination/PaginationComponent';
import {
  fetchDealerList,
  fetchUserListBasedOnRole,
} from '../../../../redux/apiActions/userManagement/userManagementActions';
import DBUserTable from '../userManagerAllTable/DBUserTable';
import { resetOpt } from '../../../../redux/apiSlice/DbManager/dataTableSlice';
import UserIcon from '../lib/UserIcon';
import { debounce } from '../../../../utiles/debounce';
import { ICONS } from '../../../../resources/icons/Icons';
import MicroLoader from '../../../components/loader/MicroLoader';
import Input from '../../../components/text_input/Input';
import Swal from 'sweetalert2';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
interface UserTableProos {
  userDropdownData: UserDropdownModel[];
  userRoleBasedList: UserRoleBasedListModel[];
  selectedOption: UserDropdownModel;
  handleSelectChange: (data: UserDropdownModel) => void;
  onClickEdit: (item: UserRoleBasedListModel) => void;
  onClickDelete: (item: UserRoleBasedListModel) => void;
  selectAllChecked: boolean;
  selectedRows: Set<number>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
  setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onClickMultiDelete: () => void;
  AddBtn?: React.ReactNode;
  currentPage1: number;
  setCurrentPage1: React.Dispatch<SetStateAction<number>>;
  activeSalesRep: string;
  handleCrossClick: () => void;
}
const UserManagementTable: React.FC<UserTableProos> = ({
  userDropdownData,
  userRoleBasedList,
  selectedOption,
  handleSelectChange,
  onClickEdit,
  onClickDelete,
  selectAllChecked,
  selectedRows,
  setSelectedRows,
  setSelectAllChecked,
  onClickMultiDelete,
  AddBtn,
  setCurrentPage1,
  currentPage1,
  searchTerm,
  setSearchTerm,
  activeSalesRep,
  handleCrossClick,
}) => {
  const dispatch = useAppDispatch();
  const [pageSize1, setPageSize1] = useState(25); // Set your desired page size here
  const [isHovered, setIsHovered] = useState(false);

  const count = useAppSelector((state) => state.userManagement.totalCount);
  const { loading, dealerList, dealerCount } = useAppSelector(
    (state) => state.userManagement
  );
  const initialRender = useRef(false);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = true;
      const data = {
        page_number: currentPage1,
        page_size: pageSize1,
        sales_rep_status: activeSalesRep,
        filters: [
          {
            Column: 'role_name',
            Operation: '=',
            Data: selectedOption.value,
          },
        ],
      };
      const dataa = {
        page_number: currentPage1,
        page_size: pageSize1,
      };
      dispatch(fetchUserListBasedOnRole(data));

      if (selectedOption.value === 'Partner') {
        dispatch(fetchDealerList(dataa));
      }
    }
    return () => {
      dispatch(resetOpt());
    };
  }, [dispatch, currentPage1, pageSize1, activeSalesRep, initialRender]);

  const handlePageChange = (page: number) => {
    setCurrentPage1(page);
    setSelectAllChecked(false);
    setSelectedRows(new Set());
  };
  const handleItemsPerPageChange = (e: any) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setPageSize1(newItemsPerPage);
    setCurrentPage1(1); // Reset to the first page when changing items per page
  };

  const totalPages = Math.ceil(count! / pageSize1);

  const startIndex = (currentPage1 - 1) * pageSize1 + 1;
  const endIndex = currentPage1 * pageSize1;
  /** render table based on dropdown */

  //dealerpagination
  const totalPages1 = Math.ceil(dealerCount! / pageSize1);

  const startIndex1 = (currentPage1 - 1) * pageSize1 + 1;
  const endIndex1 = currentPage1 * pageSize1;

  const buttonStyle = {
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    backgroundColor: isHovered ? '#AD1313' : '',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const resetPassword = async(user_emails:string)=>{
    try {
      const data = await postCaller("reset_user_passwords",{user_emails:[user_emails]});
      if(data.status>200){
        toast.error(data.message);
        return;
      }
      toast.success("Password reset successful! Check your email for the new password");
    } catch (error) {
      toast.error((error as Error).message as string);
    }
  }

  const handlePasswordReset = async (id?: string) => {
  const prompt =   await Swal.fire({
      title: 'Confirm Password Reset',
      text: 'Are you sure you want to reset your password? A new password will be generated and sent to your registered email address',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      customClass:{
        actions:"flex-row-reverse"
      }
    })


    if( prompt.isConfirmed){
      if (id) {
        resetPassword(id);
      }
    }
    
    
  }

  const renderComponent = () => {
    switch (selectedOption.label) {
      case TYPE_OF_USER.ALL:
        return (
          <UserTable
            selectedValue={selectedOption.label}
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.ADMIN:
        return (
          <UserTable
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.FINANCE_ADMIN:
        return (
          <UserTable
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.DB_USER:
        return (
          <DBUserTable
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.SUB_DEALER_OWNER:
        return (
          <UserTable
            selectedValue={selectedOption.label}
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.APPOINTMENT_SETTER:
        return (
          <AppointmentSetterTable
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );

      case TYPE_OF_USER.PARTNER:
        return (
          <PartnerTable
            data={dealerList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: any) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.REGIONAL_MANGER:
        return (
          <RegionalManagerTable
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.DEALER_OWNER:
        return (
          <DealerOwnerTable
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.SALES_REPRESENTATIVE:
        return (
          <SalesRepresentativeTable
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.SALE_MANAGER:
        return (
          <SalesManagerTable
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.ACCOUNT_MANAGER:
        return (
          <AccountManagerTable
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      case TYPE_OF_USER.ACCOUNT_EXCUTIVE:
        return (
          <AccountExecutiveTable
            data={userRoleBasedList}
            onClickEdit={(item: UserRoleBasedListModel) => {
              onClickEdit(item);
            }}
            onClickDelete={(item: UserRoleBasedListModel) => {
              onClickDelete(item);
            }}
            selectedRows={selectedRows}
            selectAllChecked={selectAllChecked}
            setSelectedRows={setSelectedRows}
            setSelectAllChecked={setSelectAllChecked}
            handlePasswordReset={handlePasswordReset}
          />
        );
      default:
        return null;
    }
  };
  const handleSearchChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    }, 800),
    []
  );

  /** render UI */
  return (
    <>
      <div className="ManagerUser-container">
        <div className="admin-user">
          {activeSalesRep ? (
            <>
              <img
                style={{ cursor: 'pointer' }}
                src={ICONS.cross}
                onClick={handleCrossClick}
              />
              <h3>{activeSalesRep} Sales Rep</h3>
            </>
          ) : (
            <h3>{selectedOption?.label || ''}</h3>  
          )}
        </div>

        <div className="delete-icon-container items-center items-start mt2 ">
          <div className="userManagementTable__search">
            <input
              type="text"
              name="Search"
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  e.target.value = e.target.value.replace(
                    /[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF_\- $,\.]| {2,}/g,
                    ''
                  );
                  handleSearchChange(e);
                  setSearch(e.target.value);
                }
              }}
            />
            {!activeSalesRep && <div>{AddBtn}</div>}
          </div>

          <div className="user_user-type">
            {!activeSalesRep && (
              <div
                className="flex items-end  user-dropdown hover-effect"
                onClick={() => setIsOpen(true)}
              >
                <div className="mr1 user-icon">
                  <UserIcon />
                </div>

                <div className="relative user-table-dropdown">
                  <span
                    className="select-caret"
                    style={{ fontSize: 10 }}
                    color="#484848"
                  >
                    User
                  </span>

                  <SelectOption
                    options={userDropdownData}
                    value={selectedOption}
                    menuStyles={{ width: 'fit-content', left: -30}}
                    controlStyles={{
                      border: 'none',
                      margin: '0',
                      width: 'fit-content',
                      marginTop: '-6px !important',
                      minHeight: "36px !important"
                    }}
                    dropdownIndicatorStyles={{ color: '#292B2E', padding: 0, marginTop: "7px", marginRight: "2px"}}
                    singleValueStyles={{
                      marginBlock: 0,
                      padding: "0 5px",
                      color: '#292B2E',
                      fontWeight: '500',
                      marginTop: "7px",
                      className: "dropdownText"
                    }}
                    valueContainerStyles={{ paddingInline: 0, marginInline: 0 }}
                    onChange={(data: any) => {
                      handleSelectChange(data);
                      setSearch('');
                      setSearchTerm('');
                      setSelectedRows(new Set());
                      setSelectAllChecked(false);
                    }}
                    menuWidth="fit-content"
                    menuListStyles={{
                      width: 'fit-content',
                    }}
                  />
                </div>
              </div>
            )}
            <button
              onClick={onClickMultiDelete}
              className="trash-btn rounded-8 border-none flex items-center justify-center"
              type="button"
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3752 18.9446L18.2377 9H18.375C18.789 9 19.125 8.664 19.125 8.25V6C19.125 5.586 18.789 5.25 18.375 5.25H15V4.875C15 3.84113 14.1589 3 13.125 3H10.875C9.84113 3 9 3.84113 9 4.875V5.25H5.625C5.211 5.25 4.875 5.586 4.875 6V8.25C4.875 8.664 5.211 9 5.625 9H5.76225L6.62475 18.9446C6.72638 20.1165 7.69012 21 8.8665 21H15.1343C16.3106 21 17.2744 20.1165 17.376 18.9446H17.3752ZM10.5 4.875C10.5 4.66838 10.6684 4.5 10.875 4.5H13.125C13.3316 4.5 13.5 4.66838 13.5 4.875V5.25H10.5V4.875ZM6.375 6.75H17.625V7.5H6.375V6.75ZM8.11912 18.8149L7.26788 9H16.7318L15.8805 18.8149C15.8468 19.2056 15.5254 19.5 15.1335 19.5H8.86575C8.47388 19.5 8.15287 19.2052 8.11912 18.8149Z"
                  fill="white"
                />
                <path
                  d="M10.0856 9.75112C9.67193 9.77287 9.3543 10.1257 9.37605 10.5394L9.75105 17.6644C9.77205 18.0645 10.1032 18.375 10.4996 18.375C10.5127 18.375 10.5262 18.375 10.5393 18.3739C10.9529 18.3521 11.2706 17.9992 11.2488 17.5856L10.8738 10.4606C10.8521 10.047 10.4966 9.72862 10.0856 9.75112Z"
                  fill="white"
                />
                <path
                  d="M13.9143 9.75109C13.4992 9.72896 13.1478 10.047 13.1261 10.4606L12.7511 17.5856C12.7293 17.9992 13.0469 18.3521 13.4606 18.3738C13.4741 18.3746 13.4872 18.375 13.5003 18.375C13.8967 18.375 14.2274 18.0645 14.2488 17.6643L14.6238 10.5393C14.6456 10.1257 14.3279 9.77284 13.9143 9.75109Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {selectedOption && loading ? (
        <div className="flex my3 justify-center items-center">
          <MicroLoader />
        </div>
      ) : (
        renderComponent()
      )}

      {selectedOption.value !== 'Partner' ? (
        <div className="user-page-heading-container">
          {userRoleBasedList?.length > 0 && !loading ? (
            <>
              <p className="page-heading">
                {startIndex} - {endIndex > count! ? count : endIndex} of {count}{' '}
                item
              </p>
              <PaginationComponent
                currentPage={currentPage1}
                itemsPerPage={pageSize1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                handleItemsPerPageChange={handleItemsPerPageChange}
              />
            </>
          ) : null}
        </div>
      ) : null}
      {selectedOption.value === 'Partner' && !loading ? (
        <div className="user-page-heading-container">
          <>
            <p className="page-heading">
              {startIndex1} -{' '}
              {endIndex1 > dealerCount! ? dealerCount : endIndex} of{' '}
              {dealerCount} item
            </p>
            <PaginationComponent
              currentPage={currentPage1}
              itemsPerPage={pageSize1}
              totalPages={totalPages1}
              onPageChange={handlePageChange}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        </div>
      ) : null}
    </>
  );
};

export default UserManagementTable;
