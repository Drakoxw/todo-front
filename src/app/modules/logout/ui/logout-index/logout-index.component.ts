import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH } from '@constants/index';

import { UserStore } from '@store/index';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-logout-index',
  templateUrl: './logout-index.component.html',
  imports: [ProgressSpinnerModule],
})
export default class LogoutIndexComponent implements OnInit {

  #router = inject(Router);
  readonly store = inject(UserStore);

  ngOnInit() {
    this.store.logout();
    this.#router.navigate([PATH.AUTH]);
  }

}
