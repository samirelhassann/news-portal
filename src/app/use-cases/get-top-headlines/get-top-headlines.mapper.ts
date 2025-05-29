/* eslint-disable import/no-cycle */
import { Injectable } from "@angular/core";

import { DEFAULT_PAGE_SIZE } from "src/config";

import { GetTopHeadlinesRequestModel, GetTopHeadlinesResponseModel } from "@/api/dto/get-top-headlines.dto";
import { News } from "@/domains/news.interface";

import { GetTopHeadlinesUseCaseProps } from "./get-top-headlines.use-case";

@Injectable({
  providedIn: "root",
})
export class GetTopHeadlinesMapper {
  static toRequestModel(useCaseProps: GetTopHeadlinesUseCaseProps): GetTopHeadlinesRequestModel {
    const { page, pageSize } = useCaseProps;

    return {
      queryParameters: {
        page,
        pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
        country: "us",
      },
    };
  }

  static toDomain(serviceResponse: GetTopHeadlinesResponseModel): News[] {
    return serviceResponse.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: new Date(article.publishedAt),
      content: article.content,
      sourceName: article.source.name,
    }));
  }
}
