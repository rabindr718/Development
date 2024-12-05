import React, { useEffect, useMemo, useRef, useState } from 'react';
import './sidebar.css';
import { Link, Routes, useLocation } from 'react-router-dom';
import { createSideMenuList } from '../../../routes/SideMenuOption';
import useMatchMedia from '../../../hooks/useMatchMedia';
import { TYPE_OF_USER } from '../../../resources/static_data/Constant';
import { ROUTES } from '../../../routes/routes';
import useAuth from '../../../hooks/useAuth';

interface Child {
  path: string;
  sidebarProps: {
    displayText: string;
    icon: React.JSX.Element;
  };
}
interface Toggleprops {
  toggleOpen: boolean;
  setToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarChange: React.Dispatch<React.SetStateAction<number>>;
  sidebarChange: number;
}

const Sidebar: React.FC<Toggleprops> = ({ toggleOpen, setToggleOpen }) => {
  const [, setDb] = useState<boolean>(false);
  const [, setProject] = useState<boolean>(false);
  const [cords, setCords] = useState<{
    left: number;
    top: number;
    opacity: number;
    text: string;
    child: Child[];
    id?: number;
  }>({ left: 0, top: 0, opacity: 0, text: '', child: [], id: -1 });
  const isTablet = useMatchMedia('(max-width: 1024px)');
  const location = useLocation();
  const timeOut = useRef<NodeJS.Timeout | null>(null);

  const role = localStorage.getItem('role');

  const filteredList = () => {
    let list = [...createSideMenuList()];
    const isStaging = process.env.REACT_APP_ENV;

    if (role === TYPE_OF_USER.ADMIN) {
      const newArr: any[] = [{ mob: [] }];
      list[0].mob.forEach((item: any) => {
        if (
          isStaging !== 'staging' &&
          (item.path === ROUTES.COMMISSION_DASHBOARD ||
            item.path === ROUTES.CONFIG_PAGE ||
            item.path === ROUTES.SALES_REP_SCHEDULER ||
           
            item.path === ROUTES.LEAD_MANAGEMENT) 
        ) {
        } else {
          newArr[0].mob.push(item);
        }
      });
      return newArr;
    } else if (role === TYPE_OF_USER.DEALER_OWNER) {
      const newArr: any[] = [{ mob: [] }];
      list[0].mob.forEach((item: any) => {
        if (
          (isStaging !== 'staging' &&
            (item.path === ROUTES.COMMISSION_DASHBOARD ||
              item.path === ROUTES.CONFIG_PAGE ||
             
              item.path === ROUTES.SALES_REP_SCHEDULER ||
              item.path === ROUTES.LEAD_MANAGEMENT))
        ) {
        } else if (item.path !== ROUTES.CONFIG_PAGE && item.path !== ROUTES.CALCULATOR) {
          newArr[0].mob.push(item);
        }
      });
      return newArr;
    } else if (role === TYPE_OF_USER.SALES_REPRESENTATIVE) {
      const newArr: any[] = [{ mob: [] }];
      list[0].mob.forEach((item: any) => {
        if (
          isStaging !== 'staging' &&
          (item.path === ROUTES.COMMISSION_DASHBOARD ||
            item.path === ROUTES.CONFIG_PAGE ||
           
            item.path === ROUTES.SALES_REP_SCHEDULER ||
            item.path === ROUTES.LEAD_MANAGEMENT)
        ) {
        } else if (
          item.path !== ROUTES.USER_MANAEMENT &&
          item.path !== ROUTES.CONFIG_PAGE &&
          item.path !== ROUTES.COMMISSION_DASHBOARD &&
          item.path !== ROUTES.CALCULATOR
        ) {
          newArr[0].mob.push(item);
        }
      });
      return newArr;
    } else if (
      role === TYPE_OF_USER.REGIONAL_MANGER ||
      role === TYPE_OF_USER.SALE_MANAGER
    ) {
      const newArr: any[] = [{ mob: [] }];
      list[0].mob.forEach((item: any) => {
        if (
          (isStaging !== 'staging' &&
            (item.path === ROUTES.COMMISSION_DASHBOARD ||
              item.path === ROUTES.CONFIG_PAGE ||
             
              item.path === ROUTES.SALES_REP_SCHEDULER ||
              item.path === ROUTES.SALES_REP_SCHEDULER ||
              item.path === ROUTES.LEAD_MANAGEMENT))
        ) {
        } else if (
          item.path !== ROUTES.USER_MANAEMENT &&
          item.path !== ROUTES.CONFIG_PAGE &&
          item.path !== ROUTES.COMMISSION_DASHBOARD &&
          item.path !== ROUTES.CALCULATOR
        ) {
          newArr[0].mob.push(item);
        }
      });
      return newArr;
    } else if (role === TYPE_OF_USER.FINANCE_ADMIN) {
      const newArr: any[] = [{ mob: [] }];
      list[0].mob.forEach((item: any) => {
        if (item.path !== ROUTES.USER_MANAEMENT ) {
          if (
            (isStaging !== 'staging' &&
              (item.path === ROUTES.COMMISSION_DASHBOARD ||
                item.path === ROUTES.CONFIG_PAGE ||
               
                item.path === ROUTES.SALES_REP_SCHEDULER||
            item.path === ROUTES.LEAD_MANAGEMENT))
          ) {
          } else {
            newArr[0].mob.push(item);
          }
        }
      });
      return newArr;
    } else if (role === TYPE_OF_USER.APPOINTMENT_SETTER) {
      const newArr: any[] = [{ mob: [] }];
      list[0].mob.forEach((item: any) => {
        if (
          item.path !== ROUTES.TEAM_MANAGEMENT_DASHBOARD &&
          item.path !== ROUTES.USER_MANAEMENT 
        ) {
          if (
            isStaging !== 'staging' &&
            (item.path === ROUTES.COMMISSION_DASHBOARD ||
              item.path === ROUTES.CONFIG_PAGE ||
             
              item.path === ROUTES.SALES_REP_SCHEDULER ||
              item.path === ROUTES.LEAD_MANAGEMENT)
          ) {
          } else if (
            item.path !== ROUTES.USER_MANAEMENT &&
            item.path !== ROUTES.CONFIG_PAGE &&
            item.path !== ROUTES.COMMISSION_DASHBOARD &&
            item.path !== ROUTES.CALCULATOR
          ) {
            newArr[0].mob.push(item);
          }
        }
      });
      return newArr;
    } else if (
      role === TYPE_OF_USER.ACCOUNT_EXCUTIVE ||
      role === TYPE_OF_USER.ACCOUNT_MANAGER
    ) {
      const newArr: any[] = [{ mob: [] }];
      list[0].mob.forEach((item: any) => {
        if (item.path !== ROUTES.USER_MANAEMENT) {
          if (
            (isStaging !== 'staging' &&
              (item.path === ROUTES.COMMISSION_DASHBOARD ||
                item.path === ROUTES.CONFIG_PAGE ||
               
                item.path === ROUTES.SALES_REP_SCHEDULER ||
            item.path === ROUTES.LEAD_MANAGEMENT))
          ) {
          } else if (
            item.path !== ROUTES.USER_MANAEMENT &&
            item.path !== ROUTES.CONFIG_PAGE &&
            item.path !== ROUTES.TEAM_MANAGEMENT_DASHBOARD 
          ) {
            newArr[0].mob.push(item);
          }
        }
      });
      return newArr;
    } else if (role === TYPE_OF_USER.DB_USER) {
      const newArr: any[] = [{ mob: [] }];
      list[0].mob.forEach((item: any) => {
        if (
          item.path !== ROUTES.TEAM_MANAGEMENT_DASHBOARD &&
          item.path !== ROUTES.USER_MANAEMENT &&
          item.path !== ROUTES.PROJECT_PERFORMANCE &&
          item.path !== ROUTES.PROJECT_STATUS &&
          item.path !== ROUTES.LEAD_MANAGEMENT
        ) {
          if (
            (isStaging !== 'staging' &&
              (item.path === ROUTES.COMMISSION_DASHBOARD ||
                item.path === ROUTES.CONFIG_PAGE ||
               
                item.path === ROUTES.SALES_REP_SCHEDULER ||
            item.path === ROUTES.LEAD_MANAGEMENT))
          ) {
          } else {
            newArr[0].mob.push(item);
          }
        }
      });
      return newArr;
    } else {
      const newArr: any[] = [{ mob: [] }];
      list[0].mob.forEach((item: any) => {
        if (item.path !== ROUTES.USER_MANAEMENT) {
          if (
            isStaging !== 'staging' &&
            (item.path === ROUTES.COMMISSION_DASHBOARD ||
              item.path === ROUTES.CONFIG_PAGE ||
             
              item.path === ROUTES.SALES_REP_SCHEDULER ||
              item.path === ROUTES.LEAD_MANAGEMENT)
          ) {
          } else {
            newArr[0].mob.push(item);
          }
        }
      });
      return newArr;
    }
  };

  const handleMouseover = (
    e: React.MouseEvent<HTMLAnchorElement | MouseEvent>,
    name: string,
    child: Child[],
    id?: number
  ) => {
    const elm = e.target as HTMLAnchorElement;

    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    if (
      elm.classList.contains('side-icon-container') ||
      elm.classList.contains('side-accordian') ||
      elm.classList.contains('side-icon-container-1')
    ) {
      const co = elm.getBoundingClientRect();
      setCords({
        top: co.top,
        left: co.width + co.left,
        opacity: 1,
        text: name,
        child,
        id,
      });
    }
  };

  useEffect(() => {
    if (toggleOpen) {
      setDb(false);
      setProject(false);
    }
  }, [toggleOpen]);

  // TODO showing required routes for now
  // const isMobile = width < 768;
  const isMobile = true;
  return (
    <div
      style={{ zIndex: '200' }}
      className={`side-bar-container ${toggleOpen ? 'side-bar-active sidebar-hidden' : 'show'}`}
    >
      <div
        className={`side-bar-content ${toggleOpen ? 'side-bar-content-active' : ''
          }`}
        style={{ paddingInline: !toggleOpen ? 10 : '' }}
      >
        {filteredList().map((el: any, i: number) => (
          <div className="" key={i}>
            {isMobile && (
              <div className="" style={{ marginTop: toggleOpen ? 0 : '-2px' }}>
                {el.mob?.map((oth: any, index: number) => (
                  <Link
                    key={index}
                    style={{ paddingLeft: toggleOpen ? '.8rem' : '' }}
                    to={oth.path}
                    onClick={() => isTablet && setToggleOpen((prev) => !prev)}
                    onMouseEnter={(e) =>
                      toggleOpen &&
                      !isTablet &&
                      handleMouseover(
                        e,
                        oth.sidebarProps.displayText,
                        [],
                        index + 8
                      )
                    }
                    onMouseLeave={() => {
                      timeOut.current = setTimeout(() => {
                        setCords((prev) => ({ ...prev, opacity: 0, id: -1 }));
                      }, 500);
                    }}
                    className={`side-icon-container ${location.pathname.includes(oth.path)
                      ? 'active-link-bg'
                      : 'not-active-link'
                      }`}
                  >
                    <div
                      className={
                        location.pathname.includes(oth.path)
                          ? 'sidebaricon'
                          : 'sidebariconn'
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        marginLeft: !toggleOpen ? '' : '-1px',
                        background:
                          toggleOpen && location.pathname.includes(oth.path)
                            ? ''
                            : toggleOpen
                              ? 'transparent'
                              : 'transparent',
                      }}
                    >
                      {oth.sidebarProps.icon && oth.sidebarProps.icon}
                    </div>

                    {toggleOpen && !isTablet ? null : (
                      <p
                        className={
                          location.pathname.includes(oth.path)
                            ? 'tablink'
                            : 'tablinkk'
                        }
                      >
                        {oth.sidebarProps.displayText}
                      </p>
                    )}
                    <div
                      className="tip"
                      style={{
                        backgroundColor: '#fff',
                        position: 'fixed',
                        top: cords.top,
                        left: cords.left,
                        display:
                          cords.opacity && cords.id === index + 8
                            ? 'block'
                            : 'none',

                        maxHeight: '300px',
                        minWidth: '150px',
                        overflowY: 'scroll',
                        borderBottomRightRadius: '4px',
                        borderTopRightRadius: '4px',
                        borderLeft: '1px solid #D9D9D9',
                        color: '#292B2E',
                      }}
                    >
                      <span
                        className=""
                        style={{
                          display: 'block',
                          background: '#377CF6',
                          padding: '11px 12px',
                          color: 'white',
                          width: '100%',
                          fontWeight: '500',
                          borderBottom: '1px solid #E8E8E8',
                          fontSize: '13px',
                          // borderRight: "3px solid #377CF6",
                          cursor: 'default',
                          pointerEvents: 'none',
                        }}
                      >
                        {' '}
                        {cords.text}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
     {!toggleOpen &&   <div style={{ marginTop: 32 }}>
          <p
            style={{
              fontSize: '12px',
              textAlign: 'center',
              fontWeight: 500,
              color: '#80848B',
            }}
          >
            © 2024 by Our World Energy.
          </p>
          <p
            style={{
              fontSize: '10px',
              textAlign: 'center',
              fontWeight: 500,
              color: '#80848B',
            }}
          >
            All rights reserved. eOS: v1.5
          </p>
        </div>}
      </div>
    </div>
  );
};

export default Sidebar;