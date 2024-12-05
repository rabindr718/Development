import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './styles/index.module.css';
import Input from '../../components/text_input/Input';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { AiFillMinusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Pagination from '../../components/pagination/Pagination';
import { Link } from 'react-router-dom';
import MicroLoader from '../../components/loader/MicroLoader';
import DataNotFound from '../../components/loader/DataNotFound';
import { useDebounce } from '../../../hooks/useDebounce';
import Switch from '../../components/Switch';
const PendingQueue = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [active, setActive] = useState<'all' | 'ntp' | 'co' | 'qc'>('ntp');
  const [loading, setLoading] = useState(false);
  const [tileData, setTileData] = useState<any>('');
  const [load, setLoad] = useState(false);
  const [dataPending, setDataPending] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalcount, setTotalcount] = useState(0);
  const [pre, setPre] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      setLoad(true);
      try {
        const data = await postCaller('get_pendingqueuestiledata', {});

        if (data.status > 201) {
          toast.error(data.message);
          return;
        }
        setTileData(data.data);
        setLoad(false);
      } catch (error) {
        console.error(error);
      } finally {
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await postCaller('get_pendingqueuesdata', {
          page_size: debouncedSearch ? 10 : itemsPerPage,
          page_number: debouncedSearch ? 1 : page,
          selected_pending_stage: active,
          unique_ids: [debouncedSearch],
        });

        if (data.status > 201) {
          toast.error(data.message);
          return;
        }
        console.log(data?.dbRecCount, 'totalcount');
        setDataPending(data.data);
        setTotalcount(data?.dbRecCount || 0);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
      }
    })();
  }, [page, itemsPerPage, debouncedSearch, active]);

  const getStatusColor = (status: string) => {
    if (status === 'Pending (Action Required)') {
      return styles.action_required_card;
    }

    switch (status) {
      case 'Pending':
        return styles.warning_card;
      case 'Completed':
        return styles.success_card;
      default:
        return styles.default_card;
    }
  };

  const totalPages = Math.ceil(totalcount / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = page * itemsPerPage;

  return (
    <>
      <div
        style={{ borderRadius: 16 }}
        className="flex items-center bg-white px2 justify-between"
      >
        {/* <div className="flex items-center">
       
          <Switch checked={pre} onChange={() => {
            if (pre && active === 'qc') {
              setActive('ntp')
            }
            setPre(prev => !prev)

          }} />
             <label htmlFor="" className='ml2'>Pre Sales</label>
        </div> */}
      </div>
      {
        <div
          className={` ${pre ? styles.grid_3 : styles.grid_2} ${styles.pending_card_wrapper}`}
        >
          {load ? (
            <div
              style={{ gridTemplateColumns: '1/4' }}
              className="flex items-center justify-center"
            >
              <MicroLoader />
            </div>
          ) : (
            <>
              <div
                className={styles.pending_card}
                onClick={() => {
                  setActive('ntp'), setPage(1), setSearch('');
                }}
              >
                <div
                  className={` ${styles.disbaled_card} ${active === 'ntp' ? styles.active_card : styles.pending_card_hover} ${styles.pending_card_inner}`}
                >
                  <h5 className={styles.pending_stats}>
                    {tileData.ntp_pending_count || '0'}
                  </h5>
                  <div style={{ lineHeight: '1.2rem' }}>
                    <h5
                      className={styles.pending_card_title}
                      style={{ fontWeight: 500 }}
                    >
                      NTP Pending
                    </h5>
                    <p className={styles.pending_card_desc}>
                      Click to see all pending actions in NTP
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={styles.pending_card}
                onClick={() => {
                  setActive('co'), setPage(1), setSearch('');
                }}
              >
                <div
                  className={` ${active === 'co' ? styles.active_card : styles.pending_card_hover} ${styles.pending_card_inner}`}
                >
                  <h5 className={styles.pending_stats}>
                    {tileData.co_pending_count || '0'}
                  </h5>
                  <div style={{ lineHeight: '1.2rem' }}>
                    <h5
                      className={styles.pending_card_title}
                      style={{ fontWeight: 500 }}
                    >
                      C/O Pending
                    </h5>
                    <p className={styles.pending_card_desc}>
                      Click to see all pending actions in C/O
                    </p>
                  </div>
                </div>
              </div>
              {pre && (
                <div
                  className={styles.pending_card}
                  onClick={
                    pre
                      ? () => {
                        setActive('qc');
                        setPage(1);
                        setSearch('');
                      }
                      : undefined
                  }
                >
                  <div
                    className={` ${pre ? '' : styles.disabled_card} ${active === 'qc' ? styles.active_card : pre ? styles.pending_card_hover : ''} ${styles.pending_card_inner}`}
                  >
                    {pre && (
                      <h5 className={styles.pending_stats}>
                        {tileData.qc_pending_count || '0'}
                      </h5>
                    )}
                    <div style={{ lineHeight: '1.2rem' }}>
                      <h5
                        className={styles.pending_card_title}
                        style={{ fontWeight: 500 }}
                      >
                        QC Pending
                      </h5>
                      <p className={styles.pending_card_desc}>
                        Click to see all pending actions in QC
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      }

      <div
        className="project-container pend-actions-cont"
        style={{ marginTop: '1.2rem', padding: 0 }}
      >
        <div className="performance-table-heading">
          <div
            className={`flex  py2 items-center justify-between ${styles.pending_queue_table_header}`}
          >
            <div className={styles.pendingQueHead}>
              <h3
                className={` ${styles.table_heading}`}
                style={{ fontWeight: 600, fontSize: 16 }}
              >
                {active === 'qc'
                  ? 'QC Checklist'
                  : active === 'ntp'
                    ? 'NTP Checklist'
                    : 'C/O Status'}
              </h3>
              <div
                className={`performance-box-container ${styles.pendingBoxContainer}`}
                style={{ padding: '0.7rem 1rem' }}
              >
                <p className="status-indicator">Checklist Indicators</p>
                <div className="progress-box-body">
                  <div
                    className="progress-box"
                    style={{ background: '#2EAF71', borderRadius: '2px' }}
                  ></div>
                  <p>Completed</p>
                </div>
                <div className="progress-box-body">
                  <div
                    className="progress-box"
                    style={{ background: '#EBA900', borderRadius: '2px' }}
                  ></div>
                  <p>Pending OWE</p>
                </div>
                <div className="progress-box-body">
                  <div
                    className="progress-box"
                    style={{ background: '#E14514', borderRadius: '2px' }}
                  ></div>
                  <p>Sale Rep Action Required</p>
                </div>
              </div>
            </div>
            <div className={styles.search_wrapper}>
              <Input
                type="text"
                placeholder="Search for Unique ID or Name"
                value={search}
                name="Search for Unique ID or Name"
                onChange={(e) => {
                  const input = e.target.value;
                  const regex = /^[a-zA-Z0-9\s]*$/; // Allow only alphanumeric and spaces

                  if (regex.test(input)) {
                    setSearch(input); // Only update state if input is valid
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="performance-milestone-table pendingActionTable">
          <table>
            <thead>
              <tr>
                <th style={{ padding: '0px' }}>
                  <div className="milestone-header">
                    <div className="project-info">
                      <p>Project Info</p>
                    </div>
                    <div className="header-milestone">
                      <p> Checklist Details</p>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex items-center justify-center">
                      <MicroLoader />
                    </div>
                  </td>
                </tr>
              ) : dataPending.length ? (
                dataPending.map((item: any, index: number) => (
                  <tr key={index}>
                    <td style={{ padding: '0px' }}>
                      <div className="milestone-data" style={{paddingBottom: "1.5rem"}}>
                        <Link
                          to={`/project-management?project_id=${item.uninque_id}&customer-name=${item.home_owner}`}
                        >
                          <div
                            className="project-info-details deco-text"
                            style={{ flexShrink: 0 }}
                          >
                            <h3 className={`customer-name`}>
                              {item.home_owner}
                            </h3>
                            <p className={`install-update`}>
                              {item.uninque_id}
                            </p>
                          </div>
                        </Link>
                        <div
                          style={{ gap: 20 }}
                          className="flex flex-auto items-center"
                        >
                          {active === 'co' ? (
                            item.co_status ? (
                              <div
                                className={`items-center ${styles.warning_card} ${styles.outline_card_wrapper}`}
                              >
                                <AiFillMinusCircle
                                  size={24}
                                  className="mr1"
                                  style={{ flexShrink: 0 }}
                                  color={'#EBA900'}
                                />
                                <span
                                  style={{
                                    fontWeight: 500,
                                    fontSize: 14,
                                  }}
                                >
                                  {item.co_status
                                    .replace(/_/g, ' ')
                                    .replace(/\b\w/g, (char: any) =>
                                      char.toUpperCase()
                                    )}
                                </span>
                              </div>
                            ) : (
                              <p className="no-data">No data available</p>
                            )
                          ) : (
                            Object.keys(item[active] || {}).map((key) => {
                              if (
                                (active === 'ntp' &&
                                  key === 'action_required_count') ||
                                (active === 'qc' &&
                                  key === 'qc_action_required_count') ||
                                item[active][key] === ''
                              ) {
                                return null;
                              }

                              return (
                                <div
                                  key={key}
                                  className={`items-center ${getStatusColor(item[active][key])} ${styles.outline_card_wrapper}`}
                                >
                                  <AiFillMinusCircle
                                    size={24}
                                    className="mr1"
                                    color={
                                      item[active][key] ===
                                        'Pending (Action Required)'
                                        ? '#E14514'
                                        : item[active][key] === 'Pending'
                                          ? '#EBA900'
                                          : '#2EAF71'
                                    }
                                  />
                                  <span
                                    style={{
                                      fontWeight: 500,
                                      fontSize: 14,
                                    }}
                                  >
                                    {key
                                      .replace(/_/g, ' ')
                                      .replace(/\b\w/g, (char) =>
                                        char.toUpperCase()
                                      )}
                                  </span>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <div className="flex items-center justify-center">
                      <DataNotFound />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="page-heading-container">
          {dataPending?.length > 0 ? (
            <>
              <p className="page-heading">
                Showing {startIndex} -{' '}
                {endIndex > totalcount ? totalcount : endIndex} of{' '}
                {totalcount} item
              </p>

              <Pagination
                currentPage={page}
                totalPages={totalPages} // You need to calculate total pages
                paginate={(num) => setPage(num)}
                currentPageData={dataPending}
                goToNextPage={() => setPage(page + 1)}
                goToPrevPage={() => setPage(page - 1)}
                perPage={itemsPerPage}
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PendingQueue;
