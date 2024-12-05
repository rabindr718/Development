import React, { useState } from 'react';
import './dasboard.css';
import { CommissionModel } from '../../../core/models/configuration/create/CommissionModel';
import { ICONS } from '../../../resources/icons/Icons';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface ButtonProps {
  editMode: boolean;
  handleClose: () => void;
  commission: CommissionModel | null;
  data?: any;
}
interface BreakdownAccordionProps {
  el: Record<string, any>; // You can replace `Record<string, any>` with a more specific type if you know the shape of `el`
}

const BreakdownAccordion: React.FC<BreakdownAccordionProps> = ({ el }) => {
  console.log(el, 'el');

  return (
    <>
      <tr>
        <td colSpan={2} style={{ paddingLeft: '2.5rem' }}>
          Additional content goes here
        </td>
      </tr>
      <tr>
        <td style={{ paddingLeft: '2.5rem' }}>Small System Size</td>
        <td style={{textAlign:'center'}}>{el.small_system_size}</td>
      </tr>
      <tr>
        <td style={{ paddingLeft: '2.5rem' }}>Credit</td>
        <td style={{textAlign:'center'}}>{el.credit}</td>
      </tr>
      <tr>
        <td style={{ paddingLeft: '2.5rem' }}>Referral</td>
        <td style={{textAlign:'center'}}>{el.referral}</td>
      </tr>
      <tr>
        <td style={{ paddingLeft: '2.5rem' }}>Rebates</td>
        <td style={{textAlign:'center'}}>{el.rebates}</td>
      </tr>
    </>
  );
};

const ProjectBreakdown: React.FC<ButtonProps> = ({ handleClose, data }) => {
  const [toggleOpen, setToggleOpen] = useState(false);

 
  return (
    <div className="transparent-model-down">
      <form action="" className="modal-down-break">
        <div className="breakdown-container">
          <div className="project-section">
            <h5>Project Breakdown</h5>
            {/* <h4>{data?.}</h4> */}

          </div>
          <div className="breakdown-img" onClick={handleClose}>
            <img className="close-popup-btn" src={ICONS.closeIcon} alt="" />
          </div>
        </div>
        <div className="modal-body-down">
          <div className="breakdown-table">
            <table>
              <thead>
                <tr>
                  <th>Home Owner</th>
                  <th style={{textAlign:'center'}}>{data?.home_owner}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>watt</td>
                  <td style={{textAlign:'center'}}>{data?.watt}</td>
                </tr>
                <tr>
                  <td>Contract</td>
                  <td style={{textAlign:'center'}}>{data?.contract || 'N/A'}</td>
                </tr>
                <tr>
                  <td>Base</td>
                  <td style={{textAlign:'center'}}>{data?.base}</td>
                </tr>
                <tr>
                  <td>Marketing</td>
                  <td style={{textAlign:'center'}}>{data?.Marketing || 0}</td>
                </tr>

                <tr
                  onClick={() => setToggleOpen(!toggleOpen)}
                  style={{ backgroundColor: '#D5E4FF' }}
                >
                  <td style={{ cursor: 'pointer',fontSize: "14px", fontWeight: 600 }}>
                    Adder{' '}
                    {toggleOpen ? (
                      <IoIosArrowUp className="add-arrow-icon up" />
                    ) : (
                      <IoIosArrowDown className="add-arrow-icon down" />
                    )}
                  </td>

                  <td></td>
                </tr>
                {toggleOpen && <BreakdownAccordion el={data.adder} />}
                <tr>
                  <td>Loan Fee</td>
                  <td style={{textAlign:'center'}}>{data?.loan_fee || 0}</td>
                </tr>
                <tr>
                  <td>EPC</td>
                  <td style={{textAlign:'center'}}>{data?.epc || 0}</td>
                </tr>
                <tr>
                  <td>NET EPC - Adders</td>
                  <td style={{textAlign:'center'}}>{data?.net_epc || 0}</td>
                </tr>

                <tr>
                  <td>Commissions</td>
                  <td style={{textAlign:'center'}}>{data?.commission || 0}</td>
                </tr>
                <tr>
                  <td>Paid</td>
                  <td style={{textAlign:'center'}}>{data?.paid || 0}</td>
                </tr>
                <tr>
                  <td>Expected COMM</td>
                  <td style={{textAlign:'center'}}>{data?.expected_comm || 0}</td>
                </tr>

                <tr>
                  <td>ONYX - Dealer - 30%</td>
                  <td style={{textAlign:'center'}}>{data?.onyx_dealer_30_perc || 0}</td>
                </tr>
                <tr>
                  <td>ONYX - Sales rep - 20%</td>
                  <td style={{textAlign:'center'}}>{data?.onyx_sales_rep_20_perc || 0}</td>
                </tr>
                <tr>
                  <td>P&S - 30%</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectBreakdown;
