import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase/supabase.service';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { filter, Subscription } from 'rxjs';
import { UserProfileService } from './services/store/UserProfileService';
import { RoleTypesService } from './services/store/RoleTypesService';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit {

    constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private authService: SupabaseService,
    private userProfileService: UserProfileService,
    private roleTypesService: RoleTypesService,
    private translate: TranslateService // add this
    ) { 

      this.translate.addLangs(['da', 'en']);
      this.translate.setDefaultLang('da');
      this.translate.use('da');
    }
    
    get userProfile() { return this.userProfileService.userProfile$(); }
    get role() { return this.roleTypesService.role$(); }
    private routerSubscription!: Subscription;


  ngOnInit(): void {
    this.routerSubscription = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {

      const navEndEvent = event as NavigationEnd; 
      const hideOnThisUrls = ['/login', '/login/availables'];

      if (hideOnThisUrls.includes(navEndEvent.url)) {
        this.menuCtrl.enable(false);
      } else {
        this.menuCtrl.enable(true);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
