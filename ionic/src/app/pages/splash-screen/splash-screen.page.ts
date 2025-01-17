import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  showLoader = false;
  constructor(    
    private router: Router,
    private authService: SupabaseService
  ) { 

    setTimeout(() => {
      this.showLoader = true;
    }, 100);

    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        console.log('GOT USER ON LOGIN', user);
         this.router.navigateByUrl('/home-page', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });

  }

  ngOnInit() {
  }

}
