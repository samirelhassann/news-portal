/* eslint-disable no-console */
import { Injectable } from "@angular/core";

import axios, { AxiosInstance } from "axios";
import { environment } from "src/environments/environment";

import { GetTopHeadlinesRequestModel, GetTopHeadlinesResponseModel } from "./dto/get-top-headlines.dto";
import { ENDPOINTS } from "./endpoints";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: environment.newsApi.host,
      params: {
        apiKey: environment.newsApi.apiKey,
      },
    });

    this.axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
      },
    );
  }

  async getToplineHeadlines(requestModel: GetTopHeadlinesRequestModel): Promise<GetTopHeadlinesResponseModel> {
    return this.axiosClient.get(ENDPOINTS.GET_TOP_HEADLINES(requestModel)).then((response) => response.data);
  }

  async getByText(requestModel: GetTopHeadlinesRequestModel): Promise<GetTopHeadlinesResponseModel> {
    return this.axiosClient.get(ENDPOINTS.GET_BY_TEXT(requestModel)).then((response) => response.data);
  }
}
