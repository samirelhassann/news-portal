import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { LucideAngularModule } from "lucide-angular";

import { Filter } from "@/models/interface/filter.interface";
import { NewsService } from "@/services/news/news.service";

@Component({
  selector: "app-chips",
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./chips.component.html",
})
export class ChipsComponent {
  constructor(private readonly newsService: NewsService) {}

  public onSelect(filter: Filter) {
    this.newsService.changeFilter(filter.type);
  }

  get filters() {
    return this.newsService.filters;
  }

  get selectedFilter$() {
    return this.newsService.selectedFilter$;
  }
}
