import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { DashboardComponent, InformationComponent } from '@home-module/ui/components';


@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.css'],
  imports: [
    InformationComponent,
    ButtonModule,
    DashboardComponent,
  ],
})
export default class HomeIndexComponent {}
