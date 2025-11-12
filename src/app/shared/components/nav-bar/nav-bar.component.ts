import { Component, HostListener, inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PATH, PRIVATES_ROUTES, ROUTES } from '@constants/index';
import { Subscription } from 'rxjs';
import { UserStore } from '../../../core/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class NavBarComponent implements OnDestroy {
  #router = inject(Router);
  readonly store = inject(UserStore);

  showMenuMovile = false;
  routes = ROUTES.filter((route) => route.private);
  showNav = false;

  #subs: Subscription[] = [];

  constructor() {
    this.#subs.push(
      this.#router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.showNav = false;

          PRIVATES_ROUTES.forEach((route) => {
            if (event.urlAfterRedirects.startsWith(route)) {
              this.showNav = true;
            }
          });
          if (this.showMenuMovile) {
            this.showMenuMovile = false;
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.#subs.forEach((sub) => sub.unsubscribe());
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768 && this.showMenuMovile) {
      this.showMenuMovile = false;
    }
  }

  toggleMenu() {
    this.showMenuMovile = !this.showMenuMovile;
  }
}
