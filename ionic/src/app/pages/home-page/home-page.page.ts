import { Component, effect, inject, OnInit } from '@angular/core';
import { MenuController, SelectChangeEventDetail, SelectCustomEvent  } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppSelectedAreaProperty, AppSelectedAreaService } from 'src/app/services/store/AppSelectedAreaService';
import { NavService } from 'src/app/services/store/NavService';
import { TodoService } from 'src/app/services/store/TodoService';
import { TodoState, Todo, AddTodo } from 'src/app/services/store/TodoState';
import { AppSelectedArea, DailyStatus, DailyStatusItem, dropdownDashboard } from 'src/app/services/supabase/entity';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { TranslateService } from '@ngx-translate/core'; // 1
import { capitalizeFirstLetter } from 'src/app/helpers/textHelper';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  navService = inject(NavService);
  translateService = inject(TranslateService);

  // todos$!: Observable<Todo[]>;
  // todos2$ = this.todoService.todos$;
  // selectedArea = this.selectedAreaService.areaSignal();
  get selectedArea(){
    return this.selectedAreaService.area$();
  }
  
  dailyStatusForPeople: DailyStatusItem[] = [];
  dailyStatusForStaff: DailyStatus[] = []; 
  dailyStatusForKids: DailyStatus[] = [];
  dropdownDashboardForUser: dropdownDashboard[] = [];


  dropdownSelectedItem: dropdownDashboard|null = null;

  constructor(
    private menuCtrl: MenuController, 
    private authService: SupabaseService,
    private selectedAreaService: AppSelectedAreaService,
  ) {
   }

 async ngOnInit() {
  this.translateService.get('home-page.page_title').subscribe((t) => this.navService.setNavTitle(capitalizeFirstLetter(t)));

    await this.getDropdownDashboardForUser();

    this.getDailyStatusForPeople(this.selectedArea?.account_id, this.selectedArea?.department_id);
    this.getDailyStatusForStaff(this.selectedArea?.account_id, this.selectedArea?.department_id);
    this.getDailyStatusForKids(this.selectedArea?.account_id, this.selectedArea?.department_id);

  }
  selectDropdownItem(item: any) {
    const department_id = !this.dropdownSelectedItem?.is_institution ? this.dropdownSelectedItem?.item_id: null;
    this.getDailyStatusForPeople(this.selectedArea?.account_id, department_id);
    this.getDailyStatusForStaff(this.selectedArea?.account_id, department_id);
    this.getDailyStatusForKids(this.selectedArea?.account_id, department_id);



    let area = this.selectedAreaService.area$() as AppSelectedArea;

    let updatedArea: AppSelectedArea = {
      ...area,
      department_name: this.dropdownSelectedItem?.name ?? null,
      department_id: this.dropdownSelectedItem?.item_id ?? null
    };
    
    // Brug setArea til at opdatere signalet
    this.selectedAreaService.setArea(updatedArea);


    // this.dropdownSelectedItem = item.detail.value.value;
  }

  async getDropdownDashboardForUser() {
    this.dropdownDashboardForUser = await this.authService.DropdownDashboardForUser();

    const primdropdownDashboardForUser = this.dropdownDashboardForUser.find(item => item.is_primery);
    this.dropdownSelectedItem = primdropdownDashboardForUser ?? this.dropdownDashboardForUser[0]
    let area = this.selectedAreaService.area$() as AppSelectedArea;


    let updatedArea: AppSelectedArea = {
      ...area,
      department_name: this.dropdownSelectedItem?.name ?? null,
      department_id: this.dropdownSelectedItem?.item_id ?? null
    };
    
    this.selectedAreaService.setArea(updatedArea);
  }

}
