import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, MenuController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  showLoader = true;
  credentials = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private alertController: AlertController,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private authService: SupabaseService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  get email() {
    return this.credentials.controls.email;
  }

  get password() {
    return this.credentials.controls.password;
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.signInWithPassword(this.credentials.value.email ?? '', this.credentials.value.password ?? '').then(async (data) => {
      await loading.dismiss();

      if (data.error) {
        this.showAlert('Login failed', data.error.message);
      }

      if (data.data) {
        this.router.navigateByUrl('/login/available-roles', { replaceUrl: true });
      }

    });
  }
  

  async showAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
