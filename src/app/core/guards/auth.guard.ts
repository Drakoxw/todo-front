import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { PATH } from "@constants/routes";
import { UserStore } from "@store/index";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(UserStore)
  const router = inject(Router)

  if (store.expired()) {
    store.logout();
    router.navigate([PATH.AUTH]);
  }

  if (!store.isLoggedIn()) {
    router.navigate([PATH.AUTH]);
  }

  return store.isLoggedIn();
};
