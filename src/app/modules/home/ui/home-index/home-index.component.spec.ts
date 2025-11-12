import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeIndexComponent from './home-index.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideStore } from '@ngrx/store';

describe('HomeIndexComponent', () => {
  let component: HomeIndexComponent;
  let fixture: ComponentFixture<HomeIndexComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ HomeIndexComponent ],
      providers: [
        provideAnimationsAsync(),
        provideZonelessChangeDetection(),
        provideHttpClient(),
        providePrimeNG(),
        ConfirmationService,
        MessageService,
        provideStore()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

