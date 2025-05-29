import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewsListComponent } from "./news-list.component";

describe("HotTopicsComponent", () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
