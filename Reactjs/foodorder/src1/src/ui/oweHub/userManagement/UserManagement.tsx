import React, { useCallback, useEffect, useMemo, useState } from 'react';
import UserPieChart from './pieChart/UserPieChart';
import UserOnboardingCreation from './userOnboard/UserOnboardCreation';
import { AddNewButton } from '../../components/button/AddNewButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  fetchUserListBasedOnRole,
  fetchUserOnboarding,
  fetchDealerList,
} from '../../../redux/apiActions/userManagement/userManagementActions';
import {
  UserDropdownModel,
  UserRoleBasedListModel,
} from '../../../core/models/api_models/UserManagementModel';
import UserManagementTable from './userTableList/UserManagementTable';
import {
  createUserOnboarding,
  createDealer,
  deleteUserOnboarding,
  fetchDealerOwner,
  fetchRegionList,
  deleteUserDealer,
} from '../../../redux/apiActions/auth/createUserSliceActions';
import { createUserObject, validateForm } from '../../../utiles/Validation';
import {
  updateUserForm,
  userResetForm,
} from '../../../redux/apiSlice/userManagementSlice/createUserSlice';
import { HTTP_STATUS } from '../../../core/models/api_models/RequestModel';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  TYPE_OF_USER,
  ALL_USER_ROLE_LIST as USERLIST,
} from '../../../resources/static_data/Constant';
import { showAlert } from '../../components/alert/ShowAlert';
import useAuth from '../../../hooks/useAuth';

