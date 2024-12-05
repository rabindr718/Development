/**
 * Created by Ankit Chuahan on 21/01/24
 * File Name: EndPoints
 * Product Name: WebStorm
 * Project Name: commission_app
 * Path: src/infrastructure/web_api/api_client
 */

// endpoints.ts

interface Endpoints {
  login: string;
  resetPassword: string;
  changePassword: string;
  checkUser: string;
  // get config
  commission: string;
  dealer: string;
  marketing: string;
  adderV: string;
  salesType: string;
  tierLoan: string;
  dealerTier: string;
  paySchedule: string;
  timeLineSla: string;
  loanType: string;
  autoAdder: string;
  repPaySettings: string;
  rateAdjustments: string;

  // post config
  create_commission: string;
  create_dealer: string;
  create_dealertier: string;
  create_marketingfee: string;
  create_paymentschedule: string;
  create_vadder: string;
  create_saletype: string;
  create_tierloanfee: string;
  create_timelinesla: string;
  create_loantype: string;
  create_autoadder: string;
  create_repaysettings: string;
  create_rateadjustments: string;

  get_newFormData: string;
  update_commission: string;
  update_autoadder: string;
  update_dealer: string;
  update_vadders: string;
  update_marketingfee: string;
  update_saletype: string;
  update_dealertier: string;
  update_tierloanfee: string;
  update_paymentschedule: string;
  update_timelinesla: string;
  update_loantype: string;
  update_commission_archive: string;
  update_dealer_archive: string;
  update_vadders_archive: string;
  update_marketingfee_archive: string;
  update_saletype_archive: string;
  update_dealertier_archive: string;
  update_tierloanfee_archive: string;
  update_paymentschedule_archive: string;
  update_timelinesla_archive: string;
  update_loantype_archive: string;

  //user management
  Get_User_onboarding_list: string;
  Get_User_list_based_on_Role: string;
  get_user_by_role: string;
  create_user: string;
  delete_users: string;
  active: string;
  table_permission: string;
  get_users_by_dealer: string;

  //DB manager
  Get_DBManager_User_Activity: string;
}

export const EndPoints: Endpoints = {
  login: `login`,
  resetPassword: 'forgot_password',
  changePassword: 'change_password',
  checkUser: 'user_exists',
  // get config endpoints
  commission: 'get_commissions',
  active: 'active',
  dealer: 'get_dealers',
  marketing: 'get_marketingfee',
  adderV: 'get_vadders',
  salesType: 'get_saletypes',
  tierLoan: 'get_tierloanfees',
  dealerTier: 'get_dealerstier',
  paySchedule: 'get_paymentschedules',
  timeLineSla: 'get_timelineslas',
  loanType: 'get_loantypes',
  autoAdder: 'get_autoadder',
  repPaySettings: 'get_rep_pay_settings',
  rateAdjustments: 'get_rateadjustments',

  // post config endpoint
  create_commission: 'create_commission',
  create_autoadder: 'create_autoadder',
  update_autoadder: 'update_autoadder',
  create_dealer: 'create_dealer',
  create_dealertier: 'create_dealertier',
  create_loantype: 'create_loantype',
  create_marketingfee: 'create_marketingfee',
  create_paymentschedule: 'create_paymentschedule',
  create_saletype: 'create_saletype',
  create_tierloanfee: 'create_tierloanfee',
  create_vadder: 'create_vadder',
  create_timelinesla: 'create_timelinesla',
  create_repaysettings: 'create_rep_pay_settings',
  create_rateadjustments: 'create_rateadjustments',
  // update config point
  update_commission: 'update_commission',
  update_dealer: 'update_dealer',
  update_vadders: 'update_vadders',
  update_marketingfee: 'update_marketingfee',
  update_saletype: 'update_saletype',
  update_dealertier: 'update_dealertier',
  update_tierloanfee: 'update_tierloanfee',
  update_paymentschedule: 'update_paymentschedule',
  update_timelinesla: 'update_timelinesla',
  update_loantype: 'update_loantype',

  //archive config point
  update_commission_archive: 'update_commission_archive',
  update_dealer_archive: 'update_dealer_archive',
  update_vadders_archive: 'update_vadders_archive',
  update_marketingfee_archive: 'update_marketingfee_archive',
  update_saletype_archive: 'update_saletype_archive',
  update_dealertier_archive: 'update_dealertier_archive',
  update_tierloanfee_archive: 'update_tierloanfee_archive',
  update_paymentschedule_archive: 'update_paymentschedule_archive',
  update_timelinesla_archive: 'update_timelinesla_archive',
  update_loantype_archive: 'update_loantype_archive',

  // /get form Data
  get_newFormData: 'get_newformdata',

  //user management
  Get_User_onboarding_list: 'get_users_onboarding',
  Get_User_list_based_on_Role: 'get_users',
  get_user_by_role: 'get_users_by_role',
  get_users_by_dealer: 'get_users_by_dealer',
  create_user: 'create_user',
  delete_users: 'delete_users',
  table_permission: 'table_permission',

  //DB Manager
  Get_DBManager_User_Activity: 'useractivity',
};
