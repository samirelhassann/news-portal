/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import { Injectable } from "@angular/core";

import { from, map, Observable } from "rxjs";

import { ApiService } from "@/api/api.service";
import { News } from "@/domains/news.interface";

import { GetByTextMapper } from "./get-by-text.mapper";

export interface GetByTextUseCaseProps {
  page: number;
  pageSize?: number;
  q: string;
}

@Injectable({
  providedIn: "root",
})
export class GetByTextUseCase {
  constructor(private readonly newsService: ApiService) {}

  execute(useCaseProps: GetByTextUseCaseProps): Observable<News[]> {
    const requestModel = GetByTextMapper.toRequestModel(useCaseProps);
    const request = from(this.newsService.getByText(requestModel));

    return request.pipe(
      map((response) => {
        return GetByTextMapper.toDomain(response);
      }),
    );
  }
}
