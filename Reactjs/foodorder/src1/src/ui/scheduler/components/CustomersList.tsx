import React, { memo, useState, useEffect, SetStateAction } from 'react';
import styles from '../styles/index.module.css';
import Customer from './Customer';
import SortingDropDown from './SortingDropdown/SortingDropDown';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import DataNotFound from '../../components/loader/DataNotFound';
import MicroLoader from '../../components/loader/MicroLoader';
export interface ICustomer {
  roof_type: string;
  home_owner: string;
  customer_email: string;
  customer_phone_number: string;
  system_size: number;
  address: string;
}
const customers = [
  {
    roof_type: 'ABC',
    home_owner: 'test',
    customer_email: 'test@gmail.com',
    customer_phone_number: '8840957619',
    system_size: 10,
    address: 'Noida India',
  },
];
const CustomersList = ({
  page = 1,
  setPage,
  setTotalCount,
}: {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  setTotalCount: React.Dispatch<SetStateAction<number>>;
}) => {
  const [active, setActive] = useState<'priority' | 'travel' | 'regular'>(
    'priority'
  );
  const [isPending, setIsPending] = useState(true);
  const itemsPerPage = 10;
  const [customer, setCustomers] = useState<ICustomer[]>(customers);
  const [order, setOrder] = useState('asc');
  const getCustomers = async () => {
    try {
      setIsPending(true);
      setTotalCount(0);
      const data = await postCaller('scheduling_home', {
        page_number: page,
        page_size: itemsPerPage,
        queue: active,
        order: order,
      });
      if (data.status > 201) {
        setIsPending(false);
        toast.error((data as Error).message as string);
        return;
      }
      setCustomers(data?.data?.scheduling_list || customers);
      setIsPending(false);
      setTotalCount(data?.dbRecCount || 0);
    } catch (error) {
      setIsPending(false);
      toast.error((error as Error).message as string);
    }
  };

  useEffect(() => {
    getCustomers();
  }, [page, active, itemsPerPage, order]);
  return (
    <>
      <div className={`flex items-center justify-between`}>
        <div className="flex items-center">
          <div
            role="button"
            className={`${styles.schedule_tab} ${active === 'priority' ? styles.active : ''} items-center flex `}
            onClick={() => {
              setActive('priority');
              setPage(1);
            }}
          >
            <div
              className={`${styles.schedule_stats}  flex items-center justify-center`}
            >
              14
            </div>
            <span>Priority</span>
          </div>

          <div
            role="button"
            className={`${styles.schedule_tab} ${active === 'travel' ? styles.active : ''} flex items-center`}
            onClick={() => setActive('travel')}
          >
            <div
              className={`${styles.schedule_stats} flex items-center justify-center`}
            >
              24
            </div>
            <span>Travel</span>
          </div>

          <div
            role="button"
            className={`${styles.schedule_tab} ${active === 'regular' ? styles.active : ''} flex items-center`}
            onClick={() => setActive('regular')}
          >
            <div
              className={`${styles.schedule_stats} flex items-center justify-center`}
            >
              24
            </div>
            <span>Regular</span>
          </div>
        </div>
        <SortingDropDown onChange={(val) => setOrder(val)} />
      </div>

      <div style={{ marginTop: 15 }}>
        {isPending ? (
          <div className="flex my3 items-center justify-center">
            <MicroLoader />
          </div>
        ) : !Boolean(customer.length) || !customer ? (
          <div className="flex mb4 items-center justify-center">
            <DataNotFound />
          </div>
        ) : (
          customer.map((item, index) => {
            return (
              <Customer
                roofType={item.roof_type}
                name={item.home_owner}
                email={item.customer_email}
                withSecondaryBtn={active === 'travel'}
                mobile={item.customer_phone_number}
                sysSize={item.system_size}
                key={index}
                mapStyles={{ flexBasis: '265px' }}
                address={item.address}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default memo(CustomersList);
