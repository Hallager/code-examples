import { Injectable, signal, computed, effect } from '@angular/core';
import { userProfile } from '../supabase/entity';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private localStorageKey = 'user_profile';

  // Initialiserer signalet fra Local Storage
  private userProfileSignal = signal<userProfile | null>(this.loadUserProfileFromLocalStorage());

  // Read-only adgang til user profile
  get userProfile$() {
    return computed(() => this.userProfileSignal());
  }

  constructor() {
    effect(() => {
      const profile = this.userProfileSignal();
      if (profile) {
        this.saveUserProfileToLocalStorage(profile);
      } else {
        localStorage.removeItem(this.localStorageKey);
      }
    });
  }

  // Sæt eller opdater user profile og opdater Local Storage
  setUserProfile(userProfile: userProfile) {
    userProfile.meta_name_full = [userProfile.meta_name_first, userProfile.meta_name_middle, userProfile.meta_name_last]
      .filter(name => name)
      .join(' ');

    this.userProfileSignal.set(userProfile);
  }

  updateUserProfile(updates: Partial<userProfile>) {
    const currentProfile = this.userProfileSignal();
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, ...updates };

      // Beregn meta_name_full igen
      updatedProfile.meta_name_full = [updatedProfile.meta_name_first, updatedProfile.meta_name_middle, updatedProfile.meta_name_last]
        .filter(name => name)
        .join(' ');

      this.userProfileSignal.set(updatedProfile);
    } else {
      console.error('Ingen eksisterende brugerprofil at opdatere.');
    }
  }

  clearUserProfile() {
    this.userProfileSignal.set(null);
  }

  private loadUserProfileFromLocalStorage(): userProfile | null {
    const savedProfile = localStorage.getItem(this.localStorageKey);
    return savedProfile ? JSON.parse(savedProfile) : null;
  }

  private saveUserProfileToLocalStorage(userProfile: userProfile) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(userProfile));
  }
}
