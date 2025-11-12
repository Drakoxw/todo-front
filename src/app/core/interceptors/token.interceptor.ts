import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { UserStore } from "@store/index";
import { Observable } from "rxjs";

export function tokenterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const store = inject(UserStore)

  if (store.expired()) {
    store.logout();
    return next(req);
  }

  const authToken = store.token();

  if (!authToken) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.append('authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
}
