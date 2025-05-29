/* eslint-disable no-plusplus */
import { Injectable } from "@angular/core";

import { Bitcoin, CpuIcon, DollarSign, Flame, Microscope, Rocket } from "lucide-angular";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { News } from "@/domains/news.interface";
import { FilterType } from "@/models/enums/filter-types.enum";
import { Filter } from "@/models/interface/filter.interface";
import { GetByTextUseCase } from "@/use-cases/get-by-text/get-by-text.use-case";
import { GetTopHeadlinesUseCase } from "@/use-cases/get-top-headlines/get-top-headlines.use-case";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  private readonly PAGE_SIZE: number = 9;

  private _filters: Filter[] = [];
  private _selectedFilterSubject = new BehaviorSubject<Filter | null>(null);
  private _newsSubject = new BehaviorSubject<News[]>([]);
  private _loadingSubject = new BehaviorSubject<boolean>(false);
  private _noMoreSubject = new BehaviorSubject<boolean>(false);

  private _page: number = 1;

  constructor(
    private readonly getTopHeadlinesUseCase: GetTopHeadlinesUseCase,
    private readonly getByTextUseCase: GetByTextUseCase,
  ) {
    this.generateFormattedTypes();
  }

  private generateFormattedTypes() {
    this._filters = [
      {
        type: FilterType.TOP_HEADLINES,
        title: "Top Headlines",
        icon: Flame,
        q: "",
        isHeadline: true,
      },
      {
        type: FilterType.SPACE,
        title: "Space",
        icon: Rocket,
        q: "nasa",
      },
      {
        type: FilterType.CRYPTO,
        title: "Crypto",
        icon: Bitcoin,
        q: "crypto",
      },
      {
        type: FilterType.TECHNOLOGY,
        title: "Technology",
        icon: CpuIcon,
        q: "technology",
      },
      {
        type: FilterType.BUSINESS,
        title: "Business",
        icon: DollarSign,
        q: "business",
      },
      {
        type: FilterType.SCIENCE,
        title: "Science",
        icon: Microscope,
        q: "science",
      },
    ];

    this._selectedFilterSubject.next(this._filters[0]);
  }

  public loadNews(): void {
    if (this._loadingSubject.value) return;

    this._loadingSubject.next(true);

    const isHeadline = this._selectedFilterSubject.value?.isHeadline;

    if (isHeadline) {
      this.getTopHeadlinesUseCase
        .execute({
          page: this._page,
          pageSize: this.PAGE_SIZE,
        })
        .pipe(
          map((response) => response),
          tap(() => this._loadingSubject.next(false)),
          catchError(() => {
            this._loadingSubject.next(false);
            return of([]);
          }),
        )
        .subscribe((news: News[]) => {
          const currentNews = this._newsSubject.value;
          this._newsSubject.next([...currentNews, ...news]);
          this._noMoreSubject.next(news.length < this.PAGE_SIZE);
        });

      return;
    }

    this.getByTextUseCase
      .execute({
        page: this._page,
        pageSize: this.PAGE_SIZE,
        q: this._selectedFilterSubject.value?.q ?? "",
      })
      .pipe(
        map((response) => response),
        tap(() => this._loadingSubject.next(false)),
        catchError(() => {
          this._loadingSubject.next(false);
          return of([]);
        }),
      )
      .subscribe((news: News[]) => {
        const currentNews = this._newsSubject.value;
        this._newsSubject.next([...currentNews, ...news]);
        this._noMoreSubject.next(news.length < this.PAGE_SIZE);
      });
  }

  public onScroll(): void {
    if (!this._loadingSubject.value) {
      this._page++;
      this.loadNews();
    }
  }

  public changeFilter(newFilterType: FilterType): void {
    const newFilter = this._filters.find((filter) => filter.type === newFilterType);
    if (newFilter) {
      this._selectedFilterSubject.next(newFilter);
      this._loadingSubject.next(false);
      this._page = 1;
      this._newsSubject.next([]);
      this.loadNews();
    }
  }

  get filters(): Filter[] {
    return this._filters;
  }

  get selectedFilter$() {
    return this._selectedFilterSubject.asObservable();
  }

  get news$(): Observable<News[]> {
    return this._newsSubject.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this._loadingSubject.asObservable();
  }

  get noMore$(): Observable<boolean> {
    return this._noMoreSubject.asObservable();
  }
}
