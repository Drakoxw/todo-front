import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';

import LogoutIndexComponent from './logout-index.component';

describe('LogoutIndexComponent', () => {
  let component: LogoutIndexComponent;
  let fixture: ComponentFixture<LogoutIndexComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [LogoutIndexComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideStore()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
