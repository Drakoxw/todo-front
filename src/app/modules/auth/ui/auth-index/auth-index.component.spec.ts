import { ComponentFixture, TestBed } from '@angular/core/testing';
import AuthIndexComponent from './auth-index.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthIndexComponent', () => {
  let component: AuthIndexComponent;
  let fixture: ComponentFixture<AuthIndexComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AuthIndexComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
