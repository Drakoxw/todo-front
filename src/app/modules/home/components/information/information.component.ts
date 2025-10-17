import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';

import { Funcionalities } from '@interfaces/index';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  imports: [TableModule, ImageModule],
})
export class InformationComponent implements OnInit {



  public functionalities: Funcionalities[] = [
  ];

  ngOnInit(): void {
  }

}
