import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-items-for-sidebar-button',
  templateUrl: './menu-items-for-sidebar-button.component.html',
  styleUrls: ['./menu-items-for-sidebar-button.component.scss'],
})
export class MenuItemsForSidebarButtonComponent  implements OnInit {
  @Input() text: string ='';
  @Input() link: string ='';
  @Input() icon: string ='';
  @Input() badge: number = 0;
  
  constructor() { }

  ngOnInit() {
    if (this.badge >= 99) {
      this.badge = 99
    }
  }

}
