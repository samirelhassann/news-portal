import { GetByTextRequestModel } from "./dto/get-by-text.dto";
import { GetTopHeadlinesRequestModel } from "./dto/get-top-headlines.dto";
import { constructEndpoint } from "./utils/construct-endpoints";

enum PATHS {
  TOP_HEADLINES_PATH = "/top-headlines",
  BY_TEXT_PATH = "/everything",
}

export const ENDPOINTS = {
  GET_TOP_HEADLINES: ({ queryParameters: queryParams }: GetTopHeadlinesRequestModel) =>
    constructEndpoint({
      endpoint: PATHS.TOP_HEADLINES_PATH,
      queryParams,
    }),

  GET_BY_TEXT: ({ queryParameters: queryParams }: GetByTextRequestModel) =>
    constructEndpoint({
      endpoint: PATHS.BY_TEXT_PATH,
      queryParams,
    }),
};
