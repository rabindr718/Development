import React, { SetStateAction } from 'react';
import { PiCircle } from 'react-icons/pi';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { EvCharger, PoolPump, WellPump, Spa } from '../icons';
import { IPrimary, ISecondary } from '..';
import { CgClose } from 'react-icons/cg';
import Input from '../../components/text_input/Input';
interface IPopPupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  primaryDetail: IPrimary;
  secondaryDetail: ISecondary;
  address: string;
  squareFoot: number;
  systemSize: number;
  note: string;
}
const primaryApplicances = [
  { name: 'Water heater', id: 1, key: 'water_heater' },
  { name: 'Cooking appliances', id: 2, key: 'cooking_appliances' },
  { name: 'Furnace', id: 3, key: 'furnace' },
  { name: 'Clothes dryer', id: 4, key: 'clothes_dryer' },
];
const secondaryApplicances = [
  {
    name: 'Pool pump',
    id: 5,
    icon: <PoolPump color="#000" />,
    key: 'pool_pump',
  },
  {
    name: 'Well pump',
    id: 6,
    icon: <WellPump color="#000" />,
    key: 'well_pump',
  },
  {
    name: 'EV charger',
    id: 7,
    icon: <EvCharger color="#000" />,
    key: 'ev_charger',
  },
  { name: 'Spa', id: 8, icon: <Spa />, key: 'spa' },
];
const AppliancePopup = ({
  isOpen,
  setIsOpen,
  primaryDetail,
  secondaryDetail,
  squareFoot,
  address,
  systemSize,
  note = '',
}: IPopPupProps) => {
  return (
    <div className="transparent-model p3">
      <div
        className="scrollbar modal px2 py3  relative"
        style={{ maxHeight: 560 }}
      >
        <div
          className="absolute pointer"
          onClick={() => setIsOpen(false)}
          style={{ right: 20, top: 17 }}
        >
          <CgClose size={16} color="#0000004d" />
        </div>

        <div
          className="calc-input-wrapper relative mb2"
          style={{ width: '100%' }}
        >
          <Input
            type="text"
            name=""
            label="Home Address"
            placeholder={'Prospect Name'}
            value={address}
            readOnly
            onChange={() => 0}
          />
        </div>

        <div
          className="calc-input-wrapper relative mb2"
          style={{ width: '100%' }}
        >
          <Input
            type="text"
            name=""
            label="System Size"
            placeholder={'System Size'}
            value={`${systemSize}`}
            readOnly
            disabled
            onChange={() => 0}
          />
        </div>

        <div
          className="calc-input-wrapper relative mb2"
          style={{ width: '100%' }}
        >
          <Input
            type="text"
            name=""
            label="House's Square Foot"
            placeholder={'Prospect Name'}
            value={`${squareFoot}`}
            readOnly
            disabled
            onChange={() => 0}
          />
        </div>

        <div
          className="calc-input-wrapper relative mb2"
          style={{ width: '100%' }}
        >
          {note.trim() && (
            <Input
              type="text"
              name=""
              label="Note"
              placeholder={'Note'}
              value={note}
              readOnly
              onChange={() => 0}
            />
          )}
        </div>

        <div className="sr-appliance-wrapper">
          <div className="sr-appliance-header flex items-center">
            <div className="text-sm" style={{ flexBasis: '60%' }}>
              <h4 className="text-dark-navy">Primary appliances</h4>
            </div>

            <div
              className="text-sm text-center"
              style={{ flexBasis: '20%', flexShrink: 0 }}
            >
              <h4 className="text-dark-navy">Electric</h4>
            </div>

            <div
              className="text-sm end"
              style={{ flexBasis: '20%', flexShrink: 0 }}
            >
              <h4 className="text-dark-navy right-align">Gas</h4>
            </div>
          </div>
          <div className="sr-appliance-body">
            {primaryApplicances.map((appliance, ind: number) => {
              return (
                <div key={ind} className="flex mb2 items-center">
                  <div style={{ flexBasis: '60%' }}>
                    <h5 className="text-dark-navy" style={{ fontWeight: 500 }}>
                      {appliance.name}
                    </h5>
                  </div>

                  <div style={{ flexBasis: '20%', flexShrink: 0 }}>
                    {primaryDetail?.[
                      appliance.key as keyof typeof primaryDetail
                    ] === 'electric' ? (
                      <IoCheckmarkCircle
                        color="#129537"
                        size={20}
                        className="block mx-auto pointer"
                      />
                    ) : (
                      <PiCircle
                        color="#A2A2A2"
                        size={20}
                        className="block mx-auto pointer "
                      />
                    )}
                  </div>

                  <div
                    className="text-sm end"
                    style={{ flexBasis: '20%', flexShrink: 0 }}
                  >
                    {primaryDetail?.[
                      appliance.key as keyof typeof primaryDetail
                    ] === 'gas' ? (
                      <IoCheckmarkCircle
                        color="#129537"
                        size={20}
                        className="block ml-auto pointer"
                      />
                    ) : (
                      <PiCircle
                        color="#A2A2A2"
                        size={20}
                        className="block ml-auto pointer "
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sr-appliance-wrapper mt2">
          <div className="sr-appliance-header">
            <div className="text-sm">
              <h4 className="text-dark-navy">Secondary appliances</h4>
            </div>
            <p style={{ color: '#7F7F7F', fontSize: 12 }}>
              select appliances installed in house
            </p>
          </div>
          <div className="sr-appliance-body">
            {secondaryApplicances.map((appliance, ind) => {
              return (
                <div key={appliance.id} className="flex mb2 items-center">
                  <div style={{ flexBasis: '15%' }}>{appliance.icon}</div>
                  <div style={{ flexBasis: '65%' }}>
                    <h5 className="text-dark-navy" style={{ fontWeight: 500 }}>
                      {appliance.name}
                    </h5>
                  </div>

                  <div
                    className="text-sm end"
                    style={{ flexBasis: '20%', flexShrink: 0 }}
                  >
                    {secondaryDetail?.[
                      appliance.key as keyof typeof secondaryDetail
                    ] ? (
                      <IoCheckmarkCircle
                        color="#129537"
                        size={20}
                        className="block ml-auto pointer"
                      />
                    ) : (
                      <PiCircle
                        color="#A2A2A2"
                        size={20}
                        className="block ml-auto pointer "
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliancePopup;
