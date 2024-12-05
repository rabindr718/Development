/**
 * Created by Ankit Chuahan on 16/01/24
 * File Name: RequestConstants
 * Product Name: WebStorm
 * Project Name: commission_app
 * Path: src/infrastructure/web_api/api_client
 */

export const HttpHeadersDefault: Record<string, string> = {
  'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': 'http://localhost:3000',
  // 'Access-Control-Allow-Credentials': 'true'
};

export const getAuthorizationHeader = async (): Promise<
  Record<string, string>
> => {
  //ToDo:- Return Authorization
  return {};
};