const UserManagement: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [tablePermissions, setTablePermissions] = useState({});
  const [page, setPage] = useState(1);
  const [logoUrl, setLogoUrl] = useState('');
  const { authData } = useAuth();

  const [selectedOption, setSelectedOption] = useState<any>(USERLIST[0]);

  console.log(selectedOption, "selectedoption")

  const ALL_USER_ROLE_LIST = useMemo(() => {
    let role = USERLIST;
    const userRole = localStorage.getItem('role');
    if (userRole === TYPE_OF_USER.DEALER_OWNER) {
      role = role.filter(
        (role) =>
          role.value !== TYPE_OF_USER.ADMIN &&
          role.value !== TYPE_OF_USER.FINANCE_ADMIN &&
          role.value !== TYPE_OF_USER.DB_USER &&
          role.value !== TYPE_OF_USER.PARTNER
      );
      setSelectedOption(role[0]);
    }
    return role;
  }, []);
  const {
    loading,
    userOnboardingList,
    userRoleBasedList,
    userPerformanceList,
  } = useAppSelector((state) => state.userManagement);
  const {
    formData,
    dealerOwenerList,
    regionList,
    createUserResult,
    deleteUserResult,
  } = useAppSelector((state) => state.createOnboardUser);

  const [activeSalesRep, setActiveSalesRep] = useState('');

  const handleCrossClick = () => {
    setActiveSalesRep('');
  };

  const [isClicked, setIsClicked] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(userResetForm());
    setOpen(false);
  };
  /** fetch onboarding users data*/
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserOnboarding()); // Using dispatch
      // await dispatch(createTablePermission());
    };

    fetchData();
  }, [createUserResult, deleteUserResult]);

  useEffect(() => {
    if (selectedOption) {
      setPage(1);
    }
  }, [selectedOption]);

  /** role based get data */

  // useEffect(() => {
  //   const data = {
  //     page_number: page,
  //     page_size: 25,
  //     filters: [
  //       {
  //         Column: 'role_name',
  //         Operation: '=',
  //         Data: selectedOption.value,
  //       },
  //       {
  //         Column: 'name',
  //         Operation: 'cont',
  //         Data: searchTerm,
  //       },
  //     ],
  //   };

  //   const dataa = {
  //     page_number: page,
  //     page_size: 25,
  //     filters: [
  //       {
  //         Column: 'dealer_name',
  //         Operation: 'cont',
  //         Data: searchTerm,
  //       },
  //     ],
  //   };
  //   const fetchList = async () => {
  //     await dispatch(fetchUserListBasedOnRole(data));
  //   };

  //   if (selectedOption.value !== 'Partner') {
  //     fetchList();
  //   }

  //   const fetchDealer = async () => {
  //     await dispatch(fetchDealerList(dataa));
  //   };
  //   if (selectedOption.value === 'Partner') {
  //     fetchDealer();
  //   }
  // }, [selectedOption, createUserResult, deleteUserResult, page, searchTerm]);

  useEffect(() => {
    const data = {
      page_number: page,
      page_size: 25,
      sales_rep_status:activeSalesRep,
      filters: [
        {
          Column: 'name',
          Operation: 'cont',
          Data: searchTerm,
        },
      ],
    };

    const dataa = {
      page_number: page,
      page_size: 25,
      filters: [
        {
          Column: 'dealer_name',
          Operation: 'cont',
          Data: searchTerm,
        },
      ],
    };

    const fetchList = async () => {
      if (selectedOption.value !== '') {
        data.filters.push({
          Column: 'role_name',
          Operation: '=',
          Data: selectedOption.value,
        });
      }
      await dispatch(fetchUserListBasedOnRole(data));
    };

    if (selectedOption.value !== 'Partner') {
      fetchList();
    }

    const fetchDealer = async () => {
      await dispatch(fetchDealerList(dataa));
    };

    if (selectedOption.value === 'Partner') {
      fetchDealer();
    }
  }, [selectedOption, createUserResult, deleteUserResult, page, searchTerm, activeSalesRep]);

  /** handle dropdown value */
  const handleSelectChange = useCallback(
    (selectOption: UserDropdownModel) => {
      setSelectedOption(selectOption);
    },
    [selectedOption]
  );

  /** check role  */
  const onChangeRole = async (role: string, value: string) => {
    console.log('working on first change');
    if (role === 'Role') {
      setSelectedOption(
        ALL_USER_ROLE_LIST?.find((role) => role.value === value)!
      );
      await dispatch(
        fetchDealerOwner({
          role: TYPE_OF_USER.DEALER_OWNER,
        })
      );
    } else {
      if (
        formData.role_name === TYPE_OF_USER.SALE_MANAGER ||
        formData.role_name === TYPE_OF_USER.SALES_REPRESENTATIVE ||
        formData.role_name === TYPE_OF_USER.REGIONAL_MANGER ||
        formData.role_name === TYPE_OF_USER.APPOINTMENT_SETTER
      ) {
        if (value) {
          await dispatch(
            fetchRegionList({
              dealer_name: formData.dealer || '',
              role: value,
            })
          );
        }
      }
    }
  };
  const handleValueChange = (value: string) => {
    setActiveSalesRep(value);
  };


  
  /** submit button */
  const onSubmitCreateUser = (tablePermissions: any) => {
    const arrayOfPermissions = Object.entries(tablePermissions).map(
      ([tableName, permission]) => ({
        table_name: tableName,
        privilege_type: permission,
      })
    );
    const formErrors = validateForm(formData);
    console.log('formErrors', formErrors);
    if (Object.keys(formErrors).length === 0) {
      createUserRequest(arrayOfPermissions);
    } else {
      toast.info(Object.keys(formErrors)[0] + ' is required.');
    }
  };

  /** API call to submit */
  const createUserRequest = async (tablePermissions: any) => {
    console.log(formData, 'formData');
    if (formData.role_name !== 'Partner') {
      let data = createUserObject(formData);
      const actionResult = await dispatch(
        createUserOnboarding({
          ...data,
          tables_permissions: tablePermissions,
          description: formData.description.trim(),
          dealer_logo: logoUrl,
          podio_checked:
            formData.role_name === TYPE_OF_USER.SALE_MANAGER ||
            formData.role_name === TYPE_OF_USER.SALES_REPRESENTATIVE ||
            formData.role_name === TYPE_OF_USER.REGIONAL_MANGER ||
            formData.role_name === TYPE_OF_USER.DEALER_OWNER
              ? data.podio_checked
              : undefined,
        })
      );
      const result = unwrapResult(actionResult);

      if (result.status === HTTP_STATUS.OK) {
        handleClose();
        toast.success(result.message);
      } else {
        toast.warning(result.message);
      }
    } else {
      const dealerDate = {
        dealer_code: formData.dealer_code,
        dealer_name: formData.dealer,
        Description: formData.description,
        preferred_name: formData.preferred_name,
      };
      const actionResult = await dispatch(createDealer(dealerDate));
      const result = unwrapResult(actionResult);

      if (result.status === HTTP_STATUS.OK) {
        handleClose();
        toast.success(result.message);
      } else {
        toast.warning(result.message);
      }
    }
  };

  /** API call to submit */
  const deleteUserRequest = async (
    deleteRows: string[],
    usernames: string[]
  ) => {
    const confirmed = await showAlert(
      'Delete User',
      'Are you sure you want to delete user?',
      'Yes',
      'No'
    );

    if (confirmed) {
      const actionResult = await dispatch(
        deleteUserOnboarding({ user_codes: deleteRows, usernames })
      );
      const result = unwrapResult(actionResult);

      if (result.status === HTTP_STATUS.OK) {
        handleClose();
        setSelectedRows(new Set());
        setSelectAllChecked(false);
        toast.success(result.message);
      } else {
        toast.warning(result.message);
      }
    }
  };

  /** API call to submit */
  const deleteDealerRequest = async (item: any) => {
    const confirmed = await showAlert(
      'Delete User',
      'Are you sure you want to delete user?',
      'Yes',
      'No'
    );
    const dataa = {
      page_number: page,
      page_size: 25,
    };

    if (confirmed) {
      const actionResult = await dispatch(
        deleteUserDealer({ record_id: [item.record_id], is_archived: true })
      );
      const result = unwrapResult(actionResult);

      if (result.status === HTTP_STATUS.OK) {
        handleClose();
        setSelectedRows(new Set());
        setSelectAllChecked(false);
        toast.success(result.message);
        dispatch(fetchDealerList(dataa));
        dispatch(fetchUserOnboarding());
      } else {
        toast.warning(result.message);
      }
    }
  };
  console.log(userRoleBasedList, 'userRoleBasedList');
  console.log(formData, "formdata")
  /** render UI */
  return (
    <>
      {open && (
        <UserOnboardingCreation
          handleClose={handleClose}
          dealerList={dealerOwenerList}
          regionList={regionList}
          editMode={false}
          selectedOption={selectedOption}
          tablePermissions={tablePermissions}
          setTablePermissions={setTablePermissions}
          userOnboard={null}
          onSubmitCreateUser={onSubmitCreateUser}
          onChangeRole={(role, value) => {
            console.log('formData', formData);
            onChangeRole(role, value);
          }}
          setLogoUrl={setLogoUrl}
        />
      )}
      <div className="barchart-section">
        <UserPieChart
          onboardingList={userOnboardingList}
          userPerformanceList={userPerformanceList}
          loading={loading}
          setSelectedOption={setSelectedOption}
          onValueChange={handleValueChange}
          activeSalesRep={activeSalesRep}
        />
      </div>

      <div className="onboardrow">
        <UserManagementTable
          AddBtn={
            <AddNewButton
              title={'Add New'}
              onClick={() => {
                handleOpen();
              }}
            />
          }
          activeSalesRep={activeSalesRep}
          handleCrossClick={handleCrossClick}
          currentPage1={page}
          setCurrentPage1={setPage}
          selectedRows={selectedRows}
          selectAllChecked={selectAllChecked}
          setSelectedRows={setSelectedRows}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          setSelectAllChecked={setSelectAllChecked}
          userRoleBasedList={userRoleBasedList}
          userDropdownData={ALL_USER_ROLE_LIST}
          selectedOption={selectedOption}
          handleSelectChange={handleSelectChange}
          onClickDelete={(item: any) => {
            selectedOption.value === 'Partner'
              ? deleteDealerRequest(item)
              : deleteUserRequest(
                  [item.user_code],
                  item.role_name === 'DB User'
                    ? [item.db_username]
                    : [item.name.split(' ').join('_')]
                );
          }}
          onClickMultiDelete={() => {
            const deleteRows = Array.from(selectedRows).map(
              (index) => userRoleBasedList[index].user_code
            );
            const usernames = Array.from(selectedRows).map((index) => {
              const user = userRoleBasedList[index];
              return user.role_name === TYPE_OF_USER.DB_USER
                ? user.db_username
                : user.name.split(' ').join('_');
            });
            if (deleteRows.length > 0) {
              deleteUserRequest(deleteRows, usernames);
              console.log(
                deleteRows,
                usernames,
                userRoleBasedList,
                'deleteRows, usernames,userRoleBasedList'
              );
            } else {
              toast.info('Please select user');
            }
          }}
          onClickEdit={(item: UserRoleBasedListModel) => {
            // console.log("row data",item)
            const [firstName, lastName] = item.name.split(' ');

            dispatch(updateUserForm({ field: 'isEdit', value: true }));
            dispatch(updateUserForm({ field: 'first_name', value: firstName }));
            dispatch(updateUserForm({ field: 'last_name', value: lastName }));
            dispatch(
              updateUserForm({ field: 'email_id', value: item.email_id })
            );
            dispatch(
              updateUserForm({
                field: 'mobile_number',
                value: item.mobile_number,
              })
            );
            dispatch(
              updateUserForm({
                field: 'assigned_dealer_name',
                value: item.dealer_owner,
              })
            );
            dispatch(
              updateUserForm({ field: 'role_name', value: item.role_name })
            );
            dispatch(
              updateUserForm({ field: 'add_region', value: item.region })
            );
            dispatch(
              updateUserForm({ field: 'team_name', value: item.team_name })
            );
            dispatch(
              updateUserForm({ field: 'description', value: item.description })
            );
            dispatch(
              updateUserForm({
                field: 'report_to',
                value: item.reporting_manager,
              })
            );
            setOpen(true);
          }}
        />
      </div>
    </>
  );
};

export default UserManagement;
