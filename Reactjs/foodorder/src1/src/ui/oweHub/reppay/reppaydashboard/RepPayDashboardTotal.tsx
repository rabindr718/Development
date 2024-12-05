import React, { useEffect, useState } from 'react';
import { ICONS } from '../../../../resources/icons/Icons';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';

const RepPayDashboardTotal: React.FC = () => {
  const [repPayData, setRepPayData] = useState({
    amount_prepaid: 0,
    pipeline_remaining: 0,
    current_due: 0,
  });

  useEffect(() => {
    (async () => {
      const data = await postCaller('get_reppay_tiledata', { dealer: 'ALL' });
      if (data.status > 201) {
        toast.error(data?.message);
      } else {
        setRepPayData(data.data);
      }
      console.log(data, 'dataaaa');
    })();
  }, []);

  const data = [
    {
      doller: `$${repPayData.amount_prepaid.toLocaleString()}`,
      paid: 'Amount Prepaid',
      img: ICONS.rep1,
      border: '1px solid #63BC51',
      boxBorder: '0.5px solid #63BC51',
      background: ICONS.tot1,
    },
    {
      doller: `$${repPayData.pipeline_remaining.toLocaleString()}`,
      paid: 'Pipeline Remaining',
      img: ICONS.rep2,
      border: '1px solid #D768A8',
      boxBorder: '0.5px solid #D768A8',
      background: ICONS.tot2,
    },
    {
      doller: `$${repPayData.current_due.toLocaleString()}`,
      paid: 'Current Due',
      img: ICONS.rep3,
      border: '1px solid #3993D0',
      boxBorder: '0.5px solid #3993D0',
      background: ICONS.tot3,
    },
  ];

  return (
    <>
      <div className="">
        <div className="commission-section-dash">
          {data.length > 0
            ? data.map((el, i) => (
                <div
                  key={i}
                  className="total-rep"
                  style={{
                    backgroundImage: `url(${el.background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div
                    className="rep-total-section"
                    style={{ marginBottom: '8px' }}
                  >
                    <p>{el.paid}</p>
                    {/* <h4 style={{ wordBreak: 'break-all' }}>{el.doller}</h4> */}
                    <h4
                      style={{
                        wordBreak:
                          el.doller.length > 5 ? 'break-all' : 'normal',
                      }}
                    >
                      {el.doller}
                    </h4>
                  </div>
                  <div className="rep-teamImg">
                    <img src={el.img} alt="" />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default RepPayDashboardTotal;
