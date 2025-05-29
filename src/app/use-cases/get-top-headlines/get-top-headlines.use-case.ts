/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import { Injectable } from "@angular/core";

import { from, map, Observable } from "rxjs";

import { ApiService } from "@/api/api.service";
import { News } from "@/domains/news.interface";

import { GetTopHeadlinesMapper } from "./get-top-headlines.mapper";

export interface GetTopHeadlinesUseCaseProps {
  page: number;
  pageSize?: number;
}

@Injectable({
  providedIn: "root",
})
export class GetTopHeadlinesUseCase {
  constructor(private readonly newsService: ApiService) {}

  execute(useCaseProps: GetTopHeadlinesUseCaseProps): Observable<News[]> {
    const requestModel = GetTopHeadlinesMapper.toRequestModel(useCaseProps);
    const request = from(this.newsService.getToplineHeadlines(requestModel));

    return request.pipe(
      map((response) => {
        return GetTopHeadlinesMapper.toDomain(response);
      }),
    );
  }
}
