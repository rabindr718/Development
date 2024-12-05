import {
  CreateUserModel,
  CreateUserParamModel,
} from '../core/models/api_models/UserManagementModel';
import { TYPE_OF_USER } from '../resources/static_data/Constant';

// validationUtils.ts
export const validateName = (name: string): boolean => {
  return /^[A-Za-z0-9\s\-_.,!@#$%^&*()+=?<>{}[\]:;"'|\\]+$/.test(name.trim());
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const validateZipCode = (zipCode: string): boolean => {
  return /^[0-9]{4,12}$/.test(zipCode.trim());
};

export const validateMobileNumber = (mobileNumber: string): boolean => {
  return /^\+?[0-9]{10,16}$/.test(mobileNumber.trim());
};

export const validateForm = (
  formData: CreateUserModel
): { [key: string]: boolean } => {
  const errors: { [key: string]: boolean } = {};
  if (formData.role_name !== 'Partner') {
    if (!validateName(formData.first_name)) {
      errors.FirstName = true;
    }

    if (!validateName(formData.last_name)) {
      errors.LastName = true;
    }

    if (!validateEmail(formData.email_id)) {
      errors.Email = true;
    }

    if (!validateMobileNumber(formData.mobile_number)) {
      errors.PhoneNumber = true;
    }
  }
  if (formData.role_name.length === 0) {
    errors.Role = true;
  }

  if (formData.role_name === TYPE_OF_USER.APPOINTMENT_SETTER) {
    if (formData.report_to.length === 0) {
      errors.Report_Manager = true;
    }
  }

  if (formData.role_name === TYPE_OF_USER.REGIONAL_MANGER) {
    if (formData.report_to.length === 0) {
      errors.Report_Manager = true;
    }
  }

  if (formData.role_name === TYPE_OF_USER.SALES_REPRESENTATIVE) {
    if (formData.report_to.length === 0) {
      errors.Report_Manager = true;
    }
    //  else if (formData.team_name.length === 0) {
    //   errors.Team_name = true;
    // }
  }
  if (formData.role_name === TYPE_OF_USER.SALE_MANAGER) {
    if (formData.report_to.length === 0) {
      errors.Report_Manager = true;
    }
  }
  if (formData.role_name === TYPE_OF_USER.PARTNER) {
    if (formData.dealer_code.length === 0) {
      errors.Dealer_Code = true;
    }
  }
  // Add more validations for other fields

  return errors;
};

/** create user object */
export const createUserObject = (
  formData: CreateUserModel
): CreateUserParamModel => {
  let createObject: CreateUserParamModel = {
    name: formData.first_name?.trim() + ' ' + formData.last_name?.trim(),
    email_id: formData.email_id,
    mobile_number: formData.mobile_number,
    role_name: formData.role_name,
    designation: formData.role_name,
    description: formData.description,
    zip_code: formData.zip_code,
    podio_checked: formData.podioChecked,
  };
  if (formData.role_name === TYPE_OF_USER.APPOINTMENT_SETTER) {
    createObject = {
      ...createObject,
      dealer: formData.dealer,
      reporting_manager: formData.report_to,
      team_name: formData.team_name,
    };
  }

  if (formData.role_name === TYPE_OF_USER.REGIONAL_MANGER) {
    createObject = {
      ...createObject,
      dealer: formData.dealer,
      reporting_manager: formData.report_to,
      region: formData.add_region, //TODO: need to discuss
      podio_checked: formData.podioChecked,
    };
  }

  if (formData.role_name === TYPE_OF_USER.SALES_REPRESENTATIVE) {
    createObject = {
      ...createObject,
      dealer: formData.dealer,
      reporting_manager: formData.report_to,
      team_name: formData.team_name,
      podio_checked: formData.podioChecked,
    };
  }
  if (formData.role_name === TYPE_OF_USER.SALE_MANAGER) {
    createObject = {
      ...createObject,
      dealer: formData.dealer,
      reporting_manager: formData.report_to,
      podio_checked: formData.podioChecked,
    };
  }
  if (
    formData.role_name === TYPE_OF_USER.DEALER_OWNER ||
    formData.role_name === TYPE_OF_USER.SUB_DEALER_OWNER
  ) {
    createObject = {
      ...createObject,
      dealer_logo: formData?.dealer_logo,
      dealer: formData.dealer,
    };
  }

  return createObject;
};
