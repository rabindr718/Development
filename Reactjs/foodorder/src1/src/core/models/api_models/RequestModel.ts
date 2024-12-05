/**
 * Created by Ankit Chuahan on 16/01/24
 * File Name: RequestModel
 * Product Name: WebStorm
 * Project Name: commission_app
 * Path: src/core/models/api_models
 */

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export enum HTTP_STATUS {
  OK = 200,
  OK_NO_CONTENT = 201,
  BAD_REQUEST = 400,
  UN_AUTHORIZED = 401,
}

export interface RequestModel {
  endPoint: string;
  method: HTTP_METHOD;
  headers?: Record<string, string>;
  body?: string | FormData;
}
