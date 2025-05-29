import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { CircleSlash2, Flame, LucideAngularModule } from "lucide-angular";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";
import { PaginatorModule } from "primeng/paginator";
import { SkeletonModule } from "primeng/skeleton";

import { NewsService } from "@/services/news/news.service";

import { CardComponent } from "../card/card.component";

@Component({
  selector: "app-news-list",
  standalone: true,
  imports: [CommonModule, SkeletonModule, PaginatorModule, LucideAngularModule, CardComponent, InfiniteScrollDirective],
  templateUrl: "./news-list.component.html",
})
export class NewsListComponent implements OnInit {
  readonly FlameIcon = Flame;
  readonly CircleSlashIcon = CircleSlash2;

  loadingArray: number[] = Array.from({ length: 9 }, (_, i) => i);

  constructor(private readonly newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.loadNews();
  }

  public onScroll(): void {
    this.newsService.onScroll();
  }

  get selectedFilter$() {
    return this.newsService.selectedFilter$;
  }

  get news$() {
    return this.newsService.news$;
  }

  get loading$() {
    return this.newsService.loading$;
  }

  get noMore$() {
    return this.newsService.noMore$;
  }
}
