import { Component } from "@angular/core";

import { LucideAngularModule, PyramidIcon } from "lucide-angular";

@Component({
  selector: "app-footer",
  imports: [LucideAngularModule],
  templateUrl: "./footer.component.html",
})
export class FooterComponent {
  readonly PyramidIcon = PyramidIcon;
}
