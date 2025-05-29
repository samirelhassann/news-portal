/* eslint-disable import/no-cycle */
import { Injectable } from "@angular/core";

import { DEFAULT_PAGE_SIZE } from "src/config";

import { GetByTextRequestModel, GetByTextResponseModel } from "@/api/dto/get-by-text.dto";
import { News } from "@/domains/news.interface";

import { GetByTextUseCaseProps } from "./get-by-text.use-case";

@Injectable({
  providedIn: "root",
})
export class GetByTextMapper {
  static toRequestModel(useCaseProps: GetByTextUseCaseProps): GetByTextRequestModel {
    const { page, pageSize, q } = useCaseProps;

    return {
      queryParameters: {
        page,
        pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
        q,
      },
    };
  }

  static toDomain(serviceResponse: GetByTextResponseModel): News[] {
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
