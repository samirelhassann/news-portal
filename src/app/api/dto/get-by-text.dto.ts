import { RequestModel } from "../utils/request-model.type";

interface QueryParams {
  page: number;
  pageSize: number;
  sortBy: "publishedAt";
  q: string;
}

type GetByTextRequestModel = RequestModel<{
  queryParameters: QueryParams;
}>;

interface Article {
  source: Source;
  author: null | string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface Source {
  id: null | string;
  name: string;
}

interface GetByTextResponseModel {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type { GetByTextRequestModel, GetByTextResponseModel };
