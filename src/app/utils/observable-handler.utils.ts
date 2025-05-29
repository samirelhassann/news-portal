import { Injectable, OnDestroy } from "@angular/core";

import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError, finalize, takeUntil } from "rxjs/operators";

export interface ObservableState<T> {
  data: T;
  isLoading: boolean;
  error: boolean;
  success: boolean;
  errorMessage: string | null;
}

@Injectable({
  providedIn: "root",
})
export class ObservableHandler implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  manage<T>(useCase: () => Observable<T>): Observable<ObservableState<T>> {
    const defaultValue = this.getDefaultValue<T>();

    const state$ = new BehaviorSubject<ObservableState<T>>({
      data: defaultValue,
      isLoading: true,
      error: false,
      success: false,
      errorMessage: null,
    });

    useCase()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          state$.next({
            data: defaultValue,
            isLoading: false,
            error: true,
            success: false,
            errorMessage: error.message,
          });
          return [];
        }),
        finalize(() => state$.next({ ...state$.value, isLoading: false })),
      )
      .subscribe((data) => {
        state$.next({
          data,
          isLoading: false,
          error: false,
          success: true,
          errorMessage: null,
        });
      });

    return state$.asObservable();
  }

  private getDefaultValue<T>(): T {
    if (Array.isArray([] as unknown as T)) {
      return [] as unknown as T;
    }
    return {} as T;
  }
}
