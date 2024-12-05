/**
 * Created by Ankit Chuahan on 16/01/24
 * File Name: ResponseModel
 * Product Name: WebStorm
 * Project Name: commission_app
 * Path: src/core/models/api_models
 */

export interface ResponseModel<T> {
  status: number;
  message: string;
  data: T;
}
