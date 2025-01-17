import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuItemsForSidebarButtonComponent } from './menu-items-for-sidebar-button.component';

describe('MenuItemsForSidebarButtonComponent', () => {
  let component: MenuItemsForSidebarButtonComponent;
  let fixture: ComponentFixture<MenuItemsForSidebarButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemsForSidebarButtonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuItemsForSidebarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
