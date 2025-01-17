// import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
// import {IonItem} from "@ionic/angular";
// import {NavigationEnd, Router, RouterLink} from "@angular/router";
// import {filter, map, tap} from "rxjs/operators";
// import {Subscription} from "rxjs";

// @Directive({
//   selector: '[ionRouterLinkActive]'
// })
// export class IonRouterLinkActiveDirective implements OnInit, OnDestroy {

//   private handler?: Subscription;

//   constructor(
//     private router: Router,
//     private ionItem: IonItem,
//     private rl: RouterLink,
//   ) {
//   }

//   ngOnInit(): void {

//     this.handler = this.router.events
//       .pipe(
//         filter((event): event is NavigationEnd => event instanceof NavigationEnd),
//         map(() => this.rl.urlTree ? this.router.isActive(this.rl.urlTree, false) : false),
//         tap((isActive) => {
//             this.ionItem.color = isActive ? "secondary" : undefined;
//         }),
//       )
//       .subscribe();
//   }

//   ngOnDestroy() {
//     this.handler?.unsubscribe();
//   }

// }


import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appActiveLink]'
})
export class ActiveLinkDirective implements OnInit {
  @Input() appActiveLink!: string;
  private routerSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveClass();
      }
    });
  }

  private updateActiveClass(): void {
    const currentUrl = this.router.url;
    if (currentUrl === this.appActiveLink) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}


