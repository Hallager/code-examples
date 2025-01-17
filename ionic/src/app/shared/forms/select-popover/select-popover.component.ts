import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-select-popover',
  templateUrl: './select-popover.component.html',
  styleUrls: ['./select-popover.component.scss'],
})
export class SelectPopoverComponent implements OnInit {

  @Input() title: string = "";
  @Input() items: string[] = []; // Original liste
  public filteredItems: string[] = []; // Filtreret liste
  public searchTerm = '';

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {
    // Start med alle items
    this.filteredItems = [...this.items];
  }

  // Opdater filtrerede items baseret på søgefeltet
  onSearchTermChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item => item.toLowerCase().includes(term));
  }

  selectItem(item: string) {
    this.popoverController.dismiss({
      'selectedItem': item
    });
  }
}
