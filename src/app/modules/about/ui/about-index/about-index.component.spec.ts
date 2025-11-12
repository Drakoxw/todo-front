import { ComponentFixture, TestBed } from '@angular/core/testing';
import AboutIndexComponent from './about-index.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideZonelessChangeDetection } from '@angular/core';


describe('AboutIndexComponent', () => {
  let component: AboutIndexComponent;
  let fixture: ComponentFixture<AboutIndexComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AboutIndexComponent],
      providers: [
        provideAnimationsAsync(),
        provideZonelessChangeDetection()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
