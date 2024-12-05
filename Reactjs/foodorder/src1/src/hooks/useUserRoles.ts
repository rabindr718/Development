import { useState, useEffect } from 'react';

export enum UserRole {
  ADMIN = 'Admin',
  FINANCE_ADMIN = 'Finance Admin',
  DB_USER = 'DB User',
  SUB_DEALER_OWNER = 'SubDealer Owner',
  PARTNER = 'Partner',
  APPOINTMENT_SETTER = 'Appointment Setter',
  DEALER_OWNER = 'Dealer Owner',
  REGIONAL_MANGER = 'Regional Manager',
  SALE_MANAGER = 'Sales Manager',
  SALES_REPRESENTATIVE = 'Sale Representative',
}

type UseUserRolesReturnType = {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
};

const useUserRoles = (): UseUserRolesReturnType => {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role') as UserRole;
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const setRoleWithStorage = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  };

  return {
    role,
    setRole: setRoleWithStorage,
  };
};

export default useUserRoles;
