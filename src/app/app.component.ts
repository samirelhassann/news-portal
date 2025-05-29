import { Component } from "@angular/core";

import { ChipsComponent } from "./components/chips/chips.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { NewsListComponent } from "./components/news-list/news-list.component";

@Component({
  selector: "app-root",
  imports: [FooterComponent, HeaderComponent, HeaderComponent, NewsListComponent, ChipsComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "news-portal";
}
