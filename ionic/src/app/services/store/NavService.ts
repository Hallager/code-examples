
import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class NavService {
  
    public navTitlesignal = signal<string | null>('');
    get navTitle$() {
        return computed(() => this.navTitlesignal());
    }
    setNavTitle(title: string) {
        this.navTitlesignal.set(title);
    }
    constructor() { 

}
}