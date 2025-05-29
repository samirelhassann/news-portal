import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card",
  imports: [CommonModule],
  templateUrl: "./card.component.html",
})
export class CardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) url!: string;
  @Input({ required: true }) publishDate!: Date;
  @Input() sourceName?: string;
}
