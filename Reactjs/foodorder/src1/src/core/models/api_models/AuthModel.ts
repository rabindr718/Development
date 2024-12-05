/**
 * Created by Ankit Chuahan on 21/01/24
 * File Name: AuthModel
 * Product Name: WebStorm
 * Project Name: commission_app
 * Path: src/core/models/api_models
 */

export interface AuthModel {
  status: any;
  email_id: string;
  role: string;
  isPasswordChangeRequired: boolean;
  accessToken: string;
}

export interface Credentials {
  email_id: string;
  password: string;
  isRememberMe: boolean;
}
export interface resetPassword {
  email_id: string;
}
export interface otpModel {
  email_id: string;
  otp: string;
  new_password: string;
  confirm_password: string;
}

export interface AuthContextDataModel {
  auth: AuthModel | null;
  login?: (email_id: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
}
