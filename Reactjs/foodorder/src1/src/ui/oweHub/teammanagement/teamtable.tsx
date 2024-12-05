import React, { useEffect, useState, useRef } from 'react';
import '../userManagement/user.css';
import '../configure/configure.css';
import { FaArrowDown } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Pagination from '../../components/pagination/Pagination';
import { ICONS } from '../../../resources/icons/Icons';
import './dashboard.css';
import AddMember from './NewMember/AddMember';
import MoveMember from './NewMember/MoveMember';
import { ROUTES } from '../../../routes/routes';
import { useParams, useLocation, Routes } from 'react-router-dom';
import { getTeam } from '../../../redux/apiActions/teamManagement/teamManagement';
import { BiEditAlt } from 'react-icons/bi';
import { MdOutlineDone } from 'react-icons/md';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import { TYPE_OF_USER } from '../../../resources/static_data/Constant';
import MicroLoader from '../../components/loader/MicroLoader';
import DataNotFound from '../../components/loader/DataNotFound';
import { showAlert } from '../../components/alert/ShowAlert';
import { checkLastPage } from '../../../utiles';
import useMatchMedia from '../../../hooks/useMatchMedia';
import useAuth from '../../../hooks/useAuth';

interface User {
  name: string;
  phoneNumber: string;
  emailId: string;
  nameRemoved: string;
}

const TeamTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMember] = useState<any>(null);
  const [, setRefetch] = useState(1);
  const [open1, setOpen1] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { authData } = useAuth();

  const { team, isLoading, totalcount } = useAppSelector(
    (state) => state.teamManagmentSlice
  );

  const getQueryParams = (search: string) => new URLSearchParams(search);
  const queryParams = getQueryParams(location.search);
  const teamName = queryParams.get('team-name');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const [inputValue, setInputValue] = useState<string>(team?.team_name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const count = totalcount;
  const itemsPerPage = 10;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const totalPages = Math.ceil(count / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const currentPageData = team?.sale_rep_list?.slice() || [];
  const [updating, setUpdating] = useState(false);
  const role = authData?.role;
  const UserEmail = authData?.email;

  const onSubmitCreateUser = () => {
    console.log('User created');
    handleClose();
  };

  useEffect(() => {
    if (team?.team_name) {
      setInputValue(team?.team_name || '');
    }
  }, [team?.team_name]);

  useEffect(() => {
    if (teamName && id) {
      const data = {
        team_name: teamName,
        team_id: parseInt(id),
        page_number: currentPage,
        page_size: 10,
      };
      dispatch(getTeam(data));
    }
  }, [teamName, id, isRefresh, currentPage]);

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

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsEditing(true);
  };

  const handleDelete = async (id: any) => {
    const confirmed = await showAlert(
      'Are Your Sure',
      `This action will delete this user`,
      'Yes',
      'No'
    );
    if (confirmed) {
      try {
        const response = await postCaller('delete_team_member', {
          team_member_id: id,
          team_id: team?.team_id,
        });

        if (response.status > 201) {
          toast.error('Failed to delete user');
        }

        if (response.status === 200) {
          toast.success('Successfully Deleted');
          setIsRefresh((prev) => !prev);
          checkLastPage(
            currentPage,
            totalPages,
            setCurrentPage,
            1,
            currentPageData.length
          );
        }
      } catch (error) {
        console.error('There was an error deleting the team member:', error);
      }
    }
  };

  const handleUpdateName = async () => {
    if (updating) return; // Prevent multiple runs if already loading

    setUpdating(true); // Set loading state to true
    try {
      const response = await postCaller('update_team', {
        team_id: team?.team_id,
        team_name: inputValue, // Use inputValue instead of teamName
      });

      if (response.status > 201) {
        toast.error('Failed to Update Team Name');
      }

      if (response.status === 200) {
        toast.success('Team Name Update successfully');
        setIsRefresh((prev) => !prev);
        setIsEditing(false); // Exit edit mode after successful update
      }
    } catch (error) {
      console.error('There was an error updating the team name:', error);
    }
    setUpdating(false);
  };

  const isMobile = useMatchMedia('(max-width: 767px)');

  return (
    <>
      <div className="comm">
        {role === TYPE_OF_USER.ADMIN ||
        role === TYPE_OF_USER.DEALER_OWNER ||
        team?.logged_in_member_role === 'manager' ? (
          <>
            {open && (
              <AddMember
                handleClose={handleClose}
                onSubmitCreateUser={onSubmitCreateUser}
                team={team}
                setIsRefresh={setIsRefresh}
              />
            )}
          </>
        ) : null}

        {open1 && (
          <MoveMember
            handleClose1={handleClose1}
            onSubmitCreateUser={onSubmitCreateUser}
            member={selectedMember} // Add this line
            team={team}
            setRefetch={setRefetch}
          />
        )}
        <div className="dashBoard-container">
          <div className="team-table-top">
            <div className="team-members-top">
              <div className="team-members">
                <div className="team-table-container">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        ref={inputRef}
                        value={inputValue}
                        className="team-input"
                        onChange={(e) => {
                          if (e.target.value.length <= 200) {
                            setInputValue(e.target.value);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        readOnly={!isEditing}
                        style={{ width: isMobile ? '200px' : 'auto' }}
                      />
                    </>
                  ) : (
                    <h4
                      style={{
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        color: '#292B2E',
                        fontWeight: 600,
                      }}
                    >
                      {isMobile
                        ? inputValue.length > 15
                          ? inputValue.slice(0, 15).concat('...')
                          : inputValue
                        : inputValue.length > 20
                          ? inputValue.slice(0, 20).concat('...')
                          : inputValue}
                    </h4>
                  )}
                  <div>
                    {isEditing ? (
                      <div>
                        <MdOutlineDone
                          className="done-icon"
                          onClick={updating ? undefined : handleUpdateName}
                          style={{ pointerEvents: updating ? 'none' : 'auto' }}
                        />
                      </div>
                    ) : (
                      <div>
                        <BiEditAlt
                          className="edit-icon"
                          onClick={handleIconClick}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {inputValue.length === 200 && (
                  <span className="error-message">
                    Team Name cannot exceed 200 characters.
                  </span>
                )}
                <p>
                  {team?.manager_count}{' '}
                  {team?.manager_count > 1 ? 'Managers' : 'Manager'},{' '}
                  {team?.MemberCount}{' '}
                  {team?.MemberCount > 1 ? 'Members' : 'Member'}
                </p>
              </div>
            </div>

            {role !== TYPE_OF_USER.SALES_REPRESENTATIVE ? (
              <div className="team-button-sec">
                {team?.logged_in_member_role === 'manager' ||
                role === TYPE_OF_USER.ADMIN ||
                role === TYPE_OF_USER.FINANCE_ADMIN ||
                role === TYPE_OF_USER.DEALER_OWNER ||
                role === TYPE_OF_USER.SUB_DEALER_OWNER ? (
                  <button onClick={handleOpen}>
                    + <span>Add New Member</span>
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
          <div
            className="TableContainer"
            style={{ overflowX: 'auto', whiteSpace: 'nowrap', height: '85vh' }}
          >
            <table>
              <thead>
                <tr>
                  <th
                    style={{ paddingLeft: '34px' }}
                    onClick={() => handleSort('user_code')}
                  >
                    <div className="table-header">
                      <p>User Code</p>
                      <FaArrowDown
                        style={{
                          color: '#667085',
                          transform:
                            sortKey === 'user_code' && sortDirection === 'asc'
                              ? 'rotate(180deg)'
                              : undefined,
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div
                      className="table-header"
                      onClick={() => handleSort('sale_rep_name')}
                    >
                      <p>Name</p>
                      <FaArrowDown
                        style={{
                          color: '#667085',
                          transform:
                            sortKey === 'sale_rep_name' &&
                            sortDirection === 'asc'
                              ? 'rotate(180deg)'
                              : undefined,
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div
                      className="table-header"
                      onClick={() => handleSort('role')}
                    >
                      <p>Role</p>
                      <FaArrowDown
                        style={{
                          color: '#667085',
                          transform:
                            sortKey === 'role' && sortDirection === 'asc'
                              ? 'rotate(180deg)'
                              : undefined,
                        }}
                      />
                    </div>
                  </th>
                  <th onClick={() => handleSort('email_id')}>
                    <div
                      className="table-header"
                      style={{ paddingRight: '94px' }}
                    >
                      <p>Email ID</p>
                      <FaArrowDown
                        style={{
                          color: '#667085',
                          transform:
                            sortKey === 'email_id' && sortDirection === 'asc'
                              ? 'rotate(180deg)'
                              : undefined,
                        }}
                      />
                    </div>
                  </th>
                  <th onClick={() => handleSort('phone_number')}>
                    <div
                      className="table-header"
                      style={{ paddingRight: '34px' }}
                    >
                      <p>Phone Number</p>
                      <FaArrowDown
                        style={{
                          color: '#667085',
                          transform:
                            sortKey === 'phone_number' &&
                            sortDirection === 'asc'
                              ? 'rotate(180deg)'
                              : undefined,
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    {role !== TYPE_OF_USER.SALES_REPRESENTATIVE ? (
                      <div
                        className="table-header"
                        style={{ paddingRight: '34px' }}
                      >
                        <p>Action</p>
                      </div>
                    ) : null}
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <td colSpan={5}>
                    <div
                      style={{ width: '100%' }}
                      className="flex justify-center items-center"
                    >
                      <MicroLoader />
                    </div>
                  </td>
                ) : !Boolean(currentPageData) ? (
                  <td colSpan={5}>
                    <div
                      style={{ width: '100%' }}
                      className="flex justify-center items-center"
                    >
                      <DataNotFound />
                    </div>
                  </td>
                ) : (
                  currentPageData?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td
                        style={{
                          color: '#101828',
                          paddingLeft: '33px',
                          fontWeight: '500',
                        }}
                      >
                        {item.user_code || 'N/A'}
                      </td>
                      <td style={{ color: '#101828' }}>{item.sale_rep_name}</td>
                      <td style={{ color: '#101828' }}>
                        <p
                          className={
                            item.role === 'manager' ? 'user-mg' : 'user-namg'
                          }
                        >
                          {item.role}
                        </p>
                      </td>
                      <td style={{ color: '#101828' }}>{item.email_id}</td>
                      <td style={{ color: '#101828' }}>{item.phone_number}</td>
                      {role !== TYPE_OF_USER.SALES_REPRESENTATIVE && (
                        <td
                          className="zoom-out-help"
                          style={{
                            paddingLeft: '30px',
                            cursor:
                              UserEmail !== item.email &&
                              (role === TYPE_OF_USER.ADMIN ||
                                role === TYPE_OF_USER.DEALER_OWNER ||
                                role === TYPE_OF_USER.SUB_DEALER_OWNER ||
                                ((role === TYPE_OF_USER.SALE_MANAGER ||
                                role === TYPE_OF_USER.REGIONAL_MANGER
                                  ? UserEmail !== item.email_id
                                  : true) &&
                                  team?.logged_in_member_role === 'manager')) &&
                              !(
                                team?.manager_count <= 1 &&
                                item.role === 'manager'
                              )
                                ? 'pointer'
                                : 'not-allowed',
                            opacity:
                              (role === TYPE_OF_USER.ADMIN ||
                                role === TYPE_OF_USER.FINANCE_ADMIN ||
                                role === TYPE_OF_USER.DEALER_OWNER ||
                                role === TYPE_OF_USER.SUB_DEALER_OWNER ||
                                ((role === TYPE_OF_USER.SALE_MANAGER ||
                                role === TYPE_OF_USER.REGIONAL_MANGER
                                  ? UserEmail !== item.email_id
                                  : true) &&
                                  team?.logged_in_member_role === 'manager')) &&
                              !(
                                team?.manager_count <= 1 &&
                                item.role === 'manager'
                              )
                                ? '1'
                                : '0.5',
                          }}
                          onClick={(e) => {
                            if (
                              (role === TYPE_OF_USER.ADMIN ||
                                role === TYPE_OF_USER.FINANCE_ADMIN ||
                                role === TYPE_OF_USER.DEALER_OWNER ||
                                role === TYPE_OF_USER.SUB_DEALER_OWNER ||
                                ((role === TYPE_OF_USER.SALE_MANAGER ||
                                role === TYPE_OF_USER.REGIONAL_MANGER
                                  ? UserEmail !== item.email_id
                                  : true) &&
                                  team?.logged_in_member_role === 'manager') ||
                                role === TYPE_OF_USER.SUB_DEALER_OWNER) &&
                              !(
                                team?.manager_count <= 1 &&
                                item.role === 'manager'
                              )
                            ) {
                              handleDelete(item.team_member_id);
                            }
                          }}
                        >
                          <img
                            src={ICONS.deleteIcon}
                            style={{
                              height: '16px',
                              width: '15px',
                              stroke: '0.2',
                              pointerEvents:
                                role !== TYPE_OF_USER.SALES_REPRESENTATIVE &&
                                !(
                                  team?.manager_count <= 1 &&
                                  item.role === 'manager'
                                )
                                  ? 'auto'
                                  : 'none',
                            }}
                            alt=""
                          />
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {team?.sale_rep_list?.length > 0 ? (
            <div className="page-heading-container">
              <p className="page-heading">
                Showing {startIndex + 1} - {endIndex > count ? count : endIndex}{' '}
                of {count} items
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                currentPageData={currentPageData}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
                perPage={itemsPerPage}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TeamTable;
