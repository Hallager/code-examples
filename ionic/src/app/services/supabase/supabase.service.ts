import { inject, Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthResponse,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { BehaviorSubject, from, Observable, map } from 'rxjs'
import { environment } from 'src/environments/environment'

import api from './api'
import { AppSelectedAreaService } from '../store/AppSelectedAreaService'



@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private selectedAreaService = inject(AppSelectedAreaService);
  private userProfileService = inject(UserProfileService)

  private supabase: SupabaseClient
  private currentUser: BehaviorSubject<User | boolean | null> = new BehaviorSubject<User | boolean | null>(null as User | boolean | null);

  private access_token: string = '';
  private _session: AuthSession | null = null
  

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)

    this.authChanges((event: AuthChangeEvent, session: Session | null) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this._session = session
        this.access_token = session!.access_token

        this.fetchUserProfile(session!.user.id)

        this.currentUser.next(session!.user);
      } else {
        this.currentUser.next(false);
      }
    });
  }


  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }


  login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return from(promise);
  }


  signInWithPassword(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }


  getCurrentUser(): Observable<User | boolean> {
    return this.currentUser.asObservable().pipe(
      map(val => val ?? false)
    );
  }


  async loadUser() {
    if (this.currentUser.value) {
      console.log('ALREADY GOT USER');
      return;
    }
    const user = await this.supabase.auth.getUser();

    if (user.data.user) {
      this.currentUser.next(user.data.user);
    } else {
      this.currentUser.next(false);
    }
  }


  getCurrentUserId(): string | null {
    if (this.currentUser.value) {
      return (this.currentUser.value as User).id;
    } else {
      return null;
    }
  }


  register(
    email: string,
    username: string,
    password: string
  ): Observable<AuthResponse> {
    const promise = this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    return from(promise);
  }


  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  logout(): void {
    this.supabase.auth.signOut();
  }


  ...
 

}